/*
 * Products pages built on the Spera template (Figma 143:4468): same structure and images (dashboard screenshot,
 * compliance photo, luminous thumbs), copy from the wireframes in "WF - Struttura" (0:1).
 * - Products without an .svg logo ("Da avere logo in formato .svg") show their name as text.
 * - The middle banner ("Perché …", "Sistema integrato") is omitted where the wireframe has none (Comet, FAI).
 * - Comet: the wireframe repeats FAI / Spera copy; it is used as is (flagged in the report).
 */
import { asset } from "@/lib/asset";
import { rowThumb } from "@/lib/media";
import { spera } from "@/content/spera";
import { productHref, products, type ProductSlug } from "@/lib/routes";
import type { ProductContent } from "./types";

const icons = spera.benefits.items.map((b) => b.icon);
const thumbs = [rowThumb.blue, rowThumb.sunset, rowThumb.green];
const logo = (file: string, w: number, h: number) => ({
  src: asset(`/assets/logos/products/${file}.svg`),
  width: w,
  height: h,
});

/** "Altri products" card copy: mega-menu tile text where it exists, otherwise the wireframe subtitle. */
const blurb: Record<ProductSlug, string> = {
  spera: "Gestione delle sperimentazioni",
  urp: "Gestione delle segnalazioni dei cittadini",
  "gestione-documentale": "Gestione workflow management aziendale",
  comet: "Fascicolatore AI ottimizza la gestione documentale",
  aeva: "Gestione della fiscalità dei cespiti ammortizzabili",
  allinapp: "Mobile & desktop, il lavoro diventa smart",
  legalhub: "Monitoraggio e trattamento dei crediti unlikely to pay",
  readvice: "Lo strumento per il controllo del portafoglio immobiliare",
  fai: "Il sistema informatico che aggiunge efficienza ai processi",
};

type Copy = {
  logo?: ProductContent["logo"];
  subtitle: string;
  text: string[];
  benefits: string[];
  banner?: { titleLines: string[]; text: string[] };
  features: [string, string][];
};

const copy: Record<Exclude<ProductSlug, "spera">, Copy> = {
  urp: {
    logo: logo("urp", 200, 81),
    subtitle: "La web app per la gestione delle segnalazioni dei cittadini",
    text: [
      "URP è la web app pensata per la gestione delle segnalazioni dei cittadini, valorizzando il loro diritto a essere informati, ascoltati e a ricevere risposte chiare in tempi brevi.",
      "Rivolta a strutture sanitarie e pubblica amministrazione, consente di snellire i processi di informazione, accoglienza e orientamento per migliorare l’erogazione e l’accesso ai servizi.",
    ],
    benefits: [
      "Sviluppo di workflow specifici: crea un flusso di lavoro chiaro semplificando i flussi informativi tra i soggetti coinvolti",
      "Customer Satisfaction: verifica la qualità del servizio percepito dall’utente attraverso un questionario",
      "Cruscotto e reporting: report di monitoraggio molto dettagliati relativi all’attività erogata",
    ],
    banner: {
      titleLines: ["Sistema", "integrato"],
      text: [
        "La soluzione che risponde alle esigenze di utenti e operatori.",
        "Applicazione web lato utente: un’interfaccia chiara, studiata per rendere semplice e immediata la fruizione delle informazioni e l’invio delle segnalazioni.",
        "Sistema di workflow: il sistema consente la corretta gestione della sequenza di operazioni da svolgere nel tempo, correlando tra loro informazioni, flussi e gli uffici in modo semplice e rapido.",
      ],
    },
    features: [
      ["Accoglienza della richiesta", "La segnalazione può arrivare dallo sportello, via telefono, mail, fax o apposito form on line"],
      ["Identificazione dell’utente", "Identificazione dell’utente attraverso una fase di registrazione sul sistema al momento in cui effettua la richiesta"],
      ["Presa in carico della richiesta", "Presa in carico della richiesta in tempi brevi, con la verifica puntuale delle richieste pendenti"],
    ],
  },
  "gestione-documentale": {
    logo: logo("gestione-documentale", 200, 54),
    subtitle: "Workflow management",
    text: [
      "Il software web-based per la gestione del workflow aziendale che consente di migliorare la performance dei processi, ridurre i cicli temporali e aumentare la produttività automatizzando, snellendo e ottimizzando il flusso di lavoro.",
      "Informatizzare l’iter dei flussi documentali è condizione determinante per aumentare il grado di efficienza, ridurre i margini di errore e ottimizzare la gestione del tempo da parte degli operatori.",
    ],
    benefits: [
      "Incremento dell’efficienza: l’automazione elimina gli step non performanti",
      "Miglior controllo dei processi mediante la standardizzazione di metodi di lavoro e strumenti di verifica",
      "Maggiore flessibilità: il processo di lavoro può essere programmato in base alle diverse esigenze",
    ],
    banner: {
      titleLines: ["Ottimizza la gestione", "documentale"],
      text: [
        "Con Gestione Documentale è possibile correlare fra loro documenti generici ed eterogenei, protocollati o no, e definire un iter grafico per descrivere il flusso informativo (workflow) all’interno dell’organizzazione.",
        "Fornisce inoltre tutto il necessario per la progettazione di moduli elettronici, essenziali per snellire i processi decisionali dell’azienda.",
      ],
    },
    features: [
      [
        "Gestione dei processi",
        "Definisce e controlla l’evoluzione temporale e operativa di un processo, dal momento della nascita a quello del suo completamento. Supporta la gestione dei flussi documentali (introduzione, accesso, ricerca, archiviazione) pertinenti al processo, con le funzionalità specifiche che supportano la convivenza di documenti elettronici e cartacei. Controlla i flussi del processo e ne gestisce le interfacce verso utenti e applicazioni esterne. Gestisce gli allarmi per gli utenti.",
      ],
      [
        "Gestione Documentale",
        "Acquisizione documentale compatibile con gli scanner dotati di interfaccia Twain. Gestione della persistenza (secondo i criteri d’autorizzazione applicativa e personale) di dati e documenti. Distribuzione delle risorse con i rispettivi diritti di accesso (lettura e scrittura) rendendone uniformi le modalità. Storage con funzioni di accesso e ricerca a basso livello per i documenti e per i dati gestiti tramite database. Funzioni di full text per l’inserimento, la ricerca e la gestione delle versioni dei documenti.",
      ],
      [
        "eFORMS",
        "Progetta, crea, distribuisce ed elabora eForms e dati associati. Trasforma velocemente i moduli cartacei in eForms totalmente interattivi che si connettono direttamente alle applicazioni principali dell’azienda, riducendo errori e possibili inefficienze. Interoperabilità di servizi e applicazioni esterne alla piattaforma con quelli interni con tecnologie SOA (Service Oriented Architecture).",
      ],
      [
        "Firma digitale",
        "Utilizzo di un sistema di firma digitale, realizzato lato server senza necessità di download di documenti da firmare e senza installazioni locali di componenti.",
      ],
    ],
  },
  comet: {
    logo: logo("comet", 200, 50),
    subtitle: "Fascicolatore AI: ottimizza la gestione documentale",
    text: [
      "FAI è il sistema informatico dedicato a chi desidera migliorare l’efficienza nei processi di ricezione, smistamento e catalogazione dei documenti. Grazie a tecnologie avanzate, il sistema distribuisce automaticamente la documentazione ai fascicoli rilevanti, riducendo le attività ripetitive e ottimizzando il flusso di lavoro.",
      "L'uso del machine learning consente una continua riduzione dei costi nel tempo, raggiungendo livelli superiori di efficienza e migliorando l’allocazione delle risorse aziendali.",
    ],
    benefits: [
      "Compliance normativa: procedure conformi alla vigilanza delle autorità e alla regolamentazione nazionale e sovranazionale",
      "Salvaguardia del patrimonio informativo in modalità SaaS, con sistemi di Cyber security e Disaster Recovery",
      "Riduce i costi, semplifica e rende più efficiente la gestione dei processi",
      "Comunicazione full digital tra gli attori del processo, con gruppi di utenti e relazioni gerarchico-funzionali chiare",
    ],
    features: [
      [
        "Gestione del farmaco sperimentale",
        "Creazione del registro del farmaco sperimentale, gestione della fornitura al paziente e/o al reparto, distribuzione e reso del farmaco sperimentale",
      ],
      [
        "Gestione sperimentazione",
        "Modulo rivolto al Comitato Etico e alla Segreteria del CE per l’efficientamento della gestione documentale e monitoraggio di tutti i trial clinici",
      ],
      [
        "Prestazioni erogate ai pazienti",
        "Gestione prestazioni e flussi finanziari associati, l’amministrazione e il controllo dei flussi finanziari per le prestazioni da erogare.",
      ],
      ["Gestione Segreteria Aziendale", "Gestione documentale finalizzata ad un workflow rapido e funzionale per la Segreteria Aziendale"],
      ["Principal Investigator", "Dedicato alle attività di stesura delle relazioni e contabilizzazione dei pazienti del Principal Investigator"],
      ["Contrattazione e gestione del budget", "Funzionalità a sostegno della fase di contrattazione tra Azienda Ospedaliera/Sanitaria e Sponsor"],
      [
        "Forum del Comitato etico",
        "La sincronizzazione delle comunicazioni favorisce e consente la conduzione delle riunioni virtuali del CE, accelera le procedure e facilita la rapida autorizzazione degli studi compassionevoli",
      ],
      [
        "Segreteria del Comitato Etico",
        "Facilita la gestione dei flussi informativi e documentali per il Comitato Etico, la Segreteria amministrativa e tecnico scientifica",
      ],
      [
        "e-Submission per sponsor e CRO",
        "Consente l’invio della documentazione per la valutazione del protocollo di sperimentazione e la richiesta del documento di fattibilità dello studio sperimentale",
      ],
    ],
  },
  aeva: {
    subtitle: "AEVA - Asset Evaluation System: per la gestione della fiscalità dei cespiti ammortizzabili",
    text: [
      "Il corretto calcolo delle imposte e la relativa gestione dei disallineamenti fra valori civilistici e fiscali rappresenta un tema di particolare attenzione che investe il reporting aziendale e di gruppo.",
      "La gestione dei valori riconosciuti fiscalmente dei cespiti ammortizzabili e delle conseguenti imposte anticipate e differite, evidenziano la necessità di soluzioni dedicate, adattabili alle diverse esigenze della compliance aziendale.",
    ],
    benefits: [
      "Facilmente integrabile nei sistemi informatici aziendali",
      "Parametrizzabile secondo le necessità dei diversi utenti",
      "Monitoraggio puntuale dei valori fiscali dei cespiti, anche per i diversi plant aziendali",
    ],
    banner: {
      titleLines: ["Perché", "AEVA"],
      text: [
        "AEva – Asset Evaluation garantisce il corretto calcolo del valore fiscale dei beni ammortizzabili, delle variazioni in aumento e diminuzione ai fini delle imposte sui redditi, nonché delle quote deducibili di iper e super ammortamento riconosciute su alcune tipologie di investimenti.",
      ],
    },
    features: [
      ["Gestione inventario", "Gestione dell’inventario completo dei cespiti aziendali valorizzati secondo la normativa fiscale in vigore"],
      ["Calcolo ammortamento fiscale", "Calcolo ammortamento fiscale sulla base dei coefficienti ministeriali (c.d. ammortamento fiscale «teorico»)"],
      [
        "Confronto ammortamento civilistico e fiscale «teorico»",
        "Confronto fra ammortamento civilistico e fiscale «teorico» per consolidare un ammortamento fiscale effettivo del cespite",
      ],
      [
        "Calcolo variazioni in aumento e in diminuzione",
        "Calcolo delle variazioni in aumento e in diminuzione ai fini IRES che scaturiscono dal disallineamento tra ammortamento civilistico e fiscale",
      ],
      [
        "Calcolo recupero quota della svalutazione",
        "Calcolo del recupero della quota della svalutazione tempo per tempo deducibile ai fini IRAP e la conseguente variazione in diminuzione",
      ],
      [
        "Calcolo quota di iper o super ammortamento",
        "Calcolo della quota di iper o super ammortamento e il relativo beneficio fiscale derivante dalla norma agevolativa",
      ],
    ],
  },
  allinapp: {
    subtitle: "AllinApp: mobile & desktop, il lavoro diventa smart",
    text: [
      "Lo strumento che aiuta a coinvolgere i dipendenti nella vita aziendale, con strumenti che integrano lavoro e socialità.",
      "AllinApp è il sistema (APP + desktop) che semplifica e rende più efficiente la comunicazione aziendale e la fruibilità delle informazioni, determinando un significativo aumento della produttività e del senso di appartenenza.",
    ],
    benefits: [
      "Coinvolge i dipendenti nella vita aziendale, integrando lavoro e vita sociale",
      "Aumenta la produttività grazie a una maggiore efficacia nella condivisione delle informazioni",
      "Incrementa coesione e senso di appartenenza e la trasmissione dei valori aziendali",
    ],
    banner: {
      titleLines: ["Perché", "AllinApp"],
      text: [
        "AllinApp punta ad aumentare la coesione fra dipendenti e azienda come volano di sviluppo per le imprese che vogliono aumentare il loro vantaggio competitivo, mettendo a disposizione strumenti di lavoro moderni ed efficaci. Pensata in ottica mobile ma fruibile anche da desktop, unisce nella stessa App un’area con funzionalità strettamente lavorative a un’altra di socializzazione fra i dipendenti.",
        "Custom made: ideale per aziende di medio/grandi dimensioni, con le integrazioni fra la app e i sistemi aziendali. Ready to use: per utilizzare subito un sistema di condivisione dati e informazioni senza integrazione con i sistemi aziendali.",
      ],
    },
    features: [
      [
        "Rubrica aziendale e funzionigramma",
        "AllinApp è customizzato sulle esigenze dell’azienda. Adotta ruoli e utilizza i nominativi dei dipendenti/collaboratori, favorendo una migliore integrazione e interconnessione",
      ],
      [
        "Messenger interno professionale",
        "Facilita la collaborazione dei dipendenti in vari reparti e località, migliorando la loro produttività e la rapidità decisionale.",
      ],
      [
        "Moduli aggiuntivi",
        "La app può essere integrata con funzionalità aggiuntive quali ad esempio: gestione turni, to do list, prenotazione sale riunioni, richiesta utilizzo mezzi aziendali",
      ],
      [
        "Repository documentale",
        "Il dipendente ha la possibilità di accedere in mobilità alla propria documentazione digitale e agli standard documentali aziendali.",
      ],
      [
        "Comunicazioni generali",
        "Il sistema permette agli amministratori di definire news, circolari, eventi da rendere disponibili a un gruppo di destinatari o singolo dipendente con modalità informativa - accettazione - ricevuta",
      ],
      ["Bacheca annunci", "Questa funzionalità consente la creazione di una vetrina professionale per accogliere annunci di vario genere."],
      [
        "Area news e informazioni",
        "La funzionalità permette di rendere facilmente e immediatamente fruibili ai dipendenti le informazioni che riguardano le novità della propria azienda.",
      ],
    ],
  },
  legalhub: {
    subtitle: "LegalHUB: monitoraggio e trattamento dei crediti unlikely to pay",
    text: [
      "Legal HUB è il sistema che facilita il monitoraggio e il trattamento dei crediti in stato UTP (unlikely to pay), agevolando la gestione di tutte le attività precedenti le fasi di lavorazione dei NPL (Non Performing Loans).",
      "Si tratta di un software adattabile ai processi interni del cliente che consente la massima integrazione tra i processi della banca o dell’attività dell’ufficio NPL e dello studio legale, in ottica win-win.",
    ],
    benefits: [
      "Facilita la gestione dei crediti unlikely to pay",
      "Propone un processo win win fra banca e studio legale",
      "Si adatta ai processi interni della banca, dell’ufficio NPL e dello studio legale",
      "Hosting dedicato, connettività ridondata e backup su Firenze e Roma (Data Center certificato ISO/IEC 27001:2013)",
      "Visione immediata e controllo costante di qualunque credito non in stato bonis",
    ],
    banner: {
      titleLines: ["Perché", "LegalHUB"],
      text: [
        "Legal HUB si adatta alla struttura organizzativa della banca cliente per la gestione delle attività da compiere per il trattamento di qualsiasi credito che non si trovi nello stato bonis.",
      ],
    },
    features: [
      ["Semplificazione nella gestione dei crediti", "Facilita la gestione dei crediti unlikely to pay"],
      [
        "Gestione mirata dei contatti e solleciti",
        "Facilita azioni mirate di contatto/sollecito (e-mail, pec, telefono) inerenti il rapporto commerciale fra il cedente e il debitore",
      ],
      ["Monitoraggio continuo dei crediti", "Agevola il controllo costante dei crediti che non si trovano nello stato bonis"],
    ],
  },
  readvice: {
    subtitle: "REadvice: lo strumento per il controllo del portafoglio immobiliare",
    text: [
      "REadvice fornisce strumenti di semplice utilizzo che consentono ai professionisti di coadiuvare i clienti nella corretta analisi e comprensione degli effetti finanziari ed economici del portafoglio immobiliare.",
      "REadvice mette a disposizione un team di professionisti che affiancano il gestore della relazione nella definizione delle soluzioni per il cliente, fornendo supporto nelle attività di analisi. Il software proprietario permette al cliente di effettuare una simulazione di acquisto e vendita degli immobili, consentendo di analizzare i nuovi flussi economici e finanziari.",
    ],
    benefits: [
      "Il software proprietario consente di analizzare il portafoglio immobiliare",
      "Il sistema permette di produrre un report della posizione del cliente",
      "Supporta l’attività del consulente fornendo un quadro completo della posizione",
    ],
    banner: {
      titleLines: ["Perché", "REadvice"],
      text: [
        "REadvice nasce dall’idea progettuale di un gruppo di professionisti che hanno messo a fattor comune esperienze diversificate, maturate in ambiti professionali distinti. L’obiettivo comune è stato lo sviluppo di un progetto innovativo che offra servizi di consulenza inerenti il patrimonio immobiliare dei clienti.",
        "REadvice è il software proprietario che consente di effettuare il primo step di analisi del portafoglio immobiliare e di predisporre una reportistica utile a fornire al cliente un quadro approfondito dell’effettiva situazione finanziaria del suo patrimonio immobiliare.",
      ],
    },
    features: [
      ["Stime e valutazioni", "Stima del valore di mercato, valutazioni per mutui e immobili aziendali in piani di ristrutturazione del credito"],
      ["Studi e business plan", "Studi di mercato e sostenibilità tecnico-economica-finanziaria; predisposizione e validazione del Business Plan immobiliare"],
      ["Locazioni e dismissioni", "Rinegoziazione dei canoni passivi, Information Memorandum e strategie per la dismissione di immobili o portafogli"],
      ["Vendite e comunicazione", "Supervisione delle politiche commerciali, congruità dei prezzi e attività di comunicazione e web marketing."],
      ["Documentazione e conformità", "Recupero documentale, adeguamenti normativi, certificazioni e rilievi tecnici"],
      ["Rischi e strategie", "Gestione dei rischi, remarketing, analisi fiscale, strutturazione societaria e passaggio generazionale"],
    ],
  },
  fai: {
    subtitle: "Fascicolatore AI: il sistema informatico che aggiunge efficienza ai processi",
    text: [
      "Il sistema informatico proposto è dedicato a tutti i soggetti che necessitano di aggiungere efficienza ai processi di ricezione, smistamento e catalogazione di documenti e informazioni provenienti da una molteplicità di canali.",
      "Consente l’assegnazione/distribuzione della nuova documentazione ai singoli fascicoli interessati; semplifica l’intero processo diminuendo le attività ripetitive; consente una riduzione dei costi nel tempo grazie al machine learning. Fascicolatore AI consente il raggiungimento di più alti livelli di efficienza e una migliore allocazione delle risorse.",
    ],
    benefits: [
      "Velocità di creazione dei dossier",
      "Passaggio graduale da funzionalità di ricerca testuale a semantica",
      "Gestione di un alto volume di documenti, riducendo il tasso di errore umano",
      "Fascicolo costantemente aggiornato e disponibile in base all’organigramma e ai diritti di accesso",
      "Meno ricerca manuale dei documenti, con benefici in termini di produttività",
    ],
    features: [
      ["Logica incrementale", "I documenti validati dall’AI avranno una percentuale di confidenza crescente nel tempo."],
      [
        "Soluzione scalabile",
        "Soluzione scalabile in termini di fonti di acquisizione dei dati. L’azienda può decidere di attingere a repository crescenti nel tempo.",
      ],
      [
        "Consultazione centralizzata",
        "Il sistema dà la possibilità di effettuare una consultazione centralizzata della “strada” percorsa dai documenti / dossier",
      ],
      [
        "Gestione efficiente dei dossier",
        "Permette di rintracciare facilmente il contenuto dei dossier che hanno cicli di lavorazione lunghi. I sistemi di comunicazione individuale non si adattano alla gestione dei processi decisionali di media e lunga durata",
      ],
      ["Trasferisce informazioni utili", "Facilita il trasferimento delle informazioni tra utenti e uffici"],
    ],
  },
};

export const productPages = Object.fromEntries(
  (Object.keys(copy) as (keyof typeof copy)[]).map((slug): [string, ProductContent] => {
    const c = copy[slug];
    const name = products[slug];
    return [
      slug,
      {
        ...spera,
        breadcrumb: [spera.breadcrumb[0], spera.breadcrumb[1], { label: name }],
        title: name,
        logo: c.logo,
        subtitle: c.subtitle,
        text: c.text,
        showcase: {
          screenshot: spera.showcase.screenshot,
          alt: "Esempio di dashboard di un applicativo Benefind",
          ...(c.logo ? { logo: { src: c.logo.src, alt: name } } : { name }),
        },
        benefits: {
          ...spera.benefits,
          title: `I vantaggi di ${name}`,
          items: c.benefits.map((text, i) => ({
            icon: icons[i % icons.length],
            text,
          })),
        },
        compliance: c.banner && {
          ...spera.compliance,
          titleLines: c.banner.titleLines,
          text: c.banner.text,
        },
        features: {
          ...spera.features,
          items: c.features.map(([title, text], i) => ({
            title,
            text,
            media: thumbs[i % thumbs.length],
          })),
        },
        other: {
          ...spera.other,
          cards: (Object.keys(products) as ProductSlug[])
            .filter((s) => s !== slug)
            .map((s) => ({
              title: products[s],
              text: blurb[s],
              href: productHref(s),
              photo: null,
              photoBox: null,
            })),
        },
      },
    ];
  }),
) as Record<Exclude<ProductSlug, "spera">, ProductContent>;
