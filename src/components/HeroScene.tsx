"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";

/**
 * Lightweight R3F accent for the Hero: a single wireframe icosahedron,
 * gently floating/rotating. No HDR/environment maps or postprocessing —
 * kept intentionally cheap since it renders behind the fold on every load.
 */
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 35 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 3, 3]} intensity={1.4} color="#c6a15b" />
      <Suspense fallback={null}>
        <Float speed={1.4} rotationIntensity={1.1} floatIntensity={1.6}>
          <mesh>
            <icosahedronGeometry args={[1.3, 0]} />
            <meshStandardMaterial color="#c6a15b" wireframe />
          </mesh>
        </Float>
      </Suspense>
    </Canvas>
  );
}
