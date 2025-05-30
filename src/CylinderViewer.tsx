import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { Euler, Mesh } from 'three';

interface Props {
  roll: number;
  pitch: number;
  yaw: number;
}

export default function CylinderViewer({ roll, pitch, yaw }: Props) {
  const meshRef = useRef<Mesh>(null);

  const radians = (deg: number) => (deg * Math.PI) / 180;

  return (
    <Canvas style={{ width: '100%', height: '200px' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <mesh ref={meshRef} rotation={new Euler(radians(pitch), radians(yaw), radians(roll))}>
        <cylinderGeometry args={[1, 1, 4, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
