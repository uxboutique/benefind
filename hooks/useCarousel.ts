"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";

/**
 * Native scroll-snap carousel state.
 * - Active slide comes from an IntersectionObserver rooted on the track (fires on threshold
 *   crossings only — no per-frame scroll handlers, no React updates while scrolling).
 * - Prev/next scroll the track; reduced motion → instant jump.
 */
export function useCarousel(count: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(slides.indexOf(e.target as HTMLElement));
        }
      },
      { root: track, threshold: 0.6 },
    );
    slides.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [count]);

  const go = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const i = Math.max(0, Math.min(count - 1, index));
      const slides = track.children as HTMLCollectionOf<HTMLElement>;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      track.scrollTo({ left: slides[i].offsetLeft - slides[0].offsetLeft, behavior: reduce ? "auto" : "smooth" });
      setActive(i);
    },
    [count],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(active + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(active - 1);
      }
    },
    [active, go],
  );

  return {
    trackRef,
    active,
    canPrev: active > 0,
    canNext: active < count - 1,
    prev: () => go(active - 1),
    next: () => go(active + 1),
    onKeyDown,
  };
}
