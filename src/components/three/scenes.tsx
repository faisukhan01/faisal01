'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, MeshTransmissionMaterial, Sparkles, Icosahedron, Torus, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Premium SaaS 3D Hero Scene
 *
 * Concept: a "connected finance ecosystem" represented as a network of
 * floating nodes (lenders / OEMs / dealers / fleets) connected by glowing
 * lines, with glass-like geometric shapes orbiting around a central core.
 *
 * Visual language: deep blue gradient backdrop, translucent glass torus,
 * metallic icosahedron, particle field, and a slow-rotating wireframe
 * sphere — the kind of 3D you'd see on a top-tier FinTech SaaS homepage.
 */

// Floating glass shapes - the "premium SaaS" aesthetic
function FloatingShapes() {
  return (
    <group>
      <Float speed={1.4} rotationIntensity={1.1} floatIntensity={1.4}>
        <mesh position={[-2.2, 0.5, 0]} scale={0.9}>
          <icosahedronGeometry args={[1, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={6}
            thickness={0.8}
            chromaticAberration={0.08}
            anisotropicBlur={0.1}
            distortion={0.2}
            distortionScale={0.4}
            temporalDistortion={0.1}
            color="#1d81f2"
            roughness={0.15}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={1.6} floatIntensity={2.2}>
        <mesh position={[2.4, -0.4, -0.6]} scale={0.55} rotation={[0.4, 0.6, 0]}>
          <torusGeometry args={[1, 0.32, 24, 64]} />
          <meshStandardMaterial
            color="#0f62fe"
            metalness={0.9}
            roughness={0.18}
            envMapIntensity={1.4}
          />
        </mesh>
      </Float>

      <Float speed={1.7} rotationIntensity={1.2} floatIntensity={1.6}>
        <mesh position={[1.7, 1.2, -1.2]} scale={0.4} rotation={[0.6, 0.2, 0]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#24a148" metalness={0.6} roughness={0.25} />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.9} floatIntensity={1.1}>
        <mesh position={[-2.6, -1.3, -0.8]} scale={0.45} rotation={[0.1, 0.4, 0]}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#56ccf2" metalness={0.7} roughness={0.2} />
        </mesh>
      </Float>
    </group>
  );
}

// Network of nodes (lenders / OEMs / dealers / fleets) - the AI ecosystem
function NodeNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = useMemo(() => {
    const arr: { pos: THREE.Vector3; size: number; color: string }[] = [];
    const count = 14;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 2.6 + Math.sin(i) * 0.25;
      arr.push({
        pos: new THREE.Vector3(
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(phi) * 0.7,
          r * Math.cos(theta) * Math.cos(phi) * 0.8
        ),
        size: 0.06 + Math.random() * 0.05,
        color: i % 3 === 0 ? '#1d81f2' : i % 3 === 1 ? '#56ccf2' : '#24a148',
      });
    }
    return arr;
  }, []);

  // Lines connecting nearby nodes
  const lines = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = nodes[i].pos.distanceTo(nodes[j].pos);
        if (d < 2.4) {
          positions.push(...nodes[i].pos.toArray(), ...nodes[j].pos.toArray());
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [nodes]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <sphereGeometry args={[n.size, 24, 24]} />
          <meshStandardMaterial
            color={n.color}
            emissive={n.color}
            emissiveIntensity={0.7}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
      ))}
      <line geometry={lines}>
        <lineBasicMaterial color="#1d81f2" transparent opacity={0.32} />
      </line>
    </group>
  );
}

// Wireframe sphere (the "data mesh")
function WireSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.12;
      ref.current.rotation.z += delta * 0.03;
    }
  });
  return (
    <mesh ref={ref} scale={1.05}>
      <sphereGeometry args={[1, 24, 16]} />
      <meshBasicMaterial color="#1d81f2" wireframe transparent opacity={0.12} />
    </mesh>
  );
}

// Soft particle field
function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#56ccf2"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function HeroScene3D() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 6, 5]} intensity={1.4} color="#ffffff" />
        <directionalLight position={[-4, -2, -3]} intensity={0.5} color="#1d81f2" />
        <pointLight position={[0, 0, 3]} intensity={0.6} color="#56ccf2" />

        <FloatingShapes />
        <NodeNetwork />
        <WireSphere />
        <Sparkles
          count={48}
          scale={8}
          size={1.4}
          speed={0.3}
          opacity={0.5}
          color="#1d81f2"
        />
        <ParticleField />

        <ContactShadows
          position={[0, -2.2, 0]}
          opacity={0.25}
          scale={10}
          blur={2.4}
          far={4}
          color="#0f62fe"
        />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}

// === Newsletter 3D scene — a stylised rotating car-like mesh ===
function FloatingMeshCar() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.5;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.12;
    }
  });
  return (
    <group ref={ref} position={[0, 0, 0]} scale={0.9}>
      {/* Body */}
      <RoundedBox args={[2.4, 0.6, 1.1]} radius={0.18} smoothness={6} position={[0, 0.15, 0]}>
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.65}
          roughness={0.18}
          envMapIntensity={1.5}
        />
      </RoundedBox>
      {/* Cabin */}
      <RoundedBox args={[1.4, 0.5, 0.95]} radius={0.14} smoothness={6} position={[-0.1, 0.55, 0]}>
        <meshStandardMaterial
          color="#1d81f2"
          metalness={0.85}
          roughness={0.12}
          envMapIntensity={1.6}
        />
      </RoundedBox>
      {/* Wheels */}
      {[
        [-0.85, -0.18, 0.55],
        [0.85, -0.18, 0.55],
        [-0.85, -0.18, -0.55],
        [0.85, -0.18, -0.55],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.18, 24]} />
          <meshStandardMaterial color="#1f2124" metalness={0.4} roughness={0.4} />
        </mesh>
      ))}
      {/* Glowing accent line */}
      <mesh position={[0, 0.1, 0.56]}>
        <boxGeometry args={[1.8, 0.04, 0.02]} />
        <meshStandardMaterial color="#56ccf2" emissive="#56ccf2" emissiveIntensity={1.4} />
      </mesh>
      <mesh position={[0, 0.1, -0.56]}>
        <boxGeometry args={[1.8, 0.04, 0.02]} />
        <meshStandardMaterial color="#56ccf2" emissive="#56ccf2" emissiveIntensity={1.4} />
      </mesh>
    </group>
  );
}

export function NewsletterScene3D() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0.8, 4.2], fov: 42 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 3]} intensity={1.6} color="#ffffff" />
        <pointLight position={[-3, 2, 2]} intensity={1.2} color="#2d9cdb" />
        <pointLight position={[3, -1, 1]} intensity={0.8} color="#56ccf2" />
        <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1}>
          <FloatingMeshCar />
        </Float>
        <Sparkles count={40} scale={6} size={2} speed={0.4} color="#ffffff" opacity={0.6} />
        <ContactShadows
          position={[0, -1.1, 0]}
          opacity={0.35}
          scale={8}
          blur={2.6}
          far={3}
          color="#0f62fe"
        />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}

// === Stats section mini 3D globe ===
function MiniGlobe() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.18;
  });
  return (
    <group>
      <mesh ref={ref} scale={1.6}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.6}
          chromaticAberration={0.05}
          anisotropicBlur={0.1}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color="#1d81f2"
          roughness={0.1}
        />
      </mesh>
      {/* Wireframe overlay */}
      <mesh scale={1.62}>
        <sphereGeometry args={[1, 24, 16]} />
        <meshBasicMaterial color="#1d81f2" wireframe transparent opacity={0.25} />
      </mesh>
      {/* Latitude rings */}
      {[0.4, 0.7, 0.9].map((y, i) => (
        <mesh key={i} position={[0, y * (i % 2 === 0 ? 1 : -1), 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.6 - i * 0.05, 1.62 - i * 0.05, 48]} />
          <meshBasicMaterial color="#56ccf2" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

export function StatsScene3D() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 3]} intensity={1.5} />
        <pointLight position={[-3, 2, 2]} intensity={1.1} color="#2d9cdb" />
        <Float speed={1.4} rotationIntensity={0.7} floatIntensity={1.2}>
          <MiniGlobe />
        </Float>
        <Sparkles count={50} scale={5} size={1.5} speed={0.3} color="#56ccf2" opacity={0.7} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}

// === Transcend Platform accent - floating geometric core ===
function PlatformCore({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.35;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
    }
  });
  return (
    <group>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh scale={1.4}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

export function PlatformScene3D({ color = '#1d81f2' }: { color?: string }) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 4], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 3]} intensity={1.4} />
        <pointLight position={[-3, 2, 2]} intensity={1} color={color} />
        <Float speed={1.6} rotationIntensity={1} floatIntensity={1.4}>
          <PlatformCore color={color} />
        </Float>
        <Sparkles count={30} scale={5} size={1.5} speed={0.3} color={color} opacity={0.7} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
