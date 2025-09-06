import React from "react";
import { Box, HStack, Tag, Text, Tooltip, VStack } from "@chakra-ui/react";

export interface Assumptions {
  noise?: string;
  priors?: string;
  solver?: string;
  uncertainty?: ("aleatoric" | "epistemic")[];
}

export interface AssumptionInspectorProps {
  assumptions?: Assumptions;
}

const TIPS: Record<string, string> = {
  aleatoric: "Variability from process or data generation",
  epistemic: "Uncertainty from limited knowledge or model form",
};

export const AssumptionInspector: React.FC<AssumptionInspectorProps> = ({ assumptions }) => {
  if (!assumptions) return null;
  const { noise, priors, solver, uncertainty } = assumptions;
  return (
    <Box borderWidth="1px" borderColor="border" borderRadius="md" p={3} bg="readingBg" mt={3}>
      <HStack spacing={2} flexWrap="wrap" align="center">
        {noise ? <Tag size="sm">Noise: {noise}</Tag> : null}
        {priors ? <Tag size="sm">Priors: {priors}</Tag> : null}
        {solver ? <Tag size="sm">Solver: {solver}</Tag> : null}
        {Array.isArray(uncertainty)
          ? uncertainty.map((u) => (
              <Tooltip key={u} label={TIPS[u] || ""} openDelay={200}>
                <Tag size="sm" variant="subtle">
                  {u}
                </Tag>
              </Tooltip>
            ))
          : null}
      </HStack>
    </Box>
  );
};

export default AssumptionInspector;
