import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import styles from "@/components/sections/LegalPage.module.css";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Certificazioni · Gruppo Benefind",
  description: "Benefind è un'organizzazione con Sistema di gestione qualità certificato UNI EN ISO 9001:2015 da IMQ S.p.A.",
};

/** Copy from benefind.it/certificazioni. */
export default function CertificazioniPage() {
  return (
    <LegalPage title="Certificazioni" subtitle="Standard internazionale relativo alla gestione della Qualità">
      <div className={styles.card}>
        <div className={styles.logos}>
          {/* eslint-disable-next-line @next/next/no-img-element -- small static certification marks */}
          <img src={asset("/assets/images/cert-imq-iqnet.webp")} width={168} height={88} alt="IMQ Certified, Quality Management System ISO 9001:2015 - IQNet Recognized Certification" />
          {/* eslint-disable-next-line @next/next/no-img-element -- small static certification marks */}
          <img src={asset("/assets/images/cert-accredia.png")} width={126} height={88} alt="Accredia - Ente Italiano di Accreditamento" />
        </div>
        <p>
          Organizzazione con Sistema di gestione qualità certificato <strong>UNI EN ISO 9001:2015</strong> da IMQ S.p.A.
        </p>
        <p className={styles.meta}>Certificato n. SQ204491</p>
      </div>

      <blockquote className={styles.quote}>
        <p>“Quando si collabora, i successi intellettuali di una persona stimolano la passione e l’entusiasmo degli altri collaboratori”</p>
        <footer>Alexander von Humboldt</footer>
      </blockquote>
    </LegalPage>
  );
}
