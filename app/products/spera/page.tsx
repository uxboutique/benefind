import type { Metadata } from "next";
import { ProductPage } from "@/components/templates/ProductPage";
import { spera } from "@/content/spera";

export const metadata: Metadata = {
  title: "Spera — Products · Gruppo Benefind",
  description: "SPERA: l’applicativo 100% web-based per la gestione delle sperimentazioni cliniche di Aziende Sanitarie e Ospedaliere.",
};

/** Products › Spera (Figma "Desktop - Template Products" 143:4468). */
export default function SperaPage() {
  return <ProductPage page={spera} id="spera" />;
}
