"use client";

import { RoundedBox } from "@react-three/drei";

function Window({ x, y, z }: { x: number; y: number; z: number }) {
  return (
    <mesh position={[x, y, z]}>
      <boxGeometry args={[0.22, 0.22, 0.02]} />
      <meshStandardMaterial color="#3FC57F" emissive="#1E9E5A" emissiveIntensity={0.6} />
    </mesh>
  );
}

export default function PropertyBuilding() {
  const floors = 5;
  const windowsPerFloor = 3;

  const windows = [];
  for (let f = 0; f < floors; f++) {
    for (let w = 0; w < windowsPerFloor; w++) {
      windows.push(
        <Window
          key={`f${f}w${w}front`}
          x={-0.5 + w * 0.5}
          y={-1.1 + f * 0.5}
          z={0.61}
        />
      );
      windows.push(
        <Window
          key={`f${f}w${w}right`}
          x={0.61}
          y={-1.1 + f * 0.5}
          z={-0.5 + w * 0.5}
        />
      );
    }
  }

  return (
    <group position={[0, -0.3, 0]}>
      {/* Main tower */}
      <RoundedBox args={[1.2, 2.6, 1.2]} radius={0.03} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#FFFFFF" roughness={0.6} metalness={0.05} />
      </RoundedBox>
      {windows}

      {/* Smaller adjacent block */}
      <RoundedBox args={[0.8, 1.6, 0.8]} radius={0.03} position={[1.1, -0.5, 0.3]} castShadow receiveShadow>
        <meshStandardMaterial color="#E4E7E1" roughness={0.65} />
      </RoundedBox>

      {/* Rooftop garden accent */}
      <mesh position={[0, 1.32, 0]}>
        <boxGeometry args={[1.1, 0.06, 1.1]} />
        <meshStandardMaterial color="#1E9E5A" />
      </mesh>

      {/* Base plaza */}
      <mesh position={[0.2, -1.62, 0.1]} receiveShadow>
        <boxGeometry args={[2.6, 0.1, 2.2]} />
        <meshStandardMaterial color="#F4F5F3" roughness={0.9} />
      </mesh>
    </group>
  );
}
