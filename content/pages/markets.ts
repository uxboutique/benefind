/*
 * Markets pages built on the Pharma template (Figma 117:3461): same structure and images, copy from the
 * wireframes in "WF - Struttura" (0:1). Pharma itself stays in content/pharma.ts, untouched.
 * Case studies: the wireframe gives only the project name (+ lorem), so the GSK logo is replaced by that name.
 */
import { pharma } from "@/content/pharma";
import { marketHref, markets, type MarketSlug } from "@/lib/routes";
import type { MarketContent } from "./types";

/** Short descriptions used on the "Altri markets" cards (wireframe cards; tagline where none exists). */
export const marketBlurb: Record<MarketSlug, string> = {
  manufacturing: "Benefind supporta le aziende manifatturiere nell’evoluzione 4.0, automatizzando i processi con soluzioni digitali sostenibili.",
  pharma: "Un sistema MES è cruciale per affrontare le sfide del settore. Dema e IXway offrono soluzioni integrate e su misura.",
  transportation: "Esperienza consolidata nello sviluppo di soluzioni AI per traffico, pedaggi e Smart-road, con supporto tecnico.",
  "fashion-luxury": "Oltre 20 anni di esperienza nella programmazione, supply chain e gestione del prodotto, con competenze e soluzioni applicative.",
  healthcare: "Expertise nella digitalizzazione dei processi sanitari, con soluzioni innovative per la gestione documentale e workflow in ambito sanitario.",
  "public-administration": "Project come partner nel processo di evoluzione dei sistemi informativi.",
  "financial-services": "Fusione di competenze e tecnologie avanzate per offrire soluzioni innovative.",
};

/** Photos of the template's "Altri markets" cards, by market (the others use the template fallback). */
const cardPhoto = Object.fromEntries(pharma.otherMarkets.cards.filter((c) => c.photo).map((c) => [c.title, { photo: c.photo, photoBox: c.photoBox }]));

const otherCards = (current: MarketSlug) =>
  (Object.keys(markets) as MarketSlug[])
    .filter((s) => s !== current)
    .map((s) => ({
      title: markets[s],
      text: marketBlurb[s],
      href: marketHref(s),
      photo: cardPhoto[markets[s]]?.photo ?? null,
      photoBox: cardPhoto[markets[s]]?.photoBox ?? null,
    }));

type Copy = {
  subtitle: string;
  text: string;
  banner: string[];
  caseName: string;
};

const copy: Record<Exclude<MarketSlug, "pharma">, Copy> = {
  manufacturing: {
    subtitle: "Digitalizzazione sostenibile per l'industria 4.0 e 5.0",
    text: "È un settore in continua evoluzione dove i concetti di industria 4.0 e 5.0 trovano una valida applicazione allo scopo, per esempio, di integrare la progettazione meccanica ed elettronica. Le aziende necessitano di collaborazioni specifiche per essere aiutate nella raccolta e connessione dei dati di prodotto e progetto, facilitando la collaborazione tra le diverse funzioni aziendali così come l’interconnessione dei macchinari utilizzati, con tutto ciò che ne consegue a livello di scambio di dati e relativa e necessaria sicurezza nel loro utilizzo. Benefind accompagna le imprese manifatturiere lungo una roadmap di digitalizzazione sostenibile, con l'obiettivo di automatizzare completamente i processi produttivi attraverso soluzioni applicative mirate.",
    banner: ["Guidiamo le aziende verso", "una digitalizzazione", "sostenibile, integrando", "l’industria 4.0 e 5.0"],
    caseName: "Quadro Elettrico",
  },
  transportation: {
    subtitle: "Innovazione e supporto per la viabilità e il monitoraggio del traffico",
    text: "Lo storico presidio dell’area da parte di Benefind e Dema ha portato nel tempo a consolidare esperienze significative nello sviluppo di applicazioni custom ed erogazione di servizi di assistenza per le concessionarie autostradali. In particolare, le concessionarie sono state supportate nella realizzazione di applicazioni inerenti alla viabilità, al monitoraggio del traffico, all’analisi delle immagini con l’ausilio di algoritmi di AI. Inoltre, un’ampia competenza è derivata dall’affiancamento degli enti tecnici delle concessionarie nello sviluppo di applicazioni in ambito pedaggio, monitoraggio del traffico, controllo accessi e Smart-road. Tali applicazioni vengono realizzate per i clienti delle Concessionarie in Italia ed all’Estero (altre concessionarie, enti pubblici), con il supporto di Benefind anche nelle attività di assistenza e logistica.",
    banner: ["Soluzioni innovative per", "viabilità, traffico", "e Smart-road, con supporto", "a concessionarie in Italia", "e all’estero."],
    caseName: "WiM – Weight in Motion",
  },
  "fashion-luxury": {
    subtitle: "Macro processi per la realizzazione di applicativi",
    text: "Le esperienze di Dema nell’area sono ultraventennali. La programmazione della produzione, la supply chain, il ciclo di vita del prodotto, la matrice di distribuzione degli articoli per Store sono solo alcuni dei macro-processi conosciuti in profondità sia in termini di competenze funzionale che di applicativi realizzati.",
    banner: ["Ottimizzazione dei processi", "produttivi e di distribuzione", "con soluzioni applicative", "avanzate"],
    caseName: "Assortment Matrix",
  },
  healthcare: {
    subtitle: "Digitalizzazione e innovazione nei processi sanitari",
    text: "Project ha maturato profonde competenze nella digitalizzazione di processi di gestione documentale e workflow in ambito sanitario. Ciò ha portato, tra l’altro, alla realizzazione di soluzioni specifiche per la gestione dell’intero iter di sperimentazione clinico-farmaceutica per Aziende Sanitarie ed Ospedaliere. Le solide competenze di dominio congiunte a quelle tecnologiche di gruppo consentono a Project di proporsi ai propri clienti quale partner affidabile in un percorso di attualizzazione dei relativi processi organizzativi e flussi informativi.",
    banner: ["Expertise nella", "digitalizzazione dei processi", "sanitari, con soluzioni", "innovative per la gestione", "documentale e workflow", "in ambito sanitario."],
    caseName: "Healthcare",
  },
  "public-administration": {
    subtitle: "L’evoluzione dei sistemi informativi",
    text: "Le competenze maturate nell’ambito della gestione documentale e dei flussi informativi hanno permesso a Project di qualificarsi nell’area come partner nel processo di evoluzione dei sistemi informativi.",
    banner: ["Project come partner", "nel processo di evoluzione", "dei sistemi informativi"],
    caseName: "PA – ESTAR URP",
  },
  "financial-services": {
    subtitle: "Tradizione e tecnologia al servizio del futuro",
    text: "Le tradizionali competenze di Benefind sui sistemi di pagamento, sulle banche digitali, sul monitoraggio dei crediti (con particolare riferimento ai prodotti Factoring e Leasing), sul recupero dei crediti coniugate con quelle tecnologiche di IXway (Tokenizzazione mediante blockchain e DLT, Computational Finance - AI/ML per l'High Frequency Trading, etc.) la rendono valido partner anche verso Fintech dai modelli di business particolarmente innovativi.",
    banner: ["Fusione di competenze", "e tecnologie avanzate", "per offrire soluzioni", "innovative"],
    caseName: "MACRE",
  },
};

export const marketPages = Object.fromEntries(
  (Object.keys(copy) as (keyof typeof copy)[]).map((slug): [string, MarketContent] => {
    const c = copy[slug];
    return [
      slug,
      {
        ...pharma,
        breadcrumb: [pharma.breadcrumb[0], pharma.breadcrumb[1], { label: markets[slug] }],
        title: markets[slug],
        subtitle: c.subtitle,
        text: c.text,
        banner: { ...pharma.banner, titleLines: c.banner },
        cases: {
          ...pharma.cases,
          slides: pharma.cases.slides.map((s) => ({
            ...s,
            logo: undefined,
            name: c.caseName,
            title: "Lorem ipsum dolor sit amet",
            photo: { ...s.photo, alt: "" },
          })),
        },
        otherMarkets: { ...pharma.otherMarkets, cards: otherCards(slug) },
      },
    ];
  }),
) as Record<Exclude<MarketSlug, "pharma">, MarketContent>;
