import type { Metadata } from "next";
import { EnablingPage } from "@/components/templates/EnablingPage";
import { integrationPlatforms } from "@/content/integration-platforms";

export const metadata: Metadata = {
  title: "Integration Platforms — Enabling Technologies · Gruppo Benefind",
  description: "Piattaforme di integrazione low/no code per un modello di programmazione uniforme e coerente, con riutilizzo di servizi software esistenti.",
};

/** Enabling Technologies › Integration Platforms (Figma "Desktop - Template Enabling Technologies" 142:3675). */
export default function IntegrationPlatformsPage() {
  return <EnablingPage page={integrationPlatforms} id="ip" />;
}
