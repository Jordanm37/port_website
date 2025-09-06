import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Box, Heading, Text } from "@chakra-ui/react";
import { MainLayout } from "../components/layout";
import { PageContainer, Prose } from "../components/ui";

const Ideas: NextPage = () => {
  return (
    <MainLayout>
      <Head>
        <title>Ideas — Jordan Moshcovitis</title>
      </Head>
      <PageContainer>
        <Box>
          <Heading as="h1" size="2xl" mb={2}>
            Ideas
          </Heading>
          <Text color="muted" maxW="65ch">
            Short notes and rough thoughts. Expect unfinished, useful, and sometimes wrong.
          </Text>
        </Box>
        <Prose>
          <Text>Coming soon.</Text>
        </Prose>
      </PageContainer>
    </MainLayout>
  );
};

export default Ideas;
