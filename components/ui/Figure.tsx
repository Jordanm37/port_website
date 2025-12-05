import React from "react";
import { Box, Text } from "@chakra-ui/react";
import MdxImage from "./MdxImage";
import { useFigureNumbering } from "./FigureNumberProvider";

export interface FigureProps {
  src: string;
  alt?: string;
  caption?: string;
  fullBleed?: boolean;
  numbered?: boolean;
}

const FigureNumberContext = React.createContext<{ index: number; inc: () => number } | null>(null);

export const FigureNumberProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = React.useRef(0);
  const value = React.useMemo(
    () => ({ index: ref.current, inc: () => (ref.current = ref.current + 1) }),
    []
  );
  return <FigureNumberContext.Provider value={value}>{children}</FigureNumberContext.Provider>;
};

export const Figure: React.FC<FigureProps> = ({
  src,
  alt = "",
  caption,
  fullBleed = false,
  numbered,
}) => {
  const ctx = useFigureNumbering();
  const [num, setNum] = React.useState<number | null>(null);
  React.useEffect(() => {
    if (!numbered || !ctx) return;
    const n = ctx.inc();
    setNum(n);
  }, [ctx, numbered]);

  const captionText = caption
    ? numbered && num !== null
      ? `Figure ${num + 1}: ${caption}`
      : caption
    : undefined;

  return (
    <Box as="figure" my={4} mx={fullBleed ? "calc(50% - 50vw)" : undefined}>
      <MdxImage src={src} alt={alt} />
      {captionText ? (
        <Text as="figcaption" mt={2} color="muted" fontSize="sm">
          {captionText}
        </Text>
      ) : null}
    </Box>
  );
};

export default Figure;
