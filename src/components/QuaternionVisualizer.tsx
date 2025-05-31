import React, { useEffect, useState } from 'react';
import ROSLIB from 'roslib';
import { ros } from '../ros/rosConnection';

import { Canvas, useFrame } from '@react-three/fiber';
import { Quaternion } from 'three';

import * as THREE from 'three';

interface ImuMsg {
    orientation: { x: number; y: number; z: number; w: number };
}

const RotatingCube: React.FC<{ quat: Quaternion}> = ({ quat }) => {
    const ref = React.useRef<THREE.Mesh>(null!);

    useFrame(() => {
        if (ref.current) {
            ref.current.quaternion.copy(quat);
        }
    });

    return (
        <mesh ref = {ref}>
            <boxGeometry args={[2, 1, 0.5]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    );
};

const QuaternionVisualizer: React.FC = () => {
    const [quat, setQuat] = useState(new Quaternion(0,0,0,1));

    useEffect(() => {
        const imuTopic = new ROSLIB.Topic({
            ros,
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
        <div style={{ width: '300px', height: '300px' }}>
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <RotatingCube quat={quat} />
        </Canvas>
        </div>
  );
};

export default QuaternionVisualizer;