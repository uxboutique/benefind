/*
 * Markets › Pharma page copy, verbatim from Figma node 117:3461 ("Pharma - Concept").
 * Placeholders kept as designed ("Lorem ipsum", "Primary CTA", duplicated card copy) are listed in the report.
 */
import { asset } from "@/lib/asset";

export const pharma = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Markets", href: "/#mercati" },
    { label: "Pharma" },
  ],
  eyebrow: "Markets",
  title: "Pharma",
  subtitle: "Lorem ipsum dolor",
  text: "In tale industria un sistema MES (Manufacturing Execution System) assume un ruolo di fondamentale importanza a causa delle sfide uniche del settore, ovvero conformità normativa, elaborazione batch/per lotti, integrazione con i sistemi di laboratorio, controlli di qualità, etc. Le storiche competenze sui processi dell’area MES di Dema si sposano efficacemente con l’abilità di IXway nella progettazione di architetture che comprendono componenti tecnologici diversificati al fine di garantire la predisposizione di soluzioni perfettamente integrate nei sistemi esistenti.",
  cta: { label: "Primary CTA", href: "#" },
  banner: {
    titleLines: ["Processi MES avanzati", "per garantire soluzioni", "integrate ai sistemi esistenti."],
    image: asset("/assets/images/enabling-barn.jpg"),
    cta: { label: "Primary CTA", href: "#" },
  },
  cases: {
    eyebrow: "Case Study",
    title: "Case Study lorem ipsum dolor set item",
    paragraphs: [
      // Figma: "Benfind" — typo corrected to "Benefind" (same copy as the homepage Markets intro).
      "Benefind opera nei principali settori di mercato, offrendo soluzioni tecnologiche avanzate e servizi su misura per la trasformazione digitale.",
      "Dall'Industria Manifatturiera all'Industria Farmaceutica, dal Fashion & Luxury ai Concessionari Autostradali, fino alla Sanità, Pubblica Amministrazione e Financial Services, supportiamo le aziende nell’ottimizzazione dei processi e nell’integrazione di tecnologie innovative.",
    ],
    // Figma 120:4488: three identical slides (placeholder). ⚠ GSK brand assets — confirm usage rights.
    slides: Array.from({ length: 3 }, () => ({
      logo: { src: asset("/assets/images/pharma-case-gsk-logo.png"), alt: "GSK", width: 127, height: 71 },
      title: "How GSK leverages voice AI agents to handle 1,500 calls daily and shape.",
      cta: { label: "Primary CTA", href: "#" },
      photo: { src: asset("/assets/images/pharma-case-gsk.jpg"), alt: "Sede GSK" },
      stats: [
        { value: "99%", label: "routing accuracy for context-based transfers" },
        { value: "99%", label: "routing accuracy for context-based transfers" },
      ],
    })),
  },
  otherMarkets: {
    eyebrow: "Tecnologie per l’innovazione",
    title: "Altri markets",
    text: "Le nostre tecnologie abilitanti, frutto di anni di esperienza e analisi, si basano sull’“Integrazione Innovativa”: piattaforme low/no-code, Intelligenza Artificiale, AR/VR, blockchain, gestione documentale, cybersecurity e hyperautomation.",
    // Figma 117:4317. Card copy is identical on all five (placeholder); cards 4–5 have no photo layer.
    cards: [
      { title: "Manufacturing", photo: asset("/assets/images/market-manufacturing.jpg"), photoBox: { left: "-13.89%", top: "-3.08%", width: "123.89%", height: "109.62%" } },
      { title: "Fashion & Luxury", photo: asset("/assets/images/market-fashion.jpg"), photoBox: { left: "-10.28%", top: "-3.27%", width: "120.56%", height: "106.54%" } },
      { title: "Transportation", photo: asset("/assets/images/market-transportation.jpg"), photoBox: { left: "-33.33%", top: "0%", width: "166.67%", height: "100%" } },
      { title: "Fashion & Luxury", photo: null, photoBox: null },
      { title: "Manufacturing", photo: null, photoBox: null },
    ].map((c) => ({
      ...c,
      text: "Benefind supporta le aziende manifatturiere nell’evoluzione 4.0, automatizzando i processi con soluzioni digitali sostenibili.",
      href: "#",
    })),
    fallbackImage: asset("/assets/images/enabling-barn.jpg"),
  },
};
