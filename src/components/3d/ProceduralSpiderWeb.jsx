import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ProceduralSpiderWeb({ mousePos, prefersReducedMotion = false }) {
  const lineSegmentsRef = useRef();

  // Web structure definition
  const spokesCount = 18;
  const ringsCount = 9;
  const innerRadius = 0.9;
  const outerRadius = 5.8;
  const segmentsPerRingSpan = 4; // sub-segments to create smooth catenary sag

  // Generate base vertex layout for radial spokes and sagging ring spans
  const { basePositions, linePairsCount } = useMemo(() => {
    const coords = [];

    // 1. Radial Spokes
    for (let s = 0; s < spokesCount; s++) {
      const angle = (s / spokesCount) * Math.PI * 2;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      // Radial strand from innerRadius to outerRadius
      const x1 = cosA * innerRadius;
      const y1 = sinA * innerRadius;
      const z1 = 0;

      const x2 = cosA * outerRadius;
      const y2 = sinA * outerRadius;
      // Slight conical depth sag along z
      const z2 = -0.3;

      coords.push(x1, y1, z1, x2, y2, z2);
    }

    // 2. Concentric Sagging Rings
    for (let r = 1; r <= ringsCount; r++) {
      const ringFrac = r / ringsCount;
      const currentRadius = innerRadius + ringFrac * (outerRadius - innerRadius);
      const ringZ = -0.3 * ringFrac;

      for (let s = 0; s < spokesCount; s++) {
        const nextS = (s + 1) % spokesCount;
        const angleA = (s / spokesCount) * Math.PI * 2;
        const angleB = (nextS / spokesCount) * Math.PI * 2;

        // Subdivide span to create realistic spider-web sag
        for (let seg = 0; seg < segmentsPerRingSpan; seg++) {
          const t1 = seg / segmentsPerRingSpan;
          const t2 = (seg + 1) / segmentsPerRingSpan;

          // Compute angle interpolation
          const a1 = angleA + (angleB - angleA) * t1;
          const a2 = angleA + (angleB - angleA) * t2;

          // Parabolic catenary sag (dips toward center in middle of strand)
          const sag1 = Math.sin(t1 * Math.PI) * 0.12 * ringFrac;
          const sag2 = Math.sin(t2 * Math.PI) * 0.12 * ringFrac;

          const r1 = currentRadius - sag1;
          const r2 = currentRadius - sag2;

          coords.push(
            Math.cos(a1) * r1,
            Math.sin(a1) * r1,
            ringZ + sag1 * 0.4,
            Math.cos(a2) * r2,
            Math.sin(a2) * r2,
            ringZ + sag2 * 0.4
          );
        }
      }
    }

    const floatArray = new Float32Array(coords);
    return {
      basePositions: floatArray,
      linePairsCount: coords.length / 3,
    };
  }, [spokesCount, ringsCount]);

  // Working positions array for frame-by-frame mouse bending and vibration
  const currentPositions = useMemo(() => new Float32Array(basePositions), [basePositions]);

  useFrame((state) => {
    if (!lineSegmentsRef.current || prefersReducedMotion) return;

    const time = state.clock.elapsedTime;
    const mx = (mousePos.current.x * 6) || 0;
    const my = (mousePos.current.y * 4) || 0;

    const positionAttr = lineSegmentsRef.current.geometry.attributes.position;
    const posArray = positionAttr.array;

    for (let i = 0; i < basePositions.length; i += 3) {
      const bx = basePositions[i];
      const by = basePositions[i + 1];
      const bz = basePositions[i + 2];

      // Gentle organic vibration wave
      const wave = Math.sin(time * 3.5 + bx * 1.5 + by * 1.5) * 0.025;

      // Mouse attraction vector
      const dx = mx - bx;
      const dy = my - by;
      const distSq = dx * dx + dy * dy;

      // Elastic pull if within 2.5 units of cursor
      let pullX = 0;
      let pullY = 0;
      let pullZ = 0;
      if (distSq < 6.25 && distSq > 0.01) {
        const factor = Math.max(0, 1 - Math.sqrt(distSq) / 2.5) * 0.45;
        pullX = dx * factor;
        pullY = dy * factor;
        pullZ = factor * 0.25;
      }

      posArray[i] = bx + pullX;
      posArray[i + 1] = by + pullY + wave;
      posArray[i + 2] = bz + pullZ + wave * 0.5;
    }

    positionAttr.needsUpdate = true;
  });

  return (
    <lineSegments ref={lineSegmentsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={linePairsCount}
          array={currentPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#ff103f"
        transparent
        opacity={0.65}
        linewidth={1.2}
      />
    </lineSegments>
  );
}
