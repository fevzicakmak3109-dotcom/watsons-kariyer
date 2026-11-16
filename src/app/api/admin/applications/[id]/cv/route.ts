import { getApplication, readCv } from "@/lib/storage";

export const runtime = "nodejs";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const app = await getApplication(id);
  if (!app) return new Response("Bulunamadı", { status: 404 });
  if (!app.cv) return new Response("Bu adayın CV'si yok", { status: 404 });
  const file = await readCv(app).catch(() => null);
  if (!file) return new Response("CV bulunamadı", { status: 404 });
  const download = new URL(req.url).searchParams.has("download");
  const cv = app.cv;
  const ext = cv.storedName.split(".").pop();
  const name = `${app.firstName}-${app.lastName}-CV.${ext}`;
  return new Response(new Uint8Array(file), {
    headers: {
      "Content-Type": cv.mimeType,
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename*=UTF-8''${encodeURIComponent(name)}`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
