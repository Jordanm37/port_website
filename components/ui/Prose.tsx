import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

export interface ProseProps extends BoxProps {}

export const Prose: React.FC<ProseProps> = ({ children, ...props }) => {
  return (
    <Box
      sx={{
        "h1, h2, h3, h4": { scrollMarginTop: "80px" },
        h2: { marginTop: 7, marginBottom: 3 },
        h3: { marginTop: 6, marginBottom: 2 },
        p: { lineHeight: 1.7, fontSize: "md" },
        "p + p": { mt: 3 },
        ul: { pl: 6 },
        ol: { pl: 6 },
        img: { borderRadius: "md" },
        figure: { maxWidth: "100%" },
        "figure.full-bleed": { marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" },
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Prose;
