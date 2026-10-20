import type { ReactNode } from "react";
import { PageIntro } from "@/components/sections/PageIntro";
import { routes } from "@/lib/routes";
import styles from "./LegalPage.module.css";

/**
 * Minimal template for institutional / legal pages (Certificazioni, Codice etico, Privacy, Cookie):
 * the standard inner-page intro, then a single reading column. Copy comes from benefind.it.
 */
export function LegalPage({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <>
      <PageIntro breadcrumb={[{ label: "Home", href: routes.home }, { label: title }]} title={title} subtitle={subtitle} />
      <div className={`container ${styles.wrap}`}>
        <article className={styles.prose}>{children}</article>
      </div>
    </>
  );
}

/** Two-column definition table (e.g. the cookie list), readable as rows on mobile. */
export function LegalTable({ caption, head, rows }: { caption: string; head: string[]; rows: string[][] }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((c, i) => (
                <td key={i} data-label={head[i]}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
