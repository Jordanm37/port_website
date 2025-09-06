import React, { lazy, Suspense } from "react";
import { Box, Spinner, Center } from "@chakra-ui/react";
import type { FanChartProps } from "./FanChart";

// Lazy load mathematical components that use heavy libraries
const FanChart = lazy(() => import("./FanChart").then((module) => ({ default: module.FanChart })));

// Loading placeholder for mathematical components
const MathLoadingPlaceholder: React.FC = () => (
  <Center py={4}>
    <Spinner size="sm" color="link" />
  </Center>
);

export const LazyFanChart: React.FC<FanChartProps> = (props) => {
  return (
    <Suspense fallback={<MathLoadingPlaceholder />}>
      <FanChart {...props} />
    </Suspense>
  );
};

export { LazyFanChart as FanChart };
