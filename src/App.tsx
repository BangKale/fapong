import { Route, Routes } from "react-router-dom";
import { Footer, Header } from "@/components/site-frame";
import { AboutPage } from "@/pages/About";
import { CatalogPage } from "@/pages/Catalog";
import { CostumePage } from "@/pages/Costume";
import { ContactPage } from "@/pages/Contact";
import { GalleryPage } from "@/pages/Gallery";
import { Home } from "@/pages/Home";

export function App() {
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
