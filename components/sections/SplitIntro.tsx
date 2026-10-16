import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./SplitIntro.module.css";

/** Section heading (left) + supporting copy (right) — the two-column intro used across inner pages. */
export function SplitIntro({ id, eyebrow, title, children, wide = false }: { id: string; eyebrow: string; title: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={`container ${styles.intro} ${wide ? styles.wide : ""}`}>
      <SectionHeading id={id} eyebrow={eyebrow} title={title} />
      <div className={styles.body} data-reveal="">
        {children}
      </div>
    </div>
  );
}
