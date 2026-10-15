"use client";

import { Fragment, useEffect, useLayoutEffect, useRef, useState, type ElementType } from "react";

type Props = {
  as?: ElementType;
  id?: string;
  className?: string;
  /** Authored line breaks (Figma forces them in some headings): always respected. */
  lines?: string[];
  children: string;
};

/**
 * Headline line reveal (M3).
 * Server/no-JS: plain text (authored breaks as <br>), fully visible.
 * Client: words are measured after fonts load and grouped into visual lines, each wrapped in a
 * clipped row so its inner span can rise. Text stays real text (selectable, read normally by
 * screen readers); geometry is identical to the unsplit heading (block rows, same line-height).
 * Re-splits when the element's width changes (resize only — never on scroll).
 */
export function SplitLines({ as: Tag = "h2", id, className, lines, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [split, setSplit] = useState<string[] | null>(null);
  const [measure, setMeasure] = useState(0);
  const authored = lines ?? [children];

  // Phase 1 (measure): render words as inline spans, read their offsetTop, group into lines.
  useLayoutEffect(() => {
    if (split !== null || measure === 0) return;
    const el = ref.current;
    if (!el) return;
    const result: string[] = [];
    let top: number | null = null;
    el.querySelectorAll<HTMLElement>("[data-w]").forEach((w) => {
      const forced = w.dataset.w === "break";
      if (top === null || forced || Math.abs(w.offsetTop - top) > 2) {
        result.push(w.textContent ?? "");
        top = w.offsetTop;
      } else {
        result[result.length - 1] += ` ${w.textContent}`;
      }
    });
    setSplit(result);
  }, [split, measure]);

  // Trigger measuring after fonts are ready, and again when the width changes.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let width = 0;
    let timer = 0;
    let cancelled = false;
    const remeasure = () => {
      setSplit(null);
      setMeasure((m) => m + 1);
    };
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width);
      if (width && Math.abs(w - width) < 2) return;
      const first = width === 0;
      width = w;
      if (first) return;
      clearTimeout(timer);
      timer = window.setTimeout(remeasure, 150);
    });
    document.fonts.ready.then(() => {
      if (cancelled) return;
      remeasure();
      ro.observe(el);
    });
    return () => {
      cancelled = true;
      clearTimeout(timer);
      ro.disconnect();
    };
  }, []);

  let content;
  if (split) {
    content = split.map((line, i) => (
      <span key={i} className="split-line">
        <span className="split-line__inner" style={{ "--i": i } as React.CSSProperties}>
          {line}
          {i < split.length - 1 && " "}
        </span>
      </span>
    ));
  } else if (measure > 0) {
    content = authored.map((line, li) =>
      line.split(/\s+/).map((word, wi) => (
        <Fragment key={`${li}-${wi}`}>
          {wi > 0 && " "}
          {li > 0 && wi === 0 && <br />}
          <span data-w={li > 0 && wi === 0 ? "break" : ""}>{word}</span>
        </Fragment>
      )),
    );
  } else {
    content = authored.map((line, i) => (
      <Fragment key={i}>
        {i > 0 && " "}
        {i > 0 && <br />}
        {line}
      </Fragment>
    ));
  }

  return (
    <Tag ref={ref} id={id} className={className} data-split="" data-split-ready={split ? "" : undefined}>
      {content}
    </Tag>
  );
}
