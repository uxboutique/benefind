import { CaseStudyCarousel } from "@/components/sections/CaseStudyCarousel";
import { Contact } from "@/components/sections/Contact";
import { ImageBanner } from "@/components/sections/ImageBanner";
import { InfoCards } from "@/components/sections/InfoCards";
import { MarketCards } from "@/components/sections/MarketCards";
import { PageIntro } from "@/components/sections/PageIntro";
import { SplitIntro } from "@/components/sections/SplitIntro";
import { SplitLines } from "@/components/motion/SplitLines";
import type { ServiceContent } from "@/content/pages/types";
import styles from "@/app/inner-page.module.css";

/** Services template (Figma "Desktop - Template Services" 147:6684). */
export function ServicePage({ page, id }: { page: ServiceContent; id: string }) {
  const { offer, cases, other } = page;
  const offerId = `${id}-offer-title`;
  return (
    <>
      <PageIntro breadcrumb={page.breadcrumb} eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle} />
      <div className={styles.afterIntroShort}>
        <ImageBanner image={page.banner.image} />
      </div>
      <section className={styles.offer} aria-labelledby={offerId}>
        <div className="container">
          <SplitLines as="h2" id={offerId} className={styles.offerTitle}>
            {offer.title}
          </SplitLines>
        </div>
        <div className={styles.offerCards}>
          <InfoCards label="Servizi" cards={offer.cards} layout="grid" />
        </div>
      </section>
      <div className={`container ${styles.rule}`} role="presentation" />
      <section className={styles.block} aria-labelledby={`${id}-cases-title`}>
        <SplitIntro id={`${id}-cases-title`} eyebrow={cases.eyebrow} title={cases.title}>
          {cases.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </SplitIntro>
        <div className={styles.casesSlider}>
          <CaseStudyCarousel label="Case study" slides={cases.slides} />
        </div>
      </section>
      <section className={styles.blockAfterSlider} aria-labelledby={`${id}-other-title`}>
        <SplitIntro id={`${id}-other-title`} eyebrow={other.eyebrow} title={other.title} wide>
          <p>{other.text}</p>
        </SplitIntro>
        <div className={styles.slider}>
          <MarketCards label="Schede servizi" cards={other.cards} fallbackImage={other.fallbackImage} />
        </div>
      </section>
      <div className={styles.contact}>
        <Contact />
      </div>
    </>
  );
}
