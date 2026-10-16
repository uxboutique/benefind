import { clientLogos } from "@/content/home";
import styles from "./ClientLogos.module.css";

/* ⚠ Logos as designed in Figma — confirm they are Benefind clients before launch. */
/** `compact`: 120px band without the bottom rule (inner pages, Figma Pharma 119:4417). */
export function ClientLogos({ compact = false }: { compact?: boolean }) {
  return (
    <section className={[styles.section, compact ? styles.compact : ""].join(" ")} aria-label="Alcuni clienti">
      <div className="container">
        <ul className={styles.list}>
          {clientLogos.map((logo, i) => (
            <li key={logo.name} className={styles.item} data-reveal="fade" style={{ "--d": `${i * 60}ms` } as React.CSSProperties}>
              {/* eslint-disable-next-line @next/next/no-img-element -- small SVG logos, served as-is */}
              <img src={logo.src} width={logo.width} height={logo.height} alt={logo.name} loading="lazy" />
            </li>
          ))}
        </ul>
        {!compact && <hr className={styles.rule} />}
      </div>
    </section>
  );
}
