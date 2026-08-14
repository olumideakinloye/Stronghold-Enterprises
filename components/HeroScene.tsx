"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import FloatingFigure from "@/components/FloatingFigure";

const FIGURES = [
  { src: "/illustrations/security.svg", depth: 30, rotate: -6, className: "left-[-4%] top-[6%] w-32 sm:w-44 md:w-52" },
  { src: "/illustrations/real-estate.svg", depth: 55, rotate: 5, className: "right-[-6%] top-[0%] w-36 sm:w-48 md:w-56" },
  { src: "/illustrations/logistics.svg", depth: 20, rotate: 4, className: "left-[0%] bottom-[6%] w-28 sm:w-40 md:w-48" },
  { src: "/illustrations/automobiles.svg", depth: 45, rotate: -4, className: "right-[2%] bottom-[2%] w-28 sm:w-40 md:w-48" },
] as const;

/**
 * Wraps the hero content in a real 3D scene: illustrations sit on
 * depth-separated layers that drift with the pointer, and the whole
 * card stack tilts back on a perspective plane as the section scrolls
 * out of view — the same "3D scroll" language as spaceship.com's hero,
 * adapted to Stronghold's five business lines instead of astronauts.
 */
export default function HeroScene({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smoothX = useSpring(mx, { stiffness: 50, damping: 20, mass: 0.6 });
  const smoothY = useSpring(my, { stiffness: 50, damping: 20, mass: 0.6 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 14]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);
  const translateZ = useTransform(scrollYProgress, [0, 1], [0, -120]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
      style={{ perspective: 1400 }}
    >
      {FIGURES.map((f) => (
        <FloatingFigure key={f.src} {...f} mx={smoothX} my={smoothY} />
      ))}

      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          translateZ,
          transformStyle: "preserve-3d",
          transformPerspective: 1400,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
