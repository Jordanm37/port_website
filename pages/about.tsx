import { NextPage } from "next";
import { MainLayout } from "../components/layout";
import { PageContainer, Prose, Hero, Reveal } from "../components/ui";
import { Heading, Text, VStack, HStack, Divider } from "@chakra-ui/react";
import { ImLinkedin2, ImMail4, ImGithub } from "react-icons/im";
import SocialButton from "../components/SocialButton";
import { bookingUrl } from "../lib/site";

const AboutPage: NextPage = () => {
  return (
    <MainLayout>
      <PageContainer>
        <Reveal>
          <Hero
            title="I build retrieval‑centric, agentic LLM systems with measurable gains."
            subtitle="AI researcher‑engineer: I create at the edge of agents, structured planning, and retrieval—questioning trends for robustness and legitimacy."
            imageSrc="/images/jordan-profile-pic.jpg"
            imageAlt="Picture of Jordan"
            chips={["+35% accuracy vs baseline", "4× ROI PoC", "Privacy‑aligned deployments"]}
            primaryCtaHref={bookingUrl}
            primaryCtaLabel="Book a chat"
            secondaryCtaHref="/projects"
            secondaryCtaLabel="View projects"
          />
        </Reveal>

        <VStack spacing={6} align="center" mt={8}>
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

        <Heading as="h2" size="2xl" mt={16} mb={4}>
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
