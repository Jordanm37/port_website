import { NextPage } from "next";
import { MainLayout } from "../components/layout";
import { PageContainer, ProjectListRow } from "../components/ui";
import { Heading, Text, VStack, Box } from "@chakra-ui/react";

const ProjectsPage: NextPage = () => {
  return (
    <MainLayout>
      <PageContainer>
        <Heading as="h1" size="xl">
          Projects
        </Heading>
        <Text color="muted" mt={2}>
          Selected work grouped by organisation/theme.
        </Text>

        <VStack spacing={5} mt={5} align="stretch">
          <Box>
            <Heading as="h2" size="md" mb={2} color="muted">
              Client A
            </Heading>
            <VStack spacing={2} align="stretch">
              <ProjectListRow
                item={{
                  org: "Client A",
                  name: "Agentic RAG evaluation and rollout",
                  role: "Lead AI Engineer",
                  period: "2025",
                  scope:
                    "Designed and shipped retrieval-centric agentic workflows with measurement harness and regression gates.",
                  techniques: ["RAG", "Planning", "Cold-start eval"],
                  artefacts: [{ kind: "Talk", href: "/talks" }],
                  relatedWriting: [{ title: "Agentic RAG notes", href: "/blog/hello-world" }],
                }}
              />
            </VStack>
          </Box>

          <Box>
            <Heading as="h2" size="md" mb={2} color="muted">
              Research
            </Heading>
            <VStack spacing={2} align="stretch">
              <ProjectListRow
                item={{
                  org: "Research",
                  name: "OU control with budgeted uncertainty",
                  role: "Author",
                  period: "2025",
                  scope: "Optimal control under OU noise with calibrated intervals and fan charts.",
                  techniques: ["SDE", "Calibration", "Control"],
                  artefacts: [
                    { kind: "Code", href: "https://github.com/" },
                    { kind: "Paper", href: "https://example.com/paper.pdf" },
                  ],
                }}
              />
            </VStack>
          </Box>
        </VStack>
        <Box mt={10}>
          <Heading as="h2" size="md" mb={2} color="muted" id="talks">
            Talks
          </Heading>
          <VStack spacing={2} align="stretch">
            <Box borderBottomWidth="1px" borderColor="border" py={3}>
              <Text fontWeight={600}>Measuring agentic RAG in production</Text>
              <Text color="muted" fontSize="sm">
                NYC ML Meetup · 2025
              </Text>
              <Text fontSize="sm" mt={1}>
                <a href="/talks" target="_blank" rel="noopener noreferrer">
                  Slides
                </a>
              </Text>
            </Box>
            <Box borderBottomWidth="1px" borderColor="border" py={3}>
              <Text fontWeight={600}>Pragmatic evals for LLM systems</Text>
              <Text color="muted" fontSize="sm">
                Internal Tech Talk · 2024
              </Text>
              <Text fontSize="sm" mt={1}>
                <a href="/talks" target="_blank" rel="noopener noreferrer">
                  Slides
                </a>
              </Text>
            </Box>
          </VStack>
        </Box>
      </PageContainer>
    </MainLayout>
  );
};

export default ProjectsPage;
