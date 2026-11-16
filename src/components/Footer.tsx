import { WatsonsLogo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-ws-teal-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <span className="inline-flex rounded-2xl bg-white px-4 py-3"><WatsonsLogo className="h-8" /></span>
            <p className="mt-4 max-w-sm text-[15px] font-medium text-white/70">Kariyerin burada başlıyor. Evden bağlan, Watsons&apos;ın sesi ol.</p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-[15px] font-semibold sm:grid-cols-3">
            <div className="space-y-3">
              <p className="font-extrabold">Kariyer</p>
              <a href="#is-tanimi" className="block text-white/70 hover:text-white">İş tanımı</a>
              <a href="#avantajlar" className="block text-white/70 hover:text-white">Avantajlar</a>
              <a href="#basvuru" className="block text-white/70 hover:text-white">Başvuru</a>
            </div>
            <div className="space-y-3">
              <p className="font-extrabold">Bilgi</p>
              <a href="#surec" className="block text-white/70 hover:text-white">Süreç</a>
              <a href="#sss" className="block text-white/70 hover:text-white">SSS</a>
              <a href="/admin" className="block text-white/70 hover:text-white">İK Girişi</a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm font-medium text-white/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Watsons Türkiye Kariyer</p>
          <p>Bu sayfa bir aday case çalışması olarak hazırlanmıştır.</p>
        </div>
      </div>
    </footer>
  );
}
