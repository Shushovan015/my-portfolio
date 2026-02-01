"use client";

import * as THREE from "three";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import { FontLoader, type FontData } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";

type Mode = "sphere" | "name" | "role" | "stack";

type ParticleMorphHeroProps = {
  className?: string;
};

function makeSpherePoints(count: number, radius = 2.2): Float32Array {
  const pts = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);

    pts[i * 3 + 0] = radius * Math.sin(phi) * Math.cos(theta);
    pts[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    pts[i * 3 + 2] = radius * Math.cos(phi);
  }

  return pts;
}

function samplePointsFromSurface(geo: THREE.BufferGeometry, count: number): Float32Array {
  const mat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(geo, mat);

  geo.computeVertexNormals();

  const sampler = new MeshSurfaceSampler(mesh).build();
  const pts = new Float32Array(count * 3);

  const p = new THREE.Vector3();
  for (let i = 0; i < count; i++) {
    sampler.sample(p);
    pts[i * 3 + 0] = p.x;
    pts[i * 3 + 1] = p.y;
    pts[i * 3 + 2] = p.z;
  }

  mat.dispose();
  mesh.geometry.dispose();

  return pts;
}

function makeMultiLineTextPointsFit(args: {
  lines: string[];
  count: number;
  targetWidth: number;
  targetHeight: number;
  lineSpacing?: number;
}): Float32Array {
  const { lines, count, targetWidth, targetHeight, lineSpacing = 1.25 } = args;

  const loader = new FontLoader();
  const font = loader.parse(helvetiker as unknown as FontData);

  const built: { geo: THREE.BufferGeometry; h: number }[] = [];

  for (const text of lines) {
    const g = new TextGeometry(text, {
      font,
      size: 120,
      depth: 10,
      curveSegments: 10,
      bevelEnabled: false,
    });

    g.computeBoundingBox();
    const bb = g.boundingBox;
    if (bb) {
      const c = new THREE.Vector3();
      bb.getCenter(c);
      g.translate(-c.x, -c.y, -c.z);

      g.computeBoundingBox();
      const bb2 = g.boundingBox!;
      const h = bb2.max.y - bb2.min.y;

      built.push({ geo: g.toNonIndexed(), h });
    } else {
      built.push({ geo: g.toNonIndexed(), h: 120 });
    }

    g.dispose();
  }

  const maxH = built.reduce((m, x) => Math.max(m, x.h), 0);
  const gap = maxH * lineSpacing;

  const mid = (lines.length - 1) / 2;
  for (let i = 0; i < built.length; i++) {
    const yOffset = (mid - i) * gap;
    built[i].geo.translate(0, yOffset, 0);
  }

  const merged = mergeGeometries(built.map((b) => b.geo), false);
  built.forEach((b) => b.geo.dispose());
  if (!merged) return new Float32Array(count * 3);

  merged.computeBoundingBox();
  if (merged.boundingBox) {
    const c = new THREE.Vector3();
    merged.boundingBox.getCenter(c);
    merged.translate(-c.x, -c.y, -c.z);
  }

  merged.computeBoundingBox();
  if (merged.boundingBox) {
    const w = merged.boundingBox.max.x - merged.boundingBox.min.x;
    const h = merged.boundingBox.max.y - merged.boundingBox.min.y;
    const s = Math.min(targetWidth / w, targetHeight / h);
    merged.scale(s, s, s);
  }

  merged.scale(1, 1, 0.08);

  const pts = samplePointsFromSurface(merged, count);
  merged.dispose();
  return pts;
}


function Particles({
  mode,
  mouse,
  onReady,
}: {
  mode: Mode;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  onReady: () => void;
}) {
  const COUNT = 14000;

  const instRef = useRef<THREE.InstancedMesh | null>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const current = useRef<Float32Array>(new Float32Array(COUNT * 3));

  const sphere = useMemo(() => makeSpherePoints(COUNT, 2.25), []);

  const [namePts, setNamePts] = useState<Float32Array | null>(null);
  const [rolePts, setRolePts] = useState<Float32Array | null>(null);
  const [stackPts, setStackPts] = useState<Float32Array | null>(null);

  useEffect(() => {
    current.current.set(sphere);

    const name = makeMultiLineTextPointsFit({
      lines: ["Shushovan", "Shakya"],
      count: COUNT,
      targetWidth: 5.6,
      targetHeight: 3.0,
      lineSpacing: 1.25,
    });

    const role = makeMultiLineTextPointsFit({
      lines: ["Frontend", "Developer"],
      count: COUNT,
      targetWidth: 5.2,
      targetHeight: 2.8,
      lineSpacing: 1.25,
    });

    const stack = makeMultiLineTextPointsFit({
      lines: ["· React · Next.js · Vue.js"],
      count: COUNT,
      targetWidth: 6.2,
      targetHeight: 1.2,
      lineSpacing: 1.0,
    });

    setNamePts(name);
    setRolePts(role);
    setStackPts(stack);
    onReady();
  }, [sphere, onReady]);

  const target = useMemo(() => {
    if (mode === "sphere") return sphere;
    if (mode === "name") return namePts ?? sphere;
    if (mode === "role") return rolePts ?? sphere;
    return stackPts ?? sphere;
  }, [mode, sphere, namePts, rolePts, stackPts]);

  useFrame((state, delta) => {
    const inst = instRef.current;
    if (!inst) return;

    const t = 1 - Math.pow(0.001, delta);
    const time = state.clock.elapsedTime;

    const mx = mouse.current.x * 0.7;
    const my = mouse.current.y * 0.7;

    const wobble =
      mode === "sphere" ? 0.03 :
        mode === "stack" ? 0.0006 :
          0.0012;

    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;

      const cx = current.current[ix];
      const cy = current.current[ix + 1];
      const cz = current.current[ix + 2];

      const tx = target[ix];
      const ty = target[ix + 1];
      const tz = target[ix + 2];

      const nx = Math.sin(time * 0.8 + i * 0.01) * wobble;
      const ny = Math.cos(time * 0.7 + i * 0.012) * wobble;

      const x = THREE.MathUtils.lerp(cx, tx, t) + nx + mx * 0.14;
      const y = THREE.MathUtils.lerp(cy, ty, t) + ny + my * 0.14;
      const z = THREE.MathUtils.lerp(cz, tz, t);

      current.current[ix] = x;
      current.current[ix + 1] = y;
      current.current[ix + 2] = z;

      const s =
        mode === "sphere" ? 0.016 :
          mode === "stack" ? 0.0135 :
            0.0145;

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    }

    inst.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={instRef} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshStandardMaterial
        color="white"
        emissive="white"
        emissiveIntensity={1.0}
        roughness={0.35}
        metalness={0.05}
      />
    </instancedMesh>
  );
}

export default function ParticleMorphHero({ className }: ParticleMorphHeroProps) {
  const [mode, setMode] = useState<Mode>("sphere");
  const [hovered, setHovered] = useState(false);
  const [ready, setReady] = useState(false);

  const mouse = useRef({ x: 0, y: 0 });
  const NAME_MS = 2800;
  const ROLE_MS = 2800;
  const STACK_MS = 6000;

  useEffect(() => {
    if (!ready) return;

    if (!hovered) {
      setMode("sphere");
      return;
    }

    setMode("name");

    const t1 = window.setTimeout(() => setMode("role"), NAME_MS);
    const t2 = window.setTimeout(() => setMode("stack"), NAME_MS + ROLE_MS);

    const t3 = window.setTimeout(
      () => {
        setMode("name");
      },
      NAME_MS + ROLE_MS + STACK_MS
    );

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [hovered, ready]);


  return (
    <div
      className={[
        "relative w-full overflow-hidden rounded-3xl border border-zinc-800/60 bg-zinc-950/40",
        className ?? "h-[360px] md:h-[520px]",
      ].join(" ")}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        mouse.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        mouse.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        mouse.current.x = 0;
        mouse.current.y = 0;
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.10),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.06),transparent_45%)]" />

      <div className="absolute inset-0">
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 8.4], fov: 40 }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 6, 3]} intensity={1.25} />
          <Particles mode={mode} mouse={mouse} onReady={() => setReady(true)} />
        </Canvas>
      </div>

      {!ready && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-xs text-zinc-400">
          Loading…
        </div>
      )}
    </div>
  );
}
