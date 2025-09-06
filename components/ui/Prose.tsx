import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { useRouter } from "next/router";

export interface ProseProps extends BoxProps {}

export const Prose: React.FC<ProseProps> = ({ children, ...props }) => {
  const router = useRouter();
  return (
    <Box
      sx={{
        "h1, h2, h3, h4": { scrollMarginTop: "80px" },
        // Title + lead stack: tighter gap under h1 and lead paragraph
        h1: { marginTop: 7, marginBottom: 2 },
        "h1 + p": { marginTop: 2, marginBottom: 4, lineHeight: 1.6 },
        h2: { marginTop: 7, marginBottom: 3, position: "relative" },
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
