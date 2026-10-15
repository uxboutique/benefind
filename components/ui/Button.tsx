import type { ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "light" | "primary" | "outline" | "outline-light" | "sky";

type Props = {
  href: string;
  variant?: Variant;
  size?: "sm" | "md";
  /** Appends the "→" glyph used throughout the design (nudges on hover). */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

export function Button({ href, variant = "primary", size = "md", arrow = false, className, children, ...rest }: Props) {
  const cls = [styles.btn, styles[variant], styles[size], className].filter(Boolean).join(" ");
  return (
    <a href={href} className={cls} {...rest}>
      <span>{children}</span>
      {arrow && (
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      )}
    </a>
  );
}
