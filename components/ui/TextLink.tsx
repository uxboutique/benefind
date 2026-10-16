import Link from "next/link";
import type { ReactNode } from "react";
import { asset } from "@/lib/asset";
import styles from "./TextLink.module.css";

/**
 * Mirrors the Figma "Link" component set (node 122:4867): label + 20px Lucide arrow, gap 4.
 * Figma names: "Accent" = white text (for dark surfaces), "Secondary"/"White" = navy text.
 */
type Props = {
  /** Omit inside an element that is already a link (renders a <span>, still animates on the parent's hover). */
  href?: string;
  tone?: "on-dark" | "on-light";
  size?: "s" | "m";
  className?: string;
  children: ReactNode;
};

export function TextLink({ href, tone = "on-light", size = "s", className, children }: Props) {
  const icon = tone === "on-dark" ? "arrow-right-white.svg" : "arrow-right-navy.svg";
  const cls = [styles.link, styles[tone], styles[size], className].filter(Boolean).join(" ");
  const inner = (
    <>
      <span>{children}</span>
      {/* eslint-disable-next-line @next/next/no-img-element -- 20px Lucide icon from the Figma component */}
      <img className={styles.icon} src={asset(`/assets/icons/${icon}`)} width={20} height={20} alt="" aria-hidden="true" />
    </>
  );
  if (href?.startsWith("/"))
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  return href ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <span className={cls}>{inner}</span>
  );
}
