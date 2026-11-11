import { Search, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { CostumeCard } from "@/components/costume-card";
import { useSite } from "@/data/site";

const categories = ["Semua", "Tunggal", "Duo", "Rampak"];
export function CatalogPage() {
  const { costumes } = useSite();
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const category = categories.includes(params.get("kategori") || "") ? params.get("kategori")! : "Semua";
  function update(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (!value || value === "Semua") next.delete(key); else next.set(key,value);
    setParams(next, { replace: true });
  }
  const items = costumes.map((item,index)=>({item,index})).filter(({item,index})=>{
    const text = `${item.name} ${item.label} ${item.note} ${String(index+1).padStart(2,"0")}`.toLowerCase();
    return text.includes(query.trim().toLowerCase()) && (category === "Semua" || item.label.toLowerCase().includes(category.toLowerCase()));
  });
  return (
    <main id="main-content" className="site-width section-space">
      <div data-reveal className="section-heading"><div><p className="eyebrow">The costume collection</p><h1 className="section-title">Temukan <em>pesonamu.</em></h1></div><p className="max-w-sm text-sm leading-7 text-muted">Warna, detail, dan karakter untuk setiap penampilan. Pilih kostum favoritmu, lalu tanyakan ketersediaan tanggalnya.</p></div>
      <div className="catalog-controls">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Jenis kostum">{categories.map(c=><button type="button" key={c} aria-pressed={c===category} className={`filter-chip ${c===category?'is-active':''}`} onClick={()=>update('kategori',c)}>{c}</button>)}</div>
        <label className="catalog-search"><Search size={18} aria-hidden="true" /><span className="sr-only">Cari kostum</span><input type="search" placeholder="Cari warna, nama, atau nomor…" value={query} onChange={e=>update('q',e.target.value)} /></label>
      </div>
      <p className="mb-6 text-xs tracking-wide text-muted" role="status">{items.length} koleksi{category!=="Semua"?` · ${category}`:""}</p>
      {items.length ? <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-14">{items.map(({item,index})=><CostumeCard key={item.id || item.src} item={item} index={index} />)}</div> : <div className="empty-catalog"><Search size={28} className="mx-auto text-rose" /><h2 className="mt-5 font-display text-3xl">Belum ada yang cocok.</h2><p className="mt-3 text-sm text-muted">Coba nama, warna, atau jenis kostum lainnya.</p><button type="button" className="text-link mt-6" onClick={()=>setParams({})}>Hapus pencarian dan filter <X size={16} /></button></div>}
      <p className="mt-12 border-t border-rose/25 pt-6 text-sm text-muted">Ukuran, kelengkapan, harga sewa, dan ketersediaan tanggal dikonfirmasi lewat WhatsApp pada halaman kostum.</p>
    </main>
  );
}
