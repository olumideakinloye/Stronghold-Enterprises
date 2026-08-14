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

    // Re-scan shortly after route change so newly-mounted page content is observed.
    const scan = window.setTimeout(() => {
      document.querySelectorAll(".scroll-fade:not(.is-visible)").forEach((t) => observer.observe(t));
    }, 50);

    return () => {
      window.clearTimeout(scan);
      observer.disconnect();
    };
  }, [pathname]);

  return <>{children}</>;
}
