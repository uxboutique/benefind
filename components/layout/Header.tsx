"use client";

import { asset } from "@/lib/asset";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { contactHref, footer, nav } from "@/content/home";
import { motion } from "@/lib/motion/tokens";
import styles from "./Header.module.css";

const MENU_CLOSE_MS = 400;

export function Header() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Menu side effects: scroll lock, inert background, Esc, open/close classes.
  useEffect(() => {
    const panel = panelRef.current;
    const root = document.documentElement;
    const outside = [document.getElementById("main"), document.getElementById("site-footer")];
    if (!panel) return;

    let raf = 0;
    let timer = 0;
    if (open) {
      panel.hidden = false;
      raf = requestAnimationFrame(() => {
        panel.classList.add(styles.isOpen);
        panel.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
      });
      root.classList.add("no-scroll");
      outside.forEach((el) => el?.setAttribute("inert", ""));
    } else {
      panel.classList.remove(styles.isOpen);
      timer = window.setTimeout(() => {
        if (!panel.classList.contains(styles.isOpen)) panel.hidden = true;
      }, MENU_CLOSE_MS);
      root.classList.remove("no-scroll");
      outside.forEach((el) => el?.removeAttribute("inert"));
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  useEffect(() => {
    headerRef.current?.toggleAttribute("data-menu-open", open);
  }, [open]);

  // M2: hide on scroll down (past 400px), show on any scroll up. Class toggle only — no React
  // state on scroll. Never hidden while the menu is open or focus is inside the header.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const locked = header.hasAttribute("data-menu-open") || header.querySelector(":focus-visible") !== null;
      if (locked || y < motion.headerHideAfter || y < lastY - 4) header.classList.remove(styles.isHidden);
      else if (y > lastY + 4) header.classList.add(styles.isHidden);
      lastY = y;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    const onFocus = () => {
      if (header.querySelector(":focus-visible")) header.classList.remove(styles.isHidden);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    header.addEventListener("focusin", onFocus);
    return () => {
      window.removeEventListener("scroll", onScroll);
      header.removeEventListener("focusin", onFocus);
    };
  }, []);

  return (
    <header ref={headerRef} id="site-header" className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.logo} aria-label="Gruppo Benefind — Home">
          <Image src={asset("/assets/logos/gruppo-benefind.png")} alt="" width={155} height={47} priority sizes="155px" />
        </Link>

        <nav className={styles.nav} aria-label="Principale">
          <ul>
            {nav.map((item) => (
              <li key={item.label}>
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.utility}>
          <Button href={contactHref} variant="sky" size="sm" arrow className={styles.cta}>
            Contattaci
          </Button>
          <a href="#" className={styles.iconBtn} aria-label="Cerca">
            {/* eslint-disable-next-line @next/next/no-img-element -- 20px SVG icon from Figma */}
            <img src={asset("/assets/icons/icon-search.svg")} width={20} height={20} alt="" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className={styles.iconBtn}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M5.5 5.5l11 11M16.5 5.5l-11 11" stroke="#0C0A68" strokeWidth="1.65" />
              </svg>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- 22px SVG icon from Figma
              <img src={asset("/assets/icons/icon-menu.svg")} width={22} height={22} alt="" />
            )}
          </button>
        </div>
      </div>

      {/* Menu panel — not designed in Figma; minimal styling from page tokens (flagged in report). */}
      <div ref={panelRef} id={panelId} className={styles.panel} hidden>
        <div className={`container ${styles.panelInner}`}>
          <nav aria-label="Menu">
            <ul className={styles.panelPrimary}>
              {nav.map((item) => (
                <li key={item.label}>
                  <a href={item.href} onClick={() => close(false)}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={contactHref} onClick={() => close(false)}>
                  Contattaci
                </a>
              </li>
            </ul>
          </nav>
          <div className={styles.panelSecondary}>
            <p className={styles.panelHead}>{footer.columns[0].title}</p>
            <ul>
              {footer.columns[0].links.map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
