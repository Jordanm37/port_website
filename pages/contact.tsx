import { NextPage } from "next";
import Head from "next/head";
import { MainLayout } from "../components/layout";
import { Container, Heading, Text, Box, Link as ChakraLink } from "@chakra-ui/react";

const ContactPage: NextPage = () => {
  return (
    <MainLayout>
      <Head>
        <title>Contact — Jordan Moshcovitis</title>
        <meta name="description" content="Get in touch with Jordan Moshcovitis." />
      </Head>

      <Container maxW="680px" px={{ base: 4, md: 5 }} py={{ base: 10, md: 14 }}>
        <Heading as="h1" size="3xl" fontFamily="heading" mb={8}>
          Contact
        </Heading>

        <Box maxW="65ch">
          <Box mb={4}>
            <Text fontWeight={500} mb={1}>
              Email
            </Text>
            <ChakraLink href="mailto:jordan.moshcovitis@gmail.com" color="accent">
              jordan.moshcovitis@gmail.com
            </ChakraLink>
          </Box>

          <Box mb={4}>
            <Text fontWeight={500} mb={1}>
              GitHub
            </Text>
            <ChakraLink href="https://github.com/Jordanm37" color="accent" isExternal>
              github.com/Jordanm37
            </ChakraLink>
          </Box>

          <Box mb={4}>
            <Text fontWeight={500} mb={1}>
              LinkedIn
            </Text>
            <ChakraLink
              href="https://www.linkedin.com/in/jordan-moshcovitis"
              color="accent"
              isExternal
            >
              linkedin.com/in/jordan-moshcovitis
            </ChakraLink>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default ContactPage;
