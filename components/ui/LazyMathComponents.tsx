import React, { lazy, Suspense } from "react";
import { Box, Spinner, Center } from "@chakra-ui/react";
import type { AssumptionInspectorProps } from "./AssumptionInspector";
import type { FanChartProps } from "./FanChart";

// Lazy load mathematical components that use heavy libraries
const AssumptionInspector = lazy(() => 
  import("./AssumptionInspector").then(module => ({ default: module.AssumptionInspector }))
);

const FanChart = lazy(() => 
  import("./FanChart").then(module => ({ default: module.FanChart }))
);

// Loading placeholder for mathematical components
const MathLoadingPlaceholder: React.FC = () => (
  <Center py={4}>
    <Spinner size="sm" color="link" />
  </Center>
);

export const LazyAssumptionInspector: React.FC<AssumptionInspectorProps> = (props) => {
  return (
    <Suspense fallback={<MathLoadingPlaceholder />}>
      <AssumptionInspector {...props} />
    </Suspense>
  );
};

export const LazyFanChart: React.FC<FanChartProps> = (props) => {
  return (
    <Suspense fallback={<MathLoadingPlaceholder />}>
      <FanChart {...props} />
    </Suspense>
  );
};

export { LazyAssumptionInspector as AssumptionInspector, LazyFanChart as FanChart };