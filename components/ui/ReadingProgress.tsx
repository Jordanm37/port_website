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
      timeoutId = setTimeout(
        () => {
          func(...args);
          lastExecTime = Date.now();
        },
        delay - (currentTime - lastExecTime)
      );
    }
  }) as T;
}

const ReadingProgressComponent: React.FC<{ targetId?: string; storageKey?: string }> = ({
  targetId = "main-content",
  storageKey,
}) => {
  const [progress, setProgress] = useState(0);
  const lastSavedRef = useRef<number>(0);
  const throttledScrollRef = useRef<((...args: any[]) => any) | null>(null);

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

  // Create stable throttled function reference
  if (!throttledScrollRef.current) {
    throttledScrollRef.current = throttle(onScroll, 16);
  }

  useEffect(() => {
    // Update the throttled function when dependencies change
    throttledScrollRef.current = throttle(onScroll, 16);

    onScroll(); // Initial calculation
    const throttledHandler = throttledScrollRef.current;
    window.addEventListener("scroll", throttledHandler, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandler);
  }, [onScroll]);

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
      style={{ willChange: "width" }}
    />
  );
};

ReadingProgressComponent.displayName = "ReadingProgress";

export const ReadingProgress = React.memo(ReadingProgressComponent);

export default ReadingProgress;
