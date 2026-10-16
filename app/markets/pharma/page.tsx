import type { Metadata } from "next";
import { CaseStudyCarousel } from "@/components/sections/CaseStudyCarousel";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Contact } from "@/components/sections/Contact";
import { ImageBanner } from "@/components/sections/ImageBanner";
import { MarketCards } from "@/components/sections/MarketCards";
import { PageIntro } from "@/components/sections/PageIntro";
import { SplitIntro } from "@/components/sections/SplitIntro";
import { pharma } from "@/content/pharma";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Pharma — Markets · Gruppo Benefind",
  description: "Sistemi MES e soluzioni integrate per l’industria farmaceutica: conformità normativa, batch, laboratorio e controllo qualità.",
};

/** Markets › Pharma (Figma "Pharma - Concept" 117:3461). */
export default function PharmaPage() {
  const { cases, otherMarkets } = pharma;
  return (
    <>
      <PageIntro breadcrumb={pharma.breadcrumb} eyebrow={pharma.eyebrow} title={pharma.title} subtitle={pharma.subtitle} text={pharma.text} cta={pharma.cta} />
      <div className={styles.logos}>
        <ClientLogos compact />
      </div>
      <div className={styles.banner}>
        <ImageBanner id="pharma-banner-title" titleLines={pharma.banner.titleLines} image={pharma.banner.image} cta={pharma.banner.cta} />
      </div>
      <section className={styles.cases} aria-labelledby="pharma-cases-title">
        <SplitIntro id="pharma-cases-title" eyebrow={cases.eyebrow} title={cases.title}>
          {cases.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </SplitIntro>
        <div className={styles.casesSlider}>
          <CaseStudyCarousel label="Case study" slides={cases.slides} />
        </div>
      </section>
      <section className={styles.markets} aria-labelledby="pharma-markets-title">
        <SplitIntro id="pharma-markets-title" eyebrow={otherMarkets.eyebrow} title={otherMarkets.title} wide>
          <p>{otherMarkets.text}</p>
        </SplitIntro>
        <div className={styles.marketsSlider}>
          <MarketCards label="Schede markets" cards={otherMarkets.cards} fallbackImage={otherMarkets.fallbackImage} />
        </div>
      </section>
      <div className={styles.contact}>
        <Contact />
      </div>
    </>
  );
}
