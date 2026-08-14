"use client";

import { Suspense, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";

/**
 * Shared canvas shell for every module's interactive 3D object.
 * Drag to orbit, scroll/pinch to zoom. Auto-rotates gently until the
 * user first interacts.
 */
export default function SceneShell({
  children,
  cameraPosition = [4, 2.2, 5.5],
  minDistance = 3,
  maxDistance = 9,
  bg = "transparent",
}: {
  children: ReactNode;
  cameraPosition?: [number, number, number];
  minDistance?: number;
  maxDistance?: number;
  bg?: string;
}) {
  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: cameraPosition, fov: 40 }}
        style={{ background: bg }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[6, 8, 4]}
          intensity={1.4}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-5, 3, -4]} intensity={0.3} color="#3FC57F" />
        <Suspense fallback={null}>
          {children}
          <Environment preset="city" />
          <ContactShadows position={[0, -1.01, 0]} opacity={0.35} scale={12} blur={2.4} far={4} />
        </Suspense>
        <OrbitControls
          autoRotate
          autoRotateSpeed={1.1}
          enablePan={false}
          minDistance={minDistance}
          maxDistance={maxDistance}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.9}
          onStart={(e) => {
            // stop auto-rotate permanently once the user takes control
            // @ts-expect-error - drei control instance
            e.target.autoRotate = false;
          }}
        />
      </Canvas>
      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-medium text-brand-muted/80">
        Drag to rotate · Scroll to zoom
      </p>
    </div>
  );
}
