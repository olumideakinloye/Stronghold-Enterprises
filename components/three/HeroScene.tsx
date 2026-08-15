"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import HeroEmblem from "./HeroEmblem";

/**
 * Full-bleed 3D hero backdrop for the homepage, in the spirit of
 * spaceship.com's hero object: it turns and settles as the visitor
 * scrolls past it, and drifts slightly toward the cursor. Sits behind
 * the hero copy at -z, so it never blocks clicks or scrolling.
 */
export default function HeroScene() {
  const progress = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? Math.min(window.scrollY / Math.min(max, 900), 1) : 0;
    };
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.35, 6.4], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[6, 8, 4]} intensity={1.3} />
        <directionalLight position={[-6, -2, -4]} intensity={0.45} color="#3FC57F" />
        <Suspense fallback={null}>
          <HeroEmblem progress={progress} mouse={mouse} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
