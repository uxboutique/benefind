import type { Metadata } from "next";
import { Benefits } from "@/components/sections/Benefits";
import { Contact } from "@/components/sections/Contact";
import { FeatureList } from "@/components/sections/FeatureList";
import { ImageBanner } from "@/components/sections/ImageBanner";
import { MarketCards } from "@/components/sections/MarketCards";
import { PageIntro } from "@/components/sections/PageIntro";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { SplitIntro } from "@/components/sections/SplitIntro";
import { spera } from "@/content/spera";
import styles from "../../inner-page.module.css";

export const metadata: Metadata = {
  title: "Spera — Products · Gruppo Benefind",
  description: "SPERA: l’applicativo 100% web-based per la gestione delle sperimentazioni cliniche di Aziende Sanitarie e Ospedaliere.",
};

/** Products › Spera (Figma "Desktop - Template Products" 143:4468). */
export default function SperaPage() {
  const { benefits, compliance, features, other } = spera;
  return (
    <>
      <PageIntro breadcrumb={spera.breadcrumb} title={spera.title} logo={spera.logo} subtitle={spera.subtitle} text={spera.text} cta={spera.cta} />
      <div className={styles.afterIntro}>
        <ProductShowcase {...spera.showcase} />
      </div>
      <div className={styles.block}>
        <Benefits id="spera-benefits-title" {...benefits} />
      </div>
      <div className={styles.block}>
        <ImageBanner id="spera-compliance-title" titleLines={compliance.titleLines} text={compliance.text} image={compliance.image} overlay={compliance.overlay} panel="strong" />
      </div>
      <div className={styles.blockTight}>
        <FeatureList id="spera-features-title" {...features} />
      </div>
      <div className={`container ${styles.rule}`} role="presentation" />
      <section className={styles.block} aria-labelledby="spera-other-title">
        <SplitIntro id="spera-other-title" eyebrow={other.eyebrow} title={other.title} wide>
          <p>{other.text}</p>
        </SplitIntro>
        <div className={styles.slider}>
          <MarketCards label="Schede products" cards={other.cards} fallbackImage={other.fallbackImage} />
        </div>
      </section>
      <div className={styles.contact}>
        <Contact />
      </div>
    </>
  );
}
