// Demo verisi: admin panelini örnek başvurularla doldurur.  Kullanım: npm run seed
// .env.local içinde Supabase bilgileri varsa Supabase'e (fs_docs / watsons_applications), yoksa data/ klasörüne yazar.
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { createClient } from "@supabase/supabase-js";

try { process.loadEnvFile(".env.local"); } catch {}

const COLLECTION = "watsons_applications";
const ascii = (s) => s.toLowerCase().replace(/ı/g, "i").replace(/ş/g, "s").replace(/ç/g, "c").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ğ/g, "g").replace(/i̇/g, "i");

// [ad, soyad, hat, şehir, deneyim, çalışma tercihi, mesaj]
const people = [
  ["Elif", "Yıldız", "inbound", "İstanbul", "1-3", "full", "Daha önce bir e-ticaret firmasının müşteri hizmetlerinde çalıştım."],
  ["Mert", "Kaya", "general", "Ankara", "none", "part", "Üniversite öğrencisiyim, akşamları çalışabilirim."],
  ["Zeynep", "Demir", "orders", "İzmir", "other", "full", ""],
  ["Can", "Şahin", "general", "Eskişehir", "none", "weekend", "Hafta içi okuldayım, hafta sonları tamamen müsaitim."],
  ["Ayşe", "Çelik", "club", "Bursa", "3+", "flex", "5 yıl çağrı merkezi deneyimim var, takım liderliği de yaptım."],
  ["Burak", "Öztürk", "chat", "Trabzon", "lt1", "part", ""],
  ["Selin", "Arslan", "general", "Antalya", "none", "full", "Evden çalışabileceğim bir iş arıyorum."],
  ["Emre", "Koç", "outbound", "Konya", "other", "flex", "Perakende satış deneyimim var."],
];

const items = people.map(([fn, ln, line, city, experience, availability, msg], i) => {
  const id = randomUUID();
  const created = new Date(Date.now() - i * 1.3 * 864e5).toISOString();
  return {
    id, firstName: fn, lastName: ln,
    email: `${ascii(fn)}.${ascii(ln)}@example.com`,
    phone: `+90 5${30 + i} ${100 + i * 7} ${10 + i} ${20 + i}`,
    businessLine: line, role: "Müşteri Temsilcisi", city,
    ...(msg ? { message: msg } : {}),
    experience, availability,
    cv: null,
    status: "new", called: i % 3 === 0,
    notes: i === 0 ? "Tanışma görüşmesi yapıldı, eğitime davet edilecek." : "",
    createdAt: created, updatedAt: created,
  };
});

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (url && key) {
  const sb = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await sb.from("fs_docs").insert(items.map((a) => ({ collection: COLLECTION, id: a.id, data: a })));
  if (error) throw error;
  console.log(`${items.length} demo başvuru Supabase'e eklendi (fs_docs / ${COLLECTION}).`);
} else {
  const DATA = process.env.DATA_DIR ?? path.join(process.cwd(), "data");
  await fs.mkdir(DATA, { recursive: true });
  const file = path.join(DATA, "applications.json");
  const existing = JSON.parse(await fs.readFile(file, "utf8").catch(() => "[]"));
  await fs.writeFile(file, JSON.stringify([...existing, ...items], null, 2));
  console.log(`${items.length} demo başvuru eklendi → ${file}`);
}
