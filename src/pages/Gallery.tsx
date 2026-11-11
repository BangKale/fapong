import { X } from "lucide-react";
import { useEffect, useState } from "react";

const photos = [
  "/imagine_images/gallery/g02.jpg",
  "/imagine_images/gallery/g10.jpg",
  "/imagine_images/gallery/g03.jpg",
  "/imagine_images/gallery/g05.jpg",
  "/imagine_images/gallery/g01.jpg",
  "/imagine_images/gallery/g06.jpg",
  "/imagine_images/gallery/g08.jpg",
  "/imagine_images/gallery/g04.jpg",
  "/imagine_images/gallery/g07.jpg",
  "/imagine_images/gallery/g09.jpg",
  "/imagine_images/gallery/g11.jpg",
  "/imagine_images/gallery/g12.jpg",
  "/imagine_images/gallery/g13.jpg",
  "/imagine_images/gallery/g14.jpg",
];

export function GalleryPage() {
  const [open, setOpen] = useState<string | null>(null);

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
      <div className="mt-10 grid grid-cols-2 items-start gap-x-4 gap-y-10 md:gap-x-5">
        {photos.map((src, index) => {
          const number = String(index + 1).padStart(2, "0");
          return (
            <figure key={src} className="row-span-2 grid grid-rows-subgrid gap-y-3">
              <button type="button" onClick={() => setOpen(src)} className="block w-full self-end" aria-label={`Perbesar foto ${number}`}>
                <img src={src} alt="" className="h-auto w-full" />
              </button>
              <figcaption className="text-xs tracking-widest text-rose">{number}</figcaption>
            </figure>
          );
        })}
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
