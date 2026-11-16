import { ArrowRight, Clock, Heart, Home, Sparkle, TrendUp, Users } from "./icons";

const ITEMS = [
  { icon: Home, title: "Evden para kazan", text: "Yol yok, trafik yok. Evinin konforunda, kendi düzeninde çalış." },
  { icon: Clock, title: "Esnek çalışma", text: "Tam zamanlı, yarı zamanlı ya da hafta sonu: hayatına uyan seçeneği birlikte belirleyelim." },
  { icon: Sparkle, title: "Ücretsiz eğitim", text: "Hiç deneyimin olmasa bile online eğitimlerle işin her adımını öğren." },
  { icon: TrendUp, title: "Sıfırdan kariyer", text: "Performansınla ilerle; takım liderliğine ve Watsons'taki diğer rollere uzanan bir yol seni bekliyor." },
  { icon: Users, title: "Hep yanında bir ekip", text: "Takım liderin ve eğitmenlerin, ilk çağrından itibaren bir mesaj uzağında." },
  { icon: Heart, title: "Watsons ailesi", text: "Türkiye'nin sağlık, güzellik ve kişisel bakım markalarından birinin parçası ol." },
];

const LADDER = ["Müşteri Temsilcisi", "Kıdemli Temsilci", "Takım Lideri", "Eğitmen & Kalite Uzmanı"];

export function Benefits() {
  return (
    <section id="avantajlar" className="scroll-mt-16 bg-ws-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="eyebrow">Neden Watsons</p>
        <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-[-0.03em] sm:text-5xl">Evden çalış, Watsons&apos;la büyü.</h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="group rounded-3xl bg-white p-7 transition hover:shadow-[0_16px_40px_rgba(0,56,64,.10)] sm:p-8">
              <span className="grid size-12 place-items-center rounded-2xl bg-ws-teal-50 text-ws-teal-700 transition group-hover:rotate-[-6deg] group-hover:bg-ws-teal group-hover:text-white">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-xl font-black">{title}</h3>
              <p className="mt-2 text-[15px] font-medium leading-relaxed text-ws-gray-600">{text}</p>
            </div>
          ))}
        </div>

        {/* Kariyer yolu */}
        <div className="mt-6 rounded-3xl bg-white p-7 sm:p-10">
          <p className="eyebrow">Watsons&apos;ta sıfırdan kariyer</p>
          <h3 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">İlk çağrından takım liderliğine.</h3>
          <ol className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
            {LADDER.map((r, i) => (
              <li key={r} className="flex items-center gap-3 lg:flex-1">
                <span className={`flex flex-1 items-center gap-3 rounded-2xl px-4 py-4 ${i === 0 ? "bg-ws-teal text-white" : "bg-ws-teal-50 text-ws-teal-800"}`}>
                  <span className={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-black ${i === 0 ? "bg-white text-ws-teal-700" : "bg-white"}`}>{i + 1}</span>
                  <span className="font-extrabold leading-tight">{r}{i === 0 && <span className="block text-[12px] font-bold text-white/85">Buradan başlıyorsun</span>}</span>
                </span>
                {i < LADDER.length - 1 && <ArrowRight className="hidden size-5 shrink-0 text-ws-teal lg:block" />}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
