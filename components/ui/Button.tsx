import Link from "next/link";
import type { ReactNode } from "react";
import { asset } from "@/lib/asset";
import styles from "./Button.module.css";

/** Mirrors the Figma "Button" component set (node 120:4775): variant × size, label + Lucide arrow. */
export type ButtonVariant = "accent" | "secondary" | "white";
export type ButtonSize = "s" | "m";

type Props = {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

export function Button({ href, variant = "accent", size = "m", className, children, ...rest }: Props) {
  const cls = [styles.btn, styles[variant], styles[size], className].filter(Boolean).join(" ");
  const icon = variant === "accent" ? "arrow-right-white.svg" : "arrow-right-navy.svg";
  const inner = (
    <>
      <span>{children}</span>
      {/* eslint-disable-next-line @next/next/no-img-element -- 20px Lucide icon from the Figma component */}
      <img className={styles.icon} src={asset(`/assets/icons/${icon}`)} width={20} height={20} alt="" aria-hidden="true" />
    </>
  );
  // Internal routes ("/…") go through next/link so the deploy basePath is applied; downloads
  // (already prefixed with asset()) stay plain anchors.
  return href.startsWith("/") && !rest.download ? (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cls} {...rest}>
      {inner}
    </a>
  );
}
