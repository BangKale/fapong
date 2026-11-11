import { Link } from "react-router-dom";
import { useSite } from "@/data/site";

export function CatalogPage() {
  const { costumes } = useSite();
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-xs uppercase tracking-widest text-rose">Katalog</p>
      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
        {costumes.map((item, index) => (
          <Link key={item.src} to={`/catalog/c${String(index + 1).padStart(2, "0")}`} className="flex h-full flex-col justify-end">
            <img src={item.src} alt={item.label} className="h-auto w-full" />
            <div className="flex min-h-28 flex-col items-center justify-center bg-rose/15 px-3 pb-7 pt-3 text-center">
              <p className="text-[11px] tracking-widest text-rose">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-1 text-sm font-medium leading-snug">{item.label}</h2>
            </div>
          </Link>
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
