import { listApplications } from "@/lib/storage";
import { availabilityLabel, businessLineName, experienceLabel } from "@/lib/positions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const cell = (v: unknown) => {
  let s = String(v ?? "");
  if (/^[=+\-@]/.test(s)) s = "'" + s; // CSV formül enjeksiyonuna karşı
  return `"${s.replace(/"/g, '""')}"`;
};

export async function GET() {
  const items = await listApplications();
  const header = ["Tarih", "Ad", "Soyad", "E-posta", "Telefon", "Yönlendirilen Hat", "Başvuru", "Deneyim", "Çalışma Tercihi", "Arandı", "CV", "Şehir", "LinkedIn", "Not"];
  const rows = items.map((a) =>
    [
      new Date(a.createdAt).toLocaleString("tr-TR"),
      a.firstName,
      a.lastName,
      a.email,
      a.phone,
      businessLineName(a.businessLine),
      a.role,
      experienceLabel(a.experience),
      availabilityLabel(a.availability),
      a.called ? "Evet" : "Hayır",
      a.cv ? "Var" : "Yok",
      a.city,
      a.linkedin ?? "",
      a.notes,
    ].map(cell).join(";"),
  );
  const csv = "﻿" + [header.map(cell).join(";"), ...rows].join("\r\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="watsons-basvurular-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
