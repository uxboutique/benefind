import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SplitLines } from "@/components/motion/SplitLines";
import styles from "./PageIntro.module.css";

type Crumb = { label: string; href?: string };
type Props = {
  breadcrumb: Crumb[];
  eyebrow: string;
  title: string;
  subtitle?: string;
  text: string;
  cta?: { label: string; href: string };
};

/** Inner-page intro (Figma "Pharma - Concept" 117:3461, y105–438): breadcrumb, h1 block, text + CTA. */
export function PageIntro({ breadcrumb, eyebrow, title, subtitle, text, cta }: Props) {
  return (
    <section className={`container ${styles.intro}`} aria-labelledby="page-title">
      <nav aria-label="Percorso" className={styles.crumbs}>
        <ol>
          {breadcrumb.map((c, i) => (
            <li key={c.label}>
              {c.href && i < breadcrumb.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <div className={styles.grid}>
        <div className={styles.heading}>
          <p className={styles.eyebrow} data-reveal="">
            {eyebrow}
          </p>
          <SplitLines as="h1" id="page-title" className={styles.title}>
            {title}
          </SplitLines>
          {subtitle && (
            <p className={styles.subtitle} data-reveal="" style={{ "--d": "120ms" } as React.CSSProperties}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={styles.body} data-reveal="" style={{ "--d": "160ms" } as React.CSSProperties}>
          <p>{text}</p>
          {cta && (
            <div>
              <Button href={cta.href} variant="accent">
                {cta.label}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
