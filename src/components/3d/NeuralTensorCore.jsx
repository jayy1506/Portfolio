import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function NeuralTensorCore({ scrollProgress = 0, isMobile = false }) {
  const groupRef = useRef();
  const innerCoreRef = useRef();
  const outerCageRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const nodesRef = useRef();

  // Create orbiting neural node positions
  const nodeCount = isMobile ? 36 : 72;
  const [nodePositions, nodeScales] = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const scl = new Float32Array(nodeCount);
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 2.4 + (i % 3) * 0.25;

      pos[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      pos[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.cos(phi);
      scl[i] = 0.04 + (i % 4) * 0.015;
    }
    return [pos, scl];
  }, [nodeCount]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // Smooth overall core rotation influenced by time and page scroll
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.15 + scrollProgress * Math.PI * 1.5;
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.15 + scrollProgress * 0.4;
    }

    // Inner faceted crystal rotation
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y = -time * 0.35;
      innerCoreRef.current.rotation.z = time * 0.25;
      const pulse = 1 + Math.sin(time * 2.5) * 0.06;
      innerCoreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Outer lattice counter-rotation
    if (outerCageRef.current) {
      outerCageRef.current.rotation.x = time * 0.12;
      outerCageRef.current.rotation.y = time * 0.18;
    }

    // Concentric tensor gimbal rings rotating on unique axes
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.4;
      ring1Ref.current.rotation.y = time * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.35;
      ring2Ref.current.rotation.z = time * 0.25;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * 0.3;
      ring3Ref.current.rotation.x = -time * 0.25;
    }

    // Neural nodes orbital drift
    if (nodesRef.current) {
      nodesRef.current.rotation.y = time * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Luminous Point Lights */}
      <pointLight color="#38bdf8" intensity={2.8} distance={8} decay={2} />
      <pointLight color="#818cf8" intensity={2.0} distance={10} decay={2} position={[0, 0, 0]} />

      {/* 1. Inner Crystalline Icosahedron Core */}
      <mesh ref={innerCoreRef}>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.65}
          roughness={0.15}
          metalness={0.85}
          wireframe={false}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* 2. Inner Glowing Wireframe Core */}
      <mesh scale={1.05}>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshBasicMaterial
          color="#7dd3fc"
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* 3. Outer Geometric Wireframe Lattice Cage */}
      <mesh ref={outerCageRef}>
        <octahedronGeometry args={[1.75, 2]} />
        <meshStandardMaterial
          color="#818cf8"
          wireframe
          emissive="#4f46e5"
          emissiveIntensity={0.3}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* 4. Tensor Ring 1 (Electric Cyan Torus) */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[2.0, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        {/* Ring marker node */}
        <mesh position={[2.0, 0, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* 5. Tensor Ring 2 (Indigo Torus) */}
      <group ref={ring2Ref}>
        <mesh>
          <torusGeometry args={[2.3, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#818cf8"
            emissive="#4f46e5"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        <mesh position={[0, 2.3, 0]}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshBasicMaterial color="#7dd3fc" />
        </mesh>
      </group>

      {/* 6. Tensor Ring 3 (Outer Data Torus) */}
      <group ref={ring3Ref}>
        <mesh>
          <torusGeometry args={[2.6, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#34d399"
            emissive="#059669"
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.7}
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh position={[0, 0, 2.6]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#34d399" />
        </mesh>
      </group>

      {/* 7. Neural Node Swarm (PointCloud) */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodeCount}
            array={nodePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          color="#38bdf8"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
