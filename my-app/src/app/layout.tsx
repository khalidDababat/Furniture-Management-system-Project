import type { Metadata } from "next";
import { Tajawal, Sora, Inter } from "next/font/google";
import "./globals.scss";
import Providers from "@/components/Providers/Providers";

const tajawal = Tajawal({ subsets: ["arabic", "latin"], weight: ["400", "500", "700", "800"], variable: "--font-tajawal", display: "swap" });
const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-sora", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "مصنع زياد الشخشير | Ziad Shakhshir Factory",
  description:
    "أثاث مكتبي ومعدني فاخر — تصميم وتصنيع فلسطيني منذ 1987. Premium office & metal furniture, Palestinian craftsmanship since 1987.",
  icons: { icon: "/logo-mark.svg" },
};

// Root layout: just <html>/<body>, fonts, and shared providers (language + cart).
// The storefront chrome lives in (site)/layout; the admin area has its own layout.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${sora.variable} ${inter.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
