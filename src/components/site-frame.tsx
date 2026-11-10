import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { nav } from "@/data/content";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-rose/30 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-2">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <img src="/logo.svg" alt="Fapong Gallery" className="h-24 w-24 object-contain sm:h-32 sm:w-32" />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"} className={({ isActive }) => (isActive ? "text-sm text-ink" : "text-sm text-muted")}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Link to="/contact" className="hidden bg-ink px-4 py-2 text-sm text-cream md:inline-flex">Sewa kostum</Link>
        <button type="button" className="inline-flex h-11 w-11 items-center justify-center md:hidden" aria-expanded={open} aria-label={open ? "Tutup menu" : "Buka menu"} onClick={() => setOpen((v) => !v)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open ? (
        <nav className="border-t border-rose/30 px-6 py-3 md:hidden">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"} className={({ isActive }) => (isActive ? "block py-3 text-base text-ink" : "block py-3 text-base text-muted")} onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-rose/30">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl">Fapong.gallery</p>
          <p className="mt-2 max-w-xs text-sm text-muted">Sewa kostum Jaipong di Karawang. Set yang sama dengan foto katalog.</p>
        </div>
        <div className="text-sm">
          <p className="text-muted">Studio</p>
          <p className="mt-2">Depan Rumah Beras</p>
          <p>Karawang Kulon, Karawang Barat</p>
          <a className="mt-2 inline-block underline decoration-rose underline-offset-4" href="https://www.instagram.com/fapong.gallery/">Instagram</a>
          <a className="mt-2 block underline decoration-rose underline-offset-4" href="https://wa.me/6285771244199">WhatsApp</a>
        </div>
        <div className="text-sm">
          <p className="text-muted">Halaman</p>
          <div className="mt-2 flex flex-col gap-1">
            {nav.map((item) => (
              <Link key={item.to} to={item.to} className="hover:text-rose">{item.label}</Link>
            ))}
          </div>
        </div>
      </div>
      <p className="border-t border-rose/20 px-6 py-4 text-center text-xs text-muted">© 2026 Fapong.gallery</p>
    </footer>
  );
}
