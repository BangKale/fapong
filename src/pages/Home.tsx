import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { costumes, featured } from "@/data/content";

export function Home() {
  return (
    <main>
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#140e0c]">
        <img
          src="/imagine_images/hero_stage.jpg"
          alt="Penari Jaipong di panggung"
          className="absolute inset-y-0 right-0 h-full w-auto max-w-full object-contain object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#140e0c] from-15% via-[#140e0c]/55 via-42% to-transparent to-68%" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-28">
          <div className="max-w-xl text-cream">
            <div className="flex items-center gap-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[#e7c98a]">Karawang · sewa per acara</p>
              <span className="hidden h-px w-24 bg-[#e7c98a]/70 sm:block" />
            </div>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] md:text-6xl">
              Kostum Jaipong
              <br />
              yang siap naik
              <br />
              <span className="text-[#e7c98a]">panggung.</span>
            </h1>
            <p className="mt-5 max-w-md text-cream/85">Busana di foto adalah set yang disewakan.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/catalog" className="rounded-full bg-[#e7c98a] px-6 py-3 text-sm text-ink">
                Buka katalog →
              </Link>
              <a
                href="https://wa.me/6285771244199"
                className="rounded-full border border-cream/80 px-6 py-3 text-sm text-cream"
              >
                Tanya tanggal
              </a>
            </div>
          </div>
        </div>
        <a href="#best-seller" className="absolute bottom-6 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-cream/50 text-cream" aria-label="Ke bawah">
          <ChevronDown size={18} />
        </a>
      </section>

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
