"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/lib/usePrefersReduceMotion";

function buildPointsFromImage(imgData: ImageData, maxPoints: number) {
    const { data, width: W, height: H } = imgData;

    const samples: Array<{ x: number; y: number; r: number; g: number; b: number; a: number }> = [];
    const step = 2;

    for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
            const i = (y * W + x) * 4;
            const r = data[i + 0];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            if (a < 60) continue;

            const br = (r + g + b) / 3;

            if (br > 245) continue;

            samples.push({ x, y, r, g, b, a });
        }
    }

    for (let i = samples.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [samples[i], samples[j]] = [samples[j], samples[i]];
    }

    const picked = samples.slice(0, Math.min(maxPoints, samples.length));

    const positions = new Float32Array(picked.length * 3);
    const colors = new Float32Array(picked.length * 3);

    for (let i = 0; i < picked.length; i++) {
        const p = picked[i];

        // normalize [-1..1]
        const nx = (p.x / W) * 2 - 1;
        const ny = -((p.y / H) * 2 - 1);

        positions[i * 3 + 0] = nx;
        positions[i * 3 + 1] = ny;
        positions[i * 3 + 2] = 0;

        colors[i * 3 + 0] = p.r / 255;
        colors[i * 3 + 1] = p.g / 255;
        colors[i * 3 + 2] = p.b / 255;
    }

    return { positions, colors };
}

function PortraitParticles({
    src,
    maxPoints = 2600,
}: {
    src: string;
    maxPoints?: number;
}) {
    const reducedMotion = usePrefersReducedMotion();
    const { viewport } = useThree();

    const geomRef = useRef<THREE.BufferGeometry>(null);
    const groupRef = useRef<THREE.Group>(null);

    const [targets, setTargets] = useState<{ positions: Float32Array; colors: Float32Array } | null>(
        null
    );

    const positionsRef = useRef<Float32Array | null>(null);
    const velocitiesRef = useRef<Float32Array | null>(null);
    const initializedRef = useRef(false);

    useEffect(() => {
        let cancelled = false;

        const img = new Image();
        img.src = src;
        img.crossOrigin = "anonymous";

        img.onload = () => {
            if (cancelled) return;

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const size = 320; 
            canvas.width = size;
            canvas.height = size;

            const aspect = img.width / img.height;
            let sx = 0,
                sy = 0,
                sw = img.width,
                sh = img.height;

            if (aspect > 1) {
                sw = img.height;
                sx = (img.width - sw) / 2;
            } else {
                sh = img.width;
                sy = (img.height - sh) / 2;
            }

            ctx.clearRect(0, 0, size, size);

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.filter = "contrast(1.25) saturate(1.05)";

            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, size, size);

            ctx.filter = "none";

            const imgData = ctx.getImageData(0, 0, size, size);
            const built = buildPointsFromImage(imgData, maxPoints);

            initializedRef.current = false;
            positionsRef.current = null;
            velocitiesRef.current = null;

            setTargets(built);
        };

        return () => {
            cancelled = true;
        };
    }, [src, maxPoints]);

    const startRef = useRef<number | null>(null);

    useFrame(({ pointer, clock }) => {
        if (!geomRef.current || !targets) return;

        if (groupRef.current) {
            groupRef.current.rotation.y = pointer.x * 0.18;
            groupRef.current.rotation.x = -pointer.y * 0.12;
        }

        if (!initializedRef.current) {
            const count = targets.positions.length / 3;

            positionsRef.current = new Float32Array(count * 3);
            velocitiesRef.current = new Float32Array(count * 3);

            for (let i = 0; i < count; i++) {
                positionsRef.current[i * 3 + 0] = (Math.random() * 2 - 1) * 2.2;
                positionsRef.current[i * 3 + 1] = (Math.random() * 2 - 1) * 1.4;
                positionsRef.current[i * 3 + 2] = (Math.random() * 2 - 1) * 0.7;
            }

            geomRef.current.setAttribute(
                "position",
                new THREE.BufferAttribute(positionsRef.current, 3).setUsage(THREE.DynamicDrawUsage)
            );
            geomRef.current.setAttribute("color", new THREE.BufferAttribute(targets.colors, 3));

            startRef.current = null;
            initializedRef.current = true;
        }

        const positions = positionsRef.current!;
        const velocities = velocitiesRef.current!;
        const targetPos = targets.positions;

        if (startRef.current === null) startRef.current = clock.getElapsedTime();
        const elapsed = clock.getElapsedTime() - startRef.current;

        // assemble progress
        const assemble = reducedMotion ? 1 : THREE.MathUtils.clamp(elapsed / 1.6, 0, 1);

        const attract = THREE.MathUtils.lerp(0.004, 0.02, assemble);
        const damping = THREE.MathUtils.lerp(0.84, 0.9, assemble);

        const count = targetPos.length / 3;

        for (let i = 0; i < count; i++) {
            const ix = i * 3;

            const dx = targetPos[ix + 0] - positions[ix + 0];
            const dy = targetPos[ix + 1] - positions[ix + 1];
            const dz = targetPos[ix + 2] - positions[ix + 2];

            const breathe = Math.sin(clock.getElapsedTime() * 1.1 + i * 0.02) * 0.0002 * assemble;

            const chaos = (1 - assemble) * 0.002;

            velocities[ix + 0] = (velocities[ix + 0] + dx * attract + (Math.random() - 0.5) * chaos) * damping;
            velocities[ix + 1] = (velocities[ix + 1] + dy * attract + (Math.random() - 0.5) * chaos) * damping;
            velocities[ix + 2] = (velocities[ix + 2] + dz * attract + (Math.random() - 0.5) * chaos) * damping;

            positions[ix + 0] += velocities[ix + 0];
            positions[ix + 1] += velocities[ix + 1] + breathe;
            positions[ix + 2] += velocities[ix + 2];
        }

        const attr = geomRef.current.getAttribute("position") as THREE.BufferAttribute;
        attr.needsUpdate = true;
    });

    const scale = Math.min(viewport.width, viewport.height) / 1.45;

    return (
        <group ref={groupRef} scale={scale}>
            <points>
                <bufferGeometry ref={geomRef} />
                <pointsMaterial
                    size={0.012}
                    sizeAttenuation
                    transparent
                    opacity={0.95}
                    vertexColors
                />
            </points>
        </group>
    );
}

export default function PortraitParticlesCanvas({ src = "/me.jpg" }: { src?: string }) {
    return (
        <Canvas
            camera={{ position: [0, 0, 2.2], fov: 42 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            dpr={[1, 1.5]}
        >
            <ambientLight intensity={1} />
            <PortraitParticles src={src} />
        </Canvas>
    );
}
