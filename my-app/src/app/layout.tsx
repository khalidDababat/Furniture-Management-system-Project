import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ziad Al-Shakhshir Furniture | أثاث فاخر",
  description:
    "اكتشف مجموعتنا الفاخرة من الأثاث العصري والكلاسيكي — تصاميم استثنائية لمنزل استثنائي.",
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
