import { Route, Routes } from "react-router-dom";
import { Footer, Header } from "@/components/site-frame";
import { AboutPage } from "@/pages/About";
import { BlogPage } from "@/pages/Blog";
import { CatalogPage } from "@/pages/Catalog";
import { ContactPage } from "@/pages/Contact";
import { GalleryPage } from "@/pages/Gallery";
import { Home } from "@/pages/Home";
import { PostPage } from "@/pages/Post";

export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<PostPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </>
  );
}
