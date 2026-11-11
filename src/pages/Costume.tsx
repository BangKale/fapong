import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { costumes } from "@/data/content";

function slugAt(index: number) {
  return `c${String(index + 1).padStart(2, "0")}`;
}

export function CostumePage() {
  const { slug } = useParams();
  const index = costumes.findIndex((_, i) => slugAt(i) === slug);
  const item = costumes[index];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [slug]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!item) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <p>Set tidak ditemukan.</p>
        <Link to="/catalog" className="mt-4 inline-block text-sm underline decoration-rose underline-offset-4">
          Kembali ke katalog
        </Link>
      </main>
    );
  }

  const code = String(index + 1).padStart(2, "0");
  const prev = index > 0 ? index - 1 : null;
  const next = index < costumes.length - 1 ? index + 1 : null;
  const ask = `https://wa.me/6285771244199?text=${encodeURIComponent(
    `Halo Fapong.gallery, saya ingin sewa set ${code} ${item.label} untuk acara.`,
  )}`;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link to="/catalog" className="text-sm text-muted underline decoration-rose underline-offset-4">
        Semua set
      </Link>
      <div className="mt-8 grid items-center gap-10 md:grid-cols-2">
        <button type="button" onClick={() => setOpen(true)} className="block w-full" aria-label="Perbesar foto">
          <img src={item.src} alt={item.label} className="mx-auto h-auto max-h-[78vh] w-auto max-w-full" />
        </button>
        <div className="flex flex-col items-start">
          <p className="text-xs tracking-widest text-rose">{code}</p>
          <h1 className="mt-3 w-full bg-rose/15 px-5 py-4 text-2xl font-medium leading-snug">{item.label}</h1>
          <a href={ask} className="mt-6 inline-flex bg-ink px-5 py-3 text-sm text-cream">
            Tanya set ini
          </a>
          <div className="mt-8 grid w-full grid-cols-2 gap-3">
            {prev !== null ? (
              <Link to={`/catalog/${slugAt(prev)}`} className="inline-flex items-center justify-center gap-2 border border-rose/40 px-4 py-3 text-sm hover:border-rose">
                <ChevronLeft size={16} />
                Sebelumnya
              </Link>
            ) : (
              <span />
            )}
            {next !== null ? (
              <Link to={`/catalog/${slugAt(next)}`} className="inline-flex items-center justify-center gap-2 border border-rose/40 px-4 py-3 text-sm hover:border-rose">
                Berikutnya
                <ChevronRight size={16} />
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>
      {open ? (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-ink/80 p-6"
          role="dialog"
          aria-modal="true"
          aria-label={item.name}
          onClick={() => setOpen(false)}
        >
          <img src={item.src} alt={item.name} className="max-h-[92vh] max-w-[92vw] object-contain" />
          <button
            type="button"
            aria-label="Tutup"
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center bg-cream text-ink"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
      ) : null}
    </main>
  );
}
