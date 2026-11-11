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
          <img src="/logo.svg" alt="Fapong Gallery" className="h-14 w-14 object-contain sm:h-16 sm:w-16" />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => (isActive ? "text-sm text-ink" : "text-sm text-muted")}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Link to="/contact" className="hidden bg-ink px-4 py-2 text-sm text-cream md:inline-flex">
          Sewa kostum
        </Link>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open ? (
        <nav className="border-t border-rose/30 px-6 py-3 md:hidden">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => (isActive ? "block py-3 text-base text-ink" : "block py-3 text-base text-muted")}
              onClick={() => setOpen(false)}
            >
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
    <>
      <footer className="border-t border-rose/30">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
          <div>
            <p className="font-display text-3xl">Fapong.gallery</p>
            <p className="mt-2 max-w-xs text-sm text-muted">Sewa kostum Jaipong di Karawang. Set yang sama dengan foto katalog.</p>
          </div>
          <div className="text-sm">
            <p className="text-muted">Studio</p>
            <p className="mt-2">Fapong Gallery</p>
            <p>Karawang Kulon, Karawang Barat</p>
            <div className="mt-3 flex gap-2">
              <a href="https://www.instagram.com/fapong.gallery/" aria-label="Instagram" className="inline-flex h-10 w-10 items-center justify-center border border-rose/40 text-ink">
                <InstagramIcon />
              </a>
              <a href="https://wa.me/6285771244199?text=Halo%20Fapong.gallery%2C%20saya%20ingin%20bertanya%20tentang%20sewa%20kostum%20Jaipong.%0A%0ATanggal%20acara%3A%20%0AJumlah%20penari%3A%20%0ASet%20yang%20diminati%3A%20" aria-label="WhatsApp" className="inline-flex h-10 w-10 items-center justify-center border border-rose/40 text-ink">
                <WhatsAppIcon />
              </a>
            </div>
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
      <a href="https://wa.me/6285771244199?text=Halo%20Fapong.gallery%2C%20saya%20ingin%20bertanya%20tentang%20sewa%20kostum%20Jaipong.%0A%0ATanggal%20acara%3A%20%0AJumlah%20penari%3A%20%0ASet%20yang%20diminati%3A%20" aria-label="Chat WhatsApp" className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg">
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.4a10 10 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.76 13.9c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.41-.14-.95-.31-1.64-.61-2.89-1.25-4.77-4.16-4.91-4.35-.14-.19-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.27.64-.39 1.02-.39.12 0 .23 0 .33.01.3.01.45.03.65.5.24.58.82 2 .89 2.15.07.14.12.32.02.51-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.56.16.27.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.6-.07.17-.19.69-.8.87-1.08.19-.27.37-.23.62-.14.26.09 1.62.76 1.9.9.28.14.46.21.53.32.07.12.07.68-.17 1.36z" />
    </svg>
  );
}
