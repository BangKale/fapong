import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { costumes as staticCostumes, featured as staticFeatured } from "@/data/content";
import { supabase } from "@/lib/supabase";

export type Costume = {
  id?: string;
  src: string;
  name: string;
  note: string;
  label: string;
  featured?: boolean;
};

type SiteValue = {
  costumes: Costume[];
  featured: Costume[];
  gallery: string[] | null;
  hero: string;
  refresh: () => Promise<void>;
};

const SiteContext = createContext<SiteValue | null>(null);

const fallbackHero = "/imagine_images/hero_stage.jpg";

export function SiteProvider({ children }: { children: ReactNode }) {
  const [costumes, setCostumes] = useState<Costume[]>([...staticCostumes]);
  const [featured, setFeatured] = useState<Costume[]>([...staticFeatured]);
  const [gallery, setGallery] = useState<string[] | null>(null);
  const [hero, setHero] = useState(fallbackHero);

  const refresh = useCallback(async () => {
    if (!supabase) return;
    const [costumesRes, galleryRes, heroRes] = await Promise.all([
      supabase.from("costumes").select("id, sort, label, name, note, image_url, featured").order("sort"),
      supabase.from("gallery_photos").select("image_url, sort").order("sort"),
      supabase.from("site_settings").select("value").eq("key", "hero").maybeSingle(),
    ]);
    if (costumesRes.data && costumesRes.data.length > 0) {
      const next = costumesRes.data.map((row) => ({
        id: row.id as string,
        src: row.image_url as string,
        label: row.label as string,
        name: (row.name as string) || "",
        note: (row.note as string) || "",
        featured: Boolean(row.featured),
      }));
      setCostumes(next);
      const picked = next.filter((item) => item.featured);
      setFeatured(picked.length > 0 ? picked.slice(0, 4) : next.slice(0, 4));
    }
    if (galleryRes.data && galleryRes.data.length > 0) {
      setGallery(galleryRes.data.map((row) => row.image_url as string));
    }
    if (heroRes.data?.value) setHero(heroRes.data.value);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return <SiteContext.Provider value={{ costumes, featured, gallery, hero, refresh }}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const value = useContext(SiteContext);
  if (!value) throw new Error("useSite must be used inside SiteProvider");
  return value;
}
