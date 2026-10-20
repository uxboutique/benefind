import { CaseStudyCarousel } from "@/components/sections/CaseStudyCarousel";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Contact } from "@/components/sections/Contact";
import { ImageBanner } from "@/components/sections/ImageBanner";
import { MarketCards } from "@/components/sections/MarketCards";
import { PageIntro } from "@/components/sections/PageIntro";
import { SplitIntro } from "@/components/sections/SplitIntro";
import type { MarketContent } from "@/content/pages/types";
import styles from "./MarketPage.module.css";

/** Markets template (Figma "Pharma - Concept" 117:3461), shared by every market page. */
export function MarketPage({ page, id }: { page: MarketContent; id: string }) {
  const { cases, otherMarkets } = page;
  return (
    <>
      <PageIntro breadcrumb={page.breadcrumb} eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle} text={page.text} cta={page.cta} />
      <div className={styles.logos}>
        <ClientLogos compact />
      </div>
      <div className={styles.banner}>
        <ImageBanner id={`${id}-banner-title`} titleLines={page.banner.titleLines} image={page.banner.image} cta={page.banner.cta} />
      </div>
      <section className={styles.cases} aria-labelledby={`${id}-cases-title`}>
        <SplitIntro id={`${id}-cases-title`} eyebrow={cases.eyebrow} title={cases.title}>
          {cases.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </SplitIntro>
        <div className={styles.casesSlider}>
          <CaseStudyCarousel label="Case study" slides={cases.slides} />
        </div>
      </section>
      <section className={styles.markets} aria-labelledby={`${id}-markets-title`}>
        <SplitIntro id={`${id}-markets-title`} eyebrow={otherMarkets.eyebrow} title={otherMarkets.title} wide>
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
