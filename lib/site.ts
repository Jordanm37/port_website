export const siteUrl: string =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://jordanmoshcovitis.com";

export default siteUrl;
