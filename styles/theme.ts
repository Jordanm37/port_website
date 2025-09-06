import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// Chakra theme configuration and design tokens
// - Provides a coherent type scale, color system, spacing, radii, and shadows
// - Defines semantic tokens for background/text to support light/dark modes
// - Adds accessible, branded component variants

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

const fonts = {
  heading:
    "var(--font-inter), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  body: "var(--font-inter), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  mono: "var(--font-jbmono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
};

const fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "clamp(1.125rem, 0.6vw + 1rem, 1.25rem)",
  // Fluid headings per visual spec
  xl: "clamp(1.5rem, 1.2vw + 1rem, 1.7rem)", // h3
  "2xl": "clamp(2.0rem, 2.5vw + 1rem, 2.4rem)", // h2
  "3xl": "clamp(2.6rem, 4vw + 1rem, 3.4rem)", // h1
  "4xl": "clamp(2.6rem, 3vw + 1rem, 3.6rem)",
};

const lineHeights = {
  short: 1.2,
  base: 1.65,
  tall: 1.7,
};

const letterSpacings = {
  tighter: "-0.01em",
  normal: "0",
  wider: "0.01em",
};

const colors = {
  primary: {
    50: "#e6f3ff",
    100: "#cce7ff",
    200: "#99cfff",
    300: "#66b7ff",
    400: "#339eff",
    500: "#0066cc",
    600: "#005bb5",
    700: "#004a94",
    800: "#003b76",
    900: "#002a54",
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },
  success: { 500: "#16a34a" },
  warning: { 500: "#d97706" },
  danger: { 500: "#dc2626" },
};

const semanticTokens = {
  colors: {
    bg: { default: "var(--oklch-bg, white)", _dark: "var(--oklch-bg, #0f0f10)" },
    text: { default: "var(--oklch-text, #171717)", _dark: "var(--oklch-text, #f3f4f6)" },
    muted: { default: "var(--oklch-muted, #737373)", _dark: "var(--oklch-muted, #9ca3af)" },
    border: { default: "var(--oklch-border, #d4d4d4)", _dark: "var(--oklch-border, #374151)" },
    link: { default: "var(--oklch-accent, #2563eb)", _dark: "var(--oklch-accent, #60a5fa)" },
    readingBg: { default: "var(--oklch-surface, #fafafa)", _dark: "var(--oklch-surface, #111114)" },
    chromeBg: { default: "rgba(255,255,255,0.7)", _dark: "rgba(23,23,23,0.6)" },
  },
};

const space = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "24px",
  6: "32px",
  7: "48px",
  8: "64px",
  9: "80px",
};

const radii = {
  sm: "6px",
  md: "10px",
  lg: "14px",
  full: "9999px",
};

const shadows = {
  sm: "0 1px 2px rgba(0,0,0,0.06)",
  md: "0 4px 12px rgba(0,0,0,0.08)",
};

const components = {
  Button: {
    baseStyle: {
      borderRadius: "md",
      fontWeight: 600,
      transition: "transform var(--t-fast, 140ms), box-shadow var(--t-fast, 140ms)",
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "link",
        outlineOffset: "3px",
      },
    },
    variants: {
      solid: {
        bg: "var(--oklch-accent, var(--chakra-colors-primary-600))",
        color: "white",
        _hover: { bg: "var(--oklch-accent-hover, var(--chakra-colors-primary-700))" },
        _active: { bg: "var(--oklch-accent, var(--chakra-colors-primary-800))" },
      },
      outline: {
        borderColor: "var(--oklch-accent, var(--chakra-colors-primary-600))",
        color: "var(--oklch-accent, var(--chakra-colors-primary-700))",
        _hover: { bg: "primary.50" },
        _active: { bg: "primary.100" },
      },
      ghost: {
        color: "var(--oklch-accent, var(--chakra-colors-primary-700))",
        _hover: { bg: "primary.50" },
        _active: { bg: "primary.100" },
      },
      neon: {
        bgGradient: "linear(to-r, primary.500, primary.700)",
        color: "white",
        _dark: { bgGradient: "linear(to-r, primary.400, primary.600)" },
        boxShadow: "0 8px 24px rgba(0,102,204,0.25)",
        _hover: {
          transform: "translateY(-1px) scale(1.02)",
          boxShadow: "0 10px 28px rgba(0,102,204,0.35)",
        },
        _active: { transform: "translateY(0) scale(0.99)" },
      },
    },
  },
  Link: {
    baseStyle: {
      color: "link",
      textDecoration: "underline",
      textUnderlineOffset: "0.12em",
      textDecorationThickness: "0.08em",
      transition: "color 120ms ease-out, text-underline-offset 120ms ease-out",
      _hover: {
        textDecoration: "underline",
        textUnderlineOffset: "0.3em",
        opacity: 0.95,
      },
      _focusVisible: {
        outline: "2px solid currentColor",
        outlineOffset: "3px",
      },
      _dark: { textShadow: "0 0 0.35em rgba(0, 102, 204, 0.35)" },
    },
  },
  IconButton: {
    baseStyle: {
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "link",
        outlineOffset: "3px",
      },
    },
  },
  Card: {
    baseStyle: {
      _focusWithin: {
        outline: "2px solid",
        outlineColor: "primary.300",
        outlineOffset: "2px",
      },
    },
  },
  Heading: {
    baseStyle: {
      letterSpacing: "tighter",
    },
    sizes: {
      xl: { fontSize: "xl", lineHeight: "short" },
      "2xl": { fontSize: "2xl", lineHeight: "short" },
      "3xl": { fontSize: "3xl", lineHeight: "short" },
      "4xl": { fontSize: "4xl", lineHeight: "short" },
    },
  },
  Text: {
    baseStyle: { lineHeight: "base" },
  },
  Tag: {
    baseStyle: {
      container: { borderRadius: "full" },
    },
  },
  Code: {
    baseStyle: {
      px: 1,
      py: 0.5,
      borderRadius: "sm",
      bg: { base: "neutral.800", _light: "neutral.100" },
      color: { base: "white", _light: "neutral.800" },
    },
  },
  Container: {
    sizes: {
      prose: { maxW: "72ch" },
    },
  },
};

const styles = {
  global: {
    "html, body": {
      bg: "bg",
      color: "text",
      lineHeight: "base",
      fontSize: "1.15rem",
    },
    "::selection": {
      background: "primary.200",
    },
    ":root": {
      // Motion tokens
      "--t-fast": ".14s",
      "--t-med": ".22s",
      "--easing": "cubic-bezier(.2,.8,.2,1)",

      // OKLCH color variables (light defaults)
      "--oklch-bg": "oklch(0.98 0.005 260)",
      "--oklch-surface": "oklch(0.96 0.006 260)",
      "--oklch-text": "oklch(0.16 0.03 260)",
      "--oklch-muted": "oklch(0.55 0.02 260)",
      "--oklch-accent": "oklch(0.68 0.17 286)",
      "--oklch-accent-hover": "oklch(0.64 0.19 286)",
      "--oklch-border": "oklch(0.86 0.01 260)",
    } as any,
    'html[data-theme="dark"]': {
      "--oklch-bg": "oklch(0.16 0.02 260)",
      "--oklch-surface": "oklch(0.20 0.02 260)",
      "--oklch-text": "oklch(0.95 0.02 260)",
      "--oklch-muted": "oklch(0.72 0.02 260)",
      "--oklch-accent": "oklch(0.68 0.17 286)",
      "--oklch-accent-hover": "oklch(0.64 0.19 286)",
      "--oklch-border": "oklch(0.30 0.01 260)",
    } as any,
    ".prose": {
      maxWidth: "72ch",
    },

    "h1, h2": {
      transition: "font-variation-settings var(--t-fast, 140ms) var(--easing, ease)",
    },
    "h1:hover, h2:hover": {
      fontVariationSettings: "'wght' 750",
    },
  },
};

export const theme = extendTheme({
  config,
  fonts,
  fontSizes,
  lineHeights,
  letterSpacings,
  colors,
  semanticTokens,
  space,
  radii,
  shadows,
  components,
  styles,
});

export default theme;
