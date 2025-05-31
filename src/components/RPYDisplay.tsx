import React, { useEffect, useState } from 'react';
import ROSLIB from 'roslib';
import { ros } from '../ros/rosConnection';

interface Vector3Stamped {
    header: any;
    vector: {x : number; y : number; z : number };
}

const RPYDisplay: React.FC = () => {
    const [roll, setRoll] = useState<number | null>(null);
    const [pitch, setPitch] = useState<number | null>(null);
    const [yaw, setYaw] = useState<number | null>(null);

    useEffect(() => {
        const RPYTopic = new ROSLIB.Topic({
            ros,
            name: '/rpy',
            messageType: 'geometry_msgs/Vector3Stamped',
        });

        RPYTopic.subscribe((message: Vector3Stamped) => {
            setRoll(message.vector.x);
            setPitch(message.vector.y);
            setYaw(message.vector.z);
        });

        return() => {
            RPYTopic.unsubscribe();
        };
    }, []);

    return (
        <div>
            <h2>Roll, Pitch, Yaw (degrees)</h2>
            <p>Roll: {roll !== null ? roll.toFixed(1) : 'Waiting...'}</p>
            <p>Pitch: {pitch !== null ? pitch.toFixed(1) : 'Waiting...'}</p>
            <p>Yaw: {yaw !== null ? yaw.toFixed(1) : 'Waiting...'}</p>
        </div>
    );
};

export default RPYDisplay;