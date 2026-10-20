import type { ReactNode } from "react";
import { SplitLines } from "@/components/motion/SplitLines";
import styles from "./SectionHeading.module.css";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  /** Authored line breaks (Figma forces them in a few headings). */
  lines?: string[];
  tone?: "light" | "dark";
  className?: string;
  children?: ReactNode;
};

/** Eyebrow label + Newsreader h2 — the pair used by six sections. */
export function SectionHeading({ id, eyebrow, title, lines, tone = "light", className, children }: Props) {
  return (
    <div className={[styles.heading, tone === "dark" && styles.dark, className].filter(Boolean).join(" ")}>
      {eyebrow && (
        <p className={styles.eyebrow} data-reveal="">
          {eyebrow}
        </p>
      )}
      <SplitLines as="h2" id={id} className={styles.title} lines={lines}>
        {title}
      </SplitLines>
      {children}
    </div>
  );
}
