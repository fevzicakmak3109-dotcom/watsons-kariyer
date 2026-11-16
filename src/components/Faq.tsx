import { CV_UPLOAD_ENABLED } from "@/lib/positions";

const QA = [
  { q: "Hiç çağrı merkezi deneyimim yok, başvurabilir miyim?", a: "Kesinlikle. Deneyim şartımız yok; işe başlamadan önce online eğitimle sana gereken her şeyi öğretiyoruz. Tek beklentimiz düzenli olarak vakit ayırabilmen." },
  { q: "Evden çalışmak için neye ihtiyacım var?", a: "Bir bilgisayar, stabil bir internet bağlantısı ve görüşmeleri rahatça yapabileceğin sessiz bir alan yeterli. Teknik kurulumda ekibimiz sana yardımcı olur." },
  { q: "Çalışma saatleri nasıl?", a: "Tam zamanlı, yarı zamanlı, hafta sonu ya da esnek vardiya seçeneklerinden sana uygun olanı başvuru formunda belirtebilirsin. Görüşmede birlikte netleştiriyoruz." },
  { q: "Hangi belgeleri hazırlamalıyım?", a: CV_UPLOAD_ENABLED
    ? "Deneyimin varsa güncel bir CV (PDF, DOC veya DOCX, en fazla 5 MB) yeterli. Deneyimin yoksa CV istemiyoruz."
    : "Herhangi bir belge hazırlamana gerek yok. Formu doldurman yeterli; istersen kendinden kısaca bahsedebilirsin." },
  { q: "Başvurumun sonucunu ne zaman öğrenirim?", a: "İşe alım ekibimiz başvuruları 7 iş günü içinde değerlendirir ve seni telefonla arar." },
  { q: "Kişisel verilerim nasıl korunuyor?", a: "Verilerin 6698 sayılı KVKK kapsamında yalnızca işe alım süreci için işlenir ve yetkisiz kişilerle paylaşılmaz." },
];

export function Faq() {
  return (
    <section id="sss" className="scroll-mt-16 bg-ws-gray-50 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:px-8">
        <div>
          <p className="eyebrow">SSS</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] sm:text-5xl">Aklına takılanlar.</h2>
          <p className="mt-4 text-lg font-medium text-ws-gray-600">Cevabını bulamadığın bir soru mu var? Başvur, seni aradığımızda sor.</p>
        </div>
        <div className="divide-y divide-ws-gray-200 border-y border-ws-gray-200">
          {QA.map((x) => (
            <details key={x.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-extrabold [&::-webkit-details-marker]:hidden">
                {x.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-xl text-ws-teal-700 transition group-open:rotate-45 group-open:bg-ws-teal group-open:text-white">+</span>
              </summary>
              <p className="mt-3 pr-10 text-[15px] font-medium leading-relaxed text-ws-gray-600">{x.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
