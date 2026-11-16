"use client";
import { useEffect, useState } from "react";
import { WatsonsLogo } from "./Logo";
import { Close, Menu, Phone } from "./icons";

const LINKS = [
  { href: "#is-tanimi", label: "İş Tanımı" },
  { href: "#avantajlar", label: "Avantajlar" },
  { href: "#surec", label: "Süreç" },
  { href: "#sss", label: "SSS" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow ${scrolled ? "shadow-[0_1px_0_#dfe5e7,0_6px_20px_rgba(0,56,64,.06)]" : ""}`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3" aria-label="Watsons Kariyer ana sayfa">
          <WatsonsLogo className="h-7 sm:h-8" />
          <span className="hidden h-6 w-px bg-ws-gray-200 sm:block" />
          <span className="hidden text-[15px] font-bold text-ws-gray-600 sm:inline">Kariyer</span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="rounded-full px-4 py-2 text-[15px] font-bold text-ws-gray-800 transition hover:bg-ws-teal-50 hover:text-ws-teal-700">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href="#basvuru" className="hidden items-center gap-2 rounded-full bg-ws-teal-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-ws-teal-700 sm:inline-flex">
            <Phone className="size-4 animate-ring" /> Hemen Başvur
          </a>
          <button
            className="grid size-10 place-items-center rounded-full text-ws-ink hover:bg-ws-teal-50 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-white px-4 pb-8 md:hidden">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-ws-gray-200 py-5 text-2xl font-extrabold text-ws-ink">
              {l.label}
            </a>
          ))}
          <a href="#basvuru" onClick={() => setOpen(false)} className="btn-primary mt-auto w-full py-4 text-base">
            Hemen Başvur
          </a>
        </div>
      )}
    </header>
  );
}
