import { SplitLines } from "@/components/motion/SplitLines";
import { MediaLayers, ScreenPlaceholder } from "@/components/ui/MediaLayers";
import type { MediaLayer } from "@/lib/media";
import styles from "./FeatureRows.module.css";

export type FeatureRow = { id: string; eyebrow: string; title: string; lines?: string[]; text: string; media: MediaLayer[] };

/**
 * Alternating text / 580² media rows (Figma Enabling 142:3981): the text block (541 wide) is centred in
 * a 700 column, the media carries a "Screen da inserire" placeholder card. Rows 80 apart.
 */
export function FeatureRows({ rows }: { rows: FeatureRow[] }) {
  return (
    <div className={`container ${styles.rows}`}>
      {rows.map((r, i) => (
        <section key={r.id} className={`${styles.row} ${i % 2 ? styles.reverse : ""}`} aria-labelledby={r.id}>
          <div className={styles.copyCol}>
            <div className={styles.copy}>
              <p className={styles.eyebrow} data-reveal="">
                {r.eyebrow}
              </p>
              <SplitLines as="h2" id={r.id} className={styles.title} lines={r.lines}>
                {r.title}
              </SplitLines>
              <p className={styles.text} data-reveal="" style={{ "--d": "120ms" } as React.CSSProperties}>
                {r.text}
              </p>
            </div>
          </div>
          <div className={styles.media} data-media="">
            <div className={styles.mediaInner} data-media-inner="">
              <MediaLayers layers={r.media} sizes="(min-width: 1280px) 580px, 100vw" />
              <ScreenPlaceholder />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
