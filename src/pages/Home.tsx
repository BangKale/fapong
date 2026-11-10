import { Link } from "react-router-dom";
import { featured, rate } from "@/data/content";

export function Home() {
  return (
    <main>
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-12 md:flex-row md:py-16">
        <div className="w-full md:w-5/12">
          <p className="text-xs uppercase tracking-widest text-rose">Karawang · sewa per acara</p>
          <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">Kostum Jaipong yang siap naik panggung.</h1>
          <p className="mt-5 max-w-sm text-muted">Busana di foto adalah set yang disewakan. Tarif mulai {rate} per acara, termasuk cek ukuran.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/catalog" className="bg-ink px-5 py-3 text-sm text-cream">Buka katalog</Link>
            <a href="https://wa.me/6285771244199" className="border border-ink px-5 py-3 text-sm">Tanya tanggal</a>
          </div>
        </div>
        <figure className="w-full md:w-7/12">
          <img src="/imagine_images/hero_stage.jpg" alt="Penari Jaipong di panggung" className="ml-auto block h-auto max-h-[72vh] w-auto max-w-full" />
          <figcaption className="mt-2 text-right text-xs text-muted">Panggung · kostum ungu emas</figcaption>
        </figure>
      </section>

      <section className="border-y border-rose/30">
        <dl className="mx-auto grid max-w-6xl md:grid-cols-3">
          {[
            ["01", "Koleksi", "Dua puluh lima set, dari solo sampai grup."],
            ["02", "Perawatan", "Dicek setelah setiap pengembalian."],
            ["03", "Jadwal", "Satu set tidak diedarkan dua kali di hari yang sama."],
          ].map(([n, t, d]) => (
            <div key={n} className="border-rose/30 px-6 py-6 md:border-l first:md:border-l-0">
              <dt className="text-xs tracking-widest text-rose">{n}</dt>
              <dd className="mt-2 font-display text-2xl">{t}</dd>
              <dd className="mt-1 text-sm text-muted">{d}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl">Yang sering keluar</h2>
          <Link to="/catalog" className="text-sm underline decoration-rose underline-offset-4">Semua set</Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
          {featured.map((item) => (
            <Link key={item.src} to="/catalog" className="group">
              <img src={item.src} alt={item.name} className="h-auto w-full" />
              <p className="mt-3 font-display text-xl group-hover:text-rose">{item.name}</p>
              <p className="text-sm text-muted">{rate} / acara</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
