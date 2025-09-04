import type { AppProps } from "next/app";
import { ChakraProvider, ColorModeScript, chakra } from "@chakra-ui/react";
import "../styles/prism.css";
import "katex/dist/katex.min.css";
import Head from "next/head";
import { MDXProvider } from "@mdx-js/react";
import { MdxImage } from "../components/ui";
import { Sidenote } from "../components/ui/Sidenote";
import CodeBlock from "../components/ui/CodeBlock";
import { Inter, JetBrains_Mono } from "next/font/google";
import theme from "../styles/theme";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const jbmono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-jbmono" });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
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
          h1: (p: any) => <chakra.h1 fontSize="4xl" fontWeight="bold" my={4} {...p} />,
          h2: (p: any) => <chakra.h2 fontSize="3xl" fontWeight="semibold" my={4} {...p} />,
          h3: (p: any) => <chakra.h3 fontSize="2xl" fontWeight="semibold" my={3} {...p} />,
          p: (p: any) => <chakra.p my={3} lineHeight={1.65} {...p} />,
          ul: (p: any) => <chakra.ul pl={6} my={3} listStyleType="disc" {...p} />,
          ol: (p: any) => <chakra.ol pl={6} my={3} listStyleType="decimal" {...p} />,
          li: (p: any) => <chakra.li my={1} {...p} />,
          a: (p: any) => <chakra.a color="link" textDecoration="underline" {...p} />,
          code: (p: any) => <chakra.code {...p} />,
          pre: (p: any) => <CodeBlock {...p} />,
          img: (p: any) => <MdxImage {...p} />,
          Sidenote: (p: any) => <Sidenote {...p} />,
        }}
      >
        <chakra.div className={`${inter.variable} ${jbmono.variable}`}>
          <Component {...pageProps} />
        </chakra.div>
      </MDXProvider>
    </ChakraProvider>
  );
}

export default MyApp;
