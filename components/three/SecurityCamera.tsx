"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Cylinder, Sphere } from "@react-three/drei";
import * as THREE from "three";

export default function SecurityCamera() {
  const lensRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (lensRef.current) {
      lensRef.current.material instanceof THREE.MeshStandardMaterial &&
        (lensRef.current.material.emissiveIntensity = 1.4 + Math.sin(clock.elapsedTime * 2) * 0.6);
    }
  });

  return (
    <group position={[0, -0.4, 0]}>
      {/* Wall mount pole */}
      <Cylinder args={[0.09, 0.09, 1.6, 24]} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial color="#12140F" metalness={0.6} roughness={0.35} />
      </Cylinder>

      {/* Camera housing */}
      <group position={[0, 0.95, 0]} rotation={[0, Math.PI / 5, 0]}>
        <RoundedBox args={[1.5, 0.55, 0.55]} radius={0.12} smoothness={4} castShadow>
          <meshStandardMaterial color="#F4F5F3" metalness={0.2} roughness={0.4} />
        </RoundedBox>
        {/* Green accent band */}
        <RoundedBox args={[1.52, 0.1, 0.57]} radius={0.05} position={[0, -0.16, 0]} castShadow>
          <meshStandardMaterial color="#1E9E5A" metalness={0.3} roughness={0.3} />
        </RoundedBox>
        {/* Lens */}
        <Cylinder args={[0.2, 0.2, 0.25, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0.75, 0, 0]} castShadow>
          <meshStandardMaterial color="#0A0B08" metalness={0.9} roughness={0.1} />
        </Cylinder>
        <Sphere ref={lensRef} args={[0.09, 16, 16]} position={[0.9, 0, 0]}>
          <meshStandardMaterial color="#3FC57F" emissive="#3FC57F" emissiveIntensity={1.4} />
        </Sphere>
      </group>

      {/* Base plate */}
      <Cylinder args={[0.4, 0.45, 0.12, 32]} position={[0, -0.85, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#E4E7E1" metalness={0.4} roughness={0.5} />
      </Cylinder>
    </group>
  );
}
