import { NextPage } from "next";
import { MainLayout } from "../components/layout";
import { PageContainer, Prose, ProjectCard } from "../components/ui";
import { Heading, Text, VStack, Box } from "@chakra-ui/react";

const ProjectsPage: NextPage = () => {
  return (
    <MainLayout>
      <PageContainer>
        <Heading as="h1" size="2xl">
          Projects
        </Heading>
        <Prose mt={2}>
          <Text color="muted">Selected work grouped by organisation/theme.</Text>
        </Prose>

        <VStack spacing={6} mt={6} align="stretch">
          <Box>
            <Heading as="h2" size="lg" mb={2}>
              Client A
            </Heading>
            <VStack spacing={3} align="stretch">
              <ProjectCard
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
            <Heading as="h2" size="lg" mb={2}>
              Research
            </Heading>
            <VStack spacing={3} align="stretch">
              <ProjectCard
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
      </PageContainer>
    </MainLayout>
  );
};

export default ProjectsPage;
