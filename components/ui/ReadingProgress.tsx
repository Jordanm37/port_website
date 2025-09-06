import React, { useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";

export const ReadingProgress: React.FC<{ targetId?: string; storageKey?: string }> = ({
  targetId = "main-content",
  storageKey,
}) => {
  const [progress, setProgress] = useState(0);
  const lastSavedRef = useRef<number>(0);

  useEffect(() => {
    const el = document.getElementById(targetId) || document.documentElement;
    const onScroll = () => {
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
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [targetId, storageKey]);

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
    />
  );
};

export default ReadingProgress;
