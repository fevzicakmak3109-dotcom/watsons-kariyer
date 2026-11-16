"use client";
import { useEffect, useState } from "react";
import { ArrowRight } from "./icons";

/** Mobilde ekranın altında sabit duran "Hemen başvur" butonu.
 *  Başvuru formu veya footer görünürken gizlenir (form zaten ekranda). */
export function MobileApplyButton() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const targets = [document.getElementById("basvuru"), document.querySelector("footer")].filter(
      (el): el is HTMLElement => !!el,
    );
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setHidden(visible.size > 0);
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-4 z-40 transition-all duration-300 md:hidden ${
        hidden ? "pointer-events-none translate-y-6 opacity-0" : "translate-y-0 opacity-100"
      }`}
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
      aria-hidden={hidden}
    >
      <a
        href="#basvuru"
        tabIndex={hidden ? -1 : 0}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-ws-teal-600 py-4 text-base font-extrabold text-white shadow-[0_10px_30px_rgba(0,56,64,0.35)] ring-1 ring-white/20 transition active:scale-[0.98]"
      >
        Hemen başvur <ArrowRight className="size-5" />
      </a>
    </div>
  );
}
