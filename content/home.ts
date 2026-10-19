/*
 * Homepage copy, taken verbatim from Figma node 47:4207.
 * Placeholders kept as designed are listed in docs/homepage/02-implementation-map.md §5.
 * Link targets: "#" = destination not defined yet (listed in the final report).
 */

import { asset } from "@/lib/asset";
import { routes } from "@/lib/routes";

export type Link = { label: string; href: string };

export const hero = {
  lines: ["Servizi IT per le aziende.", "Tecnologie e professionalità avanzate."],
  cta: { label: "Primary CTA", href: "#" },
};

export const clientLogos = [
  { name: "Booking.com", src: asset("/assets/logos/client-booking.svg"), width: 111.243, height: 18.61 },
  { name: "Zalando", src: asset("/assets/logos/client-zalando.svg"), width: 105.081, height: 19.1501 },
  { name: "SAP", src: asset("/assets/logos/client-sap.svg"), width: 55.2022, height: 27.36 },
  { name: "Spotnana", src: asset("/assets/logos/client-spotnana.svg"), width: 111.672, height: 16.66 },
  { name: "Fever", src: asset("/assets/logos/client-fever.svg"), width: 75.8282, height: 22.72 },
  { name: "HealthEquity", src: asset("/assets/logos/client-healthequity.svg"), width: 110.849, height: 18.06 },
];

export type AreaVisual = "markets" | "enabling" | "services" | "products";

export const areas = {
  eyebrow: "Le aree",
  title: "Quattro aree, un solo gruppo.",
  items: [
    {
      visual: "markets" as AreaVisual,
      title: "1. Soluzioni per mercati in evoluzione.",
      text: "Markets: soluzioni tecnologiche e servizi su misura per i principali settori.",
      href: "#mercati",
    },
    {
      visual: "enabling" as AreaVisual,
      title: "2. Tecnologie per un’innovazione integrata.",
      text: "Enabling Technologies: AI, low/no-code, AR/VR, blockchain.",
      href: "#tecnologie",
    },
    {
      visual: "services" as AreaVisual,
      title: "3. Servizi su misura per la trasformazione digitale.",
      text: "Services: consulenza IT, sicurezza informatica, ottimizzazione dei processi.",
      href: "#servizi",
    },
    {
      visual: "products" as AreaVisual,
      title: "4. Prodotti e consulenze per settori specifici.",
      text: "Products: Industria 4.0, Smart Manufacturing, sistemi interconnessi.",
      href: "#",
    },
  ],
};

export const enablingBanner = {
  title: "Tecnologie per un’innovazione integrata.",
  text: "Le nostre tecnologie abilitanti, frutto di anni di esperienza e analisi, si basano sull’“Integrazione Innovativa”. Integriamo soluzioni per la gestione documentale, la cybersecurity e l’hyperautomation, garantendo sicurezza e automazione avanzata per una trasformazione digitale completa.",
  image: { src: asset("/assets/images/enabling-barn.jpg"), alt: "" },
  cta: { label: "Primary CTA", href: "#" },
};

export const markets = {
  eyebrow: "Mercati e soluzioni digitali",
  title: "Soluzioni innovative per mercati in evoluzione",
  paragraphs: [
    // Figma: "Benfind" — typo corrected to "Benefind".
    "Benefind opera nei principali settori di mercato, offrendo soluzioni tecnologiche avanzate e servizi su misura per la trasformazione digitale.",
    "Dall'Industria Manifatturiera all'Industria Farmaceutica, dal Fashion & Luxury ai Concessionari Autostradali, fino alla Sanità, Pubblica Amministrazione e Financial Services, supportiamo le aziende nell’ottimizzazione dei processi e nell’integrazione di tecnologie innovative.",
  ],
  // Figma 97:4865 (updated 2026-10-19): two slides, check-list on the left, photo on the right.
  slides: [
    {
      eyebrow: "Mercati e soluzioni digitali",
      title: "Pharma",
      bullets: [
        "Processi MES avanzati per garantire soluzioni integrate ai sistemi esistenti",
        // Repeated three times in Figma (placeholder copy).
        "Sistema MES - Manufacturing Execution System.",
        "Sistema MES - Manufacturing Execution System.",
        "Sistema MES - Manufacturing Execution System.",
      ],
      bg: asset("/assets/images/markets-slide1-bg.png"),
      // Figma: 1324×588 at −22/−34
      bgInset: "-34px -22px",
      // Figma 98:4884 covers the older building photo in this slide.
      photo: { src: asset("/assets/images/markets-slide1-portrait.jpg"), alt: "" },
      // Figma: 772×502 image box at −23/−34 inside the 738×346 frame.
      photoBox: { left: "-3.12%", top: "-9.83%", width: "104.61%", height: "145.09%" },
      cta: { label: "Primary CTA", href: routes.pharma },
    },
    {
      eyebrow: "Mercati e soluzioni digitali",
      title: "Artificial Intelligence",
      titleLines: ["Artificial", "Intelligence"],
      bullets: ["Processi MES avanzati per garantire soluzioni integrate ai sistemi esistenti", "Sistema MES - Manufacturing Execution System."],
      bg: asset("/assets/images/markets-slide2-bg.png"),
      // Figma: 1324×588 at −36/−36
      bgInset: "-36px -8px -32px -36px",
      photo: { src: asset("/assets/images/markets-slide2-photo.png"), alt: "" },
      photoBox: { left: "-7.45%", top: "-56.36%", width: "111.92%", height: "196.82%" },
      cta: { label: "Primary CTA", href: "#" },
    },
  ],
};

export const services = {
  eyebrow: "Servizi per le aziende",
  titleLines: ["Servizi su misura", "per la trasformazione", "digitale"],
  text: "Benefind propone una gamma di servizi personalizzati per accompagnare le aziende nel loro percorso di trasformazione digitale. La nostra offerta comprende consulenza IT e supporto nella sicurezza informatica, con un focus sull’ottimizzazione dei processi aziendali e sull’innovazione. Grazie a un approccio flessibile e alla nostra esperienza, ci impegniamo a fornire soluzioni efficaci e sostenibili, che permettano alle aziende di crescere e adattarsi alle sfide del mercato.",
  cta: { label: "Primary CTA", href: "#" },
  stats: [
    { value: "70%", label: "faster time to resolution" },
    { value: "3X", label: "faster time to resolution" },
    { value: "24/7", label: "coverage with zero wait times" },
  ],
};

export const caseStudies = {
  eyebrow: "Case study",
  title: "Progetti nei settori in cui operiamo.",
  featured: {
    tag: "Case study · Pharma",
    title: "Processi MES avanzati per garantire soluzioni integrate ai sistemi esistenti",
    text: "Sistema MES - Manufacturing Execution System.",
    // Figma 98:4893: photo box 760×494 at 0/−10 in the 760×428 frame.
    image: asset("/assets/images/case-pharma-photo.jpg"),
    imageBox: { left: "0%", top: "-2.34%", width: "100%", height: "115.42%" },
    cta: { label: "Leggi il case study", href: "#" },
  },
  // Figma 98:4886–98:4901 (added 2026-10-15): photo layers with explicit crop boxes (% of the 296×200 frame).
  items: [
    { tag: "Case study · Public Administration", title: "[Titolo case study Pubblica Amministrazione]", image: asset("/assets/images/case-public-admin-photo.jpg"), imageBox: { left: "-37.16%", top: "-31.5%", width: "159.46%", height: "153%" }, href: "#" },
    { tag: "Case study · Manufacturing", title: "[Titolo case study Manufacturing]", image: asset("/assets/images/case-manufacturing-photo.jpg"), imageBox: { left: "0.68%", top: "-5%", width: "99.32%", height: "179%" }, href: "#" },
    { tag: "Case study · Financial Services", title: "[Titolo case study Financial Services]", image: asset("/assets/images/case-financial-photo.jpg"), imageBox: { left: "0%", top: "0%", width: "104.39%", height: "100.5%" }, href: "#" },
    { tag: "Case study · Healthcare", title: "[Titolo case study Healthcare]", image: asset("/assets/images/case-healthcare-photo.jpg"), imageBox: { left: "0%", top: "0%", width: "125%", height: "120%" }, href: "#" },
  ],
};

export const careers = {
  eyebrow: "Careers",
  title: "L’innovazione la fanno le persone",
  cta: { label: "Lavora con noi", href: "#" },
  story: {
    tag: "Storie dal gruppo",
    titleLines: ["Incontra", "[Nome],", "[Ruolo]"],
    quote: "“[Citazione breve della persona sul proprio lavoro in Benefind.]”",
    photo: { src: asset("/assets/images/careers-portrait.jpg"), alt: "Ritratto di [Nome], [Ruolo]" },
    cta: { label: "Leggi la storia", href: "#" },
  },
};

export const technologies = {
  eyebrow: "Tecnologie per l’innovazione",
  title: "Tecnologie per un’innovazione integrata",
  text: "Le nostre tecnologie abilitanti, frutto di anni di esperienza e analisi, si basano sull’“Integrazione Innovativa”: piattaforme low/no-code, Intelligenza Artificiale, AR/VR, blockchain, gestione documentale, cybersecurity e hyperautomation.",
  cards: [
    {
      theme: "dark" as const,
      tag: "Enabling technologies",
      title: "Integration Platforms e Intelligenza Artificiale",
      text: "Piattaforme low/no-code, AI, AR/VR e blockchain per ottimizzare processi ed efficienza.",
      image: asset("/assets/images/enabling-barn.jpg"),
      cta: { label: "Scopri", href: "#" },
    },
    {
      theme: "light" as const,
      tag: "Sicurezza e automazione",
      title: "Documenti, sicurezza, automazione",
      text: "BPM / Document Management, CyberSecurity e hyperautomation per una trasformazione digitale completa.",
      image: asset("/assets/images/tech-security.png"),
      cta: { label: "Scopri", href: "#" },
    },
    {
      // Figma card 3 duplicates card 1's text (placeholder).
      theme: "dark" as const,
      tag: "Enabling technologies",
      title: "Integration Platforms e Intelligenza Artificiale",
      text: "Piattaforme low/no-code, AI, AR/VR e blockchain per ottimizzare processi ed efficienza.",
      image: asset("/assets/images/case-public-admin.png"),
      cta: { label: "Scopri", href: "#" },
    },
  ],
};

export const contact = {
  titleLines: ["Parliamo del", "tuo futuro digitale"],
  text: "[Una riga di invito al contatto.]",
  cta: { label: "Contattaci", href: "mailto:info@benefind.it" },
};

export const footer = {
  columns: [
    {
      title: "Benefind Group",
      links: ["Chi siamo", "Innovation", "Partners", "Codice etico", "Certificazioni", "Sostenibilità", "Careers"],
    },
    {
      title: "Markets",
      links: ["Manufacturing", "Pharma", "Transportation", "Fashion & Luxury", "Healthcare", "Public Administration", "Financial Services"],
    },
    {
      title: "Services",
      links: ["Technology Consulting", "Digital Consulting", "Software Factory", "Application Management / BPO"],
    },
    {
      title: "Products",
      links: ["Aeva", "AllinApp", "Comet", "FAI - Fascicolatore AI", "Gestione Documentale (Protocollo)", "LegalHUB", "REadvice", "Spera", "URP"],
    },
  ],
  address: {
    name: "Benefind - Digital Innovation Group",
    street: "Via Pratese, 199 - 50145 Firenze",
    phone: { label: "+39 055 318668", href: "tel:+39055318668" },
    email: { label: "info@benefind.it", href: "mailto:info@benefind.it" },
  },
  extraColumns: [
    {
      title: "Enabling Technologies",
      links: ["Integration Platforms", "Artificial Intelligence", "BPM / Document Management", "Blockchain / Tokenization", "Collaboration", "CyberSecurity"],
    },
    { title: "Legal", links: ["Privacy Policy", "Cookie Policy"] },
  ],
  legal: "Benefind S.r.l. · Reg. Imprese: FI · Rea: FI-614300 · C.F. e P.I.: 06267240486 · email@pec.benefind.it",
};
