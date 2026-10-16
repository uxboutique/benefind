import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { enablingBanner } from "@/content/home";
import styles from "./EnablingBanner.module.css";

export function EnablingBanner() {
  return (
    <section className={`container ${styles.section}`} aria-labelledby="enabling-title" data-theme="dark">
      <div className={styles.card} data-parallax-scope="">
        <div className={styles.media} data-media="">
          <div className={styles.parallax} data-parallax="">
            <div className={styles.imgWrap} data-media-inner="">
              <Image src={enablingBanner.image.src} alt={enablingBanner.image.alt} fill sizes="(min-width: 1280px) 1440px, 112vw" className={styles.img} />
            </div>
          </div>
        </div>
        <div className={styles.panel} data-reveal="">
          <h2 id="enabling-title" className={styles.title}>
            {enablingBanner.title}
          </h2>
          <p className={styles.text}>{enablingBanner.text}</p>
          <div>
            <Button href={enablingBanner.cta.href} variant="white">
              {enablingBanner.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
