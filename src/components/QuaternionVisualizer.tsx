import React, { useEffect, useState } from 'react';
import ROSLIB from 'roslib';
import { ros1 } from '../ros/rosConnection';

import { Canvas, useFrame } from '@react-three/fiber';
import { Quaternion } from 'three';
import * as THREE from 'three';

const correction = new THREE.Quaternion(0.5, 0.5, -0.5, 0.5);

interface ImuMsg {
  orientation: { x: number; y: number; z: number; w: number };
}

const RotatingCube: React.FC<{ quat: Quaternion }> = ({ quat }) => {
  const ref = React.useRef<THREE.Group>(null!);

  useFrame(() => {
    if (ref.current) {
      const adjusted = quat.clone().multiply(correction);
      ref.current.quaternion.copy(adjusted);
    }
  });

  const halfX = 1;
  const coneHeight = 0.6;
  const coneRadius = 0.12;
  const coneOffsetX = halfX + coneHeight / 2;

  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[2, 1, 0.5]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh position={[-coneOffsetX, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[coneRadius, coneHeight, 8]} />
        <meshStandardMaterial color="#f0000" emissive="#ff0000" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
};

const QuaternionVisualizer: React.FC = () => {
  const [quat, setQuat] = useState(new Quaternion(0, 0, 0, 1));

  useEffect(() => {
    const imuTopic = new ROSLIB.Topic({
      ros: ros1,
      name: '/data',
      messageType: 'sensor_msgs/Imu',
    });

    imuTopic.subscribe((message: ImuMsg) => {
      const { x, y, z, w } = message.orientation;
      setQuat(new Quaternion(x, y, z, w));
    });

    return () => {
      imuTopic.unsubscribe();
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <RotatingCube quat={quat} />
      </Canvas>
    </div>

  );
};

export default QuaternionVisualizer;
