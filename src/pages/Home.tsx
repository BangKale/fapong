import { Link } from "react-router-dom";
import { useSite } from "@/data/site";

export function Home() {
  const { costumes, featured, hero } = useSite();
  return (
    <main>
      <section className="relative isolate overflow-hidden bg-ink text-cream">
        <img
          src={hero}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_30%] md:object-[center_15%]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/50 to-black/15 md:bg-gradient-to-r md:from-black/85 md:via-black/50 md:to-black/10" />
        <div className="mx-auto flex min-h-[740px] max-w-6xl items-end px-6 py-12 md:min-h-[680px] md:items-center md:py-20">
          <div className="w-full max-w-xl">
            <p className="text-xs uppercase tracking-widest text-cream/85">Sewa kostum Jaipong · Karawang</p>
            <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
              Pesona Tradisi, Gemilang di Atas Panggung.
            </h1>
            <p className="mt-5 max-w-lg text-cream/90">
              Hadirkan keindahan seni dan budaya melalui koleksi kostum pilihan dari Fapong Gallery. Temukan busana terbaik untuk setiap pertunjukan dan momen istimewa.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/catalog" className="bg-cream px-5 py-3 text-sm text-ink hover:bg-white">
                Buka katalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-12">
        <h2 className="font-display text-3xl">Sewa Kostum Jaipong di Karawang</h2>
        <p className="mt-4 max-w-3xl text-muted">
          Fapong Gallery menyediakan sewa kostum Jaipong untuk tunggal, duo, dan rampak,
          untuk hajatan, acara sekolah, dan pentas. Pilih koleksi di katalog, lalu
          konfirmasikan tanggal acara, jumlah penari, dan ukuran melalui WhatsApp.
        </p>
        <p className="mt-3 max-w-3xl text-sm text-muted">
          Pengambilan di studio: Jl. HOS Cokroaminoto No.4, Karawang Kulon,
          Kec. Karawang Bar., Karawang, Jawa Barat 41311.
          {" "}<Link to="/contact" className="text-ink underline decoration-rose underline-offset-4">Lihat kontak dan peta studio</Link>.
        </p>
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
                className="block"
              >
                <img loading="lazy" decoding="async" src={item.src} alt={item.label || item.name} className="h-auto w-full" />
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
