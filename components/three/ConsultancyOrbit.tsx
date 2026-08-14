"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Torus } from "@react-three/drei";
import * as THREE from "three";

export default function ConsultancyOrbit() {
  const group = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ring1.current) ring1.current.rotation.x += delta * 0.4;
    if (ring2.current) ring2.current.rotation.y += delta * 0.35;
    if (ring3.current) ring3.current.rotation.z += delta * 0.3;
    if (group.current) group.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={group}>
      {/* Core - represents the client's business */}
      <Sphere args={[0.55, 48, 48]} castShadow>
        <meshStandardMaterial color="#12140F" roughness={0.35} metalness={0.4} />
      </Sphere>
      <Sphere args={[0.58, 32, 32]}>
        <meshStandardMaterial color="#1E9E5A" wireframe transparent opacity={0.5} />
      </Sphere>

      {/* Three orbiting rings — strategy, structure, growth */}
      <Torus ref={ring1} args={[1.15, 0.025, 16, 100]} rotation={[Math.PI / 2.4, 0, 0]}>
        <meshStandardMaterial color="#1E9E5A" metalness={0.5} roughness={0.3} />
      </Torus>
      <Torus ref={ring2} args={[1.5, 0.02, 16, 100]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#3FC57F" metalness={0.5} roughness={0.3} />
      </Torus>
      <Torus ref={ring3} args={[1.85, 0.018, 16, 100]} rotation={[Math.PI / 2, Math.PI / 6, 0]}>
        <meshStandardMaterial color="#146B3E" metalness={0.5} roughness={0.3} />
      </Torus>

      {/* Nodes on the orbits */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        const r = 1.5;
        return (
          <Sphere key={i} args={[0.06, 16, 16]} position={[Math.cos(angle) * r, Math.sin(angle * 1.3) * 0.3, Math.sin(angle) * r]}>
            <meshStandardMaterial color="#3FC57F" emissive="#1E9E5A" emissiveIntensity={0.5} />
          </Sphere>
        );
      })}
    </group>
  );
}
