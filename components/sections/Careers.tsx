import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { LightField } from "@/components/ui/LightField";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { careers } from "@/content/home";
import styles from "./Careers.module.css";

export function Careers() {
  const { story } = careers;
  return (
    <section className={styles.section} aria-labelledby="careers-title" data-theme="dark">
      <div className={styles.visual}>
        <LightField variant="careers" />
      </div>
      <div className={styles.veil} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <SectionHeading id="careers-title" eyebrow={careers.eyebrow} title={careers.title} tone="dark" className={styles.heading}>
          <div data-reveal="">
            <Button href={careers.cta.href} variant="white">
              {careers.cta.label}
            </Button>
          </div>
        </SectionHeading>

        <div className={styles.cardWrap} data-scroll-rise-scope="">
          <article className={styles.card} data-theme="light" data-reveal="" data-scroll-rise="">
            <div className={styles.text}>
              <p className={styles.tag}>{story.tag}</p>
              <h3 className={styles.storyTitle}>
                {story.titleLines.map((l, i) => (
                  <span key={i} className={styles.storyLine}>
                    {l}
                    {i < story.titleLines.length - 1 && " "}
                  </span>
                ))}
              </h3>
              <div>
                <Button href={story.cta.href} variant="accent">
                  {story.cta.label}
                </Button>
              </div>
            </div>
            <figure className={styles.media}>
              <blockquote className={styles.quote}>
                <p>{story.quote}</p>
              </blockquote>
              <div className={styles.photo} data-media="">
                <div className={styles.photoInner} data-media-inner="">
                  <Image src={story.photo.src} alt={story.photo.alt} fill sizes="(min-width: 1280px) 544px, (min-width: 1024px) 42vw, 100vw" className={styles.img} />
                </div>
              </div>
            </figure>
          </article>
        </div>
      </div>
    </section>
  );
}
