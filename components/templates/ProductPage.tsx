import { Benefits } from "@/components/sections/Benefits";
import { Contact } from "@/components/sections/Contact";
import { FeatureList } from "@/components/sections/FeatureList";
import { ImageBanner } from "@/components/sections/ImageBanner";
import { MarketCards } from "@/components/sections/MarketCards";
import { PageIntro } from "@/components/sections/PageIntro";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { SplitIntro } from "@/components/sections/SplitIntro";
import type { ProductContent } from "@/content/pages/types";
import styles from "@/app/inner-page.module.css";

/** Products template (Figma "Desktop - Template Products" 143:4468). The compliance banner is optional. */
export function ProductPage({ page, id }: { page: ProductContent; id: string }) {
  const { benefits, compliance, features, other } = page;
  return (
    <>
      <PageIntro breadcrumb={page.breadcrumb} title={page.title} logo={page.logo} product subtitle={page.subtitle} text={page.text} cta={page.cta} />
      <div className={styles.afterIntro}>
        <ProductShowcase {...page.showcase} />
      </div>
      <div className={styles.block}>
        <Benefits id={`${id}-benefits-title`} {...benefits} />
      </div>
      {compliance && (
        <div className={styles.block}>
          <ImageBanner
            id={`${id}-compliance-title`}
            titleLines={compliance.titleLines}
            text={compliance.text}
            image={compliance.image}
            overlay={compliance.overlay}
            panel="strong"
          />
        </div>
      )}
      <div className={compliance ? styles.blockTight : styles.block}>
        <FeatureList id={`${id}-features-title`} {...features} />
      </div>
      <div className={`container ${styles.rule}`} role="presentation" />
      <section className={styles.block} aria-labelledby={`${id}-other-title`}>
        <SplitIntro id={`${id}-other-title`} eyebrow={other.eyebrow} title={other.title} wide>
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
