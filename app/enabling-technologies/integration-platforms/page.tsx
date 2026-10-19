import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { FeatureRows } from "@/components/sections/FeatureRows";
import { ImageBanner } from "@/components/sections/ImageBanner";
import { InfoCards } from "@/components/sections/InfoCards";
import { PageIntro } from "@/components/sections/PageIntro";
import { SplitIntro } from "@/components/sections/SplitIntro";
import { integrationPlatforms as page } from "@/content/integration-platforms";
import styles from "../../inner-page.module.css";

export const metadata: Metadata = {
  title: "Integration Platforms — Enabling Technologies · Gruppo Benefind",
  description: "Piattaforme di integrazione low/no code per un modello di programmazione uniforme e coerente, con riutilizzo di servizi software esistenti.",
};

/** Enabling Technologies › Integration Platforms (Figma "Desktop - Template Enabling Technologies" 142:3675). */
export default function IntegrationPlatformsPage() {
  const { other } = page;
  return (
    <>
      <PageIntro breadcrumb={page.breadcrumb} eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle} text={page.text} cta={page.cta} />
      <div className={styles.afterIntro}>
        <ImageBanner image={page.banner.image} />
      </div>
      <div className={styles.block}>
        <FeatureRows rows={page.rows} />
      </div>
      <section className={styles.block} aria-labelledby="ip-other-title">
        <SplitIntro id="ip-other-title" eyebrow={other.eyebrow} title={other.title} wide>
          <p>{other.text}</p>
        </SplitIntro>
        <div className={styles.slider}>
          <InfoCards label="Altre tecnologie" cards={other.cards} layout="carousel" />
        </div>
      </section>
      <div className={styles.contactTight}>
        <Contact />
      </div>
    </>
  );
}
