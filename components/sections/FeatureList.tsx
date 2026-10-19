import { MediaLayers, ScreenPlaceholder } from "@/components/ui/MediaLayers";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { MediaLayer } from "@/lib/media";
import styles from "./FeatureList.module.css";

type Feature = { title: string; text: string; media: MediaLayer[] };

/**
 * "Le funzionalità" (Figma Products 144:5094): the title block ("funzionalità_title") stays fixed
 * while only the list ("funzionalità_scroll", 760 wide at x520) scrolls past it — position: sticky,
 * no JS. Each row: 240 × 200 thumbnail + Newsreader 36 title + text.
 */
export function FeatureList({ id, eyebrow, title, items }: { id: string; eyebrow: string; title: string; items: Feature[] }) {
  return (
    <section className={`container ${styles.section}`} aria-labelledby={id}>
      <div className={styles.titleCol}>
        <div className={styles.sticky}>
          <SectionHeading id={id} eyebrow={eyebrow} title={title} />
        </div>
      </div>
      <ol className={styles.list}>
        {items.map((f) => (
          <li key={f.title} className={styles.item} data-reveal="">
            <div className={styles.thumb}>
              <MediaLayers layers={f.media} sizes="240px" />
              <ScreenPlaceholder variant="small" />
            </div>
            <div className={styles.copy}>
              <h3 className={styles.title}>{f.title}</h3>
              <p className={styles.text}>{f.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
