import React from "react";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number; // ms
}

export const Reveal: React.FC<RevealProps> = ({ delay = 0, children, style, ...rest }) => {
  const { ref, style: s } = useRevealOnScroll({ delayMs: delay });
  return (
    <div ref={ref} style={{ ...s, ...style }} {...rest}>
      {children}
    </div>
  );
};

export default Reveal;
