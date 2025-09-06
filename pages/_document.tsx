import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
          <link rel="alternate" type="application/feed+json" href="/feed.json" />
          <link rel="alternate" type="application/atom+xml" href="/atom.xml" />
          <link rel="stylesheet" href="/katex.min.css" />
          <link rel="stylesheet" href="/print.css" media="print" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){})})}`,
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
