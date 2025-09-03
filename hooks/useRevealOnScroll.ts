import { RefObject, useEffect, useMemo, useRef, useState } from "react";

export type RevealOptions = {
  rootMargin?: string;
  threshold?: number;
  delayMs?: number;
};

export function useRevealOnScroll<T extends HTMLElement = HTMLElement>({
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.15,
  delayMs = 0,
}: RevealOptions = {}): {
  ref: RefObject<T>;
  style: React.CSSProperties;
  isVisible: boolean;
} {
  const ref = useRef<T>(null);
  const [isVisible, setVisible] = useState(false);
  const reduceMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduceMotion) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delayMs) {
              const t = window.setTimeout(() => setVisible(true), delayMs);
              return () => window.clearTimeout(t);
            }
            setVisible(true);
          }
        });
      },
      { root: null, rootMargin, threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, threshold, delayMs, reduceMotion]);

  const style: React.CSSProperties = reduceMotion
    ? { opacity: 1, transform: "none" }
    : {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition:
          "opacity 600ms cubic-bezier(.2,.8,.2,1), transform 600ms cubic-bezier(.2,.8,.2,1)",
        willChange: "opacity, transform",
      };

  return { ref, style, isVisible };
}
