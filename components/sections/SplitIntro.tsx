import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./SplitIntro.module.css";

/** Section heading (left) + supporting copy (right) — the two-column intro used across inner pages. */
export function SplitIntro({ id, eyebrow, title, children, wide = false, statement = false }: { id: string; eyebrow?: string; title: string; children: ReactNode; wide?: boolean; statement?: boolean }) {
  return (
    <div className={[`container`, styles.intro, wide && styles.wide, statement && styles.statement].filter(Boolean).join(" ")}>
      <SectionHeading id={id} eyebrow={eyebrow} title={title} />
      <div className={styles.body} data-reveal="">
        {children}
      </div>
    </div>
  );
}
