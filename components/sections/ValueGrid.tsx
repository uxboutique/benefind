import type { CSSProperties } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./ValueGrid.module.css";

type Value = { title: string; text: string };

/** "Cosa offriamo" tiles (Figma Careers 165:8654–8705, Gruppo 169:3539): 3 × 410.67, gap 24, mist-50, padding 24. */
export function ValueGrid({ id, eyebrow, title, items }: { id: string; eyebrow?: string; title: string; items: Value[] }) {
  return (
    <section className={`container ${styles.section}`} aria-labelledby={id}>
      <SectionHeading id={id} eyebrow={eyebrow} title={title} className={styles.heading} />
      <ul className={styles.grid}>
        {items.map((v, i) => (
          <li key={v.title + i} className={styles.tile} data-reveal="" style={{ "--d": `${(i % 3) * 70}ms` } as CSSProperties}>
            <h3 className={styles.title}>{v.title}</h3>
            <p className={styles.text}>{v.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
