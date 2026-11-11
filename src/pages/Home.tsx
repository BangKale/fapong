import { ChevronDown, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { costumes, featured } from "@/data/content";

const hero = "/imagine_images/hero_stage.jpg";

export function Home() {
  const [preview, setPreview] = useState(false);

  return (
    <main>
      <section className="relative min-h-[100svh] overflow-hidden bg-[#120c09]">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover object-center opacity-20 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#120c09] via-[#120c09]/80 to-[#120c09]/25" />
        <img
          src={hero}
          alt="Penari Jaipong di panggung"
          className="pointer-events-none absolute bottom-0 right-[4%] z-[1] h-auto max-h-[78vh] w-auto max-w-[88vw] object-contain md:right-[6%] md:max-h-[86vh] md:max-w-[46vw]"
        />
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl items-center px-6 pb-24 pt-28">
          <div className="max-w-xl text-cream">
            <div className="flex items-center gap-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#e7c98a]">Karawang · sewa per acara</p>
              <span className="hidden h-px w-28 bg-[#e7c98a]/80 sm:block" />
            </div>
            <h1 className="mt-5 font-display text-5xl leading-[1.02] text-cream md:text-7xl">
              Kostum Jaipong
              <br />
              <span className="italic text-[#e7c98a]">yang siap naik</span>
              <br />
              <span className="italic text-[#e7c98a]">panggung.</span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/85 md:text-base">
              Busana di foto adalah set yang disewakan, dengan kualitas terbaik untuk setiap penampilan Anda.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link to="/catalog" className="rounded-full bg-[#e7c98a] px-6 py-3 text-sm text-ink">
                Lihat Katalog →
              </Link>
              <button type="button" onClick={() => setPreview(true)} className="inline-flex items-center gap-3 text-sm text-cream">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/70">
                  <Play size={16} className="ml-0.5" />
                </span>
                Tonton Preview
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-0 right-0 z-10 mx-auto flex max-w-6xl items-center justify-between px-6">
          <a href="#best-seller" className="inline-flex items-center gap-3 text-xs text-cream/80">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/40">
              <ChevronDown size={14} />
            </span>
            Scroll untuk eksplorasi
          </a>
          <div className="flex items-center gap-3 text-sm text-cream">
            <span>01 / 01</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e7c98a]/50 text-[#e7c98a]/50" aria-hidden="true">
              <ChevronLeft size={16} />
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e7c98a]/50 text-[#e7c98a]/50" aria-hidden="true">
              <ChevronRight size={16} />
            </span>
          </div>
        </div>
      </section>
      {preview ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 p-6" onClick={() => setPreview(false)}>
          <img src={hero} alt="Penari Jaipong di panggung" className="max-h-[92vh] max-w-[92vw] object-contain" />
          <button type="button" aria-label="Tutup" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center bg-cream text-ink" onClick={() => setPreview(false)}>
            <X size={18} />
          </button>
        </div>
      ) : null}

      <section id="best-seller" className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl">Best Seller</h2>
          <Link to="/catalog" className="text-sm underline decoration-rose underline-offset-4">
            Semua set
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 items-start gap-x-5 gap-y-10 md:grid-cols-4">
          {featured.map((item) => {
            const index = costumes.findIndex((c) => c.src === item.src);
            return (
              <Link
                key={item.src}
                to={`/catalog/c${String(index + 1).padStart(2, "0")}`}
                className="group row-span-4 grid grid-rows-subgrid gap-y-1"
              >
                <img src={item.src} alt={item.name} className="h-auto w-full self-end" />
                <p className="pt-3 text-xs tracking-widest text-rose">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="font-display text-2xl leading-tight group-hover:text-rose">{item.name}</h3>
                <p className="text-sm text-muted">{item.note}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
