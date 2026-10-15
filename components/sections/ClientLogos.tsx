import { clientLogos } from "@/content/home";
import styles from "./ClientLogos.module.css";

/* ⚠ Logos as designed in Figma — confirm they are Benefind clients before launch. */
export function ClientLogos() {
  return (
    <section className={styles.section} aria-label="Alcuni clienti">
      <div className="container">
        <ul className={styles.list}>
          {clientLogos.map((logo, i) => (
            <li key={logo.name} className={styles.item} data-reveal="fade" style={{ "--d": `${i * 60}ms` } as React.CSSProperties}>
              {/* eslint-disable-next-line @next/next/no-img-element -- small SVG logos, served as-is */}
              <img src={logo.src} width={logo.width} height={logo.height} alt={logo.name} loading="lazy" />
            </li>
          ))}
        </ul>
        <hr className={styles.rule} />
      </div>
    </section>
  );
}
