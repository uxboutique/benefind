import type { Metadata } from "next";
import { LegalPage, LegalTable } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy · Gruppo Benefind",
  description: "Cosa sono i cookie, quali cookie utilizza il sito di Benefind e come disabilitarli.",
};

const HEAD = ["Cookie", "Durata", "Descrizione"];

/** Copy from benefind.it/cookie-policy (verbatim; the empty "Analitica / Prestazioni / Pubblicitari" groups are left out). */
export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy">
      <h2>Cosa sono i cookie</h2>
      <p>
        I cookie sono stringhe di testo di piccole dimensioni che i siti visitati dall’utente inviano al suo terminale (solitamente al browser), dove vengono
        memorizzati per essere poi ritrasmessi agli stessi siti alla successiva visita del medesimo utente. Nel corso della navigazione su un sito, l’utente può
        ricevere sul suo terminale anche cookie che vengono inviati da siti o da web server diversi (c.d. “terze parti”), sui quali possono risiedere alcuni
        elementi (quali, ad esempio, immagini, mappe, suoni, specifici link a pagine di altri domini) presenti sul sito che lo stesso utente sta visitando.
      </p>
      <p>
        Grazie ai cookie il server invia informazioni che verranno rilette e aggiornate ogni volta che l’utente tornerà sul sito. In questo modo il sito web
        potrà adattarsi automaticamente all’utente, migliorandone l’esperienza di navigazione. Inoltre, i cookie forniscono al gestore del sito informazioni
        anonime sulla navigazione degli utenti, anche per ottenere dati statistici sull’uso del sito e migliorarne la navigazione. Le informazioni raccolte
        tramite i cookie possono essere utilizzate anche per costruire un “profilo” delle preferenze manifestate dall’utente durante la navigazione, allo scopo
        di personalizzare i messaggi di promozione commerciale.
      </p>

      <h2>Tipologia di cookie</h2>
      <p>
        Sulla base della normativa in materia di protezione dei dati personali i cookie possono essere quindi suddivisi in “tecnici”, per l’utilizzo dei quali
        non è richiesto il consenso dell’utente, e “di profilazione” per finalità promozionali, per i quali è invece necessario raccogliere il consenso
        dell’utente.
      </p>

      <h3>Cookie tecnici</h3>
      <p>Questa tipologia di cookie si suddivide ulteriormente in:</p>
      <ul>
        <li>
          <strong>Cookie di navigazione/sessione:</strong> si tratta di cookie fondamentali per navigare all’interno del sito utilizzando tutte le sue
          funzionalità, come ad esempio il mantenimento della sessione e l’accesso alle aree riservate. Sono strettamente necessari, in quanto senza di essi non
          sarebbe possibile fornire i servizi richiesti. Questi cookie non raccolgono informazioni da utilizzare per fini commerciali.
        </li>
        <li>
          <strong>Cookie di funzionalità:</strong> permettono all’utente la navigazione in funzione di una serie di criteri selezionati (ad esempio la lingua) al
          fine di fornire all’utente una migliore esperienza di navigazione. Le informazioni raccolte da questo tipo di cookie sono in forma anonima.
        </li>
      </ul>
      <p>
        Il sito web funziona in modo ottimale se i cookie tecnici sono abilitati; è possibile comunque decidere di non consentire l’utilizzo dei cookie sul
        proprio computer modificando le impostazioni del browser utilizzato come di seguito specificato. Occorre tener presente però che, se vengono disabilitati
        i cookie, potrebbero venire disabilitate alcune funzionalità del sito.
      </p>

      <h3>Cookie di tipo analytics</h3>
      <p>
        Raccolgono e analizzano le informazioni sull’uso del sito da parte dei visitatori (pagine visitate, numero di accessi, tempo di permanenza nel sito,
        ecc.) per ottimizzare la gestione del sito. Questi cookie non raccolgono informazioni che possano identificare in qualche modo l’utente.
      </p>

      <h3>Cookie di profilazione</h3>
      <p>
        I cookie di profilazione sono i cookie volti a creare profili relativi all’utente e vengono utilizzati al fine di inviare messaggi pubblicitari in linea
        con le preferenze manifestate dallo stesso nell’ambito della navigazione in rete.
      </p>
      <p>
        Tali dispositivi possono essere molto invasivi rispetto alla sfera privata degli utenti, pertanto la normativa europea e italiana prevedono che l’utente
        debba essere adeguatamente informato sull’uso degli stessi da parte dell’editore del Sito sul quale naviga ed esprime così il proprio valido consenso.
      </p>
      <p>
        <strong>Benefind, nell’ambito della operatività del Sito, non utilizza alcun cookie di profilazione.</strong>
      </p>

      <h3>Cookie di terze parti</h3>
      <p>
        Navigando nel sito possono essere installati cookie da parte di altri siti, accedibili dal sito ma gestiti da altri soggetti (terze parti). In questo
        caso il titolare del sito funge solo da intermediario tecnico fra l’utente e questi siti.
      </p>
      <p>
        Per informazioni sull’utilizzo dei cookies e sulla loro qualificazione, consultare lo specifico provvedimento adottato dall’Autorità Garante per la
        protezione dei dati personali al seguente indirizzo:{" "}
        <a href="https://www.garanteprivacy.it/web/guest/home/docweb/-/docweb-display/docweb/3118884" rel="noopener noreferrer">
          garanteprivacy.it – docweb 3118884
        </a>
        .
      </p>

      <h3>Google Analytics</h3>
      <p>
        Il sito <a href="https://www.benefind.it/">www.benefind.it</a> utilizza Google Analytics, un servizio di analisi del web fornito da Google Inc. Google
        Analytics utilizza dei cookies che vengono registrati sul computer dell’utente per analizzare come gli utenti utilizzano il sito. Le informazioni
        generate dal cookie sull’utilizzo del sito web da parte dell’utente sono trasmesse e registrate sui server di Google e saranno gestite nel rispetto
        della politica sulla privacy di Google. La società Benefind S.r.l., proprietaria del sito www.benefind.it, utilizza queste informazioni allo scopo di
        comprendere l’utilizzo del sito web da parte dei propri utenti. Qualunque informazione sarà comunque sempre utilizzata in forma anonima e aggregata. Per
        ulteriori informazioni si rimanda all’informativa sulla privacy di Google Analytics.
      </p>

      <h2>I cookie utilizzati nel sito</h2>
      <p>I cookies utilizzati nel sito www.benefind.it sono:</p>
      <LegalTable
        caption="Necessari"
        head={HEAD}
        rows={[["cc_cookie_accept", "1 anno", "Memorizza le preferenze utente sulla scelta dei cookie. In questo modo è possibile nascondere la barra di accettazione temporaneamente."]]}
      />
      <LegalTable caption="Funzionali" head={HEAD} rows={[["pll_language", "1 anno", "Memorizza la scelta della lingua da parte dell’utente."]]} />

      <h2>Come impedire l’utilizzo di cookies e disabilitarli</h2>
      <p>
        Se si elimina l’utilizzo dei cookies, non si potrà più disporre di alcune funzioni necessarie per navigare. La informiamo che in ogni momento l’utente
        può disabilitare l’utilizzo dei cookies sul proprio computer, modificando la configurazione del proprio browser di navigazione. Le modalità dipendono dal
        browser utilizzato e sono descritte nel menù di aiuto dello stesso. Si riportano, di seguito, le opzioni per attivare/disabilitare l’utilizzo dei
        cookies per i browser più diffusi:
      </p>
      <ul>
        <li>
          <strong>Internet Explorer:</strong> Menu: Strumenti/Opzioni Internet Tab “Privacy”, poi “Siti”: in Indirizzo del Sito Web inserire l’indirizzo
          completo (URL) del sito web di cui vuole personalizzare i parametri della privacy. Per autorizzare la registrazione dei cookies del sito web in
          questione sul proprio computer, cliccare Autorizzare; per impedire la registrazione dei cookies del sito web in questione sul proprio computer,
          cliccare Bloccare.
        </li>
        <li>
          <strong>Safari:</strong> Preferenze: tab Privacy e Configurare i cookies.
        </li>
        <li>
          <strong>Chrome:</strong> Cliccare sull’icona delle impostazioni, che si trova sulla barra degli strumenti del browser: Parametri; Cliccare su
          Visualizzare i Parametri Avanzati. Nella sezione “Privacy” cliccare su Parametri del contenuto. Nella sezione “Cookies” può modificare i seguenti
          parametri: Cancellare i cookies, Bloccare i cookies per default, Autorizzare i cookies per default, Definire le eccezioni per i cookies di alcuni siti
          web o domini.
        </li>
        <li>
          <strong>Firefox:</strong> Cliccare su Strumenti e poi su Opzioni. Tab Privacy: nella rubrica Impostazioni cronologia selezionare “utilizza impostazioni
          personalizzate”. Selezionare la casella “accettare i cookies” e cliccare sulle eccezioni per scegliere i siti web che sono da autorizzare sempre o no
          per quel che riguarda l’installazione di cookies sul suo terminale.
        </li>
        <li>
          <strong>Opera:</strong> Preferenze &gt; Avanzate &gt; Cookies. Le preferenze dei cookies permettono di controllare il modo in cui Opera gestisce i
          cookies. La regolazione per default prevede l’accettazione di tutti i cookies.
        </li>
      </ul>
    </LegalPage>
  );
}
