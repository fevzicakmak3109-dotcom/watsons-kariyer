export const STATUSES = [
  { id: "new", label: "Yeni", color: "#00A2B1" },
  { id: "reviewing", label: "İnceleniyor", color: "#F79009" },
  { id: "interview", label: "Mülakat", color: "#7A5AF8" },
  { id: "offer", label: "Teklif", color: "#12B76A" },
  { id: "rejected", label: "Olumsuz", color: "#ED2E25" },
] as const;

export type StatusId = (typeof STATUSES)[number]["id"];

export type Application = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessLine: string;
  role: string;
  city: string;
  linkedin?: string;
  message?: string;
  /** Deneyim süresi (EXPERIENCE_OPTIONS id). Eski kayıtlarda olmayabilir. */
  experience?: string;
  /** Ayırabileceği zaman (AVAILABILITY_OPTIONS id). */
  availability?: string;
  /** Deneyimi olmayan adaylar CV yüklemez. */
  cv: { originalName: string; storedName: string; size: number; mimeType: string } | null;
  status: StatusId;
  /** İK adayı aradı mı? Panelde telefon ikonuyla açılıp kapanır. */
  called?: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export function statusMeta(id: string) {
  return STATUSES.find((s) => s.id === id) ?? STATUSES[0];
}
