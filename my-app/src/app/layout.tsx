import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ziad Al-Shakhshir Furniture | Premium Furniture",
  description:
    "Discover our exclusive collection of modern and classic luxury furniture — exceptional designs for an exceptional home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={inter.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
