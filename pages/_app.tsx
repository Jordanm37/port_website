import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/prism.css";
import Head from "next/head";

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
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
