import React, { useEffect, useRef, useState, useCallback } from "react";
import { Box } from "@chakra-ui/react";

// Throttle utility function
function throttle<T extends (...args: any[]) => any>(func: T, delay: number): T {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;
  
  return ((...args: Parameters<T>) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  }) as T;
}

export const ReadingProgress: React.FC<{ targetId?: string; storageKey?: string }> = React.memo(({
  targetId = "main-content",
  storageKey,
}) => {
  const [progress, setProgress] = useState(0);
  const lastSavedRef = useRef<number>(0);

  const onScroll = useCallback(() => {
    const el = document.getElementById(targetId) || document.documentElement;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const height = el.scrollHeight - window.innerHeight;
    const pct = height > 0 ? Math.min(100, Math.max(0, (scrollTop / height) * 100)) : 0;
    setProgress(pct);
    if (storageKey) {
      const now = Date.now();
      if (now - lastSavedRef.current > 500) {
        try {
          localStorage.setItem(`reading-progress:${storageKey}`, pct.toFixed(2));
          lastSavedRef.current = now;
        } catch (_e) {
          // ignore storage errors
        }
      }
    }
  }, [targetId, storageKey]);

  // Throttle scroll events to improve performance
  const throttledOnScroll = useCallback(
    throttle(onScroll, 16), // ~60fps
    [onScroll]
  );

  useEffect(() => {
    onScroll(); // Initial calculation
    window.addEventListener("scroll", throttledOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledOnScroll);
  }, [onScroll, throttledOnScroll]);

  return (
    <Box
      position="fixed"
      top={16}
      left={0}
      height="2px"
      width={`${progress}%`}
      bg="link"
      zIndex={50}
      transition="width 80ms linear"
      style={{ willChange: 'width' }}
    />
  );
};

export default ReadingProgress;
