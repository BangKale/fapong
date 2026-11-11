const moments = [
  { src: "/imagine_images/gallery/g01.jpg", alt: "Juara di SM Festival Vol. 2" },
  { src: "/imagine_images/gallery/g02.jpg", alt: "Penari di panggung, kostum putih emas" },
];

export function GalleryPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-xs uppercase tracking-widest text-rose">Galeri</p>
      <h1 className="mt-3 font-display text-5xl leading-tight">
        <span className="block text-sm font-sans font-normal uppercase tracking-widest text-rose">Modern & Minimalist</span>
        <span className="mt-2 block">Our Moments, Our Stories</span>
      </h1>
      <div className="mt-10 grid grid-cols-1 items-start gap-6 md:grid-cols-2">
        {moments.map((item) => (
          <img key={item.src} src={item.src} alt={item.alt} className="h-auto w-full" />
        ))}
      </div>
    </main>
  );
}
