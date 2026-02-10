import { NextPage } from "next";
import Head from "next/head";
import { MainLayout } from "../components/layout";
import { Container, Heading, Text, Box, Divider, List, ListItem } from "@chakra-ui/react";

const AboutPage: NextPage = () => {
  return (
    <MainLayout>
      <Head>
        <title>About — Jordan Moshcovitis</title>
        <meta
          name="description"
          content="About Jordan Moshcovitis — applied AI researcher and physicist."
        />
      </Head>

      <Container maxW="680px" px={{ base: 4, md: 5 }} py={{ base: 10, md: 14 }}>
        <Heading as="h1" size="3xl" fontFamily="heading" mb={8}>
          About
        </Heading>

        <Box maxW="65ch">
          <Text mb={4}>
            I am an applied AI researcher and engineer with a background in physics. My work sits at
            the intersection of retrieval-augmented generation, agentic LLM systems, and rigorous
            evaluation methodology. I am interested in building systems that are not merely
            performant but genuinely reliable, with measurement frameworks that can distinguish
            signal from noise.
          </Text>

          <Text mb={4}>
            Before moving into AI, I studied physics at the University of Melbourne, where my
            research focused on computational materials science. My master&apos;s work involved
            spectroscopic characterisation and defect modelling in single crystal diamonds,
            combining experimental measurement with computational approaches to understand nitrogen
            defect structures.
          </Text>

          <Text mb={4}>
            The transition from physics to applied AI was a natural one. Both disciplines demand
            careful attention to uncertainty quantification, robust experimental design, and
            scepticism toward results that look too clean. I carry these habits into my current
            work: building retrieval pipelines, designing evaluation harnesses, and developing
            agentic workflows for production systems.
          </Text>

          <Text mb={8}>
            My current focus areas include RAG system architecture and evaluation, dense retrieval
            failure modes, LLM-based planning and tool use, and the broader challenge of making
            AI systems that work reliably at scale. I write about these topics both on this site
            and at Chamomile.ai.
          </Text>

          {/* Minor rule */}
          <Box mx="auto" w="40%" mb={8}>
            <Divider borderColor="border" />
          </Box>

          <Heading
            as="h2"
            fontSize="sm"
            fontWeight={600}
            letterSpacing="widest"
            textTransform="uppercase"
            color="muted"
            mb={4}
          >
            Education
          </Heading>
          <List spacing={2} mb={8} styleType="none" pl={0}>
            <ListItem>
              <Text fontWeight={500}>MSc Physics</Text>
              <Text color="muted" fontSize="sm">
                University of Melbourne
              </Text>
            </ListItem>
            <ListItem>
              <Text fontWeight={500}>BSc (Hons) Physics</Text>
              <Text color="muted" fontSize="sm">
                University of Melbourne
              </Text>
            </ListItem>
            <ListItem>
              <Text fontWeight={500}>Diploma in Mathematical Sciences</Text>
              <Text color="muted" fontSize="sm">
                University of Melbourne
              </Text>
            </ListItem>
          </List>

          <Heading
            as="h2"
            fontSize="sm"
            fontWeight={600}
            letterSpacing="widest"
            textTransform="uppercase"
            color="muted"
            mb={4}
          >
            Research Interests
          </Heading>
          <List spacing={1} mb={4} pl={5}>
            <ListItem>Retrieval-augmented generation and evaluation</ListItem>
            <ListItem>Agentic LLM systems and structured planning</ListItem>
            <ListItem>Dense retrieval failure modes</ListItem>
            <ListItem>Uncertainty quantification in ML systems</ListItem>
            <ListItem>Computational materials science</ListItem>
            <ListItem>Stochastic processes and optimal control</ListItem>
          </List>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default AboutPage;
