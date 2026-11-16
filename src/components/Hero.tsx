import { HeroArt } from "./HeroArt";
import { ArrowDown, ArrowRight } from "./icons";

const STATS = [
  { value: "%100", label: "Evden, uzaktan çalışma" },
  { value: "0", label: "Deneyim şartı" },
  { value: "4", label: "Farklı çalışma seçeneği" },
  { value: "Sıfırdan", label: "Eğitim ve kariyer yolu" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ws-teal via-ws-teal to-ws-teal-600 text-white">
      {/* dekoratif dalgalar */}
      <svg className="pointer-events-none absolute -bottom-px left-0 w-full text-white/10" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
        <path d="M0 60 C 240 120, 480 0, 720 60 S 1200 120, 1440 60 V120 H0z" fill="currentColor" />
      </svg>
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-14 pt-10 sm:px-6 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-8 lg:pb-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-[13px] font-bold ring-1 ring-white/25">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-white" />
            </span>
            Çağrı Merkezi Müşteri Temsilcisi · Başvurular açık
          </span>
          <h1 className="mt-6 text-[42px] font-black leading-[1.03] tracking-[-0.03em] sm:text-6xl lg:text-[70px]">
            Kulaklığını tak, Watsons&apos;ta kariyerine <span className="relative whitespace-nowrap">evden<svg className="absolute -bottom-2 left-0 w-full text-ws-yellow" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden><path d="M2 9 C 50 2, 150 2, 198 8" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /></svg></span> başla.
          </h1>
          <p className="mt-7 max-w-xl text-lg font-semibold leading-relaxed text-white/90 sm:text-xl">
            Watsons Türkiye Çağrı Merkezi ekibine Müşteri Temsilcileri arıyoruz. İster deneyimli ol ister deneyimsiz:
            <strong className="text-white"> yeter ki vakit ayırabil</strong>, gerisini birlikte öğreniriz.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#basvuru" className="btn-light px-7 py-4 text-base">
              Hemen başvur <ArrowRight className="size-5" />
            </a>
            <a href="#is-tanimi" className="btn-ghost-light px-7 py-4 text-base">
              İşi tanı <ArrowDown className="size-5" />
            </a>
          </div>
        </div>
        <HeroArt />
      </div>

      <div className="relative border-t border-white/20 bg-ws-teal-800/25">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {STATS.map((s, i) => (
            <div key={s.label} className={`py-6 sm:py-8 ${i % 2 ? "pl-4 sm:pl-8" : "pr-4"} ${i > 1 ? "border-t border-white/20 lg:border-t-0" : ""} lg:px-8 lg:first:pl-0 ${i ? "lg:border-l lg:border-white/20" : ""}`}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-3xl font-black tracking-tight sm:text-4xl">{s.value}</dd>
              <dd className="mt-1 text-sm font-semibold text-white/80">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
