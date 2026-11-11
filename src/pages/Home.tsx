import { Link } from "react-router-dom";
import { costumes, featured } from "@/data/content";

export function Home() {
  return (
    <main>
      <section className="relative">
        <img
          src="/imagine_images/hero_stage.jpg"
          alt="Penari Jaipong di panggung"
          className="block h-auto w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="max-w-xl text-cream">
              <p className="text-xs uppercase tracking-widest text-cream/80">Karawang · sewa per acara</p>
              <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
                Kostum Jaipong yang siap naik panggung.
              </h1>
              <p className="mt-5 max-w-md text-cream/85">
                Busana di foto adalah set yang disewakan.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/catalog" className="bg-cream px-5 py-3 text-sm text-ink">
                  Buka katalog
                </Link>
                <a
                  href="https://wa.me/6285771244199"
                  className="border border-cream px-5 py-3 text-sm text-cream"
                >
                  Tanya tanggal
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="absolute bottom-4 right-6 text-xs text-cream/80">Panggung · kostum ungu emas</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
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
