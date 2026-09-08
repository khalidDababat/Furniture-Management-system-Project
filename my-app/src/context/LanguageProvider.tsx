"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { translations, type Lang, type Translation } from "@/i18n/translations";

interface LanguageContextValue {
  lang: Lang;
  dir: "rtl" | "ltr";
  t: Translation;
  setLang: (l: Lang) => void;
  toggle: () => void;
/** Pick the localized field of a bilingual object, e.g. tr(product, "name"). */
  tr: (obj: object, key: string) => string;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "zs_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  // Sync from storage on mount (default remains Arabic / RTL).
  useEffect(() => {
    const saved = (typeof window !== "undefined" &&
      localStorage.getItem(STORAGE_KEY)) as Lang | null;
    if (saved === "ar" || saved === "en") setLangState(saved);
  }, []);

  // Reflect language on <html> and persist.
  useEffect(() => {
    const dir = translations[lang].dir as "rtl" | "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(
    () => setLangState((p) => (p === "ar" ? "en" : "ar")),
    [],
  );

const tr = useCallback(
    (obj: object, key: string): string => {
      if (obj == null || typeof obj !== "object") return "";
      const o = obj as Record<string, unknown>;
      const v =
        lang === "ar"
          ? o[`${key}_ar`]
          : (o[`${key}_en`] ?? o[`${key}_ar`]);
      return (v ?? o[key] ?? "") as string;
    },
    [lang],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      dir: translations[lang].dir as "rtl" | "ltr",
      t: translations[lang],
      setLang,
      toggle,
      tr,
    }),
    [lang, setLang, toggle, tr],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
