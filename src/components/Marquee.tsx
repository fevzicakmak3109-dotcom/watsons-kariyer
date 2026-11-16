import { Headset } from "./icons";

const ITEMS = ["Deneyimli ya da deneyimsiz", "Evden para kazan", "Watsons'ta sıfırdan kariyer", "Esnek çalışma saatleri", "Müşteri Temsilcisi", "Yeter ki vakit ayırabil", "Ücretsiz eğitim", "Kariyerin burada başlıyor"];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-b border-ws-gray-200 bg-ws-teal-50 py-4" aria-hidden>
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 text-lg font-extrabold tracking-tight text-ws-teal-800">
            {t}
            <Headset className="size-5 text-ws-teal" />
          </span>
        ))}
      </div>
    </div>
  );
}
