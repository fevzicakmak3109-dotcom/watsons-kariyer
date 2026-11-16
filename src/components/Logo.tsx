"use client";
import { useState } from "react";

/** Watsons logosu. Watsons'ın kendi CDN'inden yüklenir; yüklenemezse yazı logosu gösterilir. */
export const WATSONS_LOGO_URL =
  "https://media.watsons.com.tr/medias/sys_master/images/h25/h74/14868306952222/logowatsons/logowatsons.png";

export function WatsonsLogo({ className = "h-8", white = false }: { className?: string; white?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <span className={`${white ? "rounded-xl bg-white px-2.5 py-0.5 " : ""}inline-flex items-center text-[1.6em] font-black lowercase tracking-[-0.03em] text-ws-teal`} aria-label="Watsons">
        watsons
      </span>
    );
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={WATSONS_LOGO_URL}
      alt="Watsons"
      width={500}
      height={150}
      onError={() => setFailed(true)}
      className={`w-auto select-none ${className}`}
      draggable={false}
    />
  );
  // Logo turkuaz zeminli olduğu için koyu/renkli zeminlerde beyaz bir kartın içinde gösterilir.
  return white ? <span className="inline-flex rounded-xl bg-white px-2.5 py-1.5 shadow-sm">{img}</span> : img;
}
