"use client";
import { useEffect, useState } from "react";

const POLL = 15_000;

/** Admin üst barındaki canlı ziyaretçi göstergesi. Panel görünürken 15 sn'de bir yenilenir. */
export function LiveVisitors() {
  const [count, setCount] = useState<number | null>(null);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    let prev: number | null = null;
    const load = async () => {
      try {
        const res = await fetch("/api/admin/presence", { cache: "no-store" });
        if (!res.ok) return;
        const { active } = (await res.json()) as { active: number };
        if (prev !== null && active !== prev) {
          setBump(true);
          setTimeout(() => setBump(false), 600);
        }
        prev = active;
        setCount(active);
      } catch {}
    };
    const start = () => {
      load();
      clearInterval(timer);
      timer = setInterval(load, POLL);
    };
    const onVis = () => (document.visibilityState === "visible" ? start() : clearInterval(timer));
    start();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const live = (count ?? 0) > 0;
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full bg-white/10 py-1.5 pl-3 pr-3.5 text-sm"
      title="Son 1 dakikada siteyi açık tutan ziyaretçi sayısı (15 sn'de bir güncellenir)"
      aria-live="polite"
    >
      <span className="relative flex size-2.5">
        {live && <span className="absolute inline-flex size-full animate-ping rounded-full bg-ws-green opacity-75" />}
        <span className={`relative inline-flex size-2.5 rounded-full ${live ? "bg-ws-green" : "bg-white/40"}`} />
      </span>
      <span className={`font-semibold tabular-nums transition-transform duration-300 ${bump ? "scale-125" : ""}`}>
        {count ?? "–"}
      </span>
      <span className="text-white/70">
        <span className="sm:hidden">aktif</span>
        <span className="hidden sm:inline">aktif ziyaretçi</span>
      </span>
    </div>
  );
}
