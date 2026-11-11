import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSite } from "@/data/site";

const groups = [
  {
    frame: "aspect-[4/3] object-cover",
    cols: "grid-cols-1 sm:grid-cols-3",
    srcs: ["/imagine_images/gallery/g03.jpg", "/imagine_images/gallery/g05.jpg", "/imagine_images/gallery/g13.jpg"],
  },
  {
    frame: "aspect-video object-cover",
    cols: "grid-cols-1",
    srcs: ["/imagine_images/gallery/g08.jpg"],
  },
  {
    frame: "aspect-[3/4] object-cover object-center",
    cols: "grid-cols-2",
    srcs: [
      "/imagine_images/gallery/g10.jpg",
      "/imagine_images/gallery/g02.jpg",
      "/imagine_images/gallery/g12.jpg",
      "/imagine_images/gallery/g11.jpg",
    ],
  },
];

export function GalleryPage() {
  const { gallery } = useSite();
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
      <h1 className="mt-3 font-display text-5xl leading-tight">Our Moments, Our Stories</h1>
      <div className="mt-12 space-y-12">
        {gallery ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
            {gallery.map((src) => {
              count += 1;
              const number = String(count).padStart(2, "0");
              return (
                <figure key={src}>
                  <button type="button" onClick={() => setOpen(src)} className="block w-full" aria-label={`Perbesar foto ${number}`}>
                    <img src={src} alt="" className="aspect-[3/4] w-full object-cover" />
                  </button>
                  <figcaption className="mt-3 text-xs tracking-widest text-rose">{number}</figcaption>
                </figure>
              );
            })}
          </div>
        ) : (
          groups.map((group) => (
          <div key={group.srcs[0]} className={`grid gap-x-4 gap-y-8 ${group.cols}`}>
            {group.srcs.map((src) => {
              count += 1;
              const number = String(count).padStart(2, "0");
              return (
                <figure key={src}>
                  <button type="button" onClick={() => setOpen(src)} className="block w-full" aria-label={`Perbesar foto ${number}`}>
                    <img src={src} alt="" className={`${group.frame} w-full`} />
                  </button>
                  <figcaption className="mt-3 text-xs tracking-widest text-rose">{number}</figcaption>
                </figure>
              );
            })}
          </div>
        ))
        )}
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
