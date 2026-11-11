import { Route, Routes, useLocation } from "react-router-dom";
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
  const admin = useLocation().pathname.startsWith("/admin");
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
