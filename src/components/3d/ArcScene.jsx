import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Float,
  OrbitControls,
} from "@react-three/drei";

import ArcCore from "./ArcCore.jsx";

export default function ArcScene() {
  return (
    <div
      className="arc-scene"
      style={{
        width: "100%",
        height: "100%",
        minHeight: "220px",
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 5.1],
          fov: 38,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        {/* =================================================
            BASE LIGHTING
        ================================================= */}

        <ambientLight
          intensity={1.55}
          color="#d5dde2"
        />


        {/* =================================================
            MAIN WARM KEY LIGHT
        ================================================= */}

        <directionalLight
          position={[4.5, 5, 6]}
          intensity={2.2}
          color="#e6d2ad"
        />
         

        {/* =================================================
            COOL FILL LIGHT
        ================================================= */}

        <directionalLight
          position={[-4, 2, 4]}
          intensity={2.0}
          color="#b7d3e5"
        />


        {/* =================================================
            GOLD RIM LIGHT
        ================================================= */}

        <pointLight
          position={[3.5, 1.8, 3.5]}
          intensity={5}
          distance={8}
          color="#d4aa63"
        />


        {/* =================================================
            SECOND GOLD LIGHT FROM LEFT
        ================================================= */}

        <pointLight
          position={[-3, 0.5, 2]}
          intensity={2.6}
          distance={7}
          color="#c7a268"
        />


        {/* =================================================
            SMALL LIME ENERGY REFLECTION
        ================================================= */}

        <pointLight
          position={[0, -2, 2.5]}
          intensity={1.1}
          distance={5}
          color="#b8f500"
        />


        {/* =================================================
            BACK LIGHT
        ================================================= */}

        <pointLight
          position={[0, 2, -3]}
          intensity={2.1}
          distance={7}
          color="#8aa5b5"
        />


        {/* =================================================
            ENVIRONMENT REFLECTIONS
            IMPORTANT FOR METAL MATERIALS
        ================================================= */}

        <Environment 
          preset="warehouse"
          environmentIntensity={0.45}
          />


        {/* =================================================
            ARC CORE
        ================================================= */}

        <Float
          speed={0.45}
          rotationIntensity={0.035}
          floatIntensity={0.10}
        >
          <ArcCore />
        </Float>


        {/* =================================================
            CAMERA CONTROL
        ================================================= */}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.055}
          autoRotate
          autoRotateSpeed={0.10}
          minPolarAngle={Math.PI / 2.25}
          maxPolarAngle={Math.PI / 1.75}
        />

      </Canvas>
    </div>
  );
}