"use client";
import { useEffect, useState } from "react";
import { Check, Headset, Home, Mic, Phone, Star } from "./icons";

/** Ses dalgası: çubuklar farklı gecikmelerle büyüyüp küçülür. */
export function Waveform({ bars = 28, className = "", color = "bg-ws-teal" }: { bars?: number; className?: string; color?: string }) {
  return (
    <div className={`flex items-center gap-[3px] ${className}`} aria-hidden>
      {Array.from({ length: bars }, (_, i) => {
        const h = 30 + ((i * 37) % 70);
        return (
          <span
            key={i}
            className={`w-[3px] origin-center animate-wave rounded-full ${color}`}
            style={{ height: `${h}%`, animationDelay: `${((i * 83) % 900) / 1000}s`, animationDuration: `${0.8 + ((i * 29) % 6) / 10}s` }}
          />
        );
      })}
    </div>
  );
}

/** Gelen arama halkaları. */
export function Ripple({ className = "" }: { className?: string }) {
  return (
    <span className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      {[0, 0.8, 1.6].map((d) => (
        <span key={d} className="absolute inset-0 animate-ripple rounded-full border-2 border-current" style={{ animationDelay: `${d}s` }} />
      ))}
    </span>
  );
}

const CALLS = [
  { name: "Ayşe K.", topic: "Watsons Club puanları" },
  { name: "Mehmet T.", topic: "Online sipariş takibi" },
  { name: "Zeynep A.", topic: "Ürün önerisi" },
  { name: "Can D.", topic: "İade & değişim" },
];

const CHAT = [
  { me: false, text: "Merhaba, siparişim ne zaman gelir?" },
  { me: true, text: "Hemen kontrol ediyorum, yarın kapınızda olacak 😊" },
  { me: false, text: "Harika, çok teşekkürler!" },
];

const pad = (n: number) => String(n).padStart(2, "0");

/** Hero illüstrasyonu: canlı görüşme ekranı ve etrafında çağrı merkezi kartları. */
export function HeroArt() {
  const [sec, setSec] = useState(42);
  const [call, setCall] = useState(0);
  const [msgs, setMsgs] = useState(1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMsgs(CHAT.length);
      return;
    }
    const t = setInterval(() => setSec((s) => s + 1), 1000);
    const c = setInterval(() => setCall((i) => (i + 1) % CALLS.length), 3600);
    const m = setInterval(() => setMsgs((n) => (n >= CHAT.length ? 1 : n + 1)), 2200);
    return () => {
      clearInterval(t);
      clearInterval(c);
      clearInterval(m);
    };
  }, []);

  const incoming = CALLS[call];

  return (
    <div className="relative mx-auto w-full max-w-[540px] pb-8 pt-16" aria-hidden>
      {/* arka plan halkaları */}
      <div className="absolute left-1/2 top-1/2 -z-0 size-[120%] -translate-x-1/2 -translate-y-1/2 text-white/15">
        <svg viewBox="0 0 400 400" className="size-full animate-spin-slow">
          {[80, 120, 160, 196].map((r, i) => (
            <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray={i % 2 ? "2 10" : "none"} />
          ))}
        </svg>
      </div>

      {/* Görüşme ekranı */}
      <div className="relative mx-auto w-[86%] rounded-[28px] bg-white p-5 text-ws-ink shadow-[0_30px_80px_rgba(0,38,44,.35)] sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ws-green opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-ws-green" />
            </span>
            <span className="text-[13px] font-extrabold">Hatta</span>
          </div>
          <span className="rounded-full bg-ws-teal-50 px-2.5 py-1 text-[12px] font-extrabold tabular-nums text-ws-teal-700">
            {pad(Math.floor(sec / 60))}:{pad(sec % 60)}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <span className="relative grid size-16 shrink-0 place-items-center rounded-full bg-ws-teal text-white">
            <Ripple className="text-ws-teal" />
            <Headset className="relative size-8" />
          </span>
          <div className="min-w-0">
            <p className="text-[12px] font-bold uppercase tracking-wider text-ws-gray-600">Watsons Müşteri Hattı</p>
            <p className="truncate text-lg font-extrabold">Müşteri Temsilcisi · Sen</p>
          </div>
        </div>

        <Waveform className="mt-5 h-12" />

        <div className="mt-5 flex min-h-[128px] flex-col gap-2">
          {CHAT.slice(0, msgs).map((m, i) => (
            <p
              key={`${i}-${msgs}`}
              className={`max-w-[85%] animate-slide-up rounded-2xl px-3.5 py-2 text-[13px] font-semibold leading-snug ${
                m.me ? "self-end rounded-br-md bg-ws-teal text-white" : "self-start rounded-bl-md bg-ws-gray-100"
              }`}
            >
              {m.text}
            </p>
          ))}
          {msgs < CHAT.length && (
            <span className={`flex w-fit gap-1 rounded-2xl px-3.5 py-3 ${CHAT[msgs].me ? "self-end bg-ws-teal-50" : "self-start bg-ws-gray-100"}`}>
              {[0, 0.15, 0.3].map((d) => (
                <span key={d} className="size-1.5 animate-typing rounded-full bg-ws-gray-600" style={{ animationDelay: `${d}s` }} />
              ))}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-center gap-3 border-t border-ws-gray-100 pt-4">
          <span className="grid size-10 place-items-center rounded-full bg-ws-gray-100 text-ws-gray-600"><Mic className="size-5" /></span>
          <span className="grid size-12 place-items-center rounded-full bg-ws-red text-white"><Phone className="size-5 rotate-[135deg]" /></span>
          <span className="grid size-10 place-items-center rounded-full bg-ws-gray-100 text-ws-gray-600"><Check className="size-5" /></span>
        </div>
      </div>

      {/* Gelen arama bildirimi (döngüsel) */}
      <div className="absolute -left-1 top-0 z-10 animate-float sm:-left-6">
        <div key={call} className="flex animate-slide-up items-center gap-3 rounded-2xl bg-white py-2.5 text-ws-ink pl-2.5 pr-4 shadow-[0_12px_32px_rgba(0,38,44,.28)]">
          <span className="relative grid size-10 place-items-center rounded-full bg-ws-green text-white">
            <Ripple className="text-ws-green" />
            <Phone className="relative size-5 animate-ring" />
          </span>
          <span className="leading-tight">
            <span className="block text-[11px] font-bold uppercase tracking-wide text-ws-gray-600">Gelen arama</span>
            <span className="block text-[13px] font-extrabold">{incoming.name} · {incoming.topic}</span>
          </span>
        </div>
      </div>

      {/* Evden çalış */}
      <div className="absolute -right-1 top-[38%] animate-float sm:-right-5" style={{ animationDelay: "1.4s" }}>
        <div className="flex items-center gap-2.5 rounded-2xl bg-ws-ink py-2.5 pl-2.5 pr-4 text-white shadow-[0_12px_32px_rgba(0,38,44,.35)]">
          <span className="grid size-9 place-items-center rounded-xl bg-ws-yellow text-ws-ink"><Home className="size-5" /></span>
          <span className="text-[13px] font-extrabold leading-tight">Evden<br />çalış</span>
        </div>
      </div>

      {/* Çağrı çözüldü */}
      <div className="absolute -bottom-1 left-0 animate-float sm:-left-4" style={{ animationDelay: "2.6s" }}>
        <div className="flex items-center gap-3 rounded-2xl bg-white py-2.5 pl-2.5 pr-4 text-ws-ink shadow-[0_12px_32px_rgba(0,38,44,.28)]">
          <span className="grid size-9 place-items-center rounded-xl bg-ws-teal-50 text-ws-teal-700"><Check className="size-5" strokeWidth={3} /></span>
          <span className="leading-tight">
            <span className="block text-[13px] font-extrabold">Çağrı çözüldü</span>
            <span className="mt-0.5 flex gap-0.5 text-ws-yellow">
              {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="size-3.5" fill="currentColor" strokeWidth={0} />)}
            </span>
          </span>
        </div>
      </div>

      {/* Deneyim şartı yok */}
      <div className="absolute -bottom-2 right-1 animate-float sm:right-0" style={{ animationDelay: "0.7s" }}>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-ws-red px-3.5 py-2 text-[12px] font-extrabold text-white shadow-[0_10px_24px_rgba(237,46,37,.35)]">
          Deneyim şartı yok
        </span>
      </div>
    </div>
  );
}
