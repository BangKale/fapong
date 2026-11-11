import { origin } from "@/data/business.json";
import pageMetadata from "@/data/seo.json";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSite } from "@/data/site";

const pages: Record<string, { title: string; description: string }> = pageMetadata;

function meta(key: string, value: string, property = false) {
  const attr = property ? "property" : "name";
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.content = value;
}

export function Seo() {
  const { pathname } = useLocation();
  const { costumes } = useSite();

  useEffect(() => {
    const path = pathname.replace(/\/$/, "") || "/";
    const match = path.match(/^\/catalog\/c(\d+)$/);
    const item = match ? costumes[Number(match[1]) - 1] : undefined;
    const page = pages[path] || (item ? {
      title: `Sewa Kostum ${item.name || item.label} Karawang | Fapong Gallery`,
      description: `Sewa kostum Jaipong ${item.name || item.label} di Fapong Gallery Karawang. ${item.label}. Hubungi WhatsApp untuk ukuran, kelengkapan, dan ketersediaan tanggal.`,
    } : null);
    document.title = path.startsWith("/admin") ? "Admin | Fapong Gallery" : page?.title || "Halaman Tidak Ditemukan | Fapong Gallery";
    meta("description", page?.description || "Halaman Fapong Gallery tidak ditemukan.");
    meta("robots", page ? "index,follow" : "noindex,follow");
    const url = new URL(path, origin).href;
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
    const image = new URL(item?.src || "/imagine_images/hero_stage.jpg", origin).href;
    meta("og:title", document.title, true);
    meta("og:description", page?.description || "Halaman tidak ditemukan.", true);
    meta("og:type", "website", true);
    meta("og:locale", "id_ID", true);
    meta("og:site_name", "Fapong Gallery", true);
    meta("og:url", url, true);
    meta("og:image", image, true);
    meta("twitter:card", "summary_large_image");
    meta("twitter:title", document.title);
    meta("twitter:description", page?.description || "Halaman tidak ditemukan.");
    meta("twitter:image", image);
    let structured = document.head.querySelector<HTMLScriptElement>('#business-schema');
    if (!structured) {
      structured = document.createElement("script");
      structured.id = "business-schema";
      structured.type = "application/ld+json";
      document.head.appendChild(structured);
    }
    structured.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${origin}/#business`,
      name: "Fapong Gallery",
      url: origin,
      image: new URL("/imagine_images/hero_stage.jpg", origin).href,
      telephone: "+6285771244199",
      description: pages["/"].description,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jl. HOS Cokroaminoto No.4, Karawang Kulon, Kec. Karawang Barat",
        addressLocality: "Karawang",
        addressRegion: "Jawa Barat",
        postalCode: "41311",
        addressCountry: "ID",
      },
      areaServed: { "@type": "City", name: "Karawang" },
      sameAs: ["https://www.instagram.com/fapong.gallery/"],
    });
    if (!page) structured.remove();
  }, [pathname, costumes]);

  return null;
}
