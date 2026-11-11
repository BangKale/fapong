import { ArrowDown, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { CostumeCard } from "@/components/costume-card";
import { useSite } from "@/data/site";

const steps = [
  ["01", "Temukan pesonamu", "Jelajahi katalog dan pilih kostum yang sesuai dengan penampilanmu."],
  ["02", "Ceritakan rencanamu", "Kirim nomor set, tanggal acara, dan jumlah penari melalui WhatsApp. Konfirmasikan ukuran serta ketersediaannya."],
  ["03", "Bersiap naik panggung", "Atur jadwal pengambilan kostum bersama kami di studio Fapong Gallery, Karawang."],
];

export function Home() {
  const { costumes, featured, hero } = useSite();
  return (
    <main id="main-content">
      <section className="gallery-hero">
        <img src={hero} alt="" fetchPriority="high" className="gallery-hero-photo" />
        <div className="gallery-hero-shade" />
        <div className="site-width gallery-hero-content">
          <div data-reveal className="max-w-2xl">
            <p className="eyebrow text-[#ead8ba]">Fapong Gallery / Karawang</p>
            <h1 className="hero-title">Setiap gerak,<br />sebuah <em>pesona.</em></h1>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/80 sm:text-base">Sewa kostum Jaipong untuk momen yang layak dikenang. Dari panggung tunggal hingga harmoni rampak.</p>
            <Link to="/catalog" className="button-light mt-8">Jelajahi koleksi <ArrowUpRight size={18} /></Link>
          </div>
          <div className="hero-bottom"><span>TRADISI DALAM SETIAP DETAIL</span><a href="#pilihan" aria-label="Lihat koleksi pilihan"><ArrowDown size={18} /></a><span className="hidden sm:block">EST. 2021</span></div>
        </div>
      </section>

      <div className="collection-strip"><span>TUNGGAL</span><i /> <span>DUO</span><i /><span>RAMPAK</span><i /><span>KARAWANG</span></div>

      <section id="pilihan" className="site-width section-space">
        <div data-reveal className="section-heading">
          <div><p className="eyebrow">Dipilih untuk panggungmu</p><h2 className="section-title">Koleksi <em>pilihan.</em></h2></div>
          <Link to="/catalog" className="text-link">Lihat semua koleksi <ArrowUpRight size={17} /></Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-7">
          {featured.map((item) => <CostumeCard key={item.id || item.src} item={item} index={costumes.findIndex(c => c.src === item.src)} />)}
        </div>
      </section>

      <section className="story-section">
        <div className="site-width grid items-center gap-12 py-16 md:grid-cols-2 md:gap-20 md:py-24">
          <div data-reveal className="story-photo"><img loading="lazy" decoding="async" src="/imagine_images/catalog/c12.jpg" alt="Kostum Jaipong hijau putih untuk penampilan rampak" /><span>WARNA. GERAK. CERITA.</span></div>
          <div data-reveal><p className="eyebrow">Lebih dekat dengan Fapong</p><h2 className="section-title">Tradisi yang hidup.<br /><em>Pesona yang terasa.</em></h2><p className="mt-6 text-muted leading-8">Sejak 2021, Fapong Gallery menjadi bagian dari cerita panggung di Karawang. Kami menyewakan kostum Jaipong untuk hajatan, acara sekolah, dan pentas—dari satu penari hingga satu kelompok.</p><p className="mt-4 text-muted leading-8">Foto dalam katalog menampilkan kostum yang disewakan. Pilih warna dan set yang kamu sukai, lalu diskusikan kebutuhan penampilanmu bersama kami.</p><Link to="/about" className="text-link mt-7">Cerita Fapong Gallery <ArrowRight size={17} /></Link></div>
        </div>
      </section>

      <section className="site-width section-space">
        <div data-reveal className="section-heading"><div><p className="eyebrow">Dari pilihan ke penampilan</p><h2 className="section-title">Tiga langkah <em>mudah.</em></h2></div><p className="max-w-xs text-sm text-muted leading-6">Kami bantu kamu memilih set dan menyiapkan kebutuhan kostum melalui WhatsApp.</p></div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">{steps.map(([number,title,copy])=><article data-reveal key={number} className="rental-step"><span>{number}</span><h3 className="mt-6 font-display text-3xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted">{copy}</p></article>)}</div>
      </section>

      <section className="studio-banner"><div data-reveal className="site-width flex flex-col justify-between gap-8 py-14 md:flex-row md:items-center"><div><p className="eyebrow text-[#d6bd95]">Sewa kostum Jaipong di Karawang</p><h2 className="mt-3 font-display text-4xl sm:text-5xl">Cerita panggungmu dimulai di sini.</h2><p className="mt-5 flex max-w-xl items-start gap-3 text-sm leading-7 text-white/65"><MapPin size={18} className="mt-1 shrink-0" />Jl. HOS Cokroaminoto No.4, Karawang Kulon, Kec. Karawang Bar., Karawang, Jawa Barat 41311</p></div><Link to="/contact" className="button-light shrink-0 self-start md:self-center">Kunjungi studio <ArrowUpRight size={18} /></Link></div></section>
    </main>
  );
}
