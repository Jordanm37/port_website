import { NextPage } from "next";
import Head from "next/head";
import { MainLayout } from "../components/layout";
import { PageContainer, CTAButton, Prose } from "../components/ui";
import { Heading, Text, HStack, Tag, chakra, Link as ChakraLink } from "@chakra-ui/react";
import { consultingUrl } from "../lib/site";

const ServicesPage: NextPage = () => {
  return (
    <MainLayout>
      <Head>
        <title>Services</title>
      </Head>
      <PageContainer>
        <Heading as="h1" size="2xl">
          Services
        </Heading>
        <Text color="muted" mt={2}>
          I help teams ship retrieval‑centric, agentic LLM systems with measurable gains.
        </Text>

        <Prose mt={6}>
          <Heading as="h2" size="xl">
            What I do
          </Heading>
          <ul>
            <li>Design retrieval stacks that prefer answerability over recall.</li>
            <li>Plan agent workflows with verifiable subgoals and tool use.</li>
            <li>Build evaluation harnesses (offline/online) that resist overfitting.</li>
          </ul>

          <Heading as="h2" size="xl">
            Who this is for
          </Heading>
          <p>Teams who need proof beyond demos: benchmarks, ablations, decision cost curves.</p>
          <HStack spacing={2} mt={2} flexWrap="wrap">
            <Tag size="sm">retrieval</Tag>
            <Tag size="sm">agents</Tag>
            <Tag size="sm">evaluation</Tag>
            <Tag size="sm">safety</Tag>
          </HStack>

          <Heading as="h2" size="xl">
            Engagements
          </Heading>
          <ul>
            <li>
              <strong>Project</strong>: scoped build with metrics and a handover doc.
            </li>
            <li>
              <strong>Advisory</strong>: weekly cadence; design reviews and model/prompt audits.
            </li>
            <li>
              <strong>Workshop</strong>: focused sessions on evaluation, retrieval, or agent design.
            </li>
          </ul>
        </Prose>

        <HStack mt={6} spacing={4} align="center">
          <CTAButton asLinkHref={consultingUrl}>Work with me</CTAButton>
          <chakra.span>or</chakra.span>
          <ChakraLink href="mailto:jordan.moshcovitis@gmail.com" textDecoration="underline">
            Email me
          </ChakraLink>
        </HStack>
      </PageContainer>
    </MainLayout>
  );
};

export default ServicesPage;
