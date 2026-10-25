import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ArcReactorCore({ scrollProgress = 0, isMobile = false }) {
  const groupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const innerCoreRef = useRef();
  const outerTicksRef = useRef();

  // Tick marks geometry & positions for outer ring
  const tickCount = 28;
  const tickData = useMemo(() => {
    const items = [];
    const radius = 2.45;
    for (let i = 0; i < tickCount; i++) {
      const angle = (i / tickCount) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      items.push({ x, y, angle });
    }
    return items;
  }, []);

  useFrame((state, delta) => {
    const speedBoost = 1 + scrollProgress * 1.8;

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.5 * speedBoost;
      ring1Ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.75 * speedBoost;
      ring2Ref.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.4) * 0.25;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x += delta * 0.6 * speedBoost;
      ring3Ref.current.rotation.y += delta * 0.8 * speedBoost;
    }
    if (outerTicksRef.current) {
      outerTicksRef.current.rotation.z += delta * 0.25 * speedBoost;
    }
    if (innerCoreRef.current) {
      // Intense spider-heartbeat pulse
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 4.5) * 0.12;
      innerCoreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Radiant White-Hot Energy Core */}
      <mesh ref={innerCoreRef}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Primary Crimson Spider-Energy Plasma Halo */}
      <mesh>
        <sphereGeometry args={[0.78, 32, 32]} />
        <meshStandardMaterial
          color="#ff0f3b"
          emissive="#ff0f3b"
          emissiveIntensity={3.2}
          transparent
          opacity={0.8}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Obsidian Black & Gold Hexagonal Reactor Geodesic Lattice */}
      <mesh>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshStandardMaterial
          color="#f5b83d"
          emissive="#f5b83d"
          emissiveIntensity={1.8}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Ring 1 - Outermost Torus (Matte Obsidian Black with Crimson Edge) */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[2.45, 0.045, 16, 64]} />
          <meshStandardMaterial
            color="#0d0f17"
            emissive="#ff0f3b"
            emissiveIntensity={0.8}
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>
      </group>

      {/* Outer Rotating Ticks (Spider-Suit & Stark Tech notches) */}
      <group ref={outerTicksRef}>
        {tickData.map((tick, i) => (
          <mesh
            key={i}
            position={[tick.x, tick.y, 0]}
            rotation={[0, 0, tick.angle]}
          >
            <boxGeometry args={[0.16, 0.03, 0.05]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#ff0f3b" : "#f5b83d"}
              emissive={i % 2 === 0 ? "#ff0f3b" : "#f5b83d"}
              emissiveIntensity={2.0}
            />
          </mesh>
        ))}
      </group>

      {/* Ring 2 - Middle Torus (Scarlet Crimson) with counter-rotation */}
      <group ref={ring2Ref} rotation={[0.45, 0.25, 0]}>
        <mesh>
          <torusGeometry args={[1.8, 0.036, 16, 64]} />
          <meshStandardMaterial
            color="#ff0f3b"
            emissive="#ff0f3b"
            emissiveIntensity={1.9}
            metalness={0.85}
            roughness={0.2}
          />
        </mesh>
        {/* Stark nanotech bracket notches */}
        {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, idx) => (
          <mesh
            key={idx}
            position={[Math.cos(angle) * 1.8, Math.sin(angle) * 1.8, 0]}
            rotation={[0, 0, angle]}
          >
            <boxGeometry args={[0.22, 0.06, 0.06]} />
            <meshStandardMaterial
              color="#f5b83d"
              emissive="#f5b83d"
              emissiveIntensity={2.0}
            />
          </mesh>
        ))}
      </group>

      {/* Ring 3 - Inner Torus (Iron-Spider Gold & Crimson) */}
      <group ref={ring3Ref} rotation={[-0.35, 0.55, 0]}>
        <mesh>
          <torusGeometry args={[1.25, 0.03, 16, 48]} />
          <meshStandardMaterial
            color="#f5b83d"
            emissive="#ff0f3b"
            emissiveIntensity={1.8}
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>
      </group>

      {/* Point Lights casting true red & gold illumination */}
      <pointLight color="#ff0f3b" intensity={6} distance={14} decay={2} />
      <pointLight color="#f5b83d" intensity={3.5} distance={10} decay={2} />
      <pointLight color="#ffffff" intensity={2} distance={5} decay={2} />
    </group>
  );
}
