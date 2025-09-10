// src/i18n/I18nProvider.tsx
"use client";
import { createContext, useContext } from "react";
type Ctx = { locale: "fa" | "en"; dict: any };
const I18nCtx = createContext<Ctx | null>(null);
export const useI18n = () => {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("I18nProvider missing");
  return ctx;
};
export default function I18nProvider({ value, children }: { value: Ctx; children: React.ReactNode }) {
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}
