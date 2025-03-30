"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Text } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import * as THREE from "three";
import { GroupProps } from "@react-three/fiber";

function WordSphere() {
  // Use the correct GroupProps type from @react-three/fiber
  const sphereRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.001;
    }
  });

  return (
    <motion.group
      ref={sphereRef}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.5, type: "spring" }}
    >
      <Sphere args={[10, 64, 64]}>
        <meshBasicMaterial wireframe color="#4a9eff" />
      </Sphere>
      {Array.from({ length: 20 }).map((_, i) => (
        <Text
          key={i}
          position={[
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
          ]}
          fontSize={1}
          color="#ffffff"
        >
          WORD
        </Text>
      ))}
    </motion.group>
  );
}

export function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas>
        <ambientLight intensity={0.5} />
        <WordSphere />
      </Canvas>
    </div>
  );
}