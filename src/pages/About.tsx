import { Link } from "react-router-dom";

const points = [
  ["Simpan yang masih dipakai", "Set di katalog adalah busana yang beredar, bukan konsep."],
  ["Teruskan ke penari muda", "Lokakarya di studio terbuka untuk sekolah dan sanggar."],
  ["Jawa Barat, dijelaskan pelan", "Kami ceritakan busananya seadanya, tanpa mengada-ada sejarah."],
];

export function AboutPage() {
  return (
    <main>
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-12 md:flex-row">
        <div className="w-full md:w-1/2 md:translate-y-12">
          <p className="text-xs uppercase tracking-widest text-rose">Tentang</p>
          <h1 className="mt-2 font-display text-5xl leading-tight">Studio sewa, bukan etalase.</h1>
          <p className="mt-4 text-muted">
            Fapong.gallery ada supaya kostum Jaipong tetap naik panggung: hajatan, sekolah, dan pentas kota. Kami berbasis di Karawang, depan Rumah Beras And 27.
          </p>
          <p className="mt-4 text-muted">
            Foto di situs ini diambil dari set yang sama. Kalau sebuah busana sedang dijahit, kami tidak menawarkannya untuk tanggal itu.
          </p>
        </div>
        <img src="/imagine_images/catalog/c12.jpg" alt="Grup kostum hijau putih" className="ml-auto block h-auto max-h-[72vh] w-auto max-w-full md:w-1/2" />
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
        <Link to="/contact" className="underline decoration-rose underline-offset-4">Hubungi studio</Link>
      </p>
    </main>
  );
}
