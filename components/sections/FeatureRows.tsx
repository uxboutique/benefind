import Image from "next/image";
import { SplitLines } from "@/components/motion/SplitLines";
import { MediaLayers, ScreenPlaceholder } from "@/components/ui/MediaLayers";
import { asset } from "@/lib/asset";
import type { MediaLayer } from "@/lib/media";
import styles from "./FeatureRows.module.css";

export type FeatureRow = {
  id: string;
  eyebrow?: string;
  title: string;
  lines?: string[];
  /** One or more paragraphs. */
  text: string | string[];
  /** Check-mark list under the text (Figma Careers 165:8778). */
  bullets?: string[];
  /** Decorative layers + "Screen da inserire" card (Enabling), or a photo (Careers / Gruppo). */
  media: MediaLayer[] | { photo: string; alt: string };
};

/**
 * Alternating text / 580² media rows (Figma Enabling 142:3981, Careers 165:8736, Gruppo 169:3595): the text
 * block (541 wide) is centred in a 700 column. Rows 80 apart.
 */
export function FeatureRows({ rows, startReversed = false }: { rows: FeatureRow[]; startReversed?: boolean }) {
  return (
    <div className={`container ${styles.rows}`}>
      {rows.map((r, i) => {
        const paragraphs = Array.isArray(r.text) ? r.text : [r.text];
        const reversed = (i % 2 === 1) !== startReversed;
        return (
          <section key={r.id} className={`${styles.row} ${reversed ? styles.reverse : ""}`} aria-labelledby={r.id}>
            <div className={styles.copyCol}>
              <div className={styles.copy}>
                {r.eyebrow && (
                  <p className={styles.eyebrow} data-reveal="">
                    {r.eyebrow}
                  </p>
                )}
                <SplitLines as="h2" id={r.id} className={styles.title} lines={r.lines}>
                  {r.title}
                </SplitLines>
                <div className={styles.text} data-reveal="" style={{ "--d": "120ms" } as React.CSSProperties}>
                  {paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                {r.bullets && (
                  <ul className={styles.bullets} data-reveal="" style={{ "--d": "180ms" } as React.CSSProperties}>
                    {r.bullets.map((b) => (
                      <li key={b}>
                        {/* eslint-disable-next-line @next/next/no-img-element -- 20px Lucide icon from Figma */}
                        <img src={asset("/assets/icons/lucide/circle-check-ink.svg")} width={20} height={20} alt="" aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className={styles.media} data-media="">
              <div className={styles.mediaInner} data-media-inner="">
                {Array.isArray(r.media) ? (
                  <>
                    <MediaLayers layers={r.media} sizes="(min-width: 1280px) 580px, 100vw" />
                    <ScreenPlaceholder />
                  </>
                ) : (
                  <Image src={r.media.photo} alt={r.media.alt} fill sizes="(min-width: 1280px) 580px, 100vw" className={styles.photo} />
                )}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
