import React, { useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";

const Hire: NextPage = () => {
  useEffect(() => {
    window.location.replace("https://symbolon.com.au");
  }, []);

  return (
    <Head>
      <title>Redirecting…</title>
      <meta httpEquiv="refresh" content="0;url=https://symbolon.com.au" />
    </Head>
  );
};

export default Hire;
