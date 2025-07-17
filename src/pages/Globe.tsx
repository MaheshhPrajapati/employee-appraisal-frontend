// Globe.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import './Globe.css';

export default function Globe() {
  return (
    <div className="globe-container">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        <mesh>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial color="white" wireframe />
        </mesh>

        <OrbitControls enableZoom={true} enablePan={false} />
        <Stars />
      </Canvas>
    </div>
  );
}
