"use client";
import { useEffect, useState } from "react";
import { BUSINESS_LINES, CV_UPLOAD_ENABLED, GENERAL_LINE, availabilityLabel, businessLineName, experienceLabel } from "@/lib/positions";
import type { Application } from "@/lib/types";
import { Briefcase, Clock, Close, Download, Eye, FileIcon, Linkedin, Mail, Phone, Pin } from "@/components/icons";

type Props = {
  app: Application;
  onClose: () => void;
  onUpdated: (a: Application) => void;
};

export function ApplicationDrawer({ app, onClose, onUpdated }: Props) {
  const [notes, setNotes] = useState(app.notes);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    setNotes(app.notes);
    setPreview(false);
  }, [app.id, app.notes]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  async function patch(body: { notes?: string; businessLine?: string }) {
    setSaving(true);
    const res = await fetch(`/api/admin/applications/${app.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(false);
    if (res.ok) {
      onUpdated((await res.json()).item);
      if (body.notes !== undefined) setSavedAt(Date.now());
    }
  }

  const isPdf = app.cv?.mimeType === "application/pdf";
  const cvUrl = `/api/admin/applications/${app.id}/cv`;
  const waPhone = app.phone.replace(/\D/g, "");

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={`${app.firstName} ${app.lastName} başvurusu`}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={onClose} />
      <aside className="absolute inset-y-0 right-0 flex w-full flex-col bg-white shadow-2xl sm:max-w-xl">
        {/* başlık */}
        <div className="flex items-start justify-between gap-4 bg-gradient-to-br from-ws-teal to-ws-teal-700 px-5 pb-6 pt-5 text-white sm:px-8">
          <div className="min-w-0">
            <p className="text-[13px] text-white/70">{new Date(app.createdAt).toLocaleString("tr-TR", { dateStyle: "long", timeStyle: "short" })}</p>
            <h2 className="mt-1 truncate text-2xl font-bold tracking-tight sm:text-3xl">{app.firstName} {app.lastName}</h2>
            <p className="mt-1 text-[15px] text-white/80">{app.role} · {businessLineName(app.businessLine)}</p>
          </div>
          <button onClick={onClose} className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Kapat">
            <Close className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          {/* hızlı iletişim */}
          <div className="grid grid-cols-3 gap-2">
            <a href={`tel:${app.phone.replace(/\s/g, "")}`} className="flex flex-col items-center gap-1.5 rounded-xl bg-ws-gray-50 py-3 text-[13px] font-medium hover:bg-ws-gray-100"><Phone className="size-5" /> Ara</a>
            <a href={`mailto:${app.email}`} className="flex flex-col items-center gap-1.5 rounded-xl bg-ws-gray-50 py-3 text-[13px] font-medium hover:bg-ws-gray-100"><Mail className="size-5" /> E-posta</a>
            <a href={`https://wa.me/${waPhone}`} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1.5 rounded-xl bg-ws-gray-50 py-3 text-[13px] font-medium hover:bg-ws-gray-100">
              <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.7-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6a2.5 2.5 0 0 0 1.7-1.2 2 2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3z"/></svg>
              WhatsApp
            </a>
          </div>

          {/* yönlendirme */}
          <section className="mt-7">
            <h3 className="text-sm font-bold">Yönlendirilen hat</h3>
            <p className="mt-0.5 text-[13px] text-ws-gray-600">Adayı deneyimine ve çalışma tercihine göre en uygun hatta yönlendir.</p>
            <select
              value={app.businessLine}
              disabled={saving}
              onChange={(e) => patch({ businessLine: e.target.value })}
              className="input select mt-3"
            >
              <option value={GENERAL_LINE}>Henüz yönlendirilmedi</option>
              {BUSINESS_LINES.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </section>

          {/* bilgiler */}
          <section className="mt-7">
            <h3 className="text-sm font-semibold">Aday bilgileri</h3>
            <dl className="mt-3 divide-y divide-ws-gray-100 rounded-xl border border-ws-gray-100">
              {[
                { icon: Mail, k: "E-posta", v: app.email },
                { icon: Phone, k: "Telefon", v: app.phone },
                { icon: Pin, k: "Şehir", v: app.city },
                { icon: Briefcase, k: "Deneyim", v: experienceLabel(app.experience) },
                { icon: Clock, k: "Çalışma", v: availabilityLabel(app.availability) },
              ].map(({ icon: I, k, v }) => (
                <div key={k} className="flex items-center gap-3 px-4 py-3">
                  <I className="size-4 shrink-0 text-ws-gray-600" />
                  <dt className="w-24 shrink-0 text-[13px] text-ws-gray-600">{k}</dt>
                  <dd className="min-w-0 truncate text-sm font-medium">{v}</dd>
                </div>
              ))}
              {app.linkedin && (
                <div className="flex items-center gap-3 px-4 py-3">
                  <Linkedin className="size-4 shrink-0 text-ws-gray-600" />
                  <dt className="w-24 shrink-0 text-[13px] text-ws-gray-600">LinkedIn</dt>
                  <dd className="min-w-0 truncate text-sm font-medium"><a href={app.linkedin} target="_blank" rel="noreferrer" className="text-ws-teal-700 hover:underline">{app.linkedin.replace(/^https?:\/\/(www\.)?/, "")}</a></dd>
                </div>
              )}
            </dl>
            {app.message && (
              <blockquote className="mt-3 rounded-xl bg-ws-gray-50 p-4 text-[15px] leading-relaxed">“{app.message}”</blockquote>
            )}
          </section>

          {/* CV: yükleme kapalıyken yalnızca CV'si olan eski başvurularda gösterilir */}
          {(CV_UPLOAD_ENABLED || app.cv) && (
          <section className="mt-7">
            <h3 className="text-sm font-semibold">CV</h3>
            {!app.cv ? (
              <p className="mt-3 rounded-xl bg-ws-gray-50 px-4 py-3 text-[14px] text-ws-gray-600">
                Aday deneyimi olmadığını belirttiği için CV yüklemedi.
              </p>
            ) : (<>
            <div className="mt-3 flex items-center gap-3 rounded-xl border border-ws-gray-100 p-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-ws-teal-900 text-white"><FileIcon className="size-5" /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{app.cv.originalName}</p>
                <p className="text-[12px] text-ws-gray-600">{(app.cv.size / 1024).toFixed(0)} KB</p>
              </div>
              {isPdf && (
                <button onClick={() => setPreview((p) => !p)} className="grid size-10 place-items-center rounded-lg bg-ws-gray-100 hover:bg-ws-gray-200" aria-label="Önizle"><Eye className="size-5" /></button>
              )}
              <a href={`${cvUrl}?download`} className="grid size-10 place-items-center rounded-lg bg-ws-teal-900 text-white hover:bg-white/10" aria-label="CV indir"><Download className="size-5" /></a>
            </div>
            {preview && isPdf && <iframe src={cvUrl} title="CV önizleme" className="mt-3 h-[520px] w-full rounded-xl border border-ws-gray-100" />}
            </>)}
          </section>
          )}

          {/* notlar */}
          <section className="mt-7">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">İK notları</h3>
              {savedAt && notes === app.notes && <span className="text-[12px] font-medium text-ws-green">Kaydedildi</span>}
            </div>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="Görüşme notları, değerlendirme…" className="input mt-3 resize-none" />
            <button onClick={() => patch({ notes })} disabled={saving || notes === app.notes} className="btn-primary mt-3 px-5 py-2.5 text-sm">
              Notu kaydet
            </button>
          </section>
        </div>
      </aside>
    </div>
  );
}
