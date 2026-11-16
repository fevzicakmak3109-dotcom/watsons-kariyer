import { CV_UPLOAD_ENABLED } from "@/lib/positions";

const STEPS = [
  { n: "01", title: "Başvur", text: CV_UPLOAD_ENABLED ? "Formu doldur, deneyimin varsa CV'ni ekle. 3 dakikadan kısa sürer." : "Formu doldur; 3 dakikadan kısa sürer, belge gerekmez." },
  { n: "02", title: "Seni arayalım", text: "İşe alım ekibimiz 7 iş günü içinde seni arar, kısa bir tanışma görüşmesi yaparız." },
  { n: "03", title: "Online eğitim", text: "Ürünler, sistemler ve iletişim üzerine evden katılacağın eğitimi tamamla." },
  { n: "04", title: "Kulaklığını tak", text: "İlk çağrını al. Watsons'taki kariyerin başladı!" },
];

export function Process() {
  return (
    <section id="surec" className="scroll-mt-16 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="eyebrow">Başvuru süreci</p>
        <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-[-0.03em] sm:text-5xl">Dört adımda hattasın.</h2>
        <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-ws-teal-100 md:left-4 md:right-4 md:top-[15px] md:bottom-auto md:h-0.5 md:w-auto" aria-hidden />
          {STEPS.map((s, i) => (
            <li key={s.n} className="relative pl-14 md:pl-0 md:pt-14">
              <span className={`absolute left-0 top-0 grid size-8 place-items-center rounded-full ${i === STEPS.length - 1 ? "bg-ws-red" : "bg-ws-teal"} ring-4 ring-white`}>
                <span className="size-2.5 rounded-full bg-white" />
              </span>
              <span className="text-sm font-extrabold text-ws-teal-700">{s.n}</span>
              <h3 className="mt-1 text-xl font-black">{s.title}</h3>
              <p className="mt-2 text-[15px] font-medium leading-relaxed text-ws-gray-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
