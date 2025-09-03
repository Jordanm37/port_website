import React, { useRef } from "react";
import { Button, ButtonProps, usePrefersReducedMotion } from "@chakra-ui/react";

export type CTAButtonProps = ButtonProps & { asLinkHref?: string };

export const CTAButton: React.FC<CTAButtonProps> = ({ asLinkHref, children, ...props }) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const reduce = usePrefersReducedMotion();

  function onMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--x", `${x}%`);
    el.style.setProperty("--y", `${y}%`);
  }

  const gradient = {
    background:
      "radial-gradient(40% 60% at var(--x,50%) var(--y,50%), rgba(0,102,204,0.35), rgba(0,102,204,0) 55%), linear-gradient(90deg, var(--chakra-colors-primary-500), var(--chakra-colors-primary-700))",
    _dark: {
      background:
        "radial-gradient(40% 60% at var(--x,50%) var(--y,50%), rgba(51,153,255,0.35), rgba(51,153,255,0) 55%), linear-gradient(90deg, var(--chakra-colors-primary-400), var(--chakra-colors-primary-600))",
    },
  } as const;

  return (
    <Button
      ref={ref}
      as={asLinkHref ? ("a" as any) : undefined}
      href={asLinkHref as any}
      onMouseMove={onMouseMove}
      color="white"
      boxShadow="0 8px 24px rgba(0,102,204,0.25)"
      _hover={{
        transform: "translateY(-1px) scale(1.02)",
        boxShadow: "0 10px 28px rgba(0,102,204,0.35)",
      }}
      _active={{ transform: "translateY(0) scale(0.99)" }}
      {...(!reduce ? gradient : { variant: "neon" })}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CTAButton;
