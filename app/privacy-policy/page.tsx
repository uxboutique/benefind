import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import styles from "@/components/sections/LegalPage.module.css";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Privacy Policy · Gruppo Benefind",
  description: "Informazioni sul trattamento dei dati personali degli utenti che consultano il sito web di Benefind S.r.l. (art. 13 Reg. UE 2016/679).",
};

/** Copy from benefind.it/privacy-policy (verbatim). */
export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p className={styles.lead}>
        Informazioni sul trattamento dei dati personali degli utenti che consultano il sito web di BENEFIND SRL ai sensi dell’art. 13 Reg.to UE 2016/679
      </p>

      <h2>Perché queste informazioni</h2>
      <p>
        Ai sensi del Regolamento (UE) 2016/679 (di seguito “Regolamento”), questa pagina descrive le modalità di trattamento dei dati personali degli utenti
        che consultano il sito web di BENEFIND SRL accessibile per via telematica al seguente indirizzo: <a href="https://www.benefind.it/">www.benefind.it</a>
      </p>
      <p>
        La presente informazione non riguarda altri siti, pagine o servizi online raggiungibili tramite link ipertestuali eventualmente pubblicati nel sito ma
        riferiti a risorse esterne al dominio di BENEFIND SRL.
      </p>

      <h2>Titolare del trattamento</h2>
      <p>A seguito della consultazione del sito possono essere trattati dati relativi a persone fisiche identificate o identificabili.</p>
      <p>
        Il Titolare del trattamento dei dati, ai sensi della Legge, è BENEFIND SRL (C/F-P.IVA: 06267240486), nella persona del suo legale rappresentante pro
        tempore, con sede legale a Firenze, Via Pratese, n. 201 (mail: <a href="mailto:info@benefind.it">info@benefind.it</a>, pec:{" "}
        <a href="mailto:email@pec.benefind.it">email@pec.benefind.it</a>)
      </p>

      <h2>Base giuridica del trattamento</h2>
      <p>
        I dati personali indicati in questa pagina sono trattati da BENEFIND SRL nell’esecuzione del servizio o della prestazione richiesta prevalentemente
        mediante il consenso degli utenti. Il conferimento del consenso avviene tramite il banner posto in fondo alla pagina dell’area lavora con noi.
      </p>

      <h2>Tipi di dati trattati e finalità del trattamento</h2>
      <h3>Dati di navigazione</h3>
      <p>
        I sistemi informatici e le procedure software preposte al funzionamento di questo sito acquisiscono, nel corso del loro normale esercizio, alcuni dati
        personali la cui trasmissione è implicita nell’uso di protocolli di comunicazione di internet.
      </p>
      <p>
        In questa categoria di dati rientrano gli indirizzi IP o i nomi a dominio dei computer e dei terminali utilizzati dagli utenti, gli indirizzi di
        notazione URI/URL (Uniform Resource Identifier/Locator) delle risorse richieste, l’orario della richiesta, il metodo utilizzato nel sottoporre la
        richiesta al server, la dimensione del file ottenuto in risposta, il codice numerico indicante lo stato della risposta data dal server (buon fine,
        errore, ecc.) ed altri parametri relativi al sistema operativo e all’ambiente informatico dell’utente.
      </p>
      <p>Tali dati, necessari per la fruizione dei servizi web, vengono anche trattati allo scopo di:</p>
      <ul>
        <li>
          ottenere informazioni statistiche sull’uso dei servizi (pagine più visitate, numero di visitatori per fascia oraria o giornaliera, aree geografiche di
          provenienza, ecc.);
        </li>
        <li>controllare il corretto funzionamento dei servizi offerti.</li>
      </ul>
      <p>
        I dati di navigazione non persistono per più di sette giorni (salve eventuali necessità di accertamento di reati da parte dell’Autorità giudiziaria).
      </p>

      <h3>Dati comunicati dall’utente</h3>
      <p>
        L’invio facoltativo, esplicito e volontario di messaggi all’indirizzo di contatto di BENEFIND SRL, comportano l’acquisizione dei dati di contatto del
        mittente, necessari a rispondere, nonché tutti i dati personali inclusi nelle comunicazioni.
      </p>
      <p>
        Specifica informativa verrà pubblicata nella pagina del sito di BENEFIND SRL dedicata all’invio di messaggi all’indirizzo di contatto del Titolare per
        proporre la propria candidatura.
      </p>

      <h3>Cookie e altri sistemi di tracciamento</h3>
      <p>La presente sezione illustra sinteticamente il trattamento di dati attraverso la tecnologia dei c.d. cookie e rinvia all’apposita sezione dedicata.</p>
      <p>
        Il Sito fa uso di c.d. cookie. I cookie sono una breve stringa di testo che viene inviata al browser ed, eventualmente, salvata sul computer, sullo
        smartphone o qualunque altro strumento utilizzato per accedere ad internet, ogni volta che un sito viene visitato.
      </p>
      <p>
        Per ulteriori informazioni circa l’utilizzo dei cookie, le relative finalità e modalità, nonché per gestire le preferenze in merito agli stessi, si
        invita a leggere la nostra <Link href={routes.cookie}>Cookie Policy</Link>.
      </p>

      <h2>Luogo del trattamento dei dati</h2>
      <p>I trattamenti connessi ai servizi offerti da questo sito sono effettuati presso la sede legale di BENEFIND SRL.</p>

      <h2>Destinatari dei dati</h2>
      <p>
        I dati personali raccolti sono trattati esclusivamente da dipendenti o collaboratori di BENEFIND SRL, che agiscono sulla base di specifiche istruzioni
        fornite in ordine a finalità e modalità del trattamento medesimo, o da eventuali incaricati di occasionali operazioni di manutenzione.
      </p>
      <p>
        Nessun dato derivante dai servizi web viene comunicato o diffuso a terzi. I dati personali forniti al momento dell’invio di messaggi all’indirizzo di
        contatto di BENEFIND SRL, sono utilizzati al solo fine di eseguire il servizio o la prestazione richiesta e non sono comunicati a soggetti terzi, salvo
        che la comunicazione sia imposta da obblighi di legge o sia strettamente necessaria per l’adempimento delle richieste.
      </p>

      <h2>Modalità e conservazione del trattamento</h2>
      <p>
        I dati personali sono trattati con strumenti automatizzati e saranno conservati fino a quando deciderà di non ricevere più alcuna comunicazione da parte
        della Società BENEFIND SRL secondo quanto espresso nel paragrafo che segue “Diritti degli Interessati”.
      </p>

      <h2>Diritti degli interessati</h2>
      <p>
        Gli interessati hanno diritto di ottenere da BENEFIND SRL, nei casi previsti, l’accesso ai propri dati personali e la rettifica o la cancellazione
        degli stessi o la limitazione del trattamento che li riguarda o di opporsi al trattamento (artt. 15 e ss. del Regolamento (UE) 2016/679). L’apposita
        istanza è presentata rivolgendosi direttamente al Titolare del trattamento avvalendosi di una delle seguenti modalità: una raccomandata a.r. a BENEFIND
        SRL, Via Pratese, n. 201, cap. 50145, Firenze o, in alternativa, una pec all’indirizzo:{" "}
        <a href="mailto:email@pec.benefind.it">email@pec.benefind.it</a>
      </p>

      <h2>Diritto di reclamo</h2>
      <p>
        Gli interessati che ritengono che il trattamento dei dati personali a loro riferiti effettuato attraverso questo sito avvenga in violazione di quanto
        previsto dal regolamento hanno diritto di proporre reclamo al garante, come previsto dall’art. 77 del Regolamento stesso, o si adire le opportune sedi
        giudiziarie (art. 79 del Regolamento).
      </p>
    </LegalPage>
  );
}
