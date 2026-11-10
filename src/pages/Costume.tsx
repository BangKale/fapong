import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { costumes, rate } from "@/data/content";

const extras = [
  "/imagine_images/real1.jpg",
  "/imagine_images/real2.jpg",
  "/imagine_images/real3.jpg",
  "/imagine_images/real4.jpg",
  "/imagine_images/real5.jpg",
  "/imagine_images/real6.jpg",
  "/imagine_images/real7.jpg",
  "/imagine_images/real8.jpg",
  "/imagine_images/hero_stage.jpg",
  "/imagine_images/group_stage.jpg",
  "/imagine_images/H6rAS.jpg",
  "/imagine_images/0jq2I.jpg",
];

function slugAt(index: number) {
  return `c${String(index + 1).padStart(2, "0")}`;
}

function photosFor(index: number, src: string) {
  const more = [0, 1, 2].map((step) => extras[(index * 3 + step) % extras.length]);
  return [src, ...more.filter((photo) => photo !== src)];
}

export function CostumePage() {
  const { slug } = useParams();
  const index = costumes.findIndex((_, i) => slugAt(i) === slug);
  const item = costumes[index];
  const photos = item ? photosFor(index, item.src) : [];
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setActive(0);
    setOpen(false);
  }, [slug]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowRight") setActive((i) => (i + 1) % photos.length);
      if (event.key === "ArrowLeft") setActive((i) => (i - 1 + photos.length) % photos.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, photos.length]);

  if (!item) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <p>Set tidak ditemukan.</p>
        <Link to="/catalog" className="mt-4 inline-block text-sm underline decoration-rose underline-offset-4">Kembali ke katalog</Link>
      </main>
    );
  }

  const code = String(index + 1).padStart(2, "0");
  const prev = index > 0 ? index - 1 : null;
  const next = index < costumes.length - 1 ? index + 1 : null;
  const ask = `https://wa.me/6285771244199?text=${encodeURIComponent(`Halo Fapong.gallery, saya ingin sewa set ${code} ${item.name} untuk acara.`)}`;

  function step(dir: -1 | 1) {
    setActive((i) => (i + dir + photos.length) % photos.length);
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link to="/catalog" className="text-sm text-muted underline decoration-rose underline-offset-4">Semua set</Link>
      <div className="mt-8 grid items-center gap-10 md:grid-cols-2">
        <div>
          <button type="button" onClick={() => setOpen(true)} className="block w-full" aria-label="Lihat foto penuh">
            <img src={photos[active]} alt={item.name} className="mx-auto h-auto max-h-[70vh] w-auto max-w-full" />
          </button>
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {photos.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => { setActive(i); setOpen(true); }}
                aria-label={`Foto ${i + 1}`}
                className={i === active ? "shrink-0 ring-2 ring-ink" : "shrink-0 ring-1 ring-rose/40"}
              >
                <img src={src} alt="" className="h-20 w-16 bg-paper object-contain" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs tracking-widest text-rose">{code}</p>
          <h1 className="mt-2 font-display text-5xl leading-tight">{item.name}</h1>
          <p className="mt-4 text-muted">{item.note}</p>
          <p className="mt-6 text-sm">Tarif {rate} per acara, termasuk cek ukuran.</p>
          <a href={ask} className="mt-8 inline-flex bg-ink px-5 py-3 text-sm text-cream">Tanya set ini</a>
          <div className="mt-12 flex items-start justify-between gap-6 border-t border-rose/30 pt-6 text-sm">
            {prev !== null ? (
              <Link to={`/catalog/${slugAt(prev)}`} className="hover:text-rose">
                <span className="block text-xs text-muted">Sebelumnya</span>
                {costumes[prev].name}
              </Link>
            ) : <span />}
            {next !== null ? (
              <Link to={`/catalog/${slugAt(next)}`} className="text-right hover:text-rose">
                <span className="block text-xs text-muted">Berikutnya</span>
                {costumes[next].name}
              </Link>
            ) : <span />}
          </div>
        </div>
      </div>
      {open ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/80 p-4" role="dialog" aria-modal="true" aria-label={item.name} onClick={() => setOpen(false)}>
          <button type="button" aria-label="Foto sebelumnya" className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-cream text-ink sm:left-6" onClick={(event) => { event.stopPropagation(); step(-1); }}>
            <ChevronLeft size={28} />
          </button>
          <img src={photos[active]} alt={item.name} className="max-h-[90vh] max-w-[calc(100vw-8rem)] object-contain" onClick={(event) => event.stopPropagation()} />
          <button type="button" aria-label="Foto berikutnya" className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-cream text-ink sm:right-6" onClick={(event) => { event.stopPropagation(); step(1); }}>
            <ChevronRight size={28} />
          </button>
          <button type="button" aria-label="Tutup" className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center bg-cream text-ink" onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>
      ) : null}
    </main>
  );
}
