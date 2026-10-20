import type { Metadata } from "next";
import { Careers } from "@/components/sections/Careers";
import { Contact } from "@/components/sections/Contact";
import { FeatureRows } from "@/components/sections/FeatureRows";
import { ImageBanner } from "@/components/sections/ImageBanner";
import { JobList } from "@/components/sections/JobList";
import { PageIntro } from "@/components/sections/PageIntro";
import { ValueGrid } from "@/components/sections/ValueGrid";
import { careersPage as page } from "@/content/careers";
import styles from "../inner-page.module.css";

export const metadata: Metadata = {
  title: "Careers · Gruppo Benefind",
  description: "Lavora in Benefind: un ambiente giovane e dinamico, crescita professionale, welfare, smart working e formazione.",
};

/** Careers (Figma "Desktop - Careers" 165:8240). */
export default function CareersPage() {
  const { values, people, workplace, jobs, application } = page;
  return (
    <>
      <PageIntro breadcrumb={page.breadcrumb} title={page.title} subtitle={page.subtitle} />
      <div className={styles.afterIntro}>
        <ImageBanner image={page.banner.image} imageAlt={page.banner.alt} />
      </div>
      <div className={styles.block}>
        <ValueGrid id="careers-values-title" eyebrow={values.eyebrow} title={values.title} items={values.items} />
      </div>
      <div className={styles.block}>
        <Careers content={people} flush />
      </div>
      <div className={styles.block}>
        <FeatureRows rows={[workplace]} />
      </div>
      <div className={`container ${styles.rule}`} role="presentation" />
      <div id="posizioni" className={styles.block}>
        <JobList id="careers-jobs-title" eyebrow={jobs.eyebrow} title={jobs.title} jobs={jobs.items} />
      </div>
      <div className={styles.block}>
        <ImageBanner id="careers-apply-title" titleLines={application.titleLines} image={application.image} cta={application.cta} panel="strong" />
      </div>
      <div className={styles.contactAfterBanner}>
        <Contact />
      </div>
    </>
  );
}
