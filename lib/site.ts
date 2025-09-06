export const siteUrl: string =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://jordanmoshcovitis.com";

export const bookingUrl: string =
  process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || "mailto:jordan.moshcovitis@gmail.com";

export const consultingUrl: string =
  process.env.NEXT_PUBLIC_CONSULTING_URL?.trim() || "https://jordanmoshcovitis.com";

export default siteUrl;
