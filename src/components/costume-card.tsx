import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Costume } from "@/data/site";

export function CostumeCard({ item, index }: { item: Costume; index: number }) {
  const code = String(index + 1).padStart(2, "0");
  return (
    <Link data-reveal to={`/catalog/c${code}`} className="costume-card motion-card group">
      <div className="costume-card-photo">
        <span className="costume-code">FG / {code}</span>
        <img loading="lazy" decoding="async" src={item.src} alt={item.name || item.label} />
        <span className="costume-card-arrow" aria-hidden="true"><ArrowUpRight size={20} /></span>
      </div>
      <div className="pt-4">
        <h3 className="font-display text-2xl sm:text-3xl">{item.name || `Koleksi ${code}`}</h3>
        <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">{item.label}</p>
      </div>
    </Link>
  );
}
