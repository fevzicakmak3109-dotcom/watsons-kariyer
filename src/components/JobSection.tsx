import { BUSINESS_LINES } from "@/lib/positions";
import { ArrowRight, BUSINESS_ICONS, Check, Chat, Clock, Headset, Home, Laptop, Sparkle, Wifi } from "./icons";

const TASKS = [
  { icon: Headset, text: "Watsons müşterilerinden gelen aramaları güler yüzle karşılamak" },
  { icon: Chat, text: "Sipariş, kargo, iade ve ürün sorularına çözüm bulmak" },
  { icon: Sparkle, text: "Watsons Club ve kampanyalar hakkında doğru bilgi vermek" },
  { icon: Check, text: "Her görüşmeyi sistemde kaydedip takibini yapmak" },
];

const NEEDS = [
  { icon: Laptop, text: "Bir bilgisayar" },
  { icon: Wifi, text: "Stabil internet bağlantısı" },
  { icon: Home, text: "Sessiz bir çalışma köşesi" },
  { icon: Clock, text: "Düzenli ayırabileceğin vakit" },
];

export function JobSection() {
  return (
    <section id="is-tanimi" className="scroll-mt-16 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="eyebrow">İş tanımı</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] sm:text-5xl">Müşterinin sesi, Watsons&apos;ın gülümsemesi ol.</h2>
            <p className="mt-5 text-lg font-medium leading-relaxed text-ws-gray-600">
              Çağrı Merkezi Müşteri Temsilcisi olarak evinden bağlanır, Watsons müşterilerinin her sorusunda yanlarında
              olursun. Sana gereken her şeyi eğitimde öğretiyoruz.
            </p>
            <ul className="mt-8 space-y-4">
              {TASKS.map(({ icon: I, text }) => (
                <li key={text} className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-ws-teal-50 text-ws-teal-700"><I className="size-5" /></span>
                  <span className="pt-2.5 text-[16px] font-semibold">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-3xl bg-ws-teal-50 p-7">
              <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-extrabold text-ws-teal-700">Deneyimin varsa</span>
              <h3 className="mt-5 text-2xl font-black tracking-tight">Tecrübeni Watsons&apos;a taşı.</h3>
              <p className="mt-2 text-[15px] font-medium leading-relaxed text-ws-gray-600">Çağrı merkezi ya da müşteri hizmetleri deneyimin, Watsons&apos;ta daha hızlı ilerlemeni sağlar.</p>
            </article>
            <article className="rounded-3xl bg-ws-ink p-7 text-white">
              <span className="inline-flex rounded-full bg-ws-red px-3 py-1 text-xs font-extrabold">Deneyimin yoksa</span>
              <h3 className="mt-5 text-2xl font-black tracking-tight">Sorun değil, sıfırdan başla.</h3>
              <p className="mt-2 text-[15px] font-medium leading-relaxed text-white/75">İlk günden yanında olan eğitmenlerle, adım adım öğrenerek başla. Herkes bir yerden başlar.</p>
            </article>
            <article className="relative overflow-hidden rounded-3xl bg-ws-teal p-7 text-white sm:col-span-2">
              <Clock className="pointer-events-none absolute -right-6 -top-6 size-40 text-white/10" strokeWidth={1.5} />
              <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-white/80">Tek şartımız</p>
              <h3 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Yeter ki vakit ayırabil.</h3>
              <ul className="mt-6 grid grid-cols-2 gap-3">
                {NEEDS.map(({ icon: I, text }) => (
                  <li key={text} className="flex items-center gap-2.5 rounded-2xl bg-white/15 px-3 py-2.5 text-[14px] font-bold">
                    <I className="size-5 shrink-0" /> {text}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>

        {/* Ekipler */}
        <div className="mt-20">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h3 className="text-3xl font-black tracking-[-0.02em] sm:text-4xl">Hangi hatta çalışacağını biz bulalım.</h3>
              <p className="mt-3 text-lg font-medium text-ws-gray-600">
                Tek bir başvuru yapman yeterli. İşe alım ekibimiz başvurunu inceleyip seni en uygun hatta yönlendirir.
              </p>
            </div>
            <a href="#basvuru" className="btn-secondary self-start md:self-auto">Başvurunu yap <ArrowRight className="size-4" /></a>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {BUSINESS_LINES.map((b) => {
              const Icon = BUSINESS_ICONS[b.id];
              return (
                <article key={b.id} className="group flex flex-col rounded-3xl border border-ws-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-transparent hover:shadow-[0_16px_40px_rgba(0,56,64,.12)]">
                  <span className="grid size-12 place-items-center rounded-2xl text-white transition group-hover:scale-110" style={{ background: b.accent }}>
                    <Icon className="size-6" />
                  </span>
                  <span className="mt-5 text-xs font-extrabold uppercase tracking-wider text-ws-gray-600">{b.tag}</span>
                  <h4 className="mt-1 text-xl font-black tracking-tight">{b.name}</h4>
                  <p className="mt-2 flex-1 text-[14px] font-medium leading-relaxed text-ws-gray-600">{b.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
