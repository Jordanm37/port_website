import type { NextPage } from "next";
import { MainLayout } from "../../components/layout";
import { PageContainer } from "../../components/ui";
import { Heading, Text, VStack, Box, Divider } from "@chakra-ui/react";

const IdeasPage: NextPage = () => {
  return (
    <MainLayout>
      <PageContainer>
        <Heading as="h1" size="2xl" mb={6}>
          Ideas
        </Heading>

        <Text color="muted" fontSize="lg" mb={8}>
          A collection of opinions, thoughts, and ideas that don&apos;t warrant full posts.
        </Text>

        <VStack spacing={6} align="stretch">
          <Box>
            <Heading as="h2" size="lg" mb={3}>
              Recent Ideas
            </Heading>

            <VStack spacing={4} align="stretch">
              <Box p={4} borderWidth="1px" borderColor="border" borderRadius="md">
                <Text fontSize="sm" color="muted" mb={2}>
                  2025-01-15
                </Text>
                <Text>
                  Large language models are fundamentally different from human cognition -
                  they&apos;re pattern recognition engines, not reasoning systems. We should stop
                  anthropomorphizing them.
                </Text>
              </Box>

              <Box p={4} borderWidth="1px" borderColor="border" borderRadius="md">
                <Text fontSize="sm" color="muted" mb={2}>
                  2025-01-12
                </Text>
                <Text>
                  The most valuable skill in ML engineering isn&apos;t deep learning expertise -
                  it&apos;s the ability to debug and optimize existing systems. Most
                  &ldquo;innovation&rdquo; is just better engineering.
                </Text>
              </Box>

              <Box p={4} borderWidth="1px" borderColor="border" borderRadius="md">
                <Text fontSize="sm" color="muted" mb={2}>
                  2025-01-08
                </Text>
                <Text>
                  Bayesian methods are underutilized in industry ML. Most A/B testing could benefit
                  from proper uncertainty quantification instead of p-values.
                </Text>
              </Box>

              <Box p={4} borderWidth="1px" borderColor="border" borderRadius="md">
                <Text fontSize="sm" color="muted" mb={2}>
                  2025-01-05
                </Text>
                <Text>
                  The future of AI safety isn&apos;t about alignment with human values - it&apos;s
                  about robust uncertainty estimation and graceful failure modes.
                </Text>
              </Box>

              <Box p={4} borderWidth="1px" borderColor="border" borderRadius="md">
                <Text fontSize="sm" color="muted" mb={2}>
                  2025-01-01
                </Text>
                <Text>
                  Most &ldquo;AI ethics&rdquo; discussions miss the point. The real issue isn&apos;t
                  bias or fairness - it&apos;s that we don&apos;t understand what these systems are
                  actually doing.
                </Text>
              </Box>
            </VStack>
          </Box>

          <Divider />

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              Idea Categories
            </Heading>
            <Text color="muted">
              Future ideas will be organized by themes like: ML Engineering, Bayesian Methods, AI
              Safety, Research Philosophy, Industry Trends.
            </Text>
          </Box>
        </VStack>
      </PageContainer>
    </MainLayout>
  );
};

export default IdeasPage;
