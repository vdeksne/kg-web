"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/config";

export function LocaleHtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "lv";
  }, [locale]);
  return null;
}
