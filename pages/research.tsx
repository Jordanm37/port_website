import { NextPage } from "next";
import Head from "next/head";
import { MainLayout } from "../components/layout";
import {
  Container,
  Heading,
  Text,
  Box,
  Divider,
  Link as ChakraLink,
} from "@chakra-ui/react";

const ResearchPage: NextPage = () => {
  return (
    <MainLayout>
      <Head>
        <title>Research — Jordan Moshcovitis</title>
        <meta
          name="description"
          content="Papers, preprints, and technical writing by Jordan Moshcovitis."
        />
      </Head>

      <Container maxW="680px" px={{ base: 4, md: 5 }} py={{ base: 10, md: 14 }}>
        <Heading as="h1" size="3xl" fontFamily="heading" mb={2}>
          Research
        </Heading>
        <Text color="secondary" fontStyle="italic" mb={8}>
          Papers, preprints, and technical writing.
        </Text>

        {/* Papers */}
        <Heading
          as="h2"
          fontSize="sm"
          fontWeight={600}
          letterSpacing="widest"
          textTransform="uppercase"
          color="muted"
          mb={4}
        >
          Papers
        </Heading>
        <Box mb={8}>
          <Box mb={5} pb={5} borderBottomWidth="1px" borderColor="border">
            <Text fontWeight={500} mb={1}>
              Estimation of Nitrogen Concentrations and Related Defects in Single Crystal
              Diamonds from FTIR and UV-Vis Spectroscopy
            </Text>
            <Text color="muted" fontSize="sm" mb={1}>
              K. Upadhyay, A. Dasadia, J. Moshcovitis
            </Text>
            <Text color="muted" fontSize="sm">
              <Text as="span" fontStyle="italic">
                Journal of Superhard Materials
              </Text>
              , 2025 &mdash;{" "}
              <ChakraLink
                href="https://link.springer.com/article/10.3103/S1063457625020108"
                color="accent"
                isExternal
              >
                DOI
              </ChakraLink>
            </Text>
          </Box>
        </Box>

        {/* Technical Writing */}
        <Heading
          as="h2"
          fontSize="sm"
          fontWeight={600}
          letterSpacing="widest"
          textTransform="uppercase"
          color="muted"
          mb={4}
        >
          Technical Writing
        </Heading>
        <Box mb={8}>
          <Box mb={4} pb={4} borderBottomWidth="1px" borderColor="border">
            <ChakraLink
              href="https://chamomile.ai/rag-by-a-thousand-metrics/"
              color="accent"
              fontWeight={500}
              isExternal
            >
              RAG by a Thousand Metrics
            </ChakraLink>
            <Text color="muted" fontSize="sm">
              Chamomile.ai, August 2025
            </Text>
          </Box>

          <Box mb={4} pb={4} borderBottomWidth="1px" borderColor="border">
            <ChakraLink
              href="https://chamomile.ai/challenges-dense-retrieval/"
              color="accent"
              fontWeight={500}
              isExternal
            >
              The Dense Fog of RAG: Navigating Dense Retrieval&apos;s Blind Spots
            </ChakraLink>
            <Text color="muted" fontSize="sm">
              with T. Ramdas &mdash; Chamomile.ai, December 2024
            </Text>
          </Box>

          <Box mb={4} pb={4} borderBottomWidth="1px" borderColor="border">
            <ChakraLink
              href="https://chamomile.ai/rag-pain-points/"
              color="accent"
              fontWeight={500}
              isExternal
            >
              Effective RAG Evaluation: Integrated Metrics Are All You Need
            </ChakraLink>
            <Text color="muted" fontSize="sm">
              with T. Ramdas &mdash; Chamomile.ai, December 2024
            </Text>
          </Box>

          <Box mb={4} pb={4} borderBottomWidth="1px" borderColor="border">
            <ChakraLink
              href="https://chamomile.ai/reliable-rag-with-data-preprocessing/"
              color="accent"
              fontWeight={500}
              isExternal
            >
              Reliable RAG: Preprocessing Is All You Need
            </ChakraLink>
            <Text color="muted" fontSize="sm">
              with T. Ramdas &mdash; Chamomile.ai, February 2024
            </Text>
          </Box>
        </Box>

        {/* Talks */}
        <Heading
          as="h2"
          fontSize="sm"
          fontWeight={600}
          letterSpacing="widest"
          textTransform="uppercase"
          color="muted"
          mb={4}
        >
          Talks
        </Heading>
        <Box mb={4}>
          <Box pb={4} borderBottomWidth="1px" borderColor="border">
            <Text fontWeight={500} mb={1}>
              Optimising Data for LLMs: Strategies for Effective RAG
            </Text>
            <Text color="muted" fontSize="sm">
              Gen AI Meetup #3, Melbourne &mdash; May 2024
            </Text>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default ResearchPage;
