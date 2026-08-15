"use client";

import { MutableRefObject, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Icosahedron, Sphere, Torus } from "@react-three/drei";
import * as THREE from "three";

/**
 * The five orbiting nodes stand for Stronghold's five business lines
 * (Security, Real Estate, Consultancy, Logistics, Automobiles) circling
 * a single faceted core — "five businesses, one address" made literal.
 */
const NODES = [
  { name: "Security", color: "#1E9E5A", radius: 2.55, speed: 0.34, offset: 0 },
  { name: "Real Estate", color: "#3FC57F", radius: 2.9, speed: 0.27, offset: (Math.PI * 2) / 5 },
  { name: "Consultancy", color: "#146B3E", radius: 2.35, speed: 0.41, offset: (Math.PI * 4) / 5 },
  { name: "Logistics", color: "#1E9E5A", radius: 3.15, speed: 0.23, offset: (Math.PI * 6) / 5 },
  { name: "Automobiles", color: "#3FC57F", radius: 2.72, speed: 0.32, offset: (Math.PI * 8) / 5 },
];

export type ScrollMouseRefs = {
  progress: MutableRefObject<number>;
  mouse: MutableRefObject<{ x: number; y: number }>;
};

export default function HeroEmblem({ progress, mouse }: ScrollMouseRefs) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p = progress.current;

    if (group.current) {
      // Scroll turns the emblem to face the viewer, like the reference
      // site's hero object reacting as you move past it. Mouse position
      // adds a light parallax tilt on top.
      const targetRotY = p * Math.PI * 0.85 + mouse.current.x * 0.25;
      const targetRotX = -p * 0.22 + mouse.current.y * 0.12;
      group.current.rotation.y += (targetRotY - group.current.rotation.y) * 0.06;
      group.current.rotation.x += (targetRotX - group.current.rotation.x) * 0.06;
      group.current.position.y += (-p * 0.7 - group.current.position.y) * 0.06;
      const targetScale = 1 - p * 0.14;
      group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
    }

    if (core.current) {
      core.current.rotation.y = t * 0.16;
      core.current.rotation.x = t * 0.09;
    }

    nodeRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const n = NODES[i];
      const angle = t * n.speed + n.offset;
      mesh.position.set(
        Math.cos(angle) * n.radius,
        Math.sin(angle * 0.6 + n.offset) * 0.55,
        Math.sin(angle) * n.radius
      );
    });
  });

  return (
    <group ref={group}>
      {/* Faceted core mark */}
      <Icosahedron ref={core} args={[1.1, 1]} castShadow>
        <meshStandardMaterial color="#12140F" metalness={0.55} roughness={0.25} />
      </Icosahedron>
      <Icosahedron args={[1.2, 0]}>
        <meshBasicMaterial color="#3FC57F" wireframe transparent opacity={0.35} />
      </Icosahedron>

      {/* Faint orbit rings */}
      {[2.35, 2.7, 3.0].map((r, i) => (
        <Torus key={r} args={[r, 0.006, 8, 96]} rotation={[Math.PI / 2 + i * 0.16, 0, 0]}>
          <meshBasicMaterial color="#1E9E5A" transparent opacity={0.16} />
        </Torus>
      ))}

      {/* Five nodes = five business lines */}
      {NODES.map((n, i) => (
        <Sphere
          key={n.name}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
          args={[0.16, 24, 24]}
          castShadow
        >
          <meshStandardMaterial
            color={n.color}
            emissive={n.color}
            emissiveIntensity={0.55}
            metalness={0.3}
            roughness={0.3}
          />
        </Sphere>
      ))}
    </group>
  );
}
