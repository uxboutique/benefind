"use client";

import { asset } from "@/lib/asset";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { contactHref, primaryNav, utilityMenu } from "@/content/navigation";
import { motion } from "@/lib/motion/tokens";
import { MegaMenu } from "./MegaMenu";
import styles from "./Header.module.css";

const MENU_CLOSE_MS = 400;
const MEGA_OPEN_DELAY = 90; // hover intent
const MEGA_CLOSE_DELAY = 220;

const markets = primaryNav.find((n) => n.kind === "list" && n.id === "markets") as Extract<(typeof primaryNav)[number], { kind: "list" }>;

/** Primary-nav item matching the current route (underlined in the header). */
function sectionFor(pathname: string | null) {
  if (!pathname) return null;
  if (pathname.includes("/markets/")) return "markets";
  if (pathname.includes("/enabling-technologies/")) return "enabling";
  if (pathname.includes("/services/")) return "services";
  if (pathname.includes("/products/")) return "products";
  return null;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const [megaShown, setMegaShown] = useState<string | null>(null); // content kept during the close fade
  const megaTimer = useRef(0);
  const pathname = usePathname();
  const currentSection = sectionFor(pathname);
  const [util, setUtil] = useState(false); // desktop hamburger dropdown (Figma 147:7973)
  const utilId = useId();
  const utilRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const megaId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Hamburger: desktop opens the small utility dropdown, below 1024px the full-screen panel.
  const onToggle = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setMega(null);
      setUtil((v) => !v);
    } else setOpen((v) => !v);
  };

  useEffect(() => {
    headerRef.current?.toggleAttribute("data-util-open", util);
    if (!util) return;
    const header = headerRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setUtil(false);
      toggleRef.current?.focus();
    };
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!utilRef.current?.contains(t) && !toggleRef.current?.contains(t)) setUtil(false);
    };
    const onFocusOut = (e: FocusEvent) => {
      const t = e.relatedTarget as Node | null;
      if (t && !utilRef.current?.contains(t) && !toggleRef.current?.contains(t)) setUtil(false);
    };
    utilRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    header?.addEventListener("focusout", onFocusOut);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
      header?.removeEventListener("focusout", onFocusOut);
    };
  }, [util]);

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
      const locked = header.hasAttribute("data-menu-open") || header.hasAttribute("data-mega-open") || header.hasAttribute("data-util-open") || header.querySelector(":focus-visible") !== null;
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

  // ---- Desktop mega-menu (Figma 117:3815 / 122:4922) ----
  const openMega = useCallback((id: string, delay = 0) => {
    clearTimeout(megaTimer.current);
    megaTimer.current = window.setTimeout(() => {
      setMega(id);
      setMegaShown(id);
    }, delay);
  }, []);
  const closeMega = useCallback((delay = 0) => {
    clearTimeout(megaTimer.current);
    megaTimer.current = window.setTimeout(() => setMega(null), delay);
  }, []);
  const keepMega = useCallback(() => clearTimeout(megaTimer.current), []);

  useEffect(() => {
    if (!mega) return;
    const header = headerRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMega(null);
      header?.querySelector<HTMLButtonElement>(`[data-nav="${mega}"]`)?.focus();
    };
    const onFocusOut = (e: FocusEvent) => {
      if (header && !header.contains(e.relatedTarget as Node | null)) setMega(null);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (header && !header.contains(e.target as Node)) setMega(null);
    };
    window.addEventListener("keydown", onKey);
    header?.addEventListener("focusout", onFocusOut);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      header?.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [mega]);

  useEffect(() => () => clearTimeout(megaTimer.current), []);
  useEffect(() => {
    headerRef.current?.toggleAttribute("data-mega-open", mega !== null);
  }, [mega]);

  const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const megaItem = primaryNav.find((n) => n.id === megaShown) ?? null;

  return (
    <header ref={headerRef} id="site-header" className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.logo} aria-label="Gruppo Benefind — Home">
          <Image src={asset("/assets/logos/gruppo-benefind.png")} alt="" width={155} height={47} priority sizes="155px" />
        </Link>

        <nav className={styles.nav} aria-label="Principale" data-open={mega ? "" : undefined} onPointerLeave={() => closeMega(MEGA_CLOSE_DELAY)}>
          <ul>
            {primaryNav.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  data-nav={item.id}
                  className={styles.navLink}
                  aria-expanded={mega === item.id}
                  aria-controls={megaId}
                  aria-current={currentSection === item.id ? "true" : undefined}
                  onPointerEnter={() => !util && finePointer() && openMega(item.id, mega ? 0 : MEGA_OPEN_DELAY)}
                  onClick={() => (mega === item.id ? closeMega() : openMega(item.id))}
                  onKeyDown={(e) => {
                    // Tab from an open trigger moves into its panel (the panel follows the nav in the DOM).
                    if (e.key === "Tab" && !e.shiftKey && mega === item.id) {
                      const first = document.getElementById(megaId)?.querySelector<HTMLElement>("a");
                      if (first) {
                        e.preventDefault();
                        first.focus();
                      }
                    }
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.utility}>
          <Button href={contactHref} variant="secondary" size="s" className={styles.cta}>
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
            aria-expanded={open || util}
            aria-controls={`${utilId} ${panelId}`}
            aria-label={open || util ? "Chiudi menu" : "Apri menu"}
            onClick={onToggle}
          >
            {open || util ? (
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

      <MegaMenu
        onExitEnd={() => {
          // Tab past the last link → next nav trigger (or the CTA after the last one)
          const triggers = [...(headerRef.current?.querySelectorAll<HTMLElement>("[data-nav]") ?? [])];
          const i = triggers.findIndex((t) => t.dataset.nav === mega);
          setMega(null);
          (triggers[i + 1] ?? headerRef.current?.querySelector<HTMLElement>(`.${styles.utility} a`))?.focus();
        }}
        onExitStart={() => headerRef.current?.querySelector<HTMLElement>(`[data-nav="${mega}"]`)?.focus()}
        id={megaId}
        item={megaItem}
        open={mega !== null}
        onNavigate={() => setMega(null)}
        onPointerEnter={keepMega}
        onPointerLeave={() => closeMega(MEGA_CLOSE_DELAY)}
      />

      {/* Desktop hamburger dropdown (Figma "Desktop - Menu - Hamburger" 147:8031) */}
      <div ref={utilRef} id={utilId} className={styles.util} data-open={util ? "" : undefined} aria-hidden={!util} inert={!util ? true : undefined}>
        <div className={styles.utilInner}>
          <p className={styles.utilTitle}>{utilityMenu.title}</p>
          <ul className={styles.utilList}>
            {utilityMenu.links.map((l, i) => (
              <li key={l.label} style={{ "--i": i } as React.CSSProperties}>
                <a href={l.href} onClick={() => setUtil(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={utilityMenu.language.href} hrefLang={utilityMenu.language.lang} lang={utilityMenu.language.lang} className={styles.utilLang} onClick={() => setUtil(false)}>
            {utilityMenu.language.label}
          </a>
        </div>
      </div>

      {/* Mobile / burger panel — not designed in Figma; minimal styling from page tokens (flagged in report). */}
      <div ref={panelRef} id={panelId} className={styles.panel} hidden>
        <div className={`container ${styles.panelInner}`}>
          <nav aria-label="Menu">
            <ul className={styles.panelPrimary}>
              {primaryNav.map((item) => (
                <li key={item.id}>
                  <Link href={item.href} onClick={() => close(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={contactHref} onClick={() => close(false)}>
                  Contattaci
                </Link>
              </li>
            </ul>
          </nav>
          <div className={styles.panelSecondary}>
            <p className={styles.panelHead}>{markets.label}</p>
            <ul>
              {markets.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} onClick={() => close(false)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
