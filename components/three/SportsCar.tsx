"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Cylinder } from "@react-three/drei";
import * as THREE from "three";

function Wheel({ x, z }: { x: number; z: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.x += delta * 2.2;
  });
  return (
    <Cylinder ref={ref} args={[0.32, 0.32, 0.24, 24]} rotation={[Math.PI / 2, 0, 0]} position={[x, -0.42, z]} castShadow>
      <meshStandardMaterial color="#0A0B08" roughness={0.5} metalness={0.3} />
    </Cylinder>
  );
}

export default function SportsCar() {
  return (
    <group position={[0, -0.2, 0]} rotation={[0, -0.3, 0]}>
      {/* Lower body / chassis */}
      <RoundedBox args={[2.9, 0.4, 1.25]} radius={0.15} smoothness={4} position={[0, -0.15, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#1E9E5A" metalness={0.65} roughness={0.25} />
      </RoundedBox>

      {/* Cabin / greenhouse */}
      <RoundedBox args={[1.4, 0.45, 1.05]} radius={0.2} smoothness={4} position={[0.05, 0.28, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#12140F" metalness={0.3} roughness={0.15} transparent opacity={0.85} />
      </RoundedBox>

      {/* Front nose */}
      <RoundedBox args={[0.9, 0.28, 1.15]} radius={0.14} smoothness={4} position={[1.7, -0.2, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#146B3E" metalness={0.6} roughness={0.25} />
      </RoundedBox>

      {/* Rear spoiler */}
      <mesh position={[-1.45, 0.15, 0]}>
        <boxGeometry args={[0.12, 0.05, 1.05]} />
        <meshStandardMaterial color="#0A0B08" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[-1.4, -0.02, 0.42]}>
        <boxGeometry args={[0.05, 0.32, 0.05]} />
        <meshStandardMaterial color="#0A0B08" />
      </mesh>
      <mesh position={[-1.4, -0.02, -0.42]}>
        <boxGeometry args={[0.05, 0.32, 0.05]} />
        <meshStandardMaterial color="#0A0B08" />
      </mesh>

      {/* Headlights */}
      <mesh position={[2.14, -0.15, 0.35]}>
        <boxGeometry args={[0.04, 0.08, 0.28]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#3FC57F" emissiveIntensity={1} />
      </mesh>
      <mesh position={[2.14, -0.15, -0.35]}>
        <boxGeometry args={[0.04, 0.08, 0.28]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#3FC57F" emissiveIntensity={1} />
      </mesh>

      {/* Wheels */}
      <Wheel x={1.35} z={0.68} />
      <Wheel x={1.35} z={-0.68} />
      <Wheel x={-1.3} z={0.68} />
      <Wheel x={-1.3} z={-0.68} />
    </group>
  );
}
