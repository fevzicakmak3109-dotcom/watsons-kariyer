import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin", "latin-ext"], variable: "--font-nunito", display: "swap" });

export const metadata: Metadata = {
  title: "Watsons Kariyer | Çağrı Merkezi Müşteri Temsilcisi",
  description:
    "Watsons Türkiye Çağrı Merkezi'ne evden çalışacak Müşteri Temsilcileri arıyor. Deneyimli ya da deneyimsiz, yeter ki vakit ayırabil. Kariyerin burada başlıyor.",
  openGraph: {
    title: "Watsons Kariyer · Çağrı Merkezi Müşteri Temsilcisi",
    description: "Evden çalış, Watsons'ta sıfırdan kariyerine başla. Deneyim şartı yok.",
    locale: "tr_TR",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#00A2B1", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={nunito.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
