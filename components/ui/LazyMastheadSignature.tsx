import React, { lazy, Suspense } from "react";
import { Box } from "@chakra-ui/react";
import type { MastheadSignatureProps } from "./MastheadSignature";

// Lazy load the MastheadSignature component
const MastheadSignature = lazy(() =>
  import("./MastheadSignature").then((module) => ({ default: module.MastheadSignature }))
);

// Simple loading placeholder that matches the component dimensions
const LoadingPlaceholder: React.FC<{ height: number }> = ({ height }) => (
  <Box
    width="100%"
    height={height}
    bg="muted"
    opacity={0.1}
    borderRadius="sm"
    role="img"
    aria-label="Loading signature..."
  />
);

export const LazyMastheadSignature: React.FC<MastheadSignatureProps> = (props) => {
  return (
    <Suspense fallback={<LoadingPlaceholder height={props.height || 150} />}>
      <MastheadSignature {...props} />
    </Suspense>
  );
};

export default LazyMastheadSignature;
