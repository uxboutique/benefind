import type { CSSProperties } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./Benefits.module.css";

type Benefit = { icon: string; text: string };

/** "Punti di forza" tiles (Figma Products 144:4912 / 144:5049): 5 × 226 tall, mist-50, 48px Lucide icon. */
export function Benefits({ id, eyebrow, title, items }: { id: string; eyebrow: string; title: string; items: Benefit[] }) {
  return (
    <section className={`container ${styles.section}`} aria-labelledby={id}>
      <SectionHeading id={id} eyebrow={eyebrow} title={title} />
      <ul className={styles.grid}>
        {items.map((b, i) => (
          <li key={b.text} className={styles.tile} data-reveal="" style={{ "--d": `${i * 60}ms` } as CSSProperties}>
            {/* eslint-disable-next-line @next/next/no-img-element -- 48px Lucide icon from Figma */}
            <img src={b.icon} width={48} height={48} alt="" aria-hidden="true" />
            <p>{b.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
