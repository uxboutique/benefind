"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { NavItem } from "@/content/navigation";
import { asset } from "@/lib/asset";
import styles from "./MegaMenu.module.css";

type Props = {
  item: NavItem | null;
  open: boolean;
  id: string;
  onNavigate: () => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  /** Keyboard: Shift+Tab on the first link / Tab on the last link. */
  onExitStart: () => void;
  onExitEnd: () => void;
};

/**
 * Desktop mega-menu panel (Figma "Menu - Markets" 117:3815, hover state 122:4922).
 * One persistent container so open/close can transition; content is the last opened item.
 * Hover/focus on a link dims the others to 50% and reveals a 20px arrow next to it (Figma "Animate").
 */
export function MegaMenu({ item, open, id, onNavigate, onPointerEnter, onPointerLeave, onExitStart, onExitEnd }: Props) {
  const rows = item ? Math.ceil(item.links.length / 2) : 1;
  return (
    <div
      id={id}
      className={styles.wrap}
      data-open={open ? "" : undefined}
      aria-hidden={!open}
      inert={!open ? true : undefined}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onKeyDown={(e) => {
        if (e.key !== "Tab") return;
        const links = [...e.currentTarget.querySelectorAll<HTMLElement>("a")];
        if (e.shiftKey && document.activeElement === links[0]) {
          e.preventDefault();
          onExitStart();
        } else if (!e.shiftKey && document.activeElement === links[links.length - 1]) {
          e.preventDefault();
          onExitEnd();
        }
      }}
    >
      {item && (
        <div key={item.id} className={[styles.panel, item.feature ? styles.withFeature : ""].join(" ")}>
          <div className={styles.listCol}>
            <Link href={item.href} className={styles.title} onClick={onNavigate}>
              {item.label}
            </Link>
            <ul className={styles.list} style={{ "--rows": rows } as CSSProperties}>
              {item.links.map((l, i) => (
                <li key={l.label} style={{ "--i": i } as CSSProperties}>
                  <Link href={l.href} className={styles.link} onClick={onNavigate}>
                    <span>{l.label}</span>
                    {/* eslint-disable-next-line @next/next/no-img-element -- 20px Lucide icon from Figma */}
                    <img className={styles.arrow} src={asset("/assets/icons/arrow-right-navy.svg")} width={20} height={20} alt="" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {item.feature && (
            <Link href={item.feature.href} className={styles.feature} onClick={onNavigate}>
              <div className={styles.featureMedia}>
                <Image src={item.feature.image} alt="" fill sizes="378px" className={styles.featureImg} />
              </div>
              <span className={styles.featureTitle}>{item.feature.title}</span>
              {/* eslint-disable-next-line @next/next/no-img-element -- 24px Lucide icon from Figma */}
              <img className={styles.featureArrow} src={asset("/assets/icons/move-right-white.svg")} width={24} height={24} alt="" aria-hidden="true" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
