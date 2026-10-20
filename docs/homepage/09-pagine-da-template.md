# 09 — Tutte le pagine del menù generate dai template

Data: 2026-10-20 · Testi: Figma "WF - Struttura" (0:1) · Template: pagina "Layout" (46:4065)

## Come è fatto

**Template come componenti**
In `components/templates/` ci sono `MarketPage`, `EnablingPage`, `ServicePage` e `ProductPage`.
- Il markup è lo stesso delle pagine originali.
- Le 4 pagine template (Pharma, Integration Platforms, IT Consulting, Spera) li usano con i loro contenuti originali: testi e immagini invariati.

**Contenuti**
In `content/pages/{markets,enabling,services,products}.ts`, ogni pagina:
- parte dal contenuto del template (`{...pharma}` ecc.);
- sostituisce solo i testi presi dal wireframe;
- tiene le immagini del template.

**Rotte**
- `app/{markets,enabling-technologies,services,products}/[slug]/page.tsx` sono generate in statico (`generateStaticParams`, `dynamicParams = false`).
- `lib/routes.ts` è il registro di slug ed etichette. `hrefFor()` riconosce tutte le grafie usate da menu, footer e card (es. "Fashion&Luxury", "BPM / Document Management", "FAI - Fascicolatore AI").

## Pagine create (22)

| Sezione | Template | Pagine |
|---|---|---|
| Markets | Pharma | manufacturing, transportation, fashion-luxury, healthcare, public-administration, financial-services |
| Enabling Technologies | Integration Platforms | artificial-intelligence, bpm, blockchain-tokenization, collaboration, cybersecurity |
| Services | IT Consulting | digital-consulting, software-factory, application-management-bpo |
| Products | Spera | urp, gestione-documentale, comet, aeva, allinapp, legalhub, readvice, fai |

## Mappatura testi

**Markets**
- Sottotitolo = titolo di sezione del wireframe; testo = descrizione lunga.
- Banner = frase d'apertura, spezzata in righe di massimo ~30 caratteri.
- Case study: il nome del progetto sostituisce il logo GSK; titolo "Lorem ipsum dolor sit amet", come nel wireframe.
- Card "Altri markets" = descrizioni brevi del wireframe. Dove mancano, la frase d'apertura.

**Enabling**
- Descrizione lunga divisa tra intro e primo blocco (titolo = titolo di sezione).
- Secondo blocco = frase conclusiva.
- Sottotitolo intro = segnaposto del template ("Lorem ipsum dolor"), come su Integration Platforms.

**Services**
- Sottotitolo = frase d'apertura; titolo dell'offerta = titolo di sezione.
- Una card per ogni sottosezione del wireframe.
- Case study del template, con il nome del servizio al posto del logo GSK.

**Products**
- Sottotitolo e testo dal wireframe; vantaggi (frasi brevi); "Le funzionalità".
- Banner centrale = "Perché X", "Sistema integrato" o "Ottimizza la gestione documentale".
- Il banner è omesso su Comet e FAI, dove il wireframe non lo ha.

**Collegamenti**
Puntano alle nuove pagine:
- mega-menu e menu mobile;
- footer;
- CTA del carosello Markets e card "Tecnologie" in home;
- card "Altri …".

## Da segnalare al cliente

**Pagine mancanti**
- **XR** (menu Enabling): nessun wireframe, pagina non creata.
- **FAI** non è nel mega-menu Products: la pagina esiste ed è raggiungibile dal footer.
- **Collaboration** e **Cybersecurity** non sono nel menu: raggiungibili dal footer.

**Errori nel wireframe**
- **Comet** riporta i testi di FAI (intro) e Spera (funzionalità): usati così come sono.
- La breadcrumb di URP diceva "SPERA": corretta.
- Refusi corretti: "identià" → "identità", "worflow" → "workflow", "determinate" → "determinante".

**Note interne omesse**
- "(NOTA: siamo sicuri?)" in Blockchain.
- "(da verificare se effettivamente esistente) (occorre introdurre il concetto di Generative AI?)" in Collaboration.
- "NOTA DA LORO…" in Software Factory e Application Management.
- Sezione "BackOffice" di Application Management.

**Segnaposto rimasti**
- Intro di Application Management ("Lorem ipsum" / "Da avere testo di introduzione").
- Titoli e descrizioni dei case study.
- Statistiche "99%".
- "Primary CTA".

**Immagini**
- La foto del case study (template Pharma) mostra l'insegna GlaxoSmithKline. Il logo GSK è stato tolto, la foto resta come da template.
- Lo screenshot prodotto è la dashboard del template Spera su tutti i prodotti; alt generico.
- Loghi .svg mancanti per Aeva, AllinApp, LegalHUB, REadvice, FAI: il nome è mostrato come testo.

**Vantaggi prodotto**
Le frasi sono state accorciate per il formato card del template: titolo e testo del wireframe uniti in una frase.

## QA

- 22 pagine nuove + Pharma + Spera, a 1440 e 390: axe 0 violazioni.
- Nessun overflow orizzontale e nessun errore in console.
- Crawl dei link interni: 55 pagine raggiungibili, 0 link rotti.
- Audit sovrapposizioni (360/768/1024/1440) su un campione per tipo: pulito.
- `tsc` e `eslint` puliti.
