/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

const SITE_URL = "https://port-website-indol.vercel.app";

function main() {
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
  const sitemapPath = path.join(publicDir, "sitemap.xml");
  // If next-sitemap already generated, we skip; otherwise minimal sitemap including /writing
  if (fs.existsSync(sitemapPath)) {
    return;
  }
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `  <url><loc>${SITE_URL}/</loc></url>\n` +
    `  <url><loc>${SITE_URL}/writing</loc></url>\n` +
    `  <url><loc>${SITE_URL}/about</loc></url>\n` +
    `  <url><loc>${SITE_URL}/projects</loc></url>\n` +
    `</urlset>`;
  fs.writeFileSync(sitemapPath, xml);
  // eslint-disable-next-line no-console
  console.log("Ensured sitemap with /writing exists");
}

main();
