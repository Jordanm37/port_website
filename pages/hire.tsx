import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Box, Heading, Text, Button, List, ListItem } from "@chakra-ui/react";
import { MainLayout } from "../components/layout";
import { PageContainer, Prose } from "../components/ui";

const Hire: NextPage = () => {
  return (
    <MainLayout>
      <Head>
        <title>Hire me — Jordan Moshcovitis</title>
      </Head>
      <PageContainer>
        <Box>
          <Heading as="h1" size="2xl" mb={2}>
            Hire me
          </Heading>
          <Text color="muted" maxW="65ch">
            I ship pragmatic systems: backend, infrastructure, data tooling, and product glue that
            moves metrics.
          </Text>
        </Box>
        <Prose>
          <Heading as="h2" size="xl">
            What I do
          </Heading>
          <List spacing={2} pl={4} styleType="disc">
            <ListItem>Technical strategy, roadmapping, and hands-on implementation</ListItem>
            <ListItem>API/platform design, performance work, and reliability</ListItem>
            <ListItem>Data/ML evaluation pipelines and experiment tooling</ListItem>
          </List>
          <Heading as="h2" size="xl">
            Availability
          </Heading>
          <Text>Fractional and project-based. Based in NYC, remote-friendly.</Text>
          <Button as="a" href="mailto:jordan.moshcovitis@gmail.com" variant="solid" mt={4}>
            Get in touch
          </Button>
        </Prose>
      </PageContainer>
    </MainLayout>
  );
};

export default Hire;
