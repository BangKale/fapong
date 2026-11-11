import { Link } from "react-router-dom";
import { useSite } from "@/data/site";

export function Home() {
  const { costumes, featured, hero } = useSite();
  return (
    <main>
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-12 md:flex-row md:py-16">
        <div className="w-full md:w-5/12">
          <p className="text-xs uppercase tracking-widest text-rose">Karawang · sewa per acara</p>
          <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
            Pesona Tradisi, Gemilang di Atas Panggung.
          </h1>
          <p className="mt-5 max-w-lg text-muted">
            Hadirkan keindahan seni dan budaya melalui koleksi kostum pilihan dari Fapong Gallery. Temukan busana terbaik untuk setiap pertunjukan dan momen istimewa.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/catalog" className="bg-ink px-5 py-3 text-sm text-cream">
              Buka katalog
            </Link>
            <a
              href="https://wa.me/6285771244199"
              className="border border-ink px-5 py-3 text-sm"
            >
              Tanya tanggal
            </a>
          </div>
        </div>
        <figure className="w-full md:w-7/12">
          <div className="relative ml-auto w-fit max-w-full">
            <img
              src={hero}
              alt="Penari Jaipong di panggung"
              className="block h-auto max-h-[72vh] w-auto max-w-full"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#fffdfb] from-0% via-[#fdf8f6]/95 via-[28%] to-transparent to-[58%]" />
          </div>
        </figure>
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
