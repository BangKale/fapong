import { X } from "lucide-react";
import { useEffect, useState } from "react";

const stories = [
  [
    { src: "/imagine_images/gallery/g02.jpg", alt: "Foto galeri 01" },
    { src: "/imagine_images/gallery/g10.jpg", alt: "Foto galeri 02" },
  ],
  [{ src: "/imagine_images/gallery/g03.jpg", alt: "Foto galeri 03" }],
  [{ src: "/imagine_images/gallery/g05.jpg", alt: "Foto galeri 04" }],
  [
    { src: "/imagine_images/gallery/g01.jpg", alt: "Foto galeri 05" },
    { src: "/imagine_images/gallery/g06.jpg", alt: "Foto galeri 06" },
  ],
  [{ src: "/imagine_images/gallery/g08.jpg", alt: "Foto galeri 07" }],
  [
    { src: "/imagine_images/gallery/g04.jpg", alt: "Foto galeri 08" },
    { src: "/imagine_images/gallery/g07.jpg", alt: "Foto galeri 09" },
  ],
  [{ src: "/imagine_images/gallery/g09.jpg", alt: "Foto galeri 10" }],
];

export function GalleryPage() {
  const [open, setOpen] = useState<string | null>(null);
  let count = 0;

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-xs uppercase tracking-widest text-rose">Galeri</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-tight">Our Moments, Our Stories</h1>
      <div className="mt-14 space-y-14">
        {stories.map((images) => (
          <section key={images[0].src} className="border-t border-rose/30 pt-8">
            <div className={images.length > 1 ? "grid items-start gap-x-4 gap-y-8 md:grid-cols-2" : "grid gap-y-3"}>
              {images.map((image) => {
                count += 1;
                const number = String(count).padStart(2, "0");
                return (
                  <figure key={image.src}>
                    <button type="button" onClick={() => setOpen(image.src)} className="block w-full" aria-label={`Perbesar foto ${number}`}>
                      <img src={image.src} alt="" className="h-auto w-full" />
                    </button>
                    <figcaption className="mt-3 text-xs tracking-widest text-rose">{number}</figcaption>
                  </figure>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      {open ? (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-ink/80 p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Foto"
          onClick={() => setOpen(null)}
        >
          <img src={open} alt="" className="max-h-[92vh] max-w-[92vw] object-contain" />
          <button
            type="button"
            aria-label="Tutup"
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center bg-cream text-ink"
            onClick={() => setOpen(null)}
          >
            <X size={20} />
          </button>
        </div>
      ) : null}
    </main>
  );
}
