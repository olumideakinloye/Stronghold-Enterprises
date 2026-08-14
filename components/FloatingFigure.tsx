"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import clsx from "clsx";

/**
 * One depth-layered illustration in the hero, echoing the parallax
 * "figure" cutouts on spaceship.com — each layer drifts a different
 * amount against the pointer position, giving the scene real depth.
 */
export default function FloatingFigure({
  src,
  alt = "",
  className,
  depth,
  rotate = 0,
  mx,
  my,
}: {
  src: string;
  alt?: string;
  className?: string;
  depth: number;
  rotate?: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);

  return (
    <motion.div
      aria-hidden
      className={clsx("pointer-events-none absolute -z-10", className)}
      style={{ x, y, rotate }}
    >
      <div className="animate-floatY drop-shadow-2xl">
        {/* Decorative, license-free illustration (unDraw, MIT) */}
        <img src={src} alt={alt} className="h-auto w-full select-none" draggable={false} />
      </div>
    </motion.div>
  );
}
