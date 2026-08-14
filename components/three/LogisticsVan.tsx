"use client";

import { RoundedBox, Cylinder } from "@react-three/drei";

function Wheel({ x, z }: { x: number; z: number }) {
  return (
    <Cylinder args={[0.28, 0.28, 0.22, 24]} rotation={[Math.PI / 2, 0, 0]} position={[x, -0.55, z]} castShadow>
      <meshStandardMaterial color="#12140F" roughness={0.7} />
    </Cylinder>
  );
}

export default function LogisticsVan() {
  return (
    <group position={[0, -0.15, 0]}>
      {/* Cargo box */}
      <RoundedBox args={[2.6, 1.3, 1.3]} radius={0.08} smoothness={4} position={[-0.2, 0.15, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
      </RoundedBox>
      {/* Green stripe */}
      <mesh position={[-0.2, -0.15, 0.655]}>
        <boxGeometry args={[2.62, 0.22, 0.02]} />
        <meshStandardMaterial color="#1E9E5A" />
      </mesh>
      <mesh position={[-0.2, -0.15, -0.655]}>
        <boxGeometry args={[2.62, 0.22, 0.02]} />
        <meshStandardMaterial color="#1E9E5A" />
      </mesh>

      {/* Cab */}
      <RoundedBox args={[0.9, 0.95, 1.28]} radius={0.1} smoothness={4} position={[1.55, -0.02, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#E4E7E1" roughness={0.35} />
      </RoundedBox>
      {/* Windshield */}
      <mesh position={[1.9, 0.15, 0]} rotation={[0, 0, -0.35]}>
        <boxGeometry args={[0.06, 0.5, 1.1]} />
        <meshStandardMaterial color="#12140F" transparent opacity={0.55} roughness={0.1} metalness={0.6} />
      </mesh>

      {/* Wheels */}
      <Wheel x={1.35} z={0.68} />
      <Wheel x={1.35} z={-0.68} />
      <Wheel x={-1.15} z={0.68} />
      <Wheel x={-1.15} z={-0.68} />

      {/* Headlight */}
      <mesh position={[2.0, -0.1, 0.4]}>
        <boxGeometry args={[0.05, 0.15, 0.15]} />
        <meshStandardMaterial color="#3FC57F" emissive="#3FC57F" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[2.0, -0.1, -0.4]}>
        <boxGeometry args={[0.05, 0.15, 0.15]} />
        <meshStandardMaterial color="#3FC57F" emissive="#3FC57F" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}
