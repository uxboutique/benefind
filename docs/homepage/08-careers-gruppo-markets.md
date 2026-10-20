# 08 — Careers, Gruppo Benefind, carosello Markets, sicurezza e QA browser

Data: 2026-10-20 · Figma `SsKBEykTxpXsWKvGVuS0ed`, pagina "Layout" (46:4065)

## Nuove pagine

| Pagina | Figma | URL | Altezza Figma / build @1440 |
|---|---|---|---|
| Desktop - Careers | Careers | `/careers/` | 5680 / 5705 |
| Desktop - Gruppo Benefind | 169:3328 | `/gruppo-benefind/` | 5312 / 5371 |

Le differenze residue derivano dal ritorno a capo del testo (font web vs Figma), non dalle spaziature.

**Careers**
- Struttura: intro → banner → griglia valori (`ValueGrid`) → fascia "L'innovazione la fanno le persone" con card storia (`Careers flush`) → riga ambiente di lavoro con bullet → posizioni aperte (`JobList`, ancora `#posizioni`) → banner candidatura → contatti.

**Gruppo**
- Struttura: intro con testo a lato → banner → loghi → statement → fascia numeri (`Services background="field"`) → griglia valori → riga testo+foto → banner candidatura → contatti.

**Menu e link**
- Le voci "Careers" e "Gruppo Benefind / Chi siamo" puntano alle nuove pagine:
  - menu utility (desktop e mobile);
  - footer;
  - CTA "Lavora con noi" della home.

## Carosello Markets (home)

Il carosello contiene ora tutti i 7 market del menu, ciascuno con un fondo diverso:

| # | Market | Fondo | CTA |
|---|---|---|---|
| 1 | Manufacturing | satin cacao scurito | — |
| 2 | Pharma | blu (originale) | `/markets/pharma/` |
| 3 | Transportation | blu → petrolio (hue-rotate) | — |
| 4 | Fashion & Luxury | rosso luminoso + velo | — |
| 5 | Healthcare | verde luminoso + velo | `/products/spera/` |
| 6 | Public Administration | tramonto + velo | — |
| 7 | Financial Services | blu → viola (hue-rotate) | — |

- La CTA resta ferma in tutte le slide (y = 391).
- Il contrasto del testo bianco è verificato su **tutte** le slide:
  - `scripts/qa/contrast.mjs` ora scorre il carosello;
  - a 1440 e 390 tutte le slide sono ≥ 4.5:1 (testo) e ≥ 3:1 (titoli).
- Su mobile il velo scurisce dall'alto verso il basso, perché il testo occupa tutta la larghezza.

## Correzioni emerse dal check browser

**Gruppo, fascia numeri**
- L'overlay nero pensato per la fascia cacao della home rendeva il fondo quasi nero; ora è blu come in Figma.
- La spaziatura sopra la fascia era doppia (160): ora è 80.
- Il pannello è a +395 e il fondo a 108, come in Figma.

**Gruppo, mobile**
- L'intro restava su due colonne strette a 390px; ora va in colonna.

**Careers, accessibilità**
- Due sezioni avevano lo stesso nome accessibile, perché il titolo è ripetuto in Figma.
- La lista posizioni ora si chiama "Posizioni aperte: …" (axe `landmark-unique`).

## Check sicurezza

**Dipendenze (`npm audit`)**
- Produzione: **0 vulnerabilità**.
- Sviluppo: 5 "high" nella catena `eslint-config-next → fast-glob → micromatch → braces`.
  - È solo lint in locale/CI e non entra nel sito statico.
  - La correzione automatica richiede un downgrade incompatibile: da aggiornare quando esce `eslint-config-next` compatibile.

**Codice**
- Nessun `eval`, `new Function`, `innerHTML` o `document.write`.
- L'unico `dangerouslySetInnerHTML` è lo script di boot statico in `app/layout.tsx`: costante, senza input esterni.
- Nessun link esterno `target="_blank"`.

**Segreti**
- Nessun file `.env`, chiave o token nel repo né nella cronologia git.
- `.gitignore` copre `.env*.local`.

**CI e indicizzazione**
- Workflow Pages con permessi minimi (`contents: read`, `pages: write`, `id-token: write`) e action ufficiali con versione fissata.
- `noindex, nofollow` attivo sul deploy di test.

## QA browser

Solo **Chromium** è disponibile in questo ambiente, con emulazione 1440 / 390 / touch. Safari e Firefox non sono stati provati e vanno verificati su dispositivo reale.

| Check | Esito |
|---|---|
| axe WCAG 2.1 AA (7 pagine × 1440/390) | 0 violazioni |
| Overflow orizzontale / sovrapposizioni (360–1180) | nessuna |
| Contrasto testo su immagini | tutto PASS |
| Motion: reveal, CLS, errori console | CLS 0, nessun errore |
| Carosello (swipe, frecce, fine corsa) | OK |
| Menu mobile (accordion, navigazione, scroll lock) | OK |
| Posizioni home vs Figma | entro ±17 px |
| `tsc`, `eslint` | OK |

## Da confermare con il cliente

- Testi delle slide market diverse da Pharma: scritti partendo dalle descrizioni già sul sito.
- CTA delle slide senza pagina dedicata: link segnaposto, inerti.
- Foto Gruppo (città, team, candidatura): disponibili solo a 1000px, servono originali in alta risoluzione.
- Testi lorem ipsum di Gruppo e citazione/nome nella card storia Careers: placeholder come da Figma.
- Le 4 posizioni aperte sono identiche, come in Figma: servono i ruoli reali.
