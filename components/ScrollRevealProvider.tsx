"use client";

import { useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Lightweight scroll-reveal engine (Spaceship.com-style progressive reveal).
 * Any element with class="scroll-fade" (optionally with data-delay="150")
 * animates into view the first time it crosses the viewport threshold.
 * No external AOS dependency needed — implemented natively for full control
 * over easing/stagger and to keep bundle size small.
 */
export default function ScrollRevealProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay ? Number(el.dataset.delay) : 0;
            window.setTimeout(() => {
              el.classList.add("is-visible");
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    // Observe every scroll-fade element currently in the DOM.
    const observeNew = () => {
      document.querySelectorAll(".scroll-fade:not(.is-visible)").forEach((t) => observer.observe(t));
    };

    // Initial scan (covers content already rendered when this effect runs).
    observeNew();

    // Server Components / Suspense can stream content in *after* this effect
    // runs (e.g. while an async data fetch is still resolving). A single
    // delayed scan can miss that content entirely, leaving it permanently
    // hidden. A MutationObserver keeps watching and picks up anything that
    // mounts later, for as long as this route is active.
    const mutationObserver = new MutationObserver(() => {
      observeNew();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Safety net: if something still slips through (e.g. an element added
    // and removed within the same tick), force-reveal any leftover hidden
    // scroll-fade content after a few seconds so it's never stuck invisible.
    const failsafe = window.setTimeout(() => {
      document.querySelectorAll(".scroll-fade:not(.is-visible)").forEach((el) => {
        el.classList.add("is-visible");
      });
    }, 4000);

    return () => {
      window.clearTimeout(failsafe);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return <>{children}</>;
}