import type { Metadata } from "next";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Contact } from "@/components/sections/Contact";
import { FeatureRows } from "@/components/sections/FeatureRows";
import { ImageBanner } from "@/components/sections/ImageBanner";
import { PageIntro } from "@/components/sections/PageIntro";
import { Services } from "@/components/sections/Services";
import { SplitIntro } from "@/components/sections/SplitIntro";
import { ValueGrid } from "@/components/sections/ValueGrid";
import { gruppo } from "@/content/gruppo";
import styles from "../inner-page.module.css";

export const metadata: Metadata = {
  title: "Gruppo Benefind",
  description: "Benefind - Digital Innovation Group: chi siamo, i numeri del gruppo e i valori che guidano il nostro lavoro.",
};

/** Gruppo Benefind (Figma "Desktop - Gruppo Benefind" 169:3328). */
export default function GruppoPage() {
  const { statement, stats, values, row, application } = gruppo;
  return (
    <>
      <PageIntro breadcrumb={gruppo.breadcrumb} title={gruppo.title} text={gruppo.text} aside />
      <div className={styles.afterIntroTight}>
        <ImageBanner image={gruppo.banner.image} imageAlt={gruppo.banner.alt} />
      </div>
      <div className={styles.logos}>
        <ClientLogos compact />
      </div>
      <section className={styles.statement} aria-labelledby="gruppo-statement-title">
        <SplitIntro id="gruppo-statement-title" title={statement.title} statement>
          {statement.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </SplitIntro>
      </section>
      <div className={styles.block}>
        <Services id="gruppo-numeri" content={stats} background="field" />
      </div>
      <div className={styles.block}>
        <ValueGrid id="gruppo-values-title" eyebrow={values.eyebrow} title={values.title} items={values.items} />
      </div>
      <div className={`container ${styles.rule}`} role="presentation" />
      <div className={styles.block}>
        <FeatureRows rows={[row]} />
      </div>
      <div className={styles.block}>
        <ImageBanner id="gruppo-apply-title" titleLines={application.titleLines} image={application.image} cta={application.cta} panel="strong" />
      </div>
      <div className={styles.contactAfterBanner}>
        <Contact />
      </div>
    </>
  );
}
