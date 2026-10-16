import Image from "next/image";
import { Button } from "@/components/ui/Button";
import styles from "./ImageBanner.module.css";

type Props = {
  id: string;
  titleLines: string[];
  image: string;
  cta?: { label: string; href: string };
};

/** Near full-bleed photographic banner with a glass panel (Figma Pharma 117:4143: 1408 × 520, 16px side margins). */
export function ImageBanner({ id, titleLines, image, cta }: Props) {
  return (
    <section className={styles.section} aria-labelledby={id} data-theme="dark">
      <div className={styles.card} data-parallax-scope="">
        <div className={styles.media} data-media="">
          <div className={styles.parallax} data-parallax="">
            <div className={styles.imgWrap} data-media-inner="">
              <Image src={image} alt="" fill sizes="100vw" className={styles.img} />
            </div>
          </div>
        </div>
        <div className={styles.panel} data-reveal="">
          <h2 id={id} className={styles.title}>
            {titleLines.map((l, i) => (
              <span key={i} className={styles.line}>
                {l}
                {i < titleLines.length - 1 && " "}
              </span>
            ))}
          </h2>
          {cta && (
            <div>
              <Button href={cta.href} variant="white">
                {cta.label}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
