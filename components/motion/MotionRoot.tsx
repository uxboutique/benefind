"use client";

import { useEffect } from "react";
import { motion } from "@/lib/motion/tokens";

const SELECTOR = "[data-reveal], [data-split], [data-media]";

/**
 * Single motion entry point (renders nothing).
 * One IntersectionObserver marks elements `.is-in` once (then unobserves); CSS does the animating.
 * Elements added later (e.g. SplitLines re-render) are picked up by a MutationObserver.
 * Idempotent: safe under React Strict Mode double-mount (cleanup disconnects everything).
 */
export function MotionRoot() {
  useEffect(() => {
    const root = document.documentElement;
    const seen = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // Also reveal anything already scrolled past (fast flings / jumps can skip the intersection).
          if (e.isIntersecting || e.boundingClientRect.bottom < 0) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: motion.observer.rootMargin, threshold: motion.observer.threshold },
    );

    const observe = (scope: ParentNode) => {
      scope.querySelectorAll(SELECTOR).forEach((el) => {
        if (seen.has(el) || el.classList.contains("is-in")) return;
        seen.add(el);
        io.observe(el);
      });
    };

    observe(document);
    const mo = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach((n) => n instanceof Element && observe(n.parentElement ?? n));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    root.classList.add("motion-ready");
    root.classList.remove("motion-fallback");

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
