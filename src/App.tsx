import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { PageMotion } from "@/components/page-motion";
import { Seo } from "@/components/seo";
import { Footer, Header } from "@/components/site-frame";
import { AboutPage } from "@/pages/About";
import { AdminPage } from "@/pages/Admin";
import { CatalogPage } from "@/pages/Catalog";
import { CostumePage } from "@/pages/Costume";
import { ContactPage } from "@/pages/Contact";
import { GalleryPage } from "@/pages/Gallery";
import { Home } from "@/pages/Home";

function PublicSite() {
  return (
    <>
      <PageMotion />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-cream focus:p-3">Langsung ke konten</a>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:slug" element={<CostumePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export function App() {
  const { pathname } = useLocation();
  const admin = pathname.startsWith("/admin");
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return (<>
    <Seo />
    {admin ? (
    <Routes>
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  ) : (
    <PublicSite />
  )}
  </>);
}
