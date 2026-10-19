import Link from "next/link";
import { footer } from "@/content/home";
import { hrefFor } from "@/lib/routes";
import styles from "./Footer.module.css";

function Column({ title, links }: { title: string; links: string[] }) {
  return (
    <nav className={styles.column} aria-label={title}>
      <p className={styles.head}>{title}</p>
      <ul>
        {links.map((l) => {
          const href = hrefFor(l);
          return (
            <li key={l}>
              {href === "#" ? (
                <a href="#" className={styles.link}>
                  {l}
                </a>
              ) : (
                <Link href={href} className={styles.link}>
                  {l}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function Footer() {
  const { address } = footer;
  return (
    <footer id="site-footer" className={styles.footer} data-theme="dark">
      <div className={`container ${styles.columns}`}>
        {footer.columns.map((c) => (
          <Column key={c.title} {...c} />
        ))}
        <div className={styles.contact}>
          <address className={styles.address}>
            {address.name}
            <br />
            {address.street}
            <br />
            T.{" "}
            <a href={address.phone.href} className={styles.link}>
              {address.phone.label}
            </a>{" "}
            -{" "}
            <a href={address.email.href} className={styles.link}>
              {address.email.label}
            </a>
          </address>
          {footer.extraColumns.map((c) => (
            <Column key={c.title} {...c} />
          ))}
        </div>
      </div>
      <div className={`container ${styles.bottom}`}>
        <p className={styles.wordmark}>Benefind</p>
        <p className={styles.legal}>{footer.legal}</p>
      </div>
    </footer>
  );
}
