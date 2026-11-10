import { Link } from "react-router-dom";
import { events, featured, rate } from "@/data/content";

export function Home() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl items-end gap-10 px-6 py-12 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <p className="text-xs uppercase tracking-widest text-rose">Bandung · sewa per acara</p>
          <h1 className="mt-4 font-display text-5xl leading-none md:text-6xl">Kostum Jaipong yang siap naik panggung.</h1>
          <p className="mt-5 max-w-sm text-muted">Busana di foto adalah set yang disewakan. Tarif mulai {rate} per acara, termasuk cek ukuran.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/catalog" className="bg-ink px-5 py-3 text-sm text-cream">Buka katalog</Link>
            <a href="https://wa.me/6281234567890" className="border border-ink px-5 py-3 text-sm">Tanya tanggal</a>
          </div>
        </div>
        <figure className="md:col-span-7">
          <img src="/imagine_images/hero_stage.jpg" alt="Penari Jaipong di panggung" className="h-auto w-full" />
          <figcaption className="mt-2 text-xs text-muted">Panggung · kostum ungu emas</figcaption>
        </figure>
      </section>
      <section className="border-y border-rose/30">
        <dl className="mx-auto grid max-w-6xl md:grid-cols-3">
          {[["01", "Koleksi", "Dua puluh lima set, dari solo sampai grup."],["02", "Perawatan", "Dicek setelah setiap pengembalian."],["03", "Jadwal", "Satu set tidak diedarkan dua kali di hari yang sama."]].map(([n, t, d]) => (
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
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 md:grid-cols-2">
        <img src="/imagine_images/catalog/c18.jpg" alt="Grup penari" className="h-auto w-full" />
        <div>
          <p className="text-xs uppercase tracking-widest text-rose">Studio</p>
          <h2 className="mt-3 font-display text-4xl">Dirawat supaya masih layak difoto.</h2>
          <p className="mt-4 text-muted">Fapong.gallery menyewakan kostum Jaipong untuk pentas, hajatan, dan dokumentasi. Kami di Bandung, dan set dikirim sesuai jumlah penari yang Anda sebutkan.</p>
          <Link to="/about" className="mt-6 inline-block text-sm underline decoration-rose underline-offset-4">Tentang studio</Link>
        </div>
      </section>
      <section className="border-t border-rose/30">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="font-display text-4xl">Jadwal dekat</h2>
          <ul className="mt-6 divide-y divide-rose/30 border-y border-rose/30">
            {events.map((event) => (
              <li key={event.title} className="flex items-center gap-6 py-4">
                <p className="w-14 shrink-0"><span className="block text-xs uppercase tracking-widest text-rose">{event.month}</span><span className="font-display text-3xl leading-none">{event.day}</span></p>
                <div><p className="font-medium">{event.title}</p><p className="text-sm text-muted">{event.place}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
