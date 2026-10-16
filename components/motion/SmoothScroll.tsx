"use client";

import { useEffect } from "react";
import { motion, prefersReducedMotion } from "@/lib/motion/tokens";

/**
 * Smooth wheel scrolling (Lenis) — desktop with a fine pointer only, never with reduced motion;
 * touch devices keep native scrolling (same policy as the ICON reference).
 * Lenis is loaded on demand so it never ships to phones. It drives native window scroll, so
 * IntersectionObserver reveals, CSS scroll-driven animations and the header logic keep working.
 * Stops while the burger menu locks the page (html.no-scroll).
 */
export function SmoothScroll() {
  useEffect(() => {
    const ok = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)").matches;
    // QA escape hatch: ?lenis=0 keeps native scrolling.
    if (!ok || prefersReducedMotion() || new URLSearchParams(location.search).get("lenis") === "0") return;

    let destroyed = false;
    let cleanup = () => {};
    import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      const lenis = new Lenis({
        duration: motion.smoothScroll.duration,
        easing: (t) => 1 - Math.pow(1 - t, 4), // ease-out quart (ICON)
        smoothWheel: true,
        autoRaf: true,
      });

      // Same-page anchors (incl. next/link "/#id"): one smooth Lenis scroll (lands below the sticky header via scroll-padding-top).
      // Handled in the capture phase and default-prevented so the router doesn't scroll as well.
      const onClick = (e: MouseEvent) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const a = (e.target as Element).closest?.("a[href*='#']") as HTMLAnchorElement | null;
        if (!a || a.target === "_blank") return;
        const url = new URL(a.href, location.href);
        if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
        const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el); // honours html scroll-padding-top (header height)
        history.pushState(null, "", url.hash);
      };
      document.addEventListener("click", onClick, { capture: true });
      const root = document.documentElement;
      const sync = () => (root.classList.contains("no-scroll") ? lenis.stop() : lenis.start());
      const mo = new MutationObserver(sync);
      mo.observe(root, { attributes: true, attributeFilter: ["class"] });
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const onMq = () => mq.matches && lenis.destroy();
      mq.addEventListener("change", onMq);
      cleanup = () => {
        document.removeEventListener("click", onClick, { capture: true });
        mo.disconnect();
        mq.removeEventListener("change", onMq);
        lenis.destroy();
      };
    });
    return () => {
      destroyed = true;
      cleanup();
    };
  }, []);

  return null;
}
