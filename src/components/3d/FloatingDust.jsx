import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FloatingDust({ count = 280, isMobile = false }) {
  const pointsRef = useRef();
  const actualCount = isMobile ? Math.min(count, 80) : count;

  const [positions, colors, scales, speeds] = useMemo(() => {
    const pos = new Float32Array(actualCount * 3);
    const col = new Float32Array(actualCount * 3);
    const scl = new Float32Array(actualCount);
    const spd = new Float32Array(actualCount);

    const palette = [
      new THREE.Color('#38bdf8'), // electric cyan
      new THREE.Color('#818cf8'), // soft indigo
      new THREE.Color('#34d399'), // emerald
      new THREE.Color('#ffffff'), // pure star white
    ];

    for (let i = 0; i < actualCount; i++) {
      // Cylindrical distribution around reactor & web
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.5 + Math.random() * 6.5;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4.0;

      const chosenColor = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;

      scl[i] = Math.random() * 0.04 + 0.015;
      spd[i] = Math.random() * 0.4 + 0.2;
    }

    return [pos, col, scl, spd];
  }, [actualCount]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < actualCount; i++) {
      // Gentle swirling motion with vertical buoyancy
      const idx = i * 3;
      pos[idx + 1] += Math.sin(time * speeds[i] + i) * 0.003;
      pos[idx] += Math.cos(time * speeds[i] * 0.8 + i) * 0.002;
      pos[idx + 2] += Math.sin(time * 0.5 + i) * 0.001;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={actualCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={actualCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
