import { useState } from "react";
import { gallery, galleryFilters, type GalleryTag } from "@/data/content";

export function GalleryPage() {
  const [tag, setTag] = useState<"semua" | GalleryTag>("semua");
  const items = tag === "semua" ? gallery : gallery.filter((item) => item.tag === tag);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-xs uppercase tracking-widest text-rose">Galeri</p>
      <h1 className="mt-2 font-display text-5xl">Foto latihan dan panggung</h1>
      <p className="mt-3 max-w-lg text-muted">
        Bukan stok ilustrasi. Ini dokumentasi kostum dan penari yang ada di studio.
      </p>
      <div className="mt-8 flex gap-5 overflow-x-auto border-b border-rose/30">
        {galleryFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setTag(filter.id)}
            className={
              tag === filter.id
                ? "shrink-0 border-b-2 border-ink pb-3 text-sm text-ink"
                : "shrink-0 border-b-2 border-transparent pb-3 text-sm text-muted"
            }
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
        {items.map((item) => (
          <figure key={item.src} className="bg-paper">
            <img src={item.src} alt={item.alt} className="aspect-[3/4] w-full object-cover object-top" />
          </figure>
        ))}
      </div>
    </main>
  );
}
