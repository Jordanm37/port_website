import { NextPage } from "next";
import Head from "next/head";
import { MainLayout } from "../components/layout";
import { PageContainer, Prose } from "../components/ui";
import { Heading, Link as ChakraLink, Text } from "@chakra-ui/react";

const ContactPage: NextPage = () => {
  return (
    <MainLayout>
      <Head>
        <title>Contact</title>
      </Head>
      <PageContainer>
        <Heading as="h1" size="2xl">
          Contact
        </Heading>
        <Prose mt={2}>
          <Text color="muted">Prefer email. I reply within 1–2 business days.</Text>
          <ChakraLink href="mailto:jordan.moshcovitis@gmail.com">
            jordan.moshcovitis@gmail.com
          </ChakraLink>
        </Prose>
      </PageContainer>
    </MainLayout>
  );
};

export default ContactPage;
