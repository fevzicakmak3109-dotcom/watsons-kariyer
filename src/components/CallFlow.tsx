"use client";
import { useEffect, useState } from "react";
import { Check, Headset, Phone, Star } from "./icons";
import { Ripple, Waveform } from "./HeroArt";

const STEPS = [
  { title: "Telefon çalar", text: "Bir Watsons müşterisi yardım için arar." },
  { title: "Dinlersin", text: "Sabırla dinler, ihtiyacını anlarsın." },
  { title: "Çözersin", text: "Eğitimde öğrendiklerinle çözümü bulursun." },
  { title: "Müşteri gülümser", text: "Bir çağrı, bir gülümseme. Günün böyle geçer." },
];

/** "Bir çağrının yolculuğu": adımlar sırayla canlanır. */
export function CallFlow() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden bg-ws-teal-900 py-20 text-white sm:py-28">
      <Waveform bars={90} color="bg-ws-teal" className="pointer-events-none absolute inset-x-0 top-1/2 h-40 -translate-y-1/2 justify-between px-2 opacity-[0.12]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-ws-teal-200">Bir çağrının yolculuğu</p>
        <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-[-0.03em] sm:text-5xl">Bir çağrı, bir gülümseme.</h2>
        <p className="mt-4 max-w-xl text-lg font-medium text-white/75">Müşteri Temsilcisi olarak gününün nasıl geçeceğini merak ediyor musun? Kısaca böyle.</p>

        <ol className="relative mt-14 grid gap-4 md:grid-cols-4">
          {/* ilerleme çizgisi */}
          <div className="absolute left-[39px] right-[39px] top-10 hidden h-1 rounded-full bg-white/10 md:block" aria-hidden>
            <div className="h-full rounded-full bg-ws-teal transition-all duration-700" style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }} />
          </div>
          {STEPS.map((s, i) => {
            const active = i === step;
            const done = i < step;
            return (
              <li
                key={s.title}
                className={`relative rounded-3xl p-5 transition duration-500 ${active ? "bg-white text-ws-ink shadow-[0_20px_50px_rgba(0,0,0,.3)] md:-translate-y-2" : "bg-white/5"}`}
              >
                <span
                  className={`relative grid size-14 place-items-center rounded-full transition duration-500 ${
                    active ? "bg-ws-teal text-white" : done ? "bg-ws-teal-600 text-white" : "bg-ws-teal-800 text-ws-teal-200"
                  }`}
                >
                  {active && i === 0 && <Ripple className="text-ws-teal" />}
                  {i === 0 && <Phone className={`relative size-6 ${active ? "animate-ring" : ""}`} />}
                  {i === 1 && <Headset className="size-6" />}
                  {i === 2 && <Check className="size-6" strokeWidth={3} />}
                  {i === 3 && <Star className="size-6" fill={active ? "currentColor" : "none"} />}
                </span>
                <p className={`mt-5 text-sm font-extrabold ${active ? "text-ws-teal-700" : "text-ws-teal-200"}`}>0{i + 1}</p>
                <h3 className="mt-1 text-xl font-black">{s.title}</h3>
                <p className={`mt-1.5 text-[15px] font-medium leading-relaxed ${active ? "text-ws-gray-600" : "text-white/65"}`}>{s.text}</p>
                {active && i === 1 && <Waveform bars={22} className="mt-4 h-6" />}
                {active && i === 3 && (
                  <span className="mt-4 flex gap-1 text-ws-yellow">
                    {[0, 1, 2, 3, 4].map((k) => (
                      <Star key={k} className="size-5 animate-slide-up" style={{ animationDelay: `${k * 0.08}s` }} fill="currentColor" strokeWidth={0} />
                    ))}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
