import type { Metadata } from "next";
import { MarketPage } from "@/components/templates/MarketPage";
import { pharma } from "@/content/pharma";

export const metadata: Metadata = {
  title: "Pharma — Markets · Gruppo Benefind",
  description: "Sistemi MES e soluzioni integrate per l’industria farmaceutica: conformità normativa, batch, laboratorio e controllo qualità.",
};

/** Markets › Pharma (Figma "Pharma - Concept" 117:3461). */
export default function PharmaPage() {
  return <MarketPage page={pharma} id="pharma" />;
}
