import React, { useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import { track } from "../../lib/analytics";

export const ReadingProgress: React.FC<{ targetId?: string }> = ({ targetId = "main-content" }) => {
  const [progress, setProgress] = useState(0);
  const milestonesRef = useRef<{ p25: boolean; p50: boolean; p75: boolean; p90: boolean }>({
    p25: false,
    p50: false,
    p75: false,
    p90: false,
  });

  useEffect(() => {
    const el = document.getElementById(targetId) || document.documentElement;
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const height = el.scrollHeight - window.innerHeight;
      const pct = height > 0 ? Math.min(100, Math.max(0, (scrollTop / height) * 100)) : 0;
      setProgress(pct);
      // Track milestones once
      const m = milestonesRef.current;
      if (!m.p25 && pct >= 25) {
        m.p25 = true;
        track("read_depth", { milestone: 25, path: window.location.pathname });
      }
      if (!m.p50 && pct >= 50) {
        m.p50 = true;
        track("read_depth", { milestone: 50, path: window.location.pathname });
      }
      if (!m.p75 && pct >= 75) {
        m.p75 = true;
        track("read_depth", { milestone: 75, path: window.location.pathname });
      }
      if (!m.p90 && pct >= 90) {
        m.p90 = true;
        track("read_depth", { milestone: 90, path: window.location.pathname });
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [targetId]);

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
