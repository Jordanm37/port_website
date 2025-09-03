import { NextPage } from "next";
import { MainLayout } from "../components/layout";
import { PageContainer, Prose } from "../components/ui";
import { Heading, Text } from "@chakra-ui/react";

const AboutPage: NextPage = () => {
  return (
    <MainLayout>
      <PageContainer>
        <Heading as="h1" size="2xl">
          About
        </Heading>
        <Prose mt={2}>
          <Text>
            I’m an AI researcher‑engineer focused on retrieval‑centric, agentic LLM systems,
            structured planning, and robust evaluation. I question trends and ship systems with
            measurable gains.
          </Text>
        </Prose>
      </PageContainer>
    </MainLayout>
  );
};

export default AboutPage;
