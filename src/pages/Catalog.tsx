import { Link } from "react-router-dom";
import { costumes, rate } from "@/data/content";

export function CatalogPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-xs uppercase tracking-widest text-rose">Katalog</p>
      <p className="mt-2 max-w-xs text-sm text-muted">Tarif {rate} per acara. Ukuran disesuaikan per penari.</p>
      <div className="mt-10 grid grid-cols-2 items-start gap-x-5 gap-y-10 md:grid-cols-3">
        {costumes.map((item, index) => (
          <Link key={item.src} to={`/catalog/c${String(index + 1).padStart(2, "0")}`} className="row-span-4 grid grid-rows-subgrid gap-y-1">
            <img src={item.src} alt={item.name} className="h-auto w-full self-end" />
            <p className="pt-3 text-xs tracking-widest text-rose">{String(index + 1).padStart(2, "0")}</p>
            <h2 className="font-display text-2xl leading-tight">{item.name}</h2>
            <p className="text-sm text-muted">{item.note}</p>
          </Link>
        ))}
      </div>
      <p className="mt-12 text-sm text-muted">
        Tanggal dan jumlah penari dikonfirmasi lewat{" "}
        <Link to="/contact" className="text-ink underline decoration-rose underline-offset-4">kontak</Link>.
      </p>
    </main>
  );
}
