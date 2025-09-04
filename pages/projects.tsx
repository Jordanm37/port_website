import { NextPage } from "next";
import Head from "next/head";
import { MainLayout } from "../components/layout";
import { PageContainer, Prose, Card } from "../components/ui";
import { Heading, Text, SimpleGrid, HStack, Tag, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

const ProjectsLogPage: NextPage = () => {
  return (
    <MainLayout>
      <Head>
        <title>Projects</title>
      </Head>
      <PageContainer>
        <Heading as="h1" size="2xl">
          Projects log
        </Heading>
        <Prose mt={2}>
          <Text color="muted">Research‑style outputs grouped by organisation and period.</Text>
        </Prose>
        <SimpleGrid mt={6} columns={{ base: 1, md: 2 }} spacing={6}>
          <Card>
            <Heading as="h3" size="md">
              Independent – 2024–2025
            </Heading>
            <Text color="muted" mt={1}>
              AI researcher‑engineer
            </Text>
            <HStack mt={3} spacing={2}>
              <Tag size="sm">retrieval</Tag>
              <Tag size="sm">agents</Tag>
              <Tag size="sm">evaluation</Tag>
            </HStack>
            <Prose mt={3}>
              <ul>
                <li>
                  Answerability‑first retrieval –
                  <ChakraLink as={NextLink} href="/writing/second-post">
                    essay
                  </ChakraLink>
                </li>
                <li>
                  Prompt audit harness –{" "}
                  <ChakraLink as={NextLink} href="/notes/budding">
                    note
                  </ChakraLink>
                </li>
                <li>
                  Vector cache eviction sketch –{" "}
                  <ChakraLink as={NextLink} href="/notes/seedling">
                    note
                  </ChakraLink>
                </li>
              </ul>
            </Prose>
          </Card>
        </SimpleGrid>
      </PageContainer>
    </MainLayout>
  );
};

export default ProjectsLogPage;
