import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import styles from "@/components/sections/LegalPage.module.css";
import { Button } from "@/components/ui/Button";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Codice etico · Gruppo Benefind",
  description: "Il Codice Etico di Benefind: i valori etici fondamentali della Società e lo standard di comportamento dei collaboratori.",
};

/** Copy from benefind.it/codice-etico. */
export default function CodiceEticoPage() {
  return (
    <LegalPage title="Codice etico">
      <p className={styles.lead}>
        Benefind ha fondato la propria mission proprio sul “fornire una risposta concreta, sotto forma di consulenza specializzata e soluzioni informatiche, e
        accompagnare le imprese in un percorso rivolto all’introduzione di soluzioni tecnologiche avanzate nei processi aziendali”.
      </p>
      <p>
        Il presente Codice Etico è stato elaborato per assicurare che i valori etici fondamentali della Società siano chiaramente definiti e costituiscano
        l’elemento base della cultura aziendale, nonché lo standard di comportamento di tutti i collaboratori di Benefind nella conduzione degli affari e, in
        generale, delle loro attività.
      </p>
      <p>
        Benefind valorizza la professionalità dei suoi collaboratori, promuovendo la collaborazione e condivisione interna ed esterna, allo scopo di migliorare
        ed accrescere il patrimonio delle competenze professionali possedute da ciascuno. Benefind crede nella competizione, intesa quale impegno al
        miglioramento e, come tale, rappresenta un indispensabile fattore di sviluppo e progresso all’interno di un contesto di gruppi di lavoro.
      </p>

      <div className={styles.actions}>
        <Button href={asset("/assets/docs/codice-etico-benefind.pdf")} download>
          Scarica il Codice etico (PDF)
        </Button>
      </div>

      <h2>Segnalazioni</h2>
      <p>
        Per segnalazioni è possibile inviare una mail a <a href="mailto:231@benefind.it">231@benefind.it</a>
      </p>
    </LegalPage>
  );
}
