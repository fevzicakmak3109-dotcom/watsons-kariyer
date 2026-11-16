import "server-only";
import { supabase } from "./storage";

/**
 * Canlı ziyaretçi sayacı.
 *
 * Ana sayfa açıkken (ve sekme görünürken) tarayıcı 30 saniyede bir küçük bir
 * "buradayım" sinyali gönderir. Her ziyaretçi, rastgele bir oturum kimliğiyle
 * `fs_docs` tablosunda `watsons_presence` koleksiyonunda tek satır tutar; son
 * ACTIVE_MS içinde sinyal gönderenler "aktif" sayılır. Kişisel veri saklanmaz.
 */
const COLLECTION = "watsons_presence";
export const HEARTBEAT_MS = 30_000;
const ACTIVE_MS = 75_000; // bir sinyal kaçsa bile ziyaretçi düşmesin
const CLEANUP_MS = 10 * 60_000;

// Supabase yoksa (yerel geliştirme) bellek içi yedek
const memory = new Map<string, number>();
let lastCleanup = 0;

export const isValidVisitorId = (id: unknown): id is string =>
  typeof id === "string" && /^[a-zA-Z0-9-]{8,64}$/.test(id);

export async function heartbeat(id: string) {
  const sb = supabase();
  if (!sb) return void memory.set(id, Date.now());
  const { error } = await sb
    .from("fs_docs")
    .upsert({ collection: COLLECTION, id, data: { lastSeen: new Date().toISOString() } });
  if (error) throw error;
}

export async function leave(id: string) {
  const sb = supabase();
  if (!sb) return void memory.delete(id);
  await sb.from("fs_docs").delete().eq("collection", COLLECTION).eq("id", id);
}

export async function countActive(): Promise<number> {
  const now = Date.now();
  const sb = supabase();
  if (!sb) {
    for (const [k, t] of memory) if (now - t > ACTIVE_MS) memory.delete(k);
    return memory.size;
  }
  // Eski satırları arada bir temizle (en fazla dakikada bir).
  if (now - lastCleanup > 60_000) {
    lastCleanup = now;
    await sb
      .from("fs_docs")
      .delete()
      .eq("collection", COLLECTION)
      .lt("data->>lastSeen", new Date(now - CLEANUP_MS).toISOString());
  }
  const { count, error } = await sb
    .from("fs_docs")
    .select("id", { count: "exact", head: true })
    .eq("collection", COLLECTION)
    .gte("data->>lastSeen", new Date(now - ACTIVE_MS).toISOString());
  if (error) throw error;
  return count ?? 0;
}
