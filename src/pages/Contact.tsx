import { useState, type FormEvent } from "react";

export function ContactPage() {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  function send(event: FormEvent) {
    event.preventDefault();
    const text = `Halo Fapong.gallery, saya ${name || "calon penyewa"}. ${note}`.trim();
    window.open(`https://wa.me/6285771244199?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-6 py-12 md:grid-cols-2">
      <ol className="grid gap-8 border-b border-rose/30 pb-10 md:col-span-2 md:grid-cols-3">
        {[
          ["01", "Pilih set", "Buka katalog, lalu catat nomor dan nama kostumnya."],
          ["02", "Kirim tanggal", "Sebutkan tanggal acara dan jumlah penari lewat WhatsApp."],
          ["03", "Ambil di studio", "Pengambilan di depan Rumah Beras, Jalan Bunut Kertayasa."],
        ].map(([n, title, copy]) => (
          <li key={n}>
            <p className="text-xs tracking-widest text-rose">{n}</p>
            <h2 className="mt-2 font-display text-3xl">{title}</h2>
            <p className="mt-2 text-sm text-muted">{copy}</p>
          </li>
        ))}
      </ol>
      <div>
        <p className="text-xs uppercase tracking-widest text-rose">Kontak</p>
        <h1 className="mt-2 font-display text-5xl">Sebutkan tanggal dan jumlah penari.</h1>
        <dl className="mt-8 space-y-4 text-sm">
          <div>
            <dt className="text-muted">WhatsApp</dt>
            <dd>
              <a className="underline decoration-rose underline-offset-4" href="https://wa.me/6285771244199">
                +62 857-7124-4199
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted">Instagram</dt>
            <dd>
              <a
                className="underline decoration-rose underline-offset-4"
                href="https://www.instagram.com/fapong.gallery/"
              >
                @fapong.gallery
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted">Lokasi</dt>
            <dd>
              <a
                className="underline decoration-rose underline-offset-4"
                href="https://www.google.com/maps/search/?api=1&query=-6.3128246,107.2911568"
              >
                Depan Rumah Beras
              </a>
              <span className="mt-1 block text-muted">
                Jalan Bunut Kertayasa, Karawang Kulon, Karawang Barat, Jawa Barat 41311
              </span>
            </dd>
          </div>
        </dl>
      </div>
      <form onSubmit={send} className="border border-rose/30 bg-paper p-6">
        <label className="block text-sm" htmlFor="name">
          Nama
        </label>
        <input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full border border-rose/40 bg-cream px-3 py-3"
        />
        <label className="mt-4 block text-sm" htmlFor="note">
          Tanggal, jumlah penari, dan set yang diminati
        </label>
        <textarea
          id="note"
          required
          rows={5}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-1 w-full border border-rose/40 bg-cream px-3 py-3"
        />
        <button type="submit" className="mt-5 w-full bg-ink py-3 text-sm text-cream">
          Lanjut ke WhatsApp
        </button>
        <p className="mt-3 text-xs text-muted">Pesan terbuka di WhatsApp. Tidak disimpan di situs.</p>
      </form>
      <section className="md:col-span-2">
        <p className="text-xs uppercase tracking-widest text-rose">Peta</p>
        <h2 className="mt-2 font-display text-3xl">Depan Rumah Beras</h2>
        <p className="mt-2 text-sm text-muted">
          Jalan Bunut Kertayasa, Karawang Kulon, Karawang Barat, Jawa Barat 41311
        </p>
        <iframe
          title="Peta Fapong.gallery, depan Rumah Beras di Jalan Bunut Kertayasa"
          src="https://maps.google.com/maps?q=-6.3128246,107.2911568&z=17&hl=id&output=embed"
          className="mt-4 h-80 w-full border border-rose/30"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </main>
  );
}
