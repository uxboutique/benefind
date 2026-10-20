import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SplitLines } from "@/components/motion/SplitLines";
import styles from "./PageIntro.module.css";

type Crumb = { label: string; href?: string };
type Props = {
  breadcrumb: Crumb[];
  /** Small label above the title (omitted on product pages, where the logo is the title). */
  eyebrow?: string;
  title: string;
  /** Product pages: the logo is shown instead of the title text (which stays the accessible name). */
  logo?: { src: string; width: number; height: number };
  subtitle?: string;
  /** Right column; omitted on Services (single-column intro). */
  text?: string | string[];
  cta?: { label: string; href: string };
  /** Gruppo (Figma 169:3328): title left, short copy in a 407 column at x953. */
  aside?: boolean;
  /** Product layout without a logo file (the product name is set as text). */
  product?: boolean;
};

/** Inner-page intro (Figma Pharma 117:3461, Enabling 142:3690, Products 143:4468, Services 147:7262). */
export function PageIntro({ breadcrumb, eyebrow, title, logo, subtitle, text, cta, aside = false, product = false }: Props) {
  const paragraphs = text === undefined ? [] : Array.isArray(text) ? text : [text];
  const variant = logo || product ? styles.product : !paragraphs.length ? styles.solo : aside ? styles.aside : "";
  return (
    <section className={`container ${styles.intro} ${variant}`} aria-labelledby="page-title">
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
          {eyebrow && (
            <p className={styles.eyebrow} data-reveal="">
              {eyebrow}
            </p>
          )}
          {logo ? (
            <h1 id="page-title" className={styles.logoTitle} data-reveal="">
              {/* eslint-disable-next-line @next/next/no-img-element -- product logo SVG from Figma */}
              <img src={logo.src} width={logo.width} height={logo.height} alt={title} />
            </h1>
          ) : (
            <SplitLines as="h1" id="page-title" className={styles.title}>
              {title}
            </SplitLines>
          )}
          {subtitle && (
            <p className={styles.subtitle} data-reveal="" style={{ "--d": "120ms" } as React.CSSProperties}>
              {subtitle}
            </p>
          )}
        </div>
        {paragraphs.length > 0 && (
          <div className={styles.body} data-reveal="" style={{ "--d": "160ms" } as React.CSSProperties}>
            <div className={styles.paragraphs}>
              {paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {cta && (
              <div>
                <Button href={cta.href} variant="accent">
                  {cta.label}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
