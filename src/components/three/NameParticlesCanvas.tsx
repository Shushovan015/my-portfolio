"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/lib/usePrefersReduceMotion";

type ParticlesProps = {
    text: string;
    subtext?: string;
};

function sampleTextPoints(text: string, subtext?: string) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return [];

    const W = 900;
    const H = 360;
    canvas.width = W;
    canvas.height = H;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = "700 110px system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial";
    ctx.fillText(text, W / 2, H / 2 - (subtext ? 30 : 0));

    if (subtext) {
        ctx.font = "500 32px system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial";
        ctx.globalAlpha = 0.8;
        ctx.fillText(subtext, W / 2, H / 2 + 70);
        ctx.globalAlpha = 1;
    }

    const img = ctx.getImageData(0, 0, W, H).data;

    const points: Array<[number, number]> = [];
    const step = 5; 
    for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
            const i = (y * W + x) * 4;
            const r = img[i]; 
            if (r > 200) points.push([x, y]);
        }
    }

    const centered = points.map(([x, y]) => {
        const nx = (x / W) * 2 - 1;
        const ny = -((y / H) * 2 - 1);
        return new THREE.Vector3(nx, ny, 0);
    });

    return centered;
}

function NameParticles({ text, subtext }: ParticlesProps) {
    const reducedMotion = usePrefersReducedMotion();
    const { viewport } = useThree();

    const groupRef = useRef<THREE.Group>(null);
    const geomRef = useRef<THREE.BufferGeometry>(null);

    const targetPoints = useMemo(() => {
        return sampleTextPoints(text, subtext);
    }, [text, subtext]);

    const count = Math.min(targetPoints.length, 1800);

    const { positions, targets, velocities } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const tgt = new Float32Array(count * 3);
        const vel = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            pos[i * 3 + 0] = (Math.random() * 2 - 1) * 2.2;
            pos[i * 3 + 1] = (Math.random() * 2 - 1) * 1.2;
            pos[i * 3 + 2] = (Math.random() * 2 - 1) * 0.6;

            const p = targetPoints[i] ?? new THREE.Vector3(0, 0, 0);
            tgt[i * 3 + 0] = p.x;
            tgt[i * 3 + 1] = p.y;
            tgt[i * 3 + 2] = p.z;

            vel[i * 3 + 0] = 0;
            vel[i * 3 + 1] = 0;
            vel[i * 3 + 2] = 0;
        }

        return { positions: pos, targets: tgt, velocities: vel };
    }, [count, targetPoints]);

    const pointer = useRef(new THREE.Vector2(0, 0));

    useFrame(({ pointer: p, clock }) => {
        pointer.current.set(p.x, p.y);

        if (!groupRef.current || !geomRef.current) return;

        groupRef.current.rotation.y = pointer.current.x * 0.18;
        groupRef.current.rotation.x = -pointer.current.y * 0.12;

        if (reducedMotion) {
            const snap = 0.08;
            for (let i = 0; i < count; i++) {
                const ix = i * 3;
                positions[ix + 0] = THREE.MathUtils.lerp(positions[ix + 0], targets[ix + 0], snap);
                positions[ix + 1] = THREE.MathUtils.lerp(positions[ix + 1], targets[ix + 1], snap);
                positions[ix + 2] = THREE.MathUtils.lerp(positions[ix + 2], targets[ix + 2], snap);
            }
        } else {
            const t = clock.getElapsedTime();
            const attract = 0.018;
            const damping = 0.88;

            for (let i = 0; i < count; i++) {
                const ix = i * 3;

                const dx = targets[ix + 0] - positions[ix + 0];
                const dy = targets[ix + 1] - positions[ix + 1];
                const dz = targets[ix + 2] - positions[ix + 2];

                const wobble = Math.sin(t * 1.5 + i * 0.02) * 0.0008;

                velocities[ix + 0] = (velocities[ix + 0] + dx * attract) * damping;
                velocities[ix + 1] = (velocities[ix + 1] + dy * attract) * damping;
                velocities[ix + 2] = (velocities[ix + 2] + dz * attract) * damping;

                positions[ix + 0] += velocities[ix + 0];
                positions[ix + 1] += velocities[ix + 1] + wobble;
                positions[ix + 2] += velocities[ix + 2];
            }
        }

        const attr = geomRef.current.getAttribute("position") as THREE.BufferAttribute;
        attr.needsUpdate = true;
    });

    const scale = Math.min(viewport.width, 12) / 6.5;

    return (
        <group ref={groupRef} scale={scale}>
            <points>
                <bufferGeometry ref={geomRef}>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />

                </bufferGeometry>
                <pointsMaterial size={0.02} sizeAttenuation transparent opacity={0.95} />
            </points>
        </group>
    );
}

export default function NameParticlesCanvas({
    text,
    subtext,
}: {
    text: string;
    subtext?: string;
}) {
    return (
        <Canvas
            camera={{ position: [0, 0, 3.2], fov: 45 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            dpr={[1, 1.5]}
        >
            <ambientLight intensity={1} />
            <NameParticles text={text} subtext={subtext} />
        </Canvas>
    );
}