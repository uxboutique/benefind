import { asset } from "@/lib/asset";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/content/home";
import styles from "./Services.module.css";

export function Services() {
  return (
    <section id="servizi" className={styles.section} aria-labelledby="servizi-title" data-theme="dark" data-scroll-scale-scope="">
      {/* Figma: "12 · Cocoa satin — AI generated" + 20% black + rgba(0,0,0,.41) veil with 26px backdrop blur */}
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.bgScale} data-scroll-scale="">
          <Image src={asset("/assets/images/services-cocoa-satin.png")} alt="" fill sizes="100vw" className={styles.bgImg} />
        </div>
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.cols}>
          <SectionHeading id="servizi-title" eyebrow={services.eyebrow} title={services.titleLines.join(" ")} lines={services.titleLines} tone="dark" />
          <div className={styles.body} data-reveal="">
            <p className={styles.text}>{services.text}</p>
            <div>
              <Button href={services.cta.href} variant="light">
                {services.cta.label}
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.statsWrap} data-scroll-rise-scope="">
          <dl className={styles.stats} data-reveal="" data-scroll-rise="">
            {services.stats.map((s, i) => (
              <div key={i} className={styles.stat}>
                <dt className={styles.statLabel}>{s.label}</dt>
                <dd className={styles.statValue}>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
