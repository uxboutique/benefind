"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { GridItem, ListItem, NavItem } from "@/content/navigation";
import { TextLink } from "@/components/ui/TextLink";
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
 * Desktop mega-menu panel (Figma: Markets 117:3815 + "Animate" 122:4922, Enabling 145:6257,
 * Services 147:7792, Products 144:5332). One persistent container so open/close can transition;
 * content is the last opened item. Hover/focus on a link dims the others to 50% and reveals a 20px
 * arrow; product tiles get the navy outline + "Scopri" of the Figma hover state.
 */
export function MegaMenu({ item, open, id, onNavigate, onPointerEnter, onPointerLeave, onExitStart, onExitEnd }: Props) {
  const style = item ? ({ "--panel-w": `${item.width}px`, "--shift": `${item.shift}px` } as CSSProperties) : undefined;
  return (
    <div
      id={id}
      className={styles.wrap}
      style={style}
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
      {item?.kind === "list" && <ListPanel key={item.id} item={item} onNavigate={onNavigate} />}
      {item?.kind === "products" && <ProductsPanel key={item.id} item={item} onNavigate={onNavigate} />}
    </div>
  );
}

function ListPanel({ item, onNavigate }: { item: ListItem; onNavigate: () => void }) {
  const rows = Math.ceil(item.links.length / item.columns);
  const { feature } = item;
  return (
    <div className={[styles.panel, styles.listPanel, item.columns === 1 && styles.single].filter(Boolean).join(" ")}>
      <div className={styles.listCol}>
        <Link href={item.href} className={styles.title} onClick={onNavigate}>
          {item.label}
        </Link>
        <ul
          className={styles.list}
          style={{ "--rows": rows, "--col-w": `${item.columnWidth}px`, "--cols": item.columns } as CSSProperties}
        >
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
      <Link href={feature.href} className={styles.feature} onClick={onNavigate}>
        <div className={styles.featureMedia}>
          <div className={styles.featureImgBox} style={feature.imageBox}>
            <Image src={feature.image} alt="" fill sizes="520px" className={styles.featureImg} />
          </div>
          <div className={styles.featureOverlay} style={{ backgroundImage: feature.overlay }} />
        </div>
        <span className={styles.featureTitle}>{feature.title}</span>
        {/* eslint-disable-next-line @next/next/no-img-element -- 24px Lucide icon from Figma */}
        <img className={styles.featureArrow} src={asset("/assets/icons/move-right-white.svg")} width={24} height={24} alt="" aria-hidden="true" />
      </Link>
    </div>
  );
}

function ProductsPanel({ item, onNavigate }: { item: GridItem; onNavigate: () => void }) {
  return (
    <div className={`${styles.panel} ${styles.productsPanel}`}>
      <Link href={item.href} className={styles.title} onClick={onNavigate}>
        {item.label}
      </Link>
      <ul className={styles.tiles}>
        {item.products.map((p, i) => (
          <li key={p.name} style={{ "--i": i } as CSSProperties}>
            <Link href={p.href} className={styles.tile} onClick={onNavigate} aria-label={`${p.name} — ${p.text}`}>
              <span className={styles.tileLogo}>
                {p.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element -- product logo SVG exported from Figma
                  <img src={p.logo.src} width={p.logo.width} height={p.logo.height} alt="" />
                ) : (
                  <span className={styles.tileName}>{p.name}</span>
                )}
              </span>
              <span className={styles.tileText}>{p.text}</span>
              <TextLink tone="on-light" size="s" className={styles.tileMore}>
                Scopri
              </TextLink>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
