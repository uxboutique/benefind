/*
 * Enabling Technologies pages built on the Integration Platforms template (Figma 142:3675): same structure and
 * media, copy from the wireframes in "WF - Struttura" (0:1). The wireframe body is split, as on the template,
 * between the intro and the first row; the closing tagline is the second row. Internal notes in the
 * wireframe copy ("NOTA: siamo sicuri?", "da verificare…") are left out.
 */
import { integrationPlatforms as ip } from "@/content/integration-platforms";
import { enabling, enablingHref, type EnablingSlug } from "@/lib/routes";
import type { EnablingContent } from "./types";

const blurb: Record<EnablingSlug, string> = {
  "integration-platforms": 'L\'utilizzo di piattaforme "low/no code" garantisce flessibilità e coerenza per gli sviluppatori front-end e back-end.',
  "artificial-intelligence":
    "L'AI è utile quando è integrata in soluzioni concrete. Offriamo soluzioni per previsioni di business e ottimizzazione dei processi.",
  bpm: "Automatizziamo e centralizziamo i flussi documentali per ridurre errori e aumentare l'efficienza operativa.",
  "blockchain-tokenization": "Utilizziamo Scrypta Blockchain per soluzioni innovative, migliorando sicurezza e trasparenza.",
  collaboration: "Sistemi aziendali per favorire la collaborazione interna ed esterna.",
  cybersecurity: "Supporto operativo per mettere in sicurezza la continuità produttiva.",
};

const cardMedia = ip.other.cards.map((c) => c.media);

type Copy = {
  subtitle: string;
  intro: string;
  rowText: string;
  tagline: string;
};

const copy: Record<Exclude<EnablingSlug, "integration-platforms">, Copy> = {
  "artificial-intelligence": {
    subtitle: "AI Strategica: soluzioni intelligenti per ottimizzare processi e decisioni aziendali",
    intro:
      "L’Intelligenza Artificiale fa ormai già parte dell’universo lavorativo ed è oggi elemento distintivo delle soluzioni all’avanguardia. Da anni aziende in tutto il mondo sviluppano algoritmi di intelligenza artificiale, ma la tecnologia da sola non basta. L’AI è in grado di dare pienamente i propri frutti solo quando tali tecnologie vengono inserite in soluzioni e servizi che siano di facile fruizione e, soprattutto, di utilità concreta e possibilmente immediata.",
    rowText:
      "Ciò che fa la differenza è la capacità di conoscere in modo approfondito sia l’aspetto tecnologico che quello aziendale, riuscendo così a interpretare le esigenze delle aziende per proporre soluzioni che garantiscano efficienza e affidabilità. Benefind ha selezionato dei partner strategici nell’area delle piattaforme di Digital Decision e di Intelligent Process Automation con le quali costruire soluzioni per le previsioni di business e l’ottimizzazione dei processi aziendali.",
    tagline: "L’AI per ottimizzare processi e soluzioni aziendali",
  },
  bpm: {
    subtitle: "Automazione e centralizzazione del flusso documentale",
    intro:
      "Il corretto flusso documentale rappresenta un elemento cruciale nell'operatività delle organizzazioni moderne, contribuendo all'efficienza ed alla trasparenza delle operazioni. Tuttavia, la complessità delle funzioni organizzative coinvolte spesso supera i confini aziendali, richiedendo al personale di interagire con una varietà di sistemi informatici e soggetti interni. Questa dispersione delle informazioni può causare frammentazione dei dati, con documenti presenti in molteplici archivi.",
    rowText:
      'In aggiunta a ciò, la gestione dei flussi documentali spesso richiede un\'elevata partecipazione umana, con il personale che deve agire come "integratore umano" tra diversi sistemi informatici, con conseguente aumento del rischio di errore e rallentamento dei processi. Per affrontare tali sfide Benefind adotta approcci innovativi e soluzioni tecnologiche avanzate, come sistemi di gestione documentale integrati con strumenti di BPM che centralizzano ed automatizzano la gestione dei documenti. In questo modo si migliorano il controllo e la visibilità sui documenti, consentendo una maggiore efficienza operativa complessiva.',
    tagline: "Approcci innovativi e soluzioni tecnologiche avanzate, come sistemi di gestione documentale integrati con strumenti di BPM",
  },
  "blockchain-tokenization": {
    subtitle: "Trasparenza, sicurezza e nuove opportunità di investimento",
    intro:
      "La blockchain e la tokenizzazione stanno rivoluzionando il modo in cui sono concepite e gestite le transazioni digitali. La blockchain, un registro digitale distribuito ed immutabile, fornisce una tracciabilità ed una sicurezza senza precedenti alle transazioni. La tokenizzazione permette di rappresentare digitalmente beni fisici o virtuali tramite token su una blockchain, aprendo la strada alla democratizzazione degli investimenti ed alla liquidità per una vasta gamma di attività.",
    rowText:
      "Queste tecnologie offrono trasparenza, sicurezza e nuove opportunità di investimento, rendendo più efficienti e accessibili i mercati finanziari e reali. Nello specifico Benefind ha scelto di utilizzare la Scrypta Blockchain per creare architetture che necessitano di servizi che presuppongono l’utilizzo di blockchain e tokenizzazione.",
    tagline: "Blockchain e Tokenization per rendere più efficienti e accessibili i mercati finanziari e reali",
  },
  collaboration: {
    subtitle: "Sistemi aziendali per favorire la collaborazione interna ed esterna",
    intro:
      "È essenziale per promuovere un ambiente di lavoro dinamico e creativo, e svolge un ruolo cruciale nell'innovazione tecnologica e nel raggiungimento del successo aziendale.",
    rowText:
      "Le sfide sempre più complesse e le richieste dei clienti hanno reso fondamentale per le aziende ricercare dei sistemi che favoriscano la collaborazione tra i dipendenti, sia internamente che esternamente, per sviluppare soluzioni all'avanguardia, garantire la sicurezza dei dati e fornire servizi di alta qualità. Per fare fronte a ciò Benefind ha sviluppato assistenti virtuali BOT in grado di coadiuvare e supportare adeguatamente il personale delle aziende che deve interagire, in modalità remota, con i propri clienti.",
    tagline: "Innovare e collaborare: Benefind rivoluziona il supporto aziendale con i sistemi virtuali BOT",
  },
  cybersecurity: {
    subtitle: "Supporto operativo per mettere in sicurezza la continuità produttiva",
    intro:
      "È di vitale importanza per tutti i business digitali, dai financial services alla produzione industriale, ovunque vi sia una automazione spinta. Benefind si è concentrata sul settore manifatturiero dove è cruciale proteggere i dati e le infrastrutture digitali dall'aumento delle minacce online. La digitalizzazione delle operazioni di produzione ha reso infatti le fabbriche più efficienti, ma le ha anche esposte a nuove vulnerabilità.",
    rowText:
      "Hacker e criminali informatici possono danneggiare la produzione e causare ingenti perdite finanziarie. Per mitigare questi rischi, le aziende devono adottare una strategia completa di cybersecurity, comprese soluzioni specifiche per il settore e formazione del personale. In particolare, IXway è in grado di offrire un supporto anche operativo alla definizione di infrastrutture tecnologiche capaci di mettere il più possibile in sicurezza la continuità produttiva delle aziende clienti.",
    tagline: "Strategia completa di cybersecurity, per le aziende e per la formazione del personale",
  },
};

export const enablingPages = Object.fromEntries(
  (Object.keys(copy) as (keyof typeof copy)[]).map((slug): [string, EnablingContent] => {
    const c = copy[slug];
    const name = enabling[slug];
    return [
      slug,
      {
        ...ip,
        breadcrumb: [ip.breadcrumb[0], ip.breadcrumb[1], { label: name }],
        title: name,
        // the wireframe has no sub-heading for the intro: the template placeholder stays, as on Integration Platforms
        subtitle: ip.subtitle,
        text: c.intro,
        rows: [
          {
            ...ip.rows[0],
            id: `${slug}-row-1`,
            eyebrow: name,
            title: c.subtitle,
            text: c.rowText,
          },
          {
            ...ip.rows[1],
            id: `${slug}-row-2`,
            eyebrow: name,
            title: c.tagline,
            lines: undefined,
            text: c.tagline,
          },
        ],
        other: {
          ...ip.other,
          cards: (Object.keys(enabling) as EnablingSlug[])
            .filter((s) => s !== slug)
            .map((s, i) => ({
              title: enabling[s],
              text: blurb[s],
              href: enablingHref(s),
              media: cardMedia[i % cardMedia.length],
            })),
        },
      },
    ];
  }),
) as Record<Exclude<EnablingSlug, "integration-platforms">, EnablingContent>;
