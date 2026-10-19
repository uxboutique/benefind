/*
 * Products › Spera — copy verbatim from Figma "Desktop - Template Products" (143:4468).
 * Placeholders as designed: "Primary CTA", "Lorem ipsum", "[Nome]" cards, "Screen da inserire".
 */
import { asset } from "@/lib/asset";
import { rowThumb } from "@/lib/media";

const icon = (n: string) => asset(`/assets/icons/lucide/${n}.svg`);

export const spera = {
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Products", href: "#" }, { label: "Spera" }],
  title: "Spera",
  logo: { src: asset("/assets/logos/products/spera.svg"), width: 200, height: 58 },
  subtitle: "L’applicativo per la gestione delle sperimentazioni per Aziende Sanitarie e Ospedaliere",
  text: [
    "SPERA è un’applicazione 100% web-based, rivolta alle Aziende Sanitarie e Ospedaliere che fanno sperimentazione.",
    "Comprende le fasi di produzione del documento di idoneità centro specifico, del nullaosta aziendale, la gestione del budget, del contratto, la gestione dello studio, l’arruolamento, la gestione del farmaco/dispositivo sperimentale, la contabilizzazione delle prestazioni erogate e la loro fatturazione.",
  ],
  cta: { label: "Primary CTA", href: "#" },
  showcase: {
    screenshot: asset("/assets/images/spera-dashboard.jpg"),
    alt: "Dashboard di Spera: crescita visite, completamento consulti, soddisfazione pazienti, metriche appuntamenti e lista medici",
    logo: { src: asset("/assets/logos/products/spera.svg"), alt: "Spera" },
  },
  benefits: {
    eyebrow: "Punti di forza",
    title: "I vantaggi di Spera",
    items: [
      { icon: icon("file-text"), text: "Dematerializza e cataloga i documenti" },
      { icon: icon("book-text"), text: "Contiene glossari e iter procedurali" },
      { icon: icon("workflow"), text: "Dematerializza i flussi informativi" },
      { icon: icon("gauge"), text: "Snellimento dei processi con tempi rapidi" },
      { icon: icon("user-round-group"), text: "Definisce nodi, step e attori dell’iter procedurale" },
    ],
  },
  compliance: {
    titleLines: ["Compliance", "normativa"],
    text: [
      "Conformità alla normativa nazionale e al nuovo regolamento europeo, in modo che le fasi necessarie all’istruzione e alla gestione possono seguire l’iter approvativo e gestionale\nRisponde ai requisiti richiesti dall’AIFA per l’utilizzo di applicativi che coadiuvano nella gestione dei trial clinici. Fornisce inoltre tutto il necessario per la progettazione di moduli elettronici, essenziali per snellire i processi decisionali dell’azienda.",
      "Garantisce il controllo degli accessi e la sicurezza delle informazioni. Ogni accesso, annotazione e modifica viene registrato dal software.",
    ],
    image: asset("/assets/images/spera-lab.jpg"),
    overlay: "linear-gradient(265.06deg, rgba(0, 0, 0, 0) 40.54%, rgba(0, 0, 0, 0.6) 83.34%)",
  },
  features: {
    eyebrow: "Lorem ipsum",
    title: "Le funzionalità",
    items: [
      { title: "Gestione Segreteria Aziendale", text: "Gestione documentale finalizzata a un workflow rapido e funzionale che consente di avere un monitor su tutte le sperimentazioni dell’azienda", media: rowThumb.blue },
      { title: "Gestione della sperimentazione", text: "Modulo per l’efficientamento della gestione documentale e monitoraggio", media: rowThumb.sunset },
      { title: "Arruolamento e gestione pazienti", text: "Finalizzato all’amministrazione dei processi legati alla presa in carico e monitoraggio durante la sperimentazione dei pazienti", media: rowThumb.green },
      { title: "Principal Investigator", text: "Dedicato alle attività di gestione e contabilizzazione delle sperimentazioni. Modulistica condivisa e unica per la presentazione delle dichiarazioni iniziali, periodiche e finali con alert specifici", media: rowThumb.blueTilted },
      { title: "Contrattazione e gestione del budget", text: "Funzionalità a sostegno della fase di contrattazione tra Azienda Ospedaliera/Sanitaria e Sponsor", media: rowThumb.sunset },
      { title: "Gestione del farmaco sperimentale", text: "Creazione del registro del farmaco sperimentale, gestione della fornitura, distribuzione e reso al paziente e/o al reparto", media: rowThumb.blue },
      { title: "Prestazioni erogate ai pazienti", text: "Gestione delle prestazioni e dei flussi finanziari associati. Amministrazione e controllo dei flussi per le prestazioni da erogare", media: rowThumb.green },
    ],
  },
  other: {
    eyebrow: "Tecnologie per l’innovazione",
    title: "Altri products",
    text: "Le nostre tecnologie abilitanti, frutto di anni di esperienza e analisi, si basano sull’“Integrazione Innovativa”: piattaforme low/no-code, Intelligenza Artificiale, AR/VR, blockchain, gestione documentale, cybersecurity e hyperautomation.",
    cards: Array.from({ length: 5 }, () => ({
      title: "[Nome]",
      text: "L’applicativo per la gestione delle sperimentazioni\nper Aziende Sanitarie e Ospedaliere",
      href: "#",
      photo: null,
      photoBox: null,
    })),
    fallbackImage: asset("/assets/images/product-card-barn.jpg"),
  },
};
