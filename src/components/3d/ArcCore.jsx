import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function OrbitNode({
  radius,
  speed,
  offset,
  tilt,
  size = 0.045,
  color = "#b99a62",
}) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const t = clock.getElapsedTime() * speed + offset;

    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.y = Math.sin(t) * radius;
  });

  return (
    <group rotation={tilt}>
      <mesh ref={ref}>
        <sphereGeometry args={[size, 24, 24]} />

        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          metalness={0.75}
          roughness={0.28}
          clearcoat={0.6}
        />
      </mesh>
    </group>
  );
}

function ThinOrbit({
  radius,
  tilt,
  color = "#b99a62",
  opacity = 0.22,
}) {
  return (
    <mesh rotation={tilt}>
      <torusGeometry args={[radius, 0.006, 8, 180]} />

      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function PrecisionRing({
  ringRef,
  rotation,
  radius,
  tube,
  color,
  goldColor,
}) {
  return (
    <group ref={ringRef} rotation={rotation}>
      {/* graphite body */}
      <mesh>
        <torusGeometry args={[radius, tube, 32, 180]} />

        <meshPhysicalMaterial
          color={color}
          metalness={0.72}
          roughness={0.34}
          clearcoat={0.5}
          clearcoatRoughness={0.22}
        />
      </mesh>

      {/* outer gold trim */}
      <mesh scale={1.025}>
        <torusGeometry
          args={[
            radius,
            0.018,
            14,
            180,
          ]}
        />

        <meshStandardMaterial
          color={goldColor}
          emissive="#70562d"
          emissiveIntensity={0.22}
          metalness={0.72}
          roughness={0.26}
        />
      </mesh>
    </group>
  );
}

export default function ArcCore() {
  const rootRef = useRef();

  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();

  const nucleusRef = useRef();

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();

    if (rootRef.current) {
      rootRef.current.rotation.y =
        Math.sin(t * 0.12) * 0.05 +
        pointer.x * 0.035;

      rootRef.current.rotation.x =
        pointer.y * -0.02;
    }

    if (ring1.current) {
      ring1.current.rotation.x =
        0.35 + t * 0.045;

      ring1.current.rotation.y =
        0.15 + t * 0.025;
    }

    if (ring2.current) {
      ring2.current.rotation.y =
        0.55 - t * 0.035;

      ring2.current.rotation.z =
        0.75 + t * 0.027;
    }

    if (ring3.current) {
      ring3.current.rotation.x =
        1.12 - t * 0.03;

      ring3.current.rotation.z =
        -0.42 - t * 0.022;
    }

    if (nucleusRef.current) {
      const pulse =
        1 +
        Math.sin(t * 1.2) * 0.008;

      nucleusRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={rootRef} scale={1.18}>
      {/* subtle ambient volume */}
      <mesh scale={1.5}>
        <sphereGeometry args={[1, 40, 40]} />

        <meshBasicMaterial
          color="#b79a62"
          transparent
          opacity={0.009}
          depthWrite={false}
        />
      </mesh>

      {/* smaller nucleus */}
      <mesh
        ref={nucleusRef}
        scale={0.37}
      >
        <sphereGeometry args={[1, 64, 64]} />

        <meshPhysicalMaterial
          color="#151617"
          metalness={0.55}
          roughness={0.3}
          clearcoat={0.65}
          clearcoatRoughness={0.18}
          emissive="#2b2418"
          emissiveIntensity={0.07}
        />
      </mesh>

      {/* inner bronze detail */}
      <mesh scale={0.27}>
        <sphereGeometry args={[1, 48, 48]} />

        <meshStandardMaterial
          color="#423622"
          emissive="#6d5730"
          emissiveIntensity={0.12}
          metalness={0.4}
          roughness={0.38}
        />
      </mesh>

      {/* tiny lime energy center */}
      <mesh scale={0.11}>
        <sphereGeometry args={[1, 32, 32]} />

        <meshStandardMaterial
          color="#829835"
          emissive="#a8d63b"
          emissiveIntensity={0.55}
          roughness={0.35}
        />
      </mesh>

      {/* larger, thinner, cleaner rings */}

      <PrecisionRing
        ringRef={ring1}
        rotation={[0.35, 0.15, 0.08]}
        radius={1.15}
        tube={0.105}
        color="#2c2e30"
        goldColor="#b99a62"
      />

      <PrecisionRing
        ringRef={ring2}
        rotation={[1.15, 0.55, 0.75]}
        radius={1.35}
        tube={0.09}
        color="#373533"
        goldColor="#c2a36b"
      />

      <PrecisionRing
        ringRef={ring3}
        rotation={[1.12, 0.35, -0.42]}
        radius={0.92}
        tube={0.078}
        color="#242729"
        goldColor="#a98955"
      />

      {/* thin orbital paths */}

      <ThinOrbit
        radius={1.55}
        tilt={[Math.PI / 2, 0, 0]}
        color="#b89a62"
        opacity={0.28}
      />

      <ThinOrbit
        radius={1.78}
        tilt={[0.78, 0.28, 0.18]}
        color="#8c7249"
        opacity={0.18}
      />

      <ThinOrbit
        radius={1.42}
        tilt={[0.26, 1.02, 0.38]}
        color="#8f9f3a"
        opacity={0.11}
      />

      {/* small nodes */}

      <OrbitNode
        radius={1.55}
        speed={0.14}
        offset={0}
        tilt={[Math.PI / 2, 0, 0]}
        color="#c2a36b"
      />

      <OrbitNode
        radius={1.78}
        speed={-0.1}
        offset={2}
        tilt={[0.78, 0.28, 0.18]}
        color="#aa8a56"
      />

      <OrbitNode
        radius={1.42}
        speed={0.12}
        offset={4.1}
        tilt={[0.26, 1.02, 0.38]}
        color="#a8c63d"
        size={0.037}
      />

      {/* controlled warm lighting */}

      <pointLight
        position={[2.5, 1.6, 2.5]}
        intensity={1.8}
        distance={7}
        color="#c7a46a"
      />

      <pointLight
        position={[-2.3, 1.1, 3]}
        intensity={1}
        distance={6}
        color="#d7dce0"
      />

      <pointLight
        position={[0, -1, 2]}
        intensity={0.35}
        distance={4}
        color="#a8d63b"
      />
    </group>
  );
}