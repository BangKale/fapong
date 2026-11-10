import { Link } from "react-router-dom";
import { costumes, rate } from "@/data/content";

export function CatalogPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-xs uppercase tracking-widest text-rose">Katalog</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-5xl">Dua puluh lima set</h1>
        <p className="max-w-xs text-sm text-muted">Tarif {rate} per acara. Ukuran disesuaikan per penari.</p>
      </div>
      <div className="mt-10 grid grid-cols-2 items-start gap-x-5 gap-y-10 md:grid-cols-3">
        {costumes.map((item, index) => (
          <article key={item.src} className="row-span-4 grid grid-rows-subgrid gap-y-1">
            <img src={item.src} alt={item.name} className="h-auto w-full self-end" />
            <p className="pt-3 text-xs tracking-widest text-rose">{String(index + 1).padStart(2, "0")}</p>
            <h2 className="font-display text-2xl leading-tight">{item.name}</h2>
            <p className="text-sm text-muted">{item.note}</p>
          </article>
        ))}
      </div>
      <p className="mt-12 text-sm text-muted">
        Tanggal dan jumlah penari dikonfirmasi lewat{" "}
        <Link to="/contact" className="text-ink underline decoration-rose underline-offset-4">
          kontak
        </Link>
        .
      </p>
    </main>
  );
}
