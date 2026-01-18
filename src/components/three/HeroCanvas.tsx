"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial, Sphere } from "@react-three/drei";
import { usePrefersReducedMotion } from "@/lib/usePrefersReduceMotion";
import { useScrollProgress } from "@/lib/useScrollProgress";
import { useRef } from "react";
import type { Mesh } from "three";

function GlassOrb({ scroll }: { scroll: number }) {
    const meshRef = useRef<Mesh>(null);
    const reducedMotion = usePrefersReducedMotion();

    useFrame((state) => {
        if (reducedMotion) return;

        const t = state.clock.getElapsedTime();
        if (!meshRef.current) return;

        // idle motion
        meshRef.current.rotation.y = t * 0.35;
        meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;

        // scroll parallax (very subtle)
        meshRef.current.position.y = (scroll - 0.5) * -0.6;
    });



    return (
        <Sphere ref={meshRef} args={[1.1, 96, 96]}>
            <MeshTransmissionMaterial
                thickness={0.25}
                roughness={0.08}
                transmission={1}
                ior={1.2}
                chromaticAberration={0.02}
                distortion={0.2}
                distortionScale={0.2}
                temporalDistortion={0.08}
            />
        </Sphere>
    );
}

export default function HeroCanvas() {
    const scroll = useScrollProgress();

    return (
        <Canvas
            camera={{ position: [0, 0, 3.2], fov: 45 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            dpr={[1, 1.5]}
        >
            <ambientLight intensity={0.35} />
            <directionalLight position={[3, 3, 3]} intensity={1.2} />
            <GlassOrb scroll={scroll} />
            <Environment preset="city" />
        </Canvas>
    );
}
