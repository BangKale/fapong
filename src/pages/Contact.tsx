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
              <a className="underline decoration-rose underline-offset-4" href="https://www.instagram.com/fapong.gallery/">
                @fapong.gallery
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted">Lokasi</dt>
            <dd>
              <a className="underline decoration-rose underline-offset-4" href="https://www.google.com/maps/place/Rumah+Beras+And+27/@-6.3128246,107.2911568,17z">
                Depan Rumah Beras And 27
              </a>
              <span className="mt-1 block text-muted">
                Jalan Bunut Kertayasa, Karawang Kulon, Karawang Barat, Jawa Barat 41311
              </span>
            </dd>
          </div>
        </dl>
      </div>
      <form onSubmit={send} className="border border-rose/30 bg-paper p-6">
        <label className="block text-sm" htmlFor="name">Nama</label>
        <input id="name" required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full border border-rose/40 bg-cream px-3 py-3" />
        <label className="mt-4 block text-sm" htmlFor="note">Tanggal, jumlah penari, dan set yang diminati</label>
        <textarea id="note" required rows={5} value={note} onChange={(e) => setNote(e.target.value)} className="mt-1 w-full border border-rose/40 bg-cream px-3 py-3" />
        <button type="submit" className="mt-5 w-full bg-ink py-3 text-sm text-cream">Lanjut ke WhatsApp</button>
        <p className="mt-3 text-xs text-muted">Pesan terbuka di WhatsApp. Tidak disimpan di situs.</p>
      </form>
    </main>
  );
}
