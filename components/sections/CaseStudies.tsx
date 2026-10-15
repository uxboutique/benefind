import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { caseStudies } from "@/content/home";
import styles from "./CaseStudies.module.css";

export function CaseStudies() {
  const { featured } = caseStudies;
  return (
    <section className={`container ${styles.section}`} aria-labelledby="case-title">
      <SectionHeading id="case-title" eyebrow={caseStudies.eyebrow} title={caseStudies.title} className={styles.heading} />

      <article className={styles.featured}>
        <div className={styles.featuredMedia} data-media="">
          <div className={styles.mediaInner} data-media-inner="">
            <div className={styles.imageBox} style={featured.imageBox}>
              <Image src={featured.image} alt="" fill sizes="(min-width: 1280px) 760px, (min-width: 1024px) 58vw, 100vw" className={styles.img} />
            </div>
          </div>
        </div>
        <div className={styles.featuredText} data-reveal="">
          <p className={styles.tag}>{featured.tag}</p>
          <h3 className={styles.featuredTitle}>{featured.title}</h3>
          <p className={styles.featuredBody}>{featured.text}</p>
          <div>
            <Button href={featured.cta.href} variant="outline" arrow>
              {featured.cta.label}
            </Button>
          </div>
        </div>
      </article>

      <ul className={styles.grid}>
        {caseStudies.items.map((item, i) => (
          <li key={item.tag} data-reveal="" style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
            <a href={item.href} className={styles.card}>
              <div className={styles.cardMedia}>
                <div className={styles.mediaInner}>
                  <div className={styles.imageBox} style={item.imageBox}>
                    <Image src={item.image} alt="" fill sizes="(min-width: 1280px) 472px, (min-width: 600px) 72vw, 160vw" className={styles.img} />
                  </div>
                </div>
              </div>
              <p className={styles.tagSm}>{item.tag}</p>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <span className={styles.more}>
                Leggi <span className={styles.arrow} aria-hidden="true">→</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
