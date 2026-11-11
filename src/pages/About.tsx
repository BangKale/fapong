import { Link } from "react-router-dom";

const points = [
  ["Sejak 2021", "Fapong.gallery merawat kostum Jaipong agar tetap layak naik panggung."],
  ["Satu foto, satu set", "Gambar di katalog adalah busana yang sama dengan yang disewakan."],
  ["Karawang", "Studio berada di Fapong Gallery. Jadwal diatur lewat WhatsApp."],
];

export function AboutPage() {
  return (
    <main id="main-content">
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-12 md:flex-row">
        <div className="w-full md:w-1/2 md:translate-y-12">
          <p className="text-xs uppercase tracking-widest text-rose">Fapong.gallery · 2021</p>
          <h1 className="mt-2 font-display text-5xl leading-tight">Kostum Jaipong untuk panggung.</h1>
          <p className="mt-4 text-muted">
            Fapong.gallery berdiri pada tahun 2021 di Karawang. Kami menyewakan kostum Jaipong untuk hajatan, sekolah, dan pentas.
          </p>
          <p className="mt-4 text-muted">
            Nama ini dipakai sejak awal sebagai studio sewa, bukan toko. Set yang sedang diperbaiki tidak kami tawarkan untuk tanggal yang sama.
          </p>
        </div>
        <div className="flex w-full justify-end md:w-1/2">
          <div className="relative w-fit max-w-full overflow-hidden">
            <img
              src="/imagine_images/catalog/c12.jpg"
              alt="Grup kostum hijau putih"
              className="mb-[-7%] block h-auto max-h-[72vh] w-auto max-w-full object-contain"
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-2/5"
              style={{ background: "linear-gradient(to right, transparent, rgb(255 253 251 / 0.92))" }}
            />
          </div>
        </div>
      </section>
      <section className="border-t border-rose/30">
        <ol className="mx-auto grid max-w-6xl md:grid-cols-3">
          {points.map(([title, copy], i) => (
            <li key={title} className="border-t border-rose/30 px-6 py-8 md:border-t-0 md:border-l first:md:border-l-0">
              <p className="text-xs text-rose">0{i + 1}</p>
              <h2 className="mt-2 font-display text-3xl">{title}</h2>
              <p className="mt-2 text-sm text-muted">{copy}</p>
            </li>
          ))}
        </ol>
      </section>
      <p className="mx-auto max-w-6xl px-6 py-12 text-sm">
        <Link to="/contact" className="underline decoration-rose underline-offset-4">
          Hubungi Fapong.gallery
        </Link>
      </p>
    </main>
  );
}
