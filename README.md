# Watsons Kariyer · Çağrı Merkezi Müşteri Temsilcisi

Watsons Türkiye Çağrı Merkezi'ne evden çalışacak Müşteri Temsilcisi alımı için hazırlanmış, **Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + Supabase** ile yazılmış tek sayfalık kariyer sitesi ve başvuruları takip etmek için **kullanıcı adı / şifre korumalı admin paneli**.

> Bu proje bir aday case çalışmasıdır; Watsons'ın resmi sitesi değildir.

## Mesaj

- **Çağrı merkezi** arıyoruz: sayfanın her bölümü bunu vurgular.
- **İster deneyimli ol ister deneyimsiz**, yeter ki vakit ayırabil.
- **Evden para kazanma** fırsatı.
- **Watsons'ta sıfırdan kariyer**: Müşteri Temsilcisi → Kıdemli Temsilci → Takım Lideri → Eğitmen & Kalite Uzmanı.
- Formun üstünde: **"Kariyerin burada başlıyor."**

## Özellikler

### Kariyer sayfası (`/`)
- **Hero**: canlı görüşme ekranı animasyonu. Sayan görüşme süresi, ses dalgası, sırayla yazılan müşteri / temsilci mesajları, "yazıyor…" noktaları, çalan telefonla dönen "Gelen arama" bildirimleri ve "Evden çalış", "Deneyim şartı yok", "Çağrı çözüldü ★★★★★" kartları
- **İş tanımı**: görevler, "Deneyimin varsa / yoksa" kartları, "Tek şartımız: yeter ki vakit ayırabil" ve evden çalışmak için gerekenler
- **Hatlar**: Gelen Çağrı, Sipariş & Kargo, Canlı Destek, Watsons Club, Giden Arama. Aday hat seçmez; İK panelden yönlendirir
- **Bir çağrının yolculuğu**: telefon çalar → dinlersin → çözersin → müşteri gülümser; adımlar sırayla canlanır
- **Avantajlar** ve **kariyer yolu**
- **Başvuru formu**: ad, soyad, e-posta, cep telefonu (05XX XXX XX XX maskesi), şehir (81 il), LinkedIn (isteğe bağlı), **çağrı merkezi deneyimi** (deneyimsiz seçeneğiyle), **ne kadar vakit ayırabileceği** (tam / yarı zamanlı / hafta sonu / esnek), kısa not, KVKK onayı
- İstemci ve sunucu tarafında doğrulama, bot tuzağı (honeypot)
- 4 adımlı süreç, SSS, mobilde sabit "Hemen başvur" butonu
- Mobil ve masaüstü için responsive, `prefers-reduced-motion` desteği (animasyonlar kapanır)

### Admin paneli (`/admin`)
- HMAC imzalı, `httpOnly` çerezle oturum; middleware ile `/admin` ve `/api/admin/*` korumalı
- **Canlı ziyaretçi sayacı** (sağ üst)
- Özet kartları: toplam, **aranmayı bekleyen**, bugün, son 7 gün
- Hatlara yönlendirme grafiği ve filtresi, arama
- Her satırda **sıra numarası** (ilk başvuran 1) ve **arandı / aranmadı** telefon düğmesi
- Tabloda deneyim ve **çalışma tercihi**
- Başvuru detayı: tek tıkla arama / e-posta / WhatsApp, hat yönlendirme, İK notları
- Onay alarak silme, **CSV dışa aktarma** (Excel uyumlu)
- CV yükleme kodda hazır ama kapalı (`CV_UPLOAD_ENABLED = false`, `src/lib/positions.ts`)

## Kurulum

```bash
npm install
cp .env.example .env.local   # Supabase ve admin bilgilerini gir
# supabase/schema.sql dosyasını Supabase SQL Editor'de bir kez çalıştır (isteğe bağlı; tablo zaten varsa gerekmez)
npm run seed                 # (isteğe bağlı) panele 8 demo başvuru ekler
npm run dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin

| Değişken | Açıklama | Varsayılan |
| --- | --- | --- |
| `ADMIN_USERNAME` | Admin kullanıcı adı | `admin` |
| `ADMIN_PASSWORD` | Admin şifresi | `Watsons2026!` |
| `ADMIN_SESSION_SECRET` | Oturum çerezini imzalayan gizli anahtar | geliştirme değeri |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase proje adresi | – |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role anahtarı (gizli, yalnızca sunucuda) | – |
| `SUPABASE_CV_BUCKET` | CV'lerin tutulacağı private bucket | `watsons-cvs` |
| `DATA_DIR` | Supabase tanımlı değilse kullanılan yerel klasör | `./data` |

> Canlıya alırken varsayılan şifreyi ve `ADMIN_SESSION_SECRET` değerini mutlaka değiştir.

## Veritabanı (Supabase)

- Başvurular `fs_docs` tablosunda **`watsons_applications`** koleksiyonunda JSONB belge olarak tutulur.
- Canlı ziyaretçi sayacı **`watsons_presence`** koleksiyonunu kullanır (yalnızca rastgele oturum kimliği ve son görülme zamanı).
- Aynı Supabase projesindeki diğer uygulamalar farklı koleksiyon adları kullandığı için veriler karışmaz.
- Tabloda RLS açıktır; uygulama tüm işlemleri sunucuda service role anahtarıyla yapar, anahtar tarayıcıya gönderilmez.
- Supabase panelinde başvuruları görmek için: **Table Editor → fs_docs**, `collection = watsons_applications` filtresi.

## Tasarım

- Watsons logosundaki marka renkleri: turkuaz **`#00A2B1`**, kırmızı **`#ED2E25`**. Turkuazın koyu tonları (`#00808C`, `#006C76`) buton ve metinlerde okunabilirlik (WCAG AA) için kullanıldı.
- Tipografi: Nunito (yuvarlak hatlı, samimi bir grotesk).
- Logo, Watsons'ın kendi CDN'inden yüklenir (`src/components/Logo.tsx`); yüklenemezse yazı logosu gösterilir.

## Mimari

```
src/
  app/
    page.tsx                         one-page kariyer sitesi
    admin/                           giriş ve panel sayfaları
    api/applications                 public başvuru endpoint'i
    api/presence                     canlı ziyaretçi sinyali
    api/admin/...                    korumalı liste / güncelle / sil / CSV / login / logout
  components/                        Hero, HeroArt, JobSection, CallFlow, Benefits, ApplicationForm, admin/...
  lib/
    auth.ts                          Web Crypto HMAC oturum (edge + node)
    storage.ts                       depolama katmanı (Supabase / yerel dosya)
    presence.ts                      canlı ziyaretçi sayacı
    positions.ts, types.ts           hatlar, deneyim, çalışma tercihi, veri tipleri
  middleware.ts                      admin koruması
supabase/schema.sql                  tablo, indeks ve bucket kurulumu
```
