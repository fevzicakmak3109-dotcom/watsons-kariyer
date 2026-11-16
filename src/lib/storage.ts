import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Application } from "./types";

/**
 * Depolama katmanı.
 *
 * - Supabase (varsayılan): başvurular `fs_docs` tablosunda `watsons_applications`
 *   koleksiyonu olarak, CV'ler private `watsons-cvs` bucket'ında tutulur.
 *   Yalnızca sunucuda, service role anahtarıyla erişilir; anahtar tarayıcıya gitmez.
 * - Yerel dosya (yedek): Supabase ortam değişkenleri yoksa `data/` klasörü kullanılır.
 */
const COLLECTION = "watsons_applications";
const BUCKET = process.env.SUPABASE_CV_BUCKET ?? "watsons-cvs";

let client: SupabaseClient | null = null;
export function supabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  client ??= createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return client;
}

export const storageDriver = () => (supabase() ? "supabase" : "file");

type Driver = {
  list(): Promise<Application[]>;
  get(id: string): Promise<Application | null>;
  create(app: Application, cv: Buffer | null): Promise<Application>;
  update(id: string, patch: Partial<Pick<Application, "status" | "notes" | "businessLine" | "called">>): Promise<Application | null>;
  remove(id: string): Promise<boolean>;
  readCv(app: Application): Promise<Buffer>;
};

/* ---------------- Supabase ---------------- */
const supabaseDriver = (sb: SupabaseClient): Driver => ({
  async list() {
    const { data, error } = await sb.from("fs_docs").select("data").eq("collection", COLLECTION);
    if (error) throw error;
    return (data ?? []).map((r) => r.data as Application);
  },
  async get(id) {
    const { data, error } = await sb.from("fs_docs").select("data").eq("collection", COLLECTION).eq("id", id).maybeSingle();
    if (error) throw error;
    return (data?.data as Application) ?? null;
  },
  async create(app, cv) {
    if (app.cv && cv) {
      const up = await sb.storage.from(BUCKET).upload(app.cv.storedName, cv, { contentType: app.cv.mimeType, upsert: false });
      if (up.error) throw up.error;
    }
    const { error } = await sb.from("fs_docs").insert({ collection: COLLECTION, id: app.id, data: app });
    if (error) {
      if (app.cv) await sb.storage.from(BUCKET).remove([app.cv.storedName]);
      throw error;
    }
    return app;
  },
  async update(id, patch) {
    const current = await this.get(id);
    if (!current) return null;
    const next = { ...current, ...patch, updatedAt: new Date().toISOString() };
    const { error } = await sb.from("fs_docs").update({ data: next }).eq("collection", COLLECTION).eq("id", id);
    if (error) throw error;
    return next;
  },
  async remove(id) {
    const current = await this.get(id);
    if (!current) return false;
    const { error } = await sb.from("fs_docs").delete().eq("collection", COLLECTION).eq("id", id);
    if (error) throw error;
    if (current.cv) await sb.storage.from(BUCKET).remove([current.cv.storedName]);
    return true;
  },
  async readCv(app) {
    if (!app.cv) throw new Error("CV yok");
    const { data, error } = await sb.storage.from(BUCKET).download(app.cv.storedName);
    if (error) throw error;
    return Buffer.from(await data.arrayBuffer());
  },
});

/* ---------------- Yerel dosya (yedek) ---------------- */
const DATA_DIR = process.env.DATA_DIR ?? path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "applications.json");
const CV_DIR = path.join(DATA_DIR, "cv");
let queue: Promise<unknown> = Promise.resolve();
const serialize = <T>(fn: () => Promise<T>): Promise<T> => {
  const run = queue.then(fn, fn);
  queue = run.catch(() => undefined);
  return run;
};
async function readAll(): Promise<Application[]> {
  try {
    return JSON.parse(await fs.readFile(DB_FILE, "utf8"));
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw e;
  }
}
async function writeAll(items: Application[]) {
  await fs.mkdir(CV_DIR, { recursive: true });
  await fs.writeFile(DB_FILE + ".tmp", JSON.stringify(items, null, 2));
  await fs.rename(DB_FILE + ".tmp", DB_FILE);
}
const fileDriver: Driver = {
  list: readAll,
  async get(id) {
    return (await readAll()).find((a) => a.id === id) ?? null;
  },
  create: (app, cv) =>
    serialize(async () => {
      await fs.mkdir(CV_DIR, { recursive: true });
      if (app.cv && cv) await fs.writeFile(path.join(CV_DIR, app.cv.storedName), cv);
      await writeAll([...(await readAll()), app]);
      return app;
    }),
  update: (id, patch) =>
    serialize(async () => {
      const items = await readAll();
      const i = items.findIndex((a) => a.id === id);
      if (i === -1) return null;
      items[i] = { ...items[i], ...patch, updatedAt: new Date().toISOString() };
      await writeAll(items);
      return items[i];
    }),
  remove: (id) =>
    serialize(async () => {
      const items = await readAll();
      const app = items.find((a) => a.id === id);
      if (!app) return false;
      await writeAll(items.filter((a) => a.id !== id));
      if (app.cv) await fs.rm(path.join(CV_DIR, app.cv.storedName), { force: true });
      return true;
    }),
  readCv: async (app) => {
    if (!app.cv) throw new Error("CV yok");
    return fs.readFile(path.join(CV_DIR, path.basename(app.cv.storedName)));
  },
};

const driver = (): Driver => {
  const sb = supabase();
  return sb ? supabaseDriver(sb) : fileDriver;
};

/* ---------------- Dışa açık API ---------------- */
export async function listApplications() {
  return (await driver().list()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
export const getApplication = (id: string) => driver().get(id);
export const createApplication = (app: Application, cv: Buffer | null) => driver().create(app, cv);
export const updateApplication = (id: string, patch: Partial<Pick<Application, "status" | "notes" | "businessLine" | "called">>) => driver().update(id, patch);
export const deleteApplication = (id: string) => driver().remove(id);
export const readCv = (app: Application) => driver().readCv(app);
