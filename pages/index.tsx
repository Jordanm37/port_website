import { Box, HStack, VStack, chakra, Divider, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { ImLinkedin2, ImMail4, ImGithub } from "react-icons/im";
import SocialButton from "../components/SocialButton";
import { MainLayout } from "../components/layout";
import { PageContainer, BrandLink, Hero } from "../components/ui";

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
          title="I’m Jordan Moshcovitis"
          subtitle="Physicist, Mathematician, Researcher, Teacher"
          imageSrc="/images/jordan-profile-pic.jpg"
          imageAlt="Picture of Jordan"
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
