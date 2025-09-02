import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/prism.css";
import Head from "next/head";
import { MDXProvider } from "@mdx-js/react";
import { chakra } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <title>Jordan Moshcovitis</title>
        <meta name="description" content="Personal space on the web." />
        <meta property="og:title" content="Jordan Moshcovitis" />
        <meta property="og:description" content="Personal space on the web." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Jordan Moshcovitis" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jordan Moshcovitis" />
        <meta name="twitter:description" content="Personal space on the web." />
      </Head>
      <MDXProvider
        components={{
          h1: (p: any) => <chakra.h1 fontSize="2xl" fontWeight="bold" my={4} {...p} />,
          h2: (p: any) => <chakra.h2 fontSize="xl" fontWeight="semibold" my={4} {...p} />,
          h3: (p: any) => <chakra.h3 fontSize="lg" fontWeight="semibold" my={3} {...p} />,
          p: (p: any) => <chakra.p my={3} lineHeight={1.8} {...p} />,
          ul: (p: any) => <chakra.ul pl={6} my={3} listStyleType="disc" {...p} />,
          ol: (p: any) => <chakra.ol pl={6} my={3} listStyleType="decimal" {...p} />,
          li: (p: any) => <chakra.li my={1} {...p} />,
          a: (p: any) => <chakra.a color="blue.500" textDecoration="underline" {...p} />,
          code: (p: any) => <chakra.code px={1} py={0.5} bg="gray.700" color="white" borderRadius={4} {...p} />,
          pre: (p: any) => <chakra.pre my={4} className="line-numbers" {...p} />,
          img: (p: any) => <chakra.img maxW="100%" borderRadius={6} my={2} {...p} />,
        }}
      >
        <Component {...pageProps} />
      </MDXProvider>
    </ChakraProvider>
  );
}

export default MyApp;
