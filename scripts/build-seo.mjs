import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const { origin } = JSON.parse(readFileSync("src/data/business.json", "utf8"));
if (!origin) throw new Error("SITE_URL must be the public production origin before generating SEO files.");
const site = new URL(origin);
if (site.protocol !== "https:" || site.pathname !== "/" || site.search || site.hash) {
  throw new Error("SITE_URL must be an HTTPS origin without a path, query, or fragment.");
}
const pages = JSON.parse(readFileSync("src/data/seo.json", "utf8"));
const template = readFileSync("dist/index.html", "utf8");
const escape = (s) => s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const business = {
  "@context": "https://schema.org", "@type": "LocalBusiness",
  "@id": `${site.origin}/#business`, name: "Fapong Gallery", url: site.origin,
  image: `${site.origin}/imagine_images/hero_stage.jpg`, telephone: "+6285771244199",
  description: pages["/"].description,
  address: { "@type": "PostalAddress", streetAddress: "Jl. HOS Cokroaminoto No.4, Karawang Kulon, Kec. Karawang Barat", addressLocality: "Karawang", addressRegion: "Jawa Barat", postalCode: "41311", addressCountry: "ID" },
  areaServed: { "@type": "City", name: "Karawang" },
  sameAs: ["https://www.instagram.com/fapong.gallery/"],
};
for (const [path, page] of Object.entries(pages)) {
  const url = new URL(path, site).href;
  const image = `${site.origin}/imagine_images/hero_stage.jpg`;
  const tags = [
    `<link rel="canonical" href="${escape(url)}" />`,
    '<meta name="robots" content="index,follow" />',
    ...Object.entries({ "og:title": page.title, "og:description": page.description, "og:url": url, "og:image": image, "og:type": "website", "og:locale": "id_ID", "og:site_name": "Fapong Gallery" }).map(([key, value]) => `<meta property="${key}" content="${escape(value)}" />`),
    ...Object.entries({ "twitter:card": "summary_large_image", "twitter:title": page.title, "twitter:description": page.description, "twitter:image": image }).map(([key, value]) => `<meta name="${key}" content="${escape(value)}" />`),
    `<script id="business-schema" type="application/ld+json">${JSON.stringify(business).replaceAll("<", "\\u003c")}</script>`,
  ].join("\n    ");
  const html = template.replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(page.description)}" />`)
    .replace("</head>", `    ${tags}\n  </head>`);
  const folder = path === "/" ? "dist" : `dist${path}`;
  mkdirSync(folder, { recursive: true });
  writeFileSync(`${folder}/index.html`, html);
}
// The admin entry must not inherit the homepage's indexable metadata.
mkdirSync("dist/admin", { recursive: true });
writeFileSync("dist/admin/index.html", template.replace("</head>", '<meta name="robots" content="noindex,nofollow" /></head>'));
writeFileSync("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(pages).map(path => `  <url><loc>${escape(new URL(path, site).href)}</loc></url>`).join("\n")}\n</urlset>\n`);
writeFileSync("dist/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`);
