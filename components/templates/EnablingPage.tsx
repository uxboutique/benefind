import { Contact } from "@/components/sections/Contact";
import { FeatureRows } from "@/components/sections/FeatureRows";
import { ImageBanner } from "@/components/sections/ImageBanner";
import { InfoCards } from "@/components/sections/InfoCards";
import { PageIntro } from "@/components/sections/PageIntro";
import { SplitIntro } from "@/components/sections/SplitIntro";
import type { EnablingContent } from "@/content/pages/types";
import styles from "@/app/inner-page.module.css";

/** Enabling Technologies template (Figma "Desktop - Template Enabling Technologies" 142:3675). */
export function EnablingPage({ page, id }: { page: EnablingContent; id: string }) {
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
      <section className={styles.block} aria-labelledby={`${id}-other-title`}>
        <SplitIntro id={`${id}-other-title`} eyebrow={other.eyebrow} title={other.title} wide>
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
