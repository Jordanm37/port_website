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
  heading: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  body: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  mono: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
};

const fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
};

const lineHeights = {
  short: 1.2,
  base: 1.5,
  tall: 1.65,
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
    bg: { default: "white", _dark: "neutral.900" },
    text: { default: "neutral.800", _dark: "neutral.100" },
    muted: { default: "neutral.600", _dark: "neutral.400" },
    border: { default: "neutral.200", _dark: "neutral.700" },
    link: { default: "primary.600", _dark: "primary.300" },
  },
};

const space = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
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
    baseStyle: { borderRadius: "md", fontWeight: 600 },
    variants: {
      solid: {
        bg: "primary.600",
        color: "white",
        _hover: { bg: "primary.700" },
        _active: { bg: "primary.800" },
      },
      outline: {
        borderColor: "primary.600",
        color: "primary.700",
        _hover: { bg: "primary.50" },
        _active: { bg: "primary.100" },
      },
      ghost: {
        color: "primary.700",
        _hover: { bg: "primary.50" },
        _active: { bg: "primary.100" },
      },
    },
  },
  Link: {
    baseStyle: {
      color: "link",
      textDecoration: "underline",
      transition: "color 120ms",
      _hover: { textDecoration: "none", opacity: 0.9 },
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "link",
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
    },
    "::selection": {
      background: "primary.200",
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
