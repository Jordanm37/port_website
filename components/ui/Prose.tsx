import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

export interface ProseProps extends BoxProps {}

export const Prose: React.FC<ProseProps> = ({ children, ...props }) => {
  return (
    <Box
      sx={{
        "h1, h2, h3, h4": { scrollMarginTop: "80px" },
        h2: { marginTop: 8, marginBottom: 3 },
        h3: { marginTop: 6, marginBottom: 2 },
        p: { lineHeight: 1.7 },
        "p + p": { mt: 3 },
        ul: { pl: 6 },
        ol: { pl: 6 },
        img: { borderRadius: "md" },
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Prose;
