/*
 * Enabling Technologies › Integration Platforms — copy verbatim from Figma
 * "Desktop - Template Enabling Technologies" (142:3675). Placeholders as designed:
 * "Lorem ipsum dolor", "Primary CTA", "[Name] Enabling Technologies", "Screen da inserire".
 */
import { asset } from "@/lib/asset";
import { featureSquare, squareCard } from "@/lib/media";

const otherText =
  "Le nostre tecnologie abilitanti, frutto di anni di esperienza e analisi, si basano sull’“Integrazione Innovativa”: piattaforme low/no-code, Intelligenza Artificiale, AR/VR, blockchain, gestione documentale, cybersecurity e hyperautomation.";

export const integrationPlatforms = {
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Enabling Technologies", href: "/#tecnologie" }, { label: "Integration Platforms" }],
  eyebrow: "Enabling Technologies",
  title: "Integration Platforms",
  subtitle: "Lorem ipsum dolor",
  text: "In molte progettualità condotte da Benefind una componente essenziale è il disegno architetturale della soluzione, che ha spesso contemplato il riutilizzo e l’integrazione di servizi software esistenti. Il software da scrivere ex novo non è quasi mai stato di dimensioni particolarmente rilevanti e lo sarà sempre meno.",
  cta: { label: "Primary CTA", href: "#" },
  banner: { image: asset("/assets/images/case-pharma-photo.jpg") },
  rows: [
    {
      id: "ip-low-code",
      eyebrow: "Integration Platforms",
      title: "Low/no code per una programmazione uniforme e coerente",
      text: "Particolare attenzione è stata quindi posta nella individuazione di piattaforme di integrazione “low/no code” che consentissero un’ampia flessibilità d’uso ed il riutilizzo di \"servizi di base\" specializzati nella gestione dell'autenticazione, nelle politiche di autorizzazione e nei meccanismi transazionali, garantendo così un modello di programmazione uniforme e coerente agli sviluppatori di applicazioni front-end e back-end.",
      media: featureSquare.red,
    },
    {
      id: "ip-no-code",
      eyebrow: "No code",
      title: "Piattaforme di integrazione low/no code",
      lines: ["Piattaforme di integrazione", "low/no code"],
      text: "Piattaforme di integrazione low/no code per un’ampia flessibilità d’uso di riutilizzo",
      media: featureSquare.cocoa,
    },
  ],
  other: {
    eyebrow: "Tecnologie per l’innovazione",
    title: "Altre Technologies",
    text: otherText,
    cards: [squareCard.blue, squareCard.green, squareCard.sunset, squareCard.blue].map((media) => ({
      title: "[Name] Enabling Technologies",
      text: "Lorem ipsum dolor set",
      href: "#",
      media,
    })),
  },
};
