"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { hrefFor } from "@/lib/routes";
import styles from "./Footer.module.css";

const MOBILE = "(max-width: 767px)";

/**
 * Footer link column. Below 768px it collapses into an accordion (as on apple.com) so the footer
 * doesn't become a 1,500px list; on larger screens the heading is static and the list always shown.
 */
export function FooterColumn({ title, links }: { title: string; links: string[] }) {
  const id = useId();
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE);
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  const expanded = !mobile || open;
  return (
    <nav className={styles.column} aria-label={title} data-open={expanded ? "" : undefined}>
      {mobile ? (
        <button type="button" className={`${styles.head} ${styles.toggle}`} aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}>
          {title}
          <span className={styles.chev} aria-hidden="true" />
        </button>
      ) : (
        <p className={styles.head}>{title}</p>
      )}
      <div id={id} className={styles.body} inert={!expanded ? true : undefined}>
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
      </div>
    </nav>
  );
}
