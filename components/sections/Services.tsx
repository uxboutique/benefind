import { asset } from "@/lib/asset";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services as homeServices } from "@/content/home";
import { LightField } from "@/components/ui/LightField";
import styles from "./Services.module.css";

type ServicesContent = {
  eyebrow: string;
  titleLines: string[];
  text?: string;
  cta?: { label: string; href: string };
  stats: { value: string; label: string }[];
};

/**
 * Dark band with heading, optional copy + CTA and a glass stats panel.
 * Home (80:5393): cocoa satin background. Gruppo (169:3568): blue light field, no copy, 4 stats full width.
 */
export function Services({ content = homeServices, id = "servizi", background = "cocoa" }: { content?: ServicesContent; id?: string; background?: "cocoa" | "field" }) {
  const services = content;
  const titleId = `${id}-title`;
  return (
    <section id={id} className={`${styles.section} ${background === "field" ? styles.field : ""}`} aria-labelledby={titleId} data-theme="dark" data-scroll-scale-scope="">
      {background === "cocoa" ? (
        /* Figma: "12 · Cocoa satin — AI generated" + 20% black + rgba(0,0,0,.41) veil with 26px backdrop blur */
        <div className={styles.bg} aria-hidden="true">
          <div className={styles.bgScale} data-scroll-scale="">
            <Image src={asset("/assets/images/services-cocoa-satin.png")} alt="" fill sizes="100vw" className={styles.bgImg} />
          </div>
        </div>
      ) : (
        <div className={styles.bg} aria-hidden="true">
          <LightField variant="careers" />
          <div className={styles.fieldVeil} />
        </div>
      )}

      <div className={`container ${styles.inner}`}>
        <div className={styles.cols}>
          <SectionHeading id={titleId} eyebrow={services.eyebrow} title={services.titleLines.join(" ")} lines={services.titleLines} tone="dark" />
          {(services.text || services.cta) && (
            <div className={styles.body} data-reveal="">
              {services.text && <p className={styles.text}>{services.text}</p>}
              {services.cta && (
                <div>
                  <Button href={services.cta.href} variant="white">
                    {services.cta.label}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.statsWrap} data-scroll-rise-scope="">
          <dl className={styles.stats} style={{ "--cols": services.stats.length } as React.CSSProperties} data-reveal="" data-scroll-rise="">
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
