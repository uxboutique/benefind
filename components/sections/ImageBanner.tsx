import Image from "next/image";
import { Button } from "@/components/ui/Button";
import styles from "./ImageBanner.module.css";

type Props = {
  id?: string;
  /** Omit for a photo-only banner (Figma Enabling 142:3932 / Services 147:7275: 1408 × 620). */
  titleLines?: string[];
  image: string;
  imageAlt?: string;
  cta?: { label: string; href: string };
  /** Paragraphs under the title (Figma Products "Compliance normativa" 144:5052). */
  text?: string[];
  /** Gradient over the photo (Figma). */
  overlay?: string;
  /** Panel tone: "glass" = black 30% (Pharma), "strong" = black 60% (Products). */
  panel?: "glass" | "strong";
};

/** Near full-bleed photographic banner with an optional glass panel (Figma Pharma 117:4143: 1408 × 520, 16px side margins). */
export function ImageBanner({ id, titleLines, image, imageAlt = "", cta, text, overlay, panel = "glass" }: Props) {
  const photoOnly = !titleLines;
  return (
    <section className={`${styles.section} ${photoOnly ? styles.photoOnly : ""}`} aria-labelledby={photoOnly ? undefined : id} aria-label={photoOnly ? imageAlt || undefined : undefined} data-theme="dark">
      <div className={styles.card} data-parallax-scope="">
        <div className={styles.media} data-media="">
          <div className={styles.parallax} data-parallax="">
            <div className={styles.imgWrap} data-media-inner="">
              <Image src={image} alt={imageAlt} fill sizes="100vw" className={styles.img} />
              {overlay && <div className={styles.overlay} style={{ backgroundImage: overlay }} />}
            </div>
          </div>
        </div>
        {titleLines && (
          <div className={`${styles.panel} ${panel === "strong" ? styles.strong : ""}`} data-reveal="">
            <h2 id={id} className={styles.title}>
              {titleLines.map((l, i) => (
                <span key={i} className={styles.line}>
                  {l}
                  {i < titleLines.length - 1 && " "}
                </span>
              ))}
            </h2>
            {text && (
              <div className={styles.text}>
                {text.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            )}
            {cta && (
              <div>
                <Button href={cta.href} variant="white">
                  {cta.label}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
