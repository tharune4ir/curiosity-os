"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function RotatingCore() {
    const meshRef = useRef<THREE.Mesh>(null);

    // Slowed down to feel majestic and massive
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.05;
            meshRef.current.rotation.y += delta * 0.08;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <mesh ref={meshRef} position={[0, 0, -5]}>
                {/* Massive scale */}
                <torusKnotGeometry args={[9, 2.5, 300, 64]} />
                <meshBasicMaterial
                    color="#00F0FF"
                    wireframe={true}
                    transparent={true}
                    opacity={0.25}
                />
            </mesh>
        </Float>
    );
}

export default function NeuralCore3D() {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <Canvas camera={{ position: [0, 0, 25], fov: 45 }}>
                <RotatingCore />
            </Canvas>
        </div>
    );
}
