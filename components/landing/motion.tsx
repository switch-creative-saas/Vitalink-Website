"use client";

import { Fragment, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "./reveal";

/* One shared scroll/resize listener drives every scroll-linked element on the page. */

type Listener = () => void;
const listeners = new Set<Listener>();
let frame = 0;

function flush() {
  frame = 0;
  listeners.forEach((listener) => listener());
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(flush);
}

export function onScrollFrame(listener: Listener) {
  if (listeners.size === 0) {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }
  listeners.add(listener);
  schedule();

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Writes scroll progress for an element into CSS variables:
 *  --enter: 0 when its top reaches the bottom of the viewport, 1 when it reaches 35% from the top.
 *  --pass:  0 when its top reaches the bottom of the viewport, 1 when its bottom leaves the top.
 * Children can then animate with calc(var(--enter) * ...).
 */
export function useScrollVars<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      node.style.setProperty("--enter", "1");
      node.style.setProperty("--pass", "0.5");
      return;
    }

    return onScrollFrame(() => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const enter = clamp((vh - rect.top) / (vh * 0.65));
      const pass = clamp((vh - rect.top) / (vh + rect.height));
      node.style.setProperty("--enter", enter.toFixed(4));
      node.style.setProperty("--enter-eased", easeOut(enter).toFixed(4));
      node.style.setProperty("--pass", pass.toFixed(4));
    });
  }, []);

  return ref;
}

/** Heading whose words rise out of a mask, one after another, when scrolled into view. */
export function SplitText({
  text,
  className,
  as: Component = "h2",
  delay = 0,
  id,
}: {
  id?: string;
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLHeadingElement>(0.3);
  const words = text.split(" ");

  return (
    <Component
      ref={ref as React.Ref<never>}
      id={id}
      className={cn("split-text", className)}
      data-shown={inView}
      aria-label={text}
    >
      {words.map((word, index) => (
        <Fragment key={index}>
          <span aria-hidden="true" className="split-word">
            <span style={{ transitionDelay: `${delay + index * 55}ms` }}>{word}</span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Component>
  );
}

/** Counts from 0 up to `value` once visible. */
export function CountUp({ value, duration = 1400 }: { value: number; duration?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const output = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = output.current;
    if (!node || !inView) return;
    if (prefersReducedMotion()) {
      node.textContent = value.toLocaleString("en-NG");
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = clamp((now - start) / duration);
      node.textContent = Math.round(easeOut(t) * value).toLocaleString("en-NG");
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      <span ref={output}>0</span>
    </span>
  );
}
