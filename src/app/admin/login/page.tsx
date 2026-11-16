"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { WatsonsLogo } from "@/components/Logo";
import { ArrowRight, Eye, Headset, Lock } from "@/components/icons";
import { Ripple, Waveform } from "@/components/HeroArt";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    setLoading(false);
    if (res.ok) router.replace("/admin");
    else setError((await res.json().catch(() => ({}))).error ?? "Giriş başarısız.");
  }

  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-ws-teal to-ws-teal-700 p-12 text-white lg:flex lg:flex-col">
        <div><WatsonsLogo className="h-9" white /></div>
        <div className="absolute inset-0 m-auto flex h-fit flex-col items-center gap-10">
          <span className="relative grid size-32 place-items-center rounded-full bg-white text-ws-teal-700">
            <Ripple className="text-white" />
            <Headset className="relative size-14" />
          </span>
          <Waveform bars={40} color="bg-white" className="h-16 opacity-60" />
        </div>
        <div className="mt-auto">
          <h1 className="text-5xl font-black tracking-[-0.03em]">İşe Alım Paneli</h1>
          <p className="mt-3 text-lg font-semibold text-white/85">Çağrı merkezi başvurularını tek yerden takip et.</p>
        </div>
      </div>
      <div className="flex flex-col justify-center bg-white px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10 lg:hidden"><WatsonsLogo className="h-9" /></div>
          <span className="grid size-12 place-items-center rounded-full bg-ws-teal-50 text-ws-teal-700"><Lock className="size-6" /></span>
          <h2 className="mt-6 text-3xl font-black tracking-tight">Yönetici girişi</h2>
          <p className="mt-2 text-ws-gray-600">Devam etmek için kullanıcı adı ve şifreni gir.</p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="u" className="label">Kullanıcı adı</label>
              <input id="u" className="input" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus />
            </div>
            <div>
              <label htmlFor="p" className="label">Şifre</label>
              <div className="relative">
                <input id="p" type={show ? "text" : "password"} className="input pr-12" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-md text-ws-gray-600 hover:bg-ws-gray-200" aria-label={show ? "Şifreyi gizle" : "Şifreyi göster"}>
                  <Eye className="size-5" />
                </button>
              </div>
            </div>
            {error && <p role="alert" className="rounded-lg bg-ws-red/10 px-4 py-3 text-sm font-medium text-ws-red">{error}</p>}
            <button className="btn-primary w-full py-4" disabled={loading}>
              {loading ? "Giriş yapılıyor…" : <>Giriş yap <ArrowRight className="size-5" /></>}
            </button>
          </form>
          <a href="/" className="mt-8 inline-block text-sm text-ws-gray-600 underline-offset-4 hover:underline">← Kariyer sayfasına dön</a>
        </div>
      </div>
    </div>
  );
}
