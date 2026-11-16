import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createApplication } from "@/lib/storage";
import { AVAILABILITY_OPTIONS, CITIES, CV_UPLOAD_ENABLED, EXPERIENCE_OPTIONS, GENERAL_LINE, NO_EXPERIENCE } from "@/lib/positions";
import type { Application } from "@/lib/types";

export const runtime = "nodejs";

const MAX_CV = 5 * 1024 * 1024;
const ALLOWED = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
} as const;

const str = (v: FormDataEntryValue | null, max = 200) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

function normalizePhone(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("90")) d = d.slice(2);
  if (d.startsWith("0")) d = d.slice(1);
  if (!/^5\d{9}$/.test(d)) return null;
  return `+90 ${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8)}`;
}

function looksLikeDoc(buf: Buffer, ext: string) {
  if (ext === "pdf") return buf.subarray(0, 5).toString("latin1") === "%PDF-";
  if (ext === "docx") return buf[0] === 0x50 && buf[1] === 0x4b; // zip
  if (ext === "doc") return buf[0] === 0xd0 && buf[1] === 0xcf; // OLE
  return false;
}

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Form okunamadı." }, { status: 400 });
  }

  // Bot tuzağı: gerçek kullanıcılar bu alanı görmez.
  if (str(form.get("website"))) return NextResponse.json({ ok: true });

  const errors: Record<string, string> = {};
  const firstName = str(form.get("firstName"), 60);
  const lastName = str(form.get("lastName"), 60);
  const email = str(form.get("email"), 120).toLowerCase();
  const phoneRaw = str(form.get("phone"), 30);
  const city = str(form.get("city"), 40);
  const linkedin = str(form.get("linkedin"), 200);
  const message = str(form.get("message"), 1000);
  const experience = str(form.get("experience"), 10);
  const availability = str(form.get("availability"), 10);
  const consent = form.get("consent") === "on" || form.get("consent") === "true";
  const cv = form.get("cv");

  if (firstName.length < 2) errors.firstName = "Adını gir.";
  if (lastName.length < 2) errors.lastName = "Soyadını gir.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Geçerli bir e-posta adresi gir.";
  const phone = normalizePhone(phoneRaw);
  if (!phone) errors.phone = "05XX XXX XX XX formatında bir cep telefonu gir.";
  if (!(CITIES as readonly string[]).includes(city)) errors.city = "Bir şehir seç.";
  if (linkedin && !/^https?:\/\/(www\.)?linkedin\.com\//i.test(linkedin))
    errors.linkedin = "LinkedIn profil bağlantısı linkedin.com ile başlamalı.";
  if (!EXPERIENCE_OPTIONS.some((e) => e.id === experience)) errors.experience = "Deneyimini seç.";
  if (!AVAILABILITY_OPTIONS.some((e) => e.id === availability)) errors.availability = "Ne kadar vakit ayırabileceğini seç.";
  const needsCv = CV_UPLOAD_ENABLED && experience !== NO_EXPERIENCE;
  if (!consent) errors.consent = "Devam etmek için KVKK metnini onaylamalısın.";

  let cvBuf: Buffer | null = null;
  let ext = "";
  if (!needsCv) {
    // CV istenmiyorsa (yükleme kapalı ya da aday deneyimsiz) gönderilse bile yok sayılır.
  } else if (!(cv instanceof File) || cv.size === 0) {
    errors.cv = "CV dosyanı yükle.";
  } else {
    ext = cv.name.split(".").pop()?.toLowerCase() ?? "";
    if (!(ext in ALLOWED)) errors.cv = "Yalnızca PDF, DOC veya DOCX yükleyebilirsin.";
    else if (cv.size > MAX_CV) errors.cv = "CV en fazla 5 MB olabilir.";
    else {
      cvBuf = Buffer.from(await cv.arrayBuffer());
      if (!looksLikeDoc(cvBuf, ext)) errors.cv = "Dosya geçerli bir PDF/Word belgesi değil.";
    }
  }

  if (Object.keys(errors).length || (needsCv && !cvBuf) || !phone) {
    return NextResponse.json({ error: "Lütfen işaretli alanları kontrol et.", errors }, { status: 422 });
  }

  const id = randomUUID();
  const now = new Date().toISOString();
  const app: Application = {
    id,
    firstName,
    lastName,
    email,
    phone,
    businessLine: GENERAL_LINE,
    role: "Müşteri Temsilcisi",
    city,
    linkedin: linkedin || undefined,
    message: message || undefined,
    experience,
    availability,
    cv: cvBuf
      ? {
          originalName: (cv as File).name.slice(0, 120),
          storedName: `${id}.${ext}`,
          size: cvBuf.length,
          mimeType: ALLOWED[ext as keyof typeof ALLOWED],
        }
      : null,
    status: "new",
    notes: "",
    createdAt: now,
    updatedAt: now,
  };

  try {
    await createApplication(app, cvBuf);
  } catch (e) {
    console.error("Başvuru kaydedilemedi", e);
    return NextResponse.json({ error: "Başvurun şu an kaydedilemedi, lütfen biraz sonra tekrar dene." }, { status: 500 });
  }
  return NextResponse.json({ ok: true, id }, { status: 201 });
}
