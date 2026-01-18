"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/lib/usePrefersReduceMotion";

type Node = {
    position: THREE.Vector3;
    velocity: THREE.Vector3;
};

function Constellation({
    count = 70,
    radius = 1.8,
    maxLinks = 2,
}: {
    count?: number;
    radius?: number;
    maxLinks?: number;
}) {
    const reducedMotion = usePrefersReducedMotion();
    const pointsRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);

    const { viewport } = useThree();

    const pointer = useRef(new THREE.Vector2(0, 0));

    const nodes = useMemo<Node[]>(() => {
        const arr: Node[] = [];
        for (let i = 0; i < count; i++) {
            const p = new THREE.Vector3(
                (Math.random() * 2 - 1) * radius,
                (Math.random() * 2 - 1) * radius,
                (Math.random() * 2 - 1) * 0.7
            );

            const v = new THREE.Vector3(
                (Math.random() * 2 - 1) * 0.002,
                (Math.random() * 2 - 1) * 0.002,
                (Math.random() * 2 - 1) * 0.001
            );

            arr.push({ position: p, velocity: v });
        }
        return arr;
    }, [count, radius]);

    const pointsPositions = useMemo(() => new Float32Array(count * 3), [count]);

    const maxSegments = useMemo(() => count * maxLinks, [count, maxLinks]);
    const linePositions = useMemo(() => new Float32Array(maxSegments * 2 * 3), [maxSegments]);

    const lineGeom = useMemo(() => new THREE.BufferGeometry(), []);
    const pointsGeom = useMemo(() => new THREE.BufferGeometry(), []);

    useMemo(() => {
        pointsGeom.setAttribute("position", new THREE.BufferAttribute(pointsPositions, 3));
        lineGeom.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    }, [pointsGeom, lineGeom, pointsPositions, linePositions]);

    useFrame(({ pointer: p }) => {
        pointer.current.set(p.x, p.y);
    });

    useFrame(() => {
        const parallaxX = pointer.current.x * 0.15;
        const parallaxY = pointer.current.y * 0.15;

        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];

            if (!reducedMotion) {
                n.position.add(n.velocity);

                if (Math.abs(n.position.x) > radius) n.velocity.x *= -1;
                if (Math.abs(n.position.y) > radius) n.velocity.y *= -1;
                if (Math.abs(n.position.z) > 0.8) n.velocity.z *= -1;
            }

            pointsPositions[i * 3 + 0] = n.position.x + parallaxX;
            pointsPositions[i * 3 + 1] = n.position.y + parallaxY;
            pointsPositions[i * 3 + 2] = n.position.z;
        }

        let seg = 0;
        const threshold = 0.55;

        for (let i = 0; i < nodes.length; i++) {
            let bestA = -1;
            let bestB = -1;
            let distA = Infinity;
            let distB = Infinity;

            const pi = nodes[i].position;

            for (let j = i + 1; j < nodes.length; j++) {
                const pj = nodes[j].position;
                const d = pi.distanceTo(pj);

                if (d < distA) {
                    distB = distA;
                    bestB = bestA;
                    distA = d;
                    bestA = j;
                } else if (d < distB) {
                    distB = d;
                    bestB = j;
                }
            }

            const linkCandidates = [bestA, bestB].filter((x) => x !== -1) as number[];

            for (const j of linkCandidates) {
                if (seg >= maxSegments) break;

                const pj = nodes[j].position;
                const d = pi.distanceTo(pj);
                if (d > threshold) continue;

                linePositions[seg * 6 + 0] = pi.x + parallaxX;
                linePositions[seg * 6 + 1] = pi.y + parallaxY;
                linePositions[seg * 6 + 2] = pi.z;

                linePositions[seg * 6 + 3] = pj.x + parallaxX;
                linePositions[seg * 6 + 4] = pj.y + parallaxY;
                linePositions[seg * 6 + 5] = pj.z;

                seg++;
            }
        }

        for (let k = seg; k < maxSegments; k++) {
            linePositions[k * 6 + 0] = 0;
            linePositions[k * 6 + 1] = 0;
            linePositions[k * 6 + 2] = 0;
            linePositions[k * 6 + 3] = 0;
            linePositions[k * 6 + 4] = 0;
            linePositions[k * 6 + 5] = 0;
        }

        (pointsGeom.attributes.position as THREE.BufferAttribute).needsUpdate = true;
        (lineGeom.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    });

    return (
        <group scale={Math.min(viewport.width, viewport.height) / 3.2}>
            <lineSegments ref={linesRef} geometry={lineGeom}>
                <lineBasicMaterial transparent opacity={0.35} />
            </lineSegments>

            <points ref={pointsRef} geometry={pointsGeom}>
                <pointsMaterial size={0.03} sizeAttenuation transparent opacity={0.9} />
            </points>
        </group>
    );
}

export default function SkillsConstellationCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 3.2], fov: 50 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            dpr={[1, 1.5]}
        >
            <ambientLight intensity={0.7} />
            <Constellation />
        </Canvas>
    );
}
