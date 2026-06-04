"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import * as THREE from "three";

// Camera rig that responds to scroll position
function CameraRig({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const { camera } = useThree();

  useFrame(() => {
    const t = scrollProgress.current;

    // Keyframed camera path: wide → push forward → side angle → pull back
    // Each keyframe covers ~0.25 of the scroll range

    if (t < 0.25) {
      // Wide establishing view — gentle drift left to right
      const p = t / 0.25;
      camera.position.set(
        THREE.MathUtils.lerp(-1.5, 0, p),
        THREE.MathUtils.lerp(0.5, 0.2, p),
        THREE.MathUtils.lerp(5, 4, p)
      );
      camera.lookAt(0, 0, 0);
    } else if (t < 0.5) {
      // Slow forward push
      const p = (t - 0.25) / 0.25;
      camera.position.set(
        THREE.MathUtils.lerp(0, 0.5, p),
        THREE.MathUtils.lerp(0.2, 0, p),
        THREE.MathUtils.lerp(4, 2.5, p)
      );
      camera.lookAt(0, 0, 0);
    } else if (t < 0.75) {
      // Side angle reveal — camera arcs from right, looking left
      const p = (t - 0.5) / 0.25;
      const angle = THREE.MathUtils.lerp(0.3, -0.3, p);
      camera.position.set(
        Math.sin(angle) * 3,
        THREE.MathUtils.lerp(0, 0.4, p),
        Math.cos(angle) * 3
      );
      camera.lookAt(0, 0, 0);
    } else {
      // Elevated overview — rise up and look down
      const p = (t - 0.75) / 0.25;
      camera.position.set(
        THREE.MathUtils.lerp(-0.3 * Math.PI, 0, p) * 0.1,
        THREE.MathUtils.lerp(0.4, 2.5, p),
        THREE.MathUtils.lerp(3, 4, p)
      );
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

// Architectural 3D environment — abstract planes suggesting a luxury interior
function ArchitecturalScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.05) * 0.03;
    }
  });

  const floorMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#1a1815"),
    roughness: 0.8,
    metalness: 0.05,
  });

  const wallMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#141210"),
    roughness: 0.9,
    metalness: 0,
  });

  const accentMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#C8A96E"),
    roughness: 0.3,
    metalness: 0.7,
    emissive: new THREE.Color("#4a3a1a"),
    emissiveIntensity: 0.3,
  });

  return (
    <group ref={groupRef}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} material={floorMat}>
        <planeGeometry args={[20, 20]} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 1, -4]} material={wallMat}>
        <planeGeometry args={[20, 8]} />
      </mesh>

      {/* Left wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-6, 1, 0]} material={wallMat}>
        <planeGeometry args={[20, 8]} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3, 0]} material={wallMat}>
        <planeGeometry args={[20, 20]} />
      </mesh>

      {/* Gold accent strip on wall */}
      <mesh position={[0, 0, -3.95]}>
        <boxGeometry args={[8, 0.02, 0.01]} />
        <primitive object={accentMat} attach="material" />
      </mesh>

      {/* Abstract architectural columns */}
      {[-3, 0, 3].map((x, i) => (
        <mesh key={i} position={[x, 0, -2]}>
          <boxGeometry args={[0.04, 4, 0.04]} />
          <primitive object={accentMat} attach="material" />
        </mesh>
      ))}

      {/* Floating horizontal planes (suggest shelving/architecture) */}
      {[0.5, 1.5].map((y, i) => (
        <mesh key={i} position={[-2, y, -3]} rotation={[0, 0.1, 0]}>
          <boxGeometry args={[3, 0.015, 0.4]} />
          <meshStandardMaterial
            color="#1e1c19"
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.15} color="#ffe8cc" />
      <directionalLight
        position={[5, 8, 3]}
        intensity={1.2}
        color="#fff5e8"
        castShadow
      />
      <pointLight position={[-3, 2, 1]} intensity={0.8} color="#C8A96E" />
      <pointLight position={[3, 4, -2]} intensity={0.4} color="#ffffff" />
      <spotLight
        position={[0, 5, 2]}
        angle={0.3}
        penumbra={0.8}
        intensity={1.5}
        color="#fff8f0"
        target-position={[0, 0, 0]}
      />
    </>
  );
}

export default function CinematicScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Keep a mutable ref in sync with framer-motion's scroll value
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      scrollProgress.current = v;
    });
  }, [scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full"
      style={{ height: "300vh" }}
    >
      {/* Sticky canvas container */}
      <div className="sticky top-0 w-full h-screen">
        <Canvas
          camera={{ position: [-1.5, 0.5, 5], fov: 50 }}
          gl={{ antialias: true, alpha: false }}
          shadows
          style={{ background: "#0A0A09" }}
        >
          <Lighting />
          <ArchitecturalScene />
          <CameraRig scrollProgress={scrollProgress} />
        </Canvas>

        {/* Overlay text that appears at different scroll stages */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15, 0.35, 0.5], [0, 1, 1, 0]) }}
          className="absolute bottom-20 left-10 md:left-20 z-10 max-w-sm"
        >
          <p className="text-gold text-xs tracking-[0.35em] uppercase mb-3 font-light">
            Curated Living
          </p>
          <p
            className="text-warm-100 text-3xl md:text-4xl font-light leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Spaces Designed
            <br />
            <em>for Intention</em>
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0.45, 0.6, 0.75, 0.85], [0, 1, 1, 0]) }}
          className="absolute bottom-20 right-10 md:right-20 z-10 max-w-sm text-right"
        >
          <p className="text-gold text-xs tracking-[0.35em] uppercase mb-3 font-light">
            Every Detail
          </p>
          <p
            className="text-warm-100 text-3xl md:text-4xl font-light leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Architecture
            <br />
            <em>as Experience</em>
          </p>
        </motion.div>

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-obsidian to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
