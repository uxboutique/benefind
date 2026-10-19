"use client";

import { useEffect } from "react";

/**
 * Links whose destination is not designed yet use href="#" (see content/*). Clicking them must not
 * jump the page back to the top — swallow the navigation site-wide (capture phase, one listener).
 */
export function PlaceholderLinks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (a && a.getAttribute("href") === "#") e.preventDefault();
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
