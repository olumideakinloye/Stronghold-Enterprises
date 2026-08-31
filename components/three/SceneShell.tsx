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
  // `<Environment preset="city" />` fetches an HDRI (several hundred KB to
  // low MB) from drei's CDN on top of the GLB itself — a second blocking
  // network request every visitor pays for on first load. It's only worth
  // it for models with glossy/metallic materials that actually show
  // reflections; for most module objects the three lights below already
  // read fine. Opt in per-scene with `environment` if a model looks flat
  // without it, ideally after self-hosting a compressed .hdr/.ktx2 env map
  // instead of relying on the CDN one.
  environment = false,
}: {
  children: ReactNode;
  cameraPosition?: [number, number, number];
  minDistance?: number;
  maxDistance?: number;
  bg?: string;
  environment?: boolean;
}) {
  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: cameraPosition, fov: 40 }}
        style={{ background: bg }}
      >
        <ambientLight intensity={0.85} />
        <hemisphereLight
          color="#ffffff"
          groundColor="#1e3b2a"
          intensity={0.9}
        />
        <directionalLight
          position={[6, 8, 4]}
          intensity={1.9}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight
          position={[-5, 3, -4]}
          intensity={0.5}
          color="#3FC57F"
        />
        <directionalLight position={[0, -3, 5]} intensity={0.3} />
        <Suspense fallback={null}>
          {children}
          {environment && <Environment preset="city" />}
          <ContactShadows
            position={[0, -1.01, 0]}
            opacity={0.35}
            scale={12}
            blur={2.4}
            far={4}
          />
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
