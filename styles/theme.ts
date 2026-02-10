import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// Classical design system — gwern.net-inspired
// Typography: EB Garamond (headings), Source Serif 4 (body), IBM Plex Mono (code)
// Scale: Perfect Fourth (1.333), base 1.125rem (18px)
// Line height: 1.618 (golden ratio) for body text

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

const fonts = {
  heading:
    "var(--font-garamond), 'EB Garamond', 'Garamond', 'Georgia', 'Times New Roman', serif",
  body: "var(--font-sourceserif), 'Source Serif 4', 'Source Serif Pro', 'Georgia', 'Times New Roman', serif",
  mono: "var(--font-ibmplex), 'IBM Plex Mono', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', monospace",
};

// Perfect Fourth scale (1.333 ratio), base 1.125rem
const fontSizes = {
  xs: "0.75rem",
  sm: "0.844rem",
  md: "1.125rem",
  lg: "1.25rem",
  xl: "1.5rem", // h3
  "2xl": "2rem", // h2
  "3xl": "2.665rem", // h1
  "4xl": "3.553rem",
};

const lineHeights = {
  short: 1.2,
  base: 1.618, // golden ratio
  tall: 1.75,
};

const letterSpacings = {
  tighter: "-0.01em",
  normal: "0",
  wider: "0.02em",
  widest: "0.08em",
};

const colors = {
  // Light theme: "The Study"
  paper: {
    50: "#faf8f5",
    100: "#f5f2ed",
    200: "#e8dfd0",
    300: "#d4cfc7",
    400: "#8a8578",
    500: "#4a4a4a",
    600: "#1a1a1a",
    700: "#6b3d3d",
    800: "#522a2a",
    900: "#1a1a1a",
  },
  // Dark theme: "The Blackboard"
  slate: {
    50: "#e8e4dc",
    100: "#9a9690",
    200: "#3a3d3a",
    300: "#2a2d2a",
    400: "#252825",
    500: "#1c1f1c",
    600: "#c4a882",
    700: "#d4b892",
    800: "#1c1f1c",
    900: "#161816",
  },
};

const semanticTokens = {
  colors: {
    bg: { default: "#faf8f5", _dark: "#1c1f1c" },
    surface: { default: "#f5f2ed", _dark: "#252825" },
    text: { default: "#1a1a1a", _dark: "#e8e4dc" },
    muted: { default: "#8a8578", _dark: "#9a9690" },
    secondary: { default: "#4a4a4a", _dark: "#c4c0b8" },
    accent: { default: "#6b3d3d", _dark: "#c4a882" },
    accentHover: { default: "#522a2a", _dark: "#d4b892" },
    border: { default: "#d4cfc7", _dark: "#3a3d3a" },
    codeBg: { default: "#f5f2ed", _dark: "#2a2d2a" },
    selection: { default: "#e8dfd0", _dark: "rgba(196, 168, 130, 0.3)" },
    // Keep 'link' as alias for accent for backward compat
    link: { default: "#6b3d3d", _dark: "#c4a882" },
    readingBg: { default: "#faf8f5", _dark: "#1c1f1c" },
    chromeBg: { default: "#faf8f5", _dark: "#1c1f1c" },
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
  sm: "2px",
  md: "4px",
  lg: "6px",
  full: "9999px",
};

const shadows = {
  sm: "none",
  md: "none",
};

const components = {
  Button: {
    baseStyle: {
      borderRadius: "sm",
      fontWeight: 500,
      fontFamily: "body",
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "accent",
        outlineOffset: "3px",
      },
    },
    variants: {
      solid: {
        bg: "accent",
        color: "white",
        _hover: { bg: "accentHover" },
        _active: { bg: "accentHover" },
      },
      outline: {
        borderColor: "accent",
        color: "accent",
        _hover: { bg: "surface" },
        _active: { bg: "surface" },
      },
      ghost: {
        color: "accent",
        _hover: { bg: "surface" },
        _active: { bg: "surface" },
      },
    },
  },
  Link: {
    baseStyle: {
      color: "accent",
      textDecoration: "underline",
      textUnderlineOffset: "0.15em",
      textDecorationThickness: "0.06em",
      textDecorationColor: "accent",
      transition: "color 120ms ease-out",
      _hover: {
        color: "accentHover",
        textDecoration: "underline",
      },
      _focusVisible: {
        outline: "2px solid currentColor",
        outlineOffset: "3px",
      },
    },
  },
  IconButton: {
    baseStyle: {
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "accent",
        outlineOffset: "3px",
      },
    },
  },
  Heading: {
    baseStyle: {
      fontFamily: "heading",
      letterSpacing: "tighter",
      color: "text",
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
      container: { borderRadius: "sm" },
    },
  },
  Code: {
    baseStyle: {
      px: 1,
      py: 0.5,
      borderRadius: "sm",
      bg: "codeBg",
      color: "text",
      fontFamily: "mono",
      fontSize: "0.9em",
    },
  },
  Container: {
    sizes: {
      prose: { maxW: "65ch" },
    },
  },
  Divider: {
    baseStyle: {
      borderColor: "border",
    },
  },
};

const styles = {
  global: {
    "html, body": {
      bg: "bg",
      color: "text",
      lineHeight: "base",
      fontSize: "1.125rem",
      fontFamily:
        "var(--font-sourceserif), 'Source Serif 4', 'Georgia', 'Times New Roman', serif",
    },
    "::selection": {
      background: "selection",
    },
    ".prose": {
      maxWidth: "65ch",
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
