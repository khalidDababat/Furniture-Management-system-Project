"use client";

import { useEffect, useState } from "react";

export type Lang = "ar" | "en";

/**
 * useLang — global language hook (AR / EN)
 *
 * Persists the user's language choice in localStorage and keeps
 * `<html lang>` and `<html dir>` in sync automatically.
 *
 * Usage:
 *   const { lang, toggleLang } = useLang();
 */
export function useLang() {
  const [lang, setLang] = useState<Lang>("ar");

  // Initialise from localStorage on mount
  useEffect(() => {
    const saved = (localStorage.getItem("lang") as Lang) ?? "ar";
    applyLang(saved);
    setLang(saved);
  }, []);

  const toggleLang = () => {
    const next: Lang = lang === "ar" ? "en" : "ar";
    applyLang(next);
    localStorage.setItem("lang", next);
    setLang(next);
  };

  return { lang, toggleLang };
}

// ── Private helper ────────────────────────────────────────────
function applyLang(lang: Lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}
