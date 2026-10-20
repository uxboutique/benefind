/*
 * Services › Information Technology Consulting — copy verbatim from Figma
 * "Desktop - Template Services" (147:6684). Placeholders as designed: case-study slider (GSK),
 * duplicated card copy, "Primary CTA".
 */
import { asset } from "@/lib/asset";
import { wideCard } from "@/lib/media";
import { pharma } from "@/content/pharma";
import { hrefFor } from "@/lib/routes";

const cardText =
  "Guidati da esigenze di revisione di processi organizzativi (riduzione dei costi e/o dei rischi, innovazione dei processi e/o dei prodotti/servizi) o di ammodernamento";

export const itConsulting = {
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Services", href: "/#servizi" }, { label: "Information Technology Consulting" }],
  eyebrow: "Services",
  title: "Information Technology Consulting",
  subtitle: "Potenziare il futuro della tua azienda significa investire in strategie tecnologiche mirate",
  banner: { image: asset("/assets/images/case-pharma-photo.jpg") },
  offer: {
    id: "itc-offer-title",
    title: "Strategie tecnologiche e digitali per accelerare la crescita del tuo business",
    cards: [
      { title: "Analisi e disegno di architetture tecniche", text: cardText, href: "#", media: wideCard.blue },
      { title: "Definizione di strategie digitali", text: cardText, href: "#", media: wideCard.green },
      { title: "Analisi e supporto IT", text: cardText, href: "#", media: wideCard.sunset },
    ],
  },
  cases: pharma.cases,
  other: {
    eyebrow: "Tecnologie per l’innovazione",
    title: "Altri servizi",
    text: "Le nostre tecnologie abilitanti, frutto di anni di esperienza e analisi, si basano sull’“Integrazione Innovativa”: piattaforme low/no-code, Intelligenza Artificiale, AR/VR, blockchain, gestione documentale, cybersecurity e hyperautomation.",
    // Same photo crops as the Pharma "Altri markets" cards (Figma 147:7501). The 5th Figma card is a
    // leftover "Manufacturing" market card and is not rendered (flagged in the report).
    cards: [
      { title: "Information Technology Consulting", ...photo(0) },
      { title: "Digital Consulting", ...photo(1) },
      { title: "Software Factory", ...photo(2) },
      { title: "Application Management/BPO", photo: null, photoBox: null },
    ].map((c) => ({ ...c, href: hrefFor(c.title) })),
    fallbackImage: asset("/assets/images/product-card-barn.jpg"),
  },
};

function photo(i: number) {
  const { photo, photoBox } = pharma.otherMarkets.cards[i];
  return { photo, photoBox };
}
