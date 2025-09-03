import { NextPage } from "next";
import { MainLayout } from "../components/layout";
import { PageContainer, Prose } from "../components/ui";
import { Heading, Text, List, ListItem } from "@chakra-ui/react";

const TalksPage: NextPage = () => {
  return (
    <MainLayout>
      <PageContainer>
        <Heading as="h1" size="2xl">
          Talks
        </Heading>
        <Prose mt={2}>
          <Text color="muted">Selected talks and seminars.</Text>
          <List mt={4} spacing={2}>
            <ListItem>Agentic RAG: Planning, Memory, and Evaluation — 2025</ListItem>
            <ListItem>Trajectory-aware Offline/Online Evaluation for LLM Features — 2025</ListItem>
          </List>
        </Prose>
      </PageContainer>
    </MainLayout>
  );
};

export default TalksPage;
