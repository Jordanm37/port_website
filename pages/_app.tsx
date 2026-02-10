import type { AppProps } from "next/app";
import { ChakraProvider, ColorModeScript, chakra } from "@chakra-ui/react";
import "katex/dist/katex.min.css";
import "../styles/print.css";
import Head from "next/head";
import { MDXProvider } from "@mdx-js/react";
import CodeBlock from "../components/ui/CodeBlock";
import { MdxImage } from "../components/ui";
import FootnoteRef from "../components/ui/FootnoteRef";
import { Source_Serif_4, IBM_Plex_Mono, EB_Garamond } from "next/font/google";
import theme from "../styles/theme";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sourceserif",
});
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibmplex",
  weight: ["400", "500", "600"],
});
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-garamond",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Head>
        <title>Jordan Moshcovitis</title>
        <meta
          name="description"
          content="Jordan Moshcovitis — applied AI researcher and physicist."
        />
        <meta property="og:title" content="Jordan Moshcovitis" />
        <meta
          property="og:description"
          content="Jordan Moshcovitis — applied AI researcher and physicist."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Jordan Moshcovitis" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Jordan Moshcovitis" />
        <meta
          name="twitter:description"
          content="Jordan Moshcovitis — applied AI researcher and physicist."
        />
      </Head>
      <MDXProvider
        components={{
          h1: (p: any) => (
            <chakra.h1
              fontSize="3xl"
              fontWeight="bold"
              my={4}
              sx={{ fontFamily: "var(--font-garamond), var(--chakra-fonts-heading)" }}
              {...p}
            />
          ),
          h2: (p: any) => (
            <chakra.h2
              fontSize="2xl"
              fontWeight="semibold"
              my={4}
              sx={{ fontFamily: "var(--font-garamond), var(--chakra-fonts-heading)" }}
              {...p}
            />
          ),
          h3: (p: any) => (
            <chakra.h3
              fontSize="xl"
              fontWeight="semibold"
              my={3}
              sx={{ fontFamily: "var(--font-garamond), var(--chakra-fonts-heading)" }}
              {...p}
            />
          ),
          p: (p: any) => <chakra.p my={3} lineHeight={1.618} maxW="65ch" {...p} />,
          ul: (p: any) => <chakra.ul pl={6} my={3} listStyleType="disc" {...p} />,
          ol: (p: any) => <chakra.ol pl={6} my={3} listStyleType="decimal" {...p} />,
          li: (p: any) => <chakra.li my={1} {...p} />,
          a: (p: any) => <chakra.a color="link" textDecoration="underline" {...p} />,
          code: (p: any) => <chakra.code {...p} />,
          pre: (p: any) => <CodeBlock {...p} />,
          img: (p: any) => <MdxImage {...p} />,
          sup: (p: any) => <FootnoteRef {...p} />,
        }}
      >
        <chakra.div
          className={`${sourceSerif.variable} ${ibmPlexMono.variable} ${ebGaramond.variable}`}
        >
          <Component {...pageProps} />
        </chakra.div>
      </MDXProvider>
    </ChakraProvider>
  );
}

export default MyApp;
