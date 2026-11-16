/** Çağrı merkezindeki ekipler. Adaylar ekip seçmez; İK başvuruyu panelden uygun ekibe yönlendirir. */
export type BusinessLine = {
  id: string;
  name: string;
  tag: string;
  description: string;
  roles: string[];
  accent: string;
};

export const BUSINESS_LINES: BusinessLine[] = [
  {
    id: "inbound",
    name: "Gelen Çağrı",
    tag: "Müşteri Hattı",
    description: "Watsons müşterilerinden gelen aramaları karşıla; ürün, mağaza ve kampanya sorularını yanıtla.",
    roles: ["Müşteri Temsilcisi"],
    accent: "#00A2B1",
  },
  {
    id: "orders",
    name: "Sipariş & Kargo",
    tag: "Online",
    description: "Online siparişlerin takibi, iade ve değişim taleplerinde müşteriye yol göster.",
    roles: ["Sipariş Destek Temsilcisi"],
    accent: "#12B76A",
  },
  {
    id: "chat",
    name: "Canlı Destek",
    tag: "Chat & WhatsApp",
    description: "Yazılı kanallardan gelen sorulara hızlı ve samimi yanıtlar ver.",
    roles: ["Canlı Destek Temsilcisi"],
    accent: "#7A5AF8",
  },
  {
    id: "club",
    name: "Watsons Club",
    tag: "Sadakat",
    description: "Üyelik, puan ve kişiye özel fırsatlarla ilgili müşteri taleplerini çöz.",
    roles: ["Sadakat Programı Temsilcisi"],
    accent: "#ED2E25",
  },
  {
    id: "outbound",
    name: "Giden Arama",
    tag: "Kampanya",
    description: "Müşterilerimizi arayarak yeni kampanyalar ve memnuniyet anketleri hakkında bilgilendir.",
    roles: ["Satış & Memnuniyet Temsilcisi"],
    accent: "#F79009",
  },
];

/** İş evden yapıldığı için Türkiye'nin her ilinden başvuru alınır. */
export const CITIES = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin",
  "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa",
  "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan", "Erzurum",
  "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Iğdır", "Isparta", "İstanbul", "İzmir",
  "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kilis", "Kırıkkale", "Kırklareli",
  "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş", "Nevşehir",
  "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Şanlıurfa", "Siirt", "Sinop", "Şırnak", "Sivas",
  "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak",
] as const;

/** Genel başvurular henüz bir ekibe yönlendirilmemiştir. */
export const GENERAL_LINE = "general";

export function businessLineName(id: string) {
  if (id === GENERAL_LINE) return "Yönlendirilmedi";
  return BUSINESS_LINES.find((b) => b.id === id)?.name ?? id;
}

export const NO_EXPERIENCE = "none";
export const EXPERIENCE_OPTIONS = [
  { id: NO_EXPERIENCE, label: "Hiç deneyimim yok" },
  { id: "other", label: "Farklı bir alanda deneyimim var" },
  { id: "lt1", label: "1 yıldan az çağrı merkezi" },
  { id: "1-3", label: "1–3 yıl çağrı merkezi" },
  { id: "3+", label: "3 yıldan fazla çağrı merkezi" },
] as const;

export function experienceLabel(id?: string) {
  return EXPERIENCE_OPTIONS.find((e) => e.id === id)?.label ?? "Belirtilmedi";
}

/** Adayın ayırabileceği zaman. "Yeter ki vakit ayırabil" mesajının formdaki karşılığı. */
export const AVAILABILITY_OPTIONS = [
  { id: "full", label: "Tam zamanlı", hint: "Haftada 45 saat" },
  { id: "part", label: "Yarı zamanlı", hint: "Günde 4–6 saat" },
  { id: "weekend", label: "Hafta sonu", hint: "Cumartesi & Pazar" },
  { id: "flex", label: "Esnek", hint: "Vardiyaya göre" },
] as const;

export function availabilityLabel(id?: string) {
  return AVAILABILITY_OPTIONS.find((e) => e.id === id)?.label ?? "Belirtilmedi";
}

/** CV yükleme alanı. Şimdilik kapalı; tekrar açmak için true yapman yeterli
 *  (form, sunucu doğrulaması, metinler ve admin paneli buna göre değişir). */
export const CV_UPLOAD_ENABLED = false;
