"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/context/LanguageProvider";
import { CartProvider } from "@/context/CartProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <CartProvider>{children}</CartProvider>
    </LanguageProvider>
  );
}
