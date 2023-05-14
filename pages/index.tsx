import { Box, HStack, VStack, chakra, Divider, Center } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { default as NextImage } from "next/image";
import { ImLinkedin2, ImMail4, ImGithub } from "react-icons/im";
import SocialButton from "../components/SocialButton";

import ProfileImage from "../public/images/jordan-profile-pic.jpg";

const Image = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    ["width", "height", "layout", "src", "alt"].includes(prop),
});

const Home: NextPage = () => {
  return (
    <Center height="100vh">
      <Head>
        <title>Jordan Moshcovitis</title>
        <meta name="description" content="Personal space on the web." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack>
        <Image
          src={ProfileImage}
          alt="Picture of Jordan"
          width={156}
          height={170}
          placeholder="blur"
        />
        <Box textAlign="center">
          <chakra.h1 fontSize="140%">
            I&apos;m <b>Jordan Moshcovitis</b>
          </chakra.h1>
          <HStack justifyContent="center">
            <VStack>
              <chakra.p color="gray.500">
                Physicist, Mathematician, Researcher, Teacher
              </chakra.p>
              <chakra.p color="gray.500">
                Optical Nanoscale-Metasurfaces, Finanical Mathematics, Solidity,
                Chatbots
              </chakra.p>
            </VStack>
          </HStack>
          <chakra.a
            href="\Jordan_M_Resume_2023.pdf"
            target="_blank"
            rel="noopener noreferrer"
            textDecoration="underline"
            color="blue.500"
          >
            View my CV
          </chakra.a>
        </Box>
        <Divider paddingTop={3} width="150%" />
        <HStack paddingTop={4}>
          <SocialButton
            url="mailto:jordan.moshcovitis@gmail.com"
            ariaLabel="Email"
            icon={<ImMail4 />}
          />
          <SocialButton
            url="https://www.linkedin.com/in/jordan-moshcovitis/"
            ariaLabel="LinkedIn"
            icon={<ImLinkedin2 />}
          />
          <SocialButton
            url="https://github.com/JordanMoshcovitis/"
            ariaLabel="Github"
            icon={<ImGithub />}
          />
        </HStack>
      </VStack>
    </Center>
  );
};

export default Home;
