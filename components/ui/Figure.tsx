import React from "react";
import { Box, Text } from "@chakra-ui/react";
import MdxImage from "./MdxImage";

export interface FigureProps {
  src: string;
  alt?: string;
  caption?: string;
}

export const Figure: React.FC<FigureProps> = ({ src, alt = "", caption }) => {
  return (
    <Box as="figure" my={4}>
      <MdxImage src={src} alt={alt} />
      {caption ? (
        <Text as="figcaption" mt={2} color="muted" fontSize="sm">
          {caption}
        </Text>
      ) : null}
    </Box>
  );
};

export default Figure;
