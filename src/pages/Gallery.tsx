import { gallery } from "@/data/content";

export function GalleryPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-xs uppercase tracking-widest text-rose">Galeri</p>
      <h1 className="mt-2 font-display text-5xl">Foto latihan dan panggung</h1>
      <p className="mt-3 max-w-lg text-muted">Bukan stok ilustrasi. Ini dokumentasi kostum dan penari yang ada di studio.</p>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
        {gallery.map((item) => (
          <figure key={item.src} className="bg-paper">
            <img src={item.src} alt={item.alt} className="h-auto w-full" />
          </figure>
        ))}
      </div>
    </main>
  );
}
