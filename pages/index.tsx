import { Box, HStack, VStack, chakra, Divider, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { ImLinkedin2, ImMail4, ImGithub } from "react-icons/im";
import SocialButton from "../components/SocialButton";
import { MainLayout } from "../components/layout";
import { PageContainer, BrandLink, Hero, CTAButton } from "../components/ui";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Head>
        <title>Jordan Moshcovitis</title>
        <meta name="description" content="Personal space on the web." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>
        <Hero
          title="I build retrieval‑centric, agentic LLM systems with measurable gains."
          subtitle="AI researcher‑engineer: I create at the edge of agents, structured planning, and retrieval—questioning trends for robustness and legitimacy."
          imageSrc="/images/jordan-profile-pic.jpg"
          imageAlt="Picture of Jordan"
          chips={["+35% accuracy vs baseline", "4× ROI PoC", "Privacy‑aligned deployments"]}
          primaryCtaHref="/JORDAN_MOSHCOVITIS_Resume.pdf"
          primaryCtaLabel="View résumé"
          secondaryCtaHref="mailto:jordan.moshcovitis@gmail.com"
          secondaryCtaLabel="Book a chat"
        />
        <VStack spacing={6} align="center">
          <Box textAlign="center">
            <BrandLink
              href="/JORDAN_MOSHCOVITIS_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              View my CV
            </BrandLink>
            <chakra.span> · </chakra.span>
            <BrandLink href="/blog">Blog</BrandLink>
          </Box>
          <Divider pt={3} w="full" />
          <HStack pt={4}>
            <SocialButton
              url="mailto:jordan.moshcovitis@gmail.com"
              ariaLabel="Email"
              icon={<ImMail4 />}
            />
            <SocialButton
              url="https://www.linkedin.com/in/jordan-m-ab5a4010b/"
              ariaLabel="LinkedIn"
              icon={<ImLinkedin2 />}
            />
            <SocialButton
              url="https://github.com/Jordanm37/"
              ariaLabel="Github"
              icon={<ImGithub />}
            />
          </HStack>
        </VStack>
      </PageContainer>
    </MainLayout>
  );
};

export default Home;
