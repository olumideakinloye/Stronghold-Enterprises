"use client";

import { ReactNode, useRef } from "react";

/**
 * Wraps a card in a light perspective tilt that tracks the pointer,
 * settling back to flat on leave. Skipped for touch input, where a
 * hover-based tilt has no equivalent and would just feel laggy.
 */
export default function Tilt3D({
  children,
  className,
  strength = 8,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * strength).toFixed(2)}deg) rotateY(${(px * strength).toFixed(2)}deg) translateZ(0)`;
  }

  function handleLeave() {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={className}
      style={{ transition: "transform 0.25s ease", transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
    </div>
  );
}
