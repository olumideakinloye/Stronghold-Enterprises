"use client";

import { useEffect, useState } from "react";

export type HeroSlide = {
  /** Leave empty until real photography is ready — a branded gradient placeholder is shown instead. */
  src?: string;
  alt: string;
};

// Swap `src` in for a real photo per slide whenever it's ready — the
// gradient placeholder disappears automatically once `src` is set.
const DEFAULT_SLIDES: HeroSlide[] = [
  { alt: "Security operations" },
  { alt: "Real estate & property" },
  { alt: "Business consultancy" },
  { alt: "Logistics & transport" },
  { alt: "Automobiles" },
];

const PLACEHOLDER_GRADIENTS = [
  "linear-gradient(135deg, #0B3B24 0%, #146B3E 45%, #3FC57F 100%)",
  "linear-gradient(140deg, #101913 0%, #1E3B2A 50%, #1E9E5A 100%)",
  "linear-gradient(150deg, #0E2A1C 0%, #1E9E5A 55%, #8FE3B8 100%)",
  "linear-gradient(160deg, #12140F 0%, #146B3E 60%, #3FC57F 100%)",
  "linear-gradient(145deg, #0B0F0B 0%, #1B4430 50%, #3FC57F 100%)",
];

interface HeroSlideshowProps {
  slides?: HeroSlide[];
  interval?: number;
  className?: string;
  onActiveChange?: (index: number) => void;
  showIndicators?: boolean;
  active?: number;
}

export default function HeroSlideshow({
  slides = DEFAULT_SLIDES,
  interval = 6000,
  className = "",
  onActiveChange,
  showIndicators = true,
  active: controlledActive,
}: HeroSlideshowProps) {
  const [internalActive, setInternalActive] = useState(controlledActive ?? 0);
  const active = internalActive;

  // Only the active slide + the next one in line ever get a real `src`.
  // Without this, all 5 hero background images would fetch on page load
  // even though 4 of them are just sitting at opacity: 0 waiting their
  // turn — native `loading="lazy"` doesn't help here since they're all
  // stacked in the same on-screen position, so the browser's viewport
  // heuristic considers them all immediately visible. Loading the *next*
  // slide (not just the active one) as soon as its predecessor becomes
  // active gives it the full `interval` to finish downloading, so there's
  // no visible pop/flash when the crossfade happens.
  const [loadedIndices, setLoadedIndices] = useState<Set<number>>(
    () => new Set([0]),
  );

  useEffect(() => {
    setLoadedIndices((prev) => {
      const next = (active + 1) % slides.length;
      if (prev.has(active) && prev.has(next)) return prev;
      const updated = new Set(prev);
      updated.add(active);
      updated.add(next);
      return updated;
    });
  }, [active, slides.length]);

  useEffect(() => {
    if (controlledActive !== undefined) setInternalActive(controlledActive);
  }, [controlledActive]);

  useEffect(() => {
    onActiveChange?.(active);
  }, [active]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = setInterval(() => {
      setInternalActive((i) => (i + 1) % slides.length);
    }, interval);
    return () => clearInterval(id);
  }, [slides.length, interval]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-20 overflow-hidden bg-brand-ink ${className}`}
      aria-hidden="true"
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[1800ms] ease-out"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          <div
            className="hero-slide-media absolute inset-0 h-full w-full"
            style={
              slide.src && loadedIndices.has(i)
                ? {
                    backgroundImage: `url(${slide.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : { backgroundImage: PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length] }
            }
          />
        </div>
      ))}

      {/* Legibility scrim so hero copy stays readable over any photo */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-ink/75 via-brand-ink/50 to-brand-ink/85" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.35)_100%)]" />

      {/* Progress indicators */}
      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === active ? "w-6 bg-white/90" : "w-1.5 bg-white/35"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
