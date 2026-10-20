/*
 * Services pages built on the Information Technology Consulting template (Figma 147:6684): same structure and
 * images, copy from the wireframes in "WF - Struttura" (0:1). Each wireframe sub-section becomes an offer card.
 * Wireframe notes ("NOTA DA LORO…") and the empty "BackOffice" section are left out; the Application
 * Management intro is still "Lorem ipsum" in the wireframe.
 */
import { itConsulting as itc } from "@/content/it-consulting";
import { serviceHref, services, type ServiceSlug } from "@/lib/routes";
import type { ServiceContent } from "./types";

const cardMedia = itc.offer.cards.map((c) => c.media);
const cardPhoto = Object.fromEntries(itc.other.cards.map((c) => [c.title, { photo: c.photo, photoBox: c.photoBox }]));

type Copy = {
  subtitle: string;
  offerTitle: string;
  cards: { title: string; text: string }[];
};

const copy: Record<Exclude<ServiceSlug, "information-technology-consulting">, Copy> = {
  "digital-consulting": {
    subtitle: "Progettiamo strategie digitali su misura, unendo tecnologie innovative, design e branding per potenziare l’identità aziendale",
    offerTitle: "Strategie digitali e design immersivo a supporto delle aziende",
    cards: [
      {
        title: "Digital Communication",
        text: "Definizione di una strategia di comunicazione digitale ben pianificata e volta all’ottenimento di vantaggi competitivi significativi nel mercato di riferimento dell’azienda cliente. Utilizzo di tecniche di Motion Graphic (grafica animata per la comunicazione semplice, piacevole ed evocativa di concetti anche complessi), Realtà Aumentata e Realtà Virtuale (per arricchire l’ambiente fisico dell’utente con informazioni digitali sovrapposte ed esperienze immersive in un ambiente completamente virtuale).",
      },
      {
        title: "UI & UX Design",
        text: "Analisi, nell’ambito di progetti digitali, dei bisogni degli utenti a cui si rivolgono e successiva proposizione di esperienze ottimali ed efficienti, capaci di soddisfare sia le esigenze di business che le aspettative di facilità d’uso richieste dagli utenti stessi.",
      },
      {
        title: "Graphic Design",
        text: "Supporto alle aziende nello studio e nella costruzione di una comunicazione visiva efficace e coordinata in ogni elemento grafico.",
      },
      {
        title: "Employer Branding",
        text: "Costruzione dell’immagine aziendale coerente con l’identità dell’azienda, al fine sia di fidelizzare i propri dipendenti, conosciuti e riconosciuti come persone, con le proprie aspettative e specificità, sia per attrarne di nuovi nelle campagne di recruiting.",
      },
    ],
  },
  "software-factory": {
    subtitle:
      "Offriamo soluzioni personalizzate, gestendo ogni fase del progetto o focalizzandosi su aree specifiche, per garantire usabilità e performance ottimali",
    offerTitle: "Soluzioni flessibili e su misura per il tuo business",
    cards: [
      {
        title: "Software Factory",
        text: "La Software Factory è a disposizione di clienti diretti e/o società terze di cui Benefind è premium partner. Nell’ambito di progetti “custom” l’approccio flessibile si adatta alle esigenze del committente, consentendo una operatività sia di tipo “full service”, con l’intera gestione del processo (dalla raccolta dei requisiti, all’analisi, sviluppo, test e go live) sia di tipo “mirato” verso alcune fasi specifiche, in moduli che il committente decide di esternalizzare definendone le linee guida. La Software Factory di Benefind opera con modalità similari per gli sviluppo di proprio software applicativo. Il team di sviluppo Benefind opera in perfetta sinergia con i team architetturali, funzionali e di design della User Experience per proporre soluzioni che coniugano usabilità e performance. Alcuni prodotti/soluzioni sono realizzati in partnership con altre società IT partner, con competenze specifiche e operatività complementari, per una realizzazione più efficiente e mirata.",
      },
    ],
  },
  "application-management-bpo": {
    subtitle: "Lorem ipsum dolor sit amet",
    offerTitle: "Lorem ipsum dolor sit amet",
    cards: [
      {
        title: "Application Management (AM)",
        text: "I servizi di AM sono erogati verso il cliente finale sia su applicativi interamente sviluppati da Benefind che sviluppati da altri fornitori. Il servizio, opportunamente contrattualizzato in termini di SLA (Service Level Agreement) e gestito secondo le migliori practice di mercato (es. ITIL), parte dalla rilevazione di eventuali segnalazioni di anomalia e/o di richieste di estensioni funzionali (attraverso varie forme di Help Desk) e, in seguito alla determinazione ed analisi della problematica, arriva alla correzione dell’anomalia e/o all’implementazione di eventuali funzionalità aggiuntive, e quindi al ripristino del corretto funzionamento dell’applicativo coinvolto e/o al rilascio di una nuova release dello stesso.",
      },
    ],
  },
};

export const servicePages = Object.fromEntries(
  (Object.keys(copy) as (keyof typeof copy)[]).map((slug): [string, ServiceContent] => {
    const c = copy[slug];
    const name = services[slug];
    return [
      slug,
      {
        ...itc,
        breadcrumb: [itc.breadcrumb[0], itc.breadcrumb[1], { label: name }],
        title: name,
        subtitle: c.subtitle,
        offer: {
          title: c.offerTitle,
          cards: c.cards.map((card, i) => ({
            ...card,
            href: "#",
            media: cardMedia[i % cardMedia.length],
          })),
        },
        cases: {
          ...itc.cases,
          // no case study in the wireframe: the template slides stay, with the service name in place of the GSK logo
          slides: itc.cases.slides.map((s) => ({
            ...s,
            logo: undefined,
            name,
            title: "Lorem ipsum dolor sit amet",
            photo: { ...s.photo, alt: "" },
          })),
        },
        other: {
          ...itc.other,
          cards: (Object.keys(services) as ServiceSlug[])
            .filter((s) => s !== slug)
            .map((s) => ({
              title: services[s],
              href: serviceHref(s),
              photo: cardPhoto[services[s]]?.photo ?? null,
              photoBox: cardPhoto[services[s]]?.photoBox ?? null,
            })),
        },
      },
    ];
  }),
) as Record<Exclude<ServiceSlug, "information-technology-consulting">, ServiceContent>;
