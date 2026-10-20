import type { Metadata } from "next";
import { ServicePage } from "@/components/templates/ServicePage";
import { itConsulting } from "@/content/it-consulting";

export const metadata: Metadata = {
  title: "Information Technology Consulting — Services · Gruppo Benefind",
  description: "Strategie tecnologiche e digitali per accelerare la crescita: architetture tecniche, strategie digitali, analisi e supporto IT.",
};

/** Services › Information Technology Consulting (Figma "Desktop - Template Services" 147:6684). */
export default function ItConsultingPage() {
  return <ServicePage page={itConsulting} id="itc" />;
}
