"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { prefersReducedMotion } from "@/lib/motion/tokens";

/**
 * Native scroll-snap carousel (same model as Apple's media galleries): the browser owns touch and
 * trackpad scrolling; this hook adds
 *  - position state derived from scrollLeft (nearest snap point), not from IntersectionObserver —
 *    with several cards visible at once IO picked the wrong "active" card and enabled Prev at start;
 *  - React updates only when index / canPrev / canNext actually change (rAF-throttled scroll listener);
 *  - mouse drag with flick detection (desktop has no native drag-to-scroll);
 *  - Prev/Next animated with the site easing (ease-out expo, ~700 ms) instead of the browser's
 *    generic smooth scroll; instant with prefers-reduced-motion;
 *  - one slide per swipe via `scroll-snap-stop: always` in CSS;
 *  - horizontal wheel / trackpad gestures handled here: one slide per gesture, locked until the
 *    momentum tail ends. Native handling was unreliable — as soon as any non-passive wheel listener
 *    exists on the page (e.g. Lenis), Chrome re-snaps every small step back to the start.
 */

const DURATION = 700;
const DRAG_THRESHOLD = 6; // px before a press becomes a drag (keeps clicks working)
const FLICK_VELOCITY = 0.35; // px/ms
const WHEEL_THRESHOLD = 30; // accumulated px before a horizontal gesture triggers a step
const WHEEL_IDLE = 180; // ms without wheel events = gesture (incl. momentum) finished
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

export function useCarousel(count: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ active: 0, canPrev: false, canNext: count > 1 });
  const anim = useRef(0);

  /** Scroll targets for each slide (clamped to the max scroll so the last ones are reachable). */
  const targets = useCallback(() => {
    const track = trackRef.current;
    if (!track) return [];
    const slides = Array.from(track.children) as HTMLElement[];
    const max = track.scrollWidth - track.clientWidth;
    const first = slides[0]?.offsetLeft ?? 0;
    return slides.map((s) => Math.min(max, Math.max(0, s.offsetLeft - first)));
  }, []);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const t = targets();
    const x = track.scrollLeft;
    const max = track.scrollWidth - track.clientWidth;
    let active = 0;
    t.forEach((v, i) => {
      if (Math.abs(v - x) < Math.abs(t[active] - x)) active = i;
    });
    const next = { active, canPrev: x > 2, canNext: x < max - 2 };
    setState((s) => (s.active === next.active && s.canPrev === next.canPrev && s.canNext === next.canNext ? s : next));
  }, [targets]);

  const animateTo = useCallback((to: number) => {
    const track = trackRef.current;
    if (!track) return;
    cancelAnimationFrame(anim.current);
    const from = track.scrollLeft;
    if (prefersReducedMotion() || Math.abs(to - from) < 1) {
      track.scrollLeft = to;
      return;
    }
    // Snap would fight the per-frame scrollLeft writes: suspend it for the duration.
    track.style.scrollSnapType = "none";
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      track.scrollLeft = from + (to - from) * easeOutExpo(p);
      if (p < 1) anim.current = requestAnimationFrame(step);
      else track.style.scrollSnapType = "";
    };
    anim.current = requestAnimationFrame(step);
  }, []);

  const go = useCallback(
    (index: number) => {
      const t = targets();
      if (!t.length) return;
      animateTo(t[Math.max(0, Math.min(t.length - 1, index))]);
    },
    [animateTo, targets],
  );

  /** Next/prev relative to the current scroll position (skips targets clamped to the same value). */
  const step = useCallback(
    (dir: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      const t = targets();
      const x = track.scrollLeft;
      const to = dir > 0 ? t.find((v) => v > x + 2) : [...t].reverse().find((v) => v < x - 2);
      if (to !== undefined) animateTo(to);
    },
    [animateTo, targets],
  );

  // Scroll → state (rAF-throttled; React only re-renders when a value changes).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sync);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(onScroll);
    ro.observe(track);
    sync();
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [sync, count]);

  // Horizontal wheel / trackpad: one step per gesture.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let acc = 0;
    let locked = false;
    let idle = 0;
    const onWheel = (e: WheelEvent) => {
      const dx = e.deltaX || (e.shiftKey ? e.deltaY : 0);
      if (Math.abs(dx) <= Math.abs(e.shiftKey ? 0 : e.deltaY)) return; // vertical → page scroll
      e.preventDefault();
      (e as WheelEvent & { lenisStopPropagation?: boolean }).lenisStopPropagation = true;
      acc += dx;
      clearTimeout(idle);
      idle = window.setTimeout(() => {
        acc = 0;
        locked = false;
      }, WHEEL_IDLE);
      if (!locked && Math.abs(acc) > WHEEL_THRESHOLD) {
        locked = true;
        step(acc > 0 ? 1 : -1);
      }
    };
    track.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      clearTimeout(idle);
      track.removeEventListener("wheel", onWheel);
    };
  }, [step]);

  // Mouse drag (touch/pen keep native scrolling).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let startX = 0;
    let startScroll = 0;
    let lastX = 0;
    let lastT = 0;
    let velocity = 0;
    let pressed = false;
    let dragging = false;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      if ((e.target as Element).closest("button, input, select, textarea")) return;
      cancelAnimationFrame(anim.current);
      pressed = true;
      dragging = false;
      startX = lastX = e.clientX;
      startScroll = track.scrollLeft;
      lastT = performance.now();
      velocity = 0;
    };
    const onMove = (e: PointerEvent) => {
      if (!pressed) return;
      const dx = e.clientX - startX;
      if (!dragging) {
        if (Math.abs(dx) < DRAG_THRESHOLD) return;
        dragging = true;
        track.setPointerCapture(e.pointerId);
        track.style.scrollSnapType = "none";
        track.dataset.dragging = "";
      }
      const now = performance.now();
      velocity = (e.clientX - lastX) / Math.max(1, now - lastT);
      lastX = e.clientX;
      lastT = now;
      track.scrollLeft = startScroll - dx;
    };
    const onUp = () => {
      if (!pressed) return;
      pressed = false;
      if (!dragging) return;
      delete track.dataset.dragging;
      const t = targets();
      const x = track.scrollLeft;
      let to: number | undefined;
      if (velocity < -FLICK_VELOCITY) to = t.find((v) => v > startScroll + 2);
      else if (velocity > FLICK_VELOCITY) to = [...t].reverse().find((v) => v < startScroll - 2);
      if (to === undefined) to = t.reduce((a, v) => (Math.abs(v - x) < Math.abs(a - x) ? v : a), t[0] ?? 0);
      animateTo(to);
      // Swallow the click that follows a drag so links inside slides don't fire.
      const swallow = (ev: MouseEvent) => {
        ev.preventDefault();
        ev.stopPropagation();
      };
      track.addEventListener("click", swallow, { capture: true, once: true });
      setTimeout(() => track.removeEventListener("click", swallow, { capture: true }), 0);
    };
    const noNativeDrag = (e: DragEvent) => e.preventDefault();

    track.addEventListener("pointerdown", onDown);
    track.addEventListener("pointermove", onMove);
    track.addEventListener("pointerup", onUp);
    track.addEventListener("pointercancel", onUp);
    track.addEventListener("dragstart", noNativeDrag);
    return () => {
      track.removeEventListener("pointerdown", onDown);
      track.removeEventListener("pointermove", onMove);
      track.removeEventListener("pointerup", onUp);
      track.removeEventListener("pointercancel", onUp);
      track.removeEventListener("dragstart", noNativeDrag);
      cancelAnimationFrame(anim.current);
    };
  }, [animateTo, targets]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      }
    },
    [step],
  );

  return {
    trackRef,
    active: state.active,
    canPrev: state.canPrev,
    canNext: state.canNext,
    prev: () => step(-1),
    next: () => step(1),
    go,
    onKeyDown,
  };
}
