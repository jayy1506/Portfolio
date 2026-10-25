import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { NeuralTensorCore } from './NeuralTensorCore';
import { FloatingDust } from './FloatingDust';

function CameraAndSceneRig({ mousePos, scrollProgress, prefersReducedMotion, isMobile }) {
  const sceneGroupRef = useRef();
  const { camera } = useThree();

  const targetCamZ = useRef(7.2);
  const targetRotX = useRef(0);
  const targetRotY = useRef(0);

  useFrame((state, delta) => {
    const mx = mousePos.current.x || 0;
    const my = mousePos.current.y || 0;

    if (!prefersReducedMotion) {
      targetRotX.current = THREE.MathUtils.lerp(targetRotX.current, -my * 0.22, delta * 3.0);
      targetRotY.current = THREE.MathUtils.lerp(targetRotY.current, mx * 0.3, delta * 3.0);

      // Camera position adapts to scroll
      const flythroughZ = 7.2 - scrollProgress * 2.5;
      targetCamZ.current = THREE.MathUtils.lerp(targetCamZ.current, flythroughZ, delta * 3.5);

      camera.position.z = targetCamZ.current;
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, mx * 0.45, delta * 2.0);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, my * 0.3 - scrollProgress * 1.2, delta * 2.0);

      if (sceneGroupRef.current) {
        sceneGroupRef.current.rotation.x = targetRotX.current;
        sceneGroupRef.current.rotation.y = targetRotY.current;
      }
    }
  });

  return (
    <group ref={sceneGroupRef} position={[0, 0.1, -1.0]} scale={isMobile ? 0.75 : 0.95}>
      <NeuralTensorCore scrollProgress={scrollProgress} isMobile={isMobile} />
      <FloatingDust count={isMobile ? 80 : 200} isMobile={isMobile} />
    </group>
  );
}

export function SceneContainer({ mousePos, scrollProgress = 0, prefersReducedMotion = false, isMobile = false }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 46, near: 0.1, far: 50 }}
        dpr={Math.min(window.devicePixelRatio || 1, 2)}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        <color attach="background" args={["#06080e"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#38bdf8" />

        <Suspense fallback={null}>
          <CameraAndSceneRig
            mousePos={mousePos}
            scrollProgress={scrollProgress}
            prefersReducedMotion={prefersReducedMotion}
            isMobile={isMobile}
          />

          {!isMobile && !prefersReducedMotion && (
            <EffectComposer multisampling={0}>
              <Bloom
                intensity={0.65}
                luminanceThreshold={0.5}
                luminanceSmoothing={0.75}
                mipmapBlur
              />
              <Vignette eskil={false} offset={0.2} darkness={0.85} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
