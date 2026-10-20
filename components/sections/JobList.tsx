import type { CSSProperties } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { asset } from "@/lib/asset";
import styles from "./JobList.module.css";

type Job = { title: string; location: string; href: string };

/** Open positions (Figma Careers 165:8785 / 165:8822): rows 106 tall, 16 apart, mist-50, outlined 50px arrow. */
export function JobList({ id, eyebrow, title, jobs }: { id: string; eyebrow?: string; title: string; jobs: Job[] }) {
  return (
    /* the eyebrow ("Posizioni aperte") keeps the landmark distinct when the title repeats another section's */
    <section className={`container ${styles.section}`} aria-labelledby={eyebrow ? undefined : id} aria-label={eyebrow ? `${eyebrow}: ${title}` : undefined}>
      <SectionHeading id={id} eyebrow={eyebrow} title={title} className={styles.heading} />
      <ul className={styles.list}>
        {jobs.map((j, i) => (
          <li key={j.title + i} data-reveal="" style={{ "--d": `${i * 60}ms` } as CSSProperties}>
            <a href={j.href} className={styles.row}>
              <span className={styles.copy}>
                <span className={styles.title}>{j.title}</span>
                <span className={styles.location}>{j.location}</span>
              </span>
              <span className={styles.arrow} aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element -- 24px Lucide icon from Figma */}
                <img src={asset("/assets/icons/arrow-left-navy.svg")} width={24} height={24} alt="" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
