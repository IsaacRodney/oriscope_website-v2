import React, { useEffect } from 'react';
import ROSLIB from 'roslib';
import { ros1 } from '../ros/rosConnection';

interface Vector3Stamped {
    header: any;
    vector: { x: number; y: number; z: number };
}

const RPYDisplay: React.FC = () => {
    useEffect(() => {
        const RPYTopic = new ROSLIB.Topic({
            ros1,
            name: '/rpy',
            messageType: 'geometry_msgs/Vector3Stamped',
        });

        RPYTopic.subscribe((message: Vector3Stamped) => {
            // Optional: handle data elsewhere if needed
            // Example: console.log(message.vector);
        });

        return () => {
            RPYTopic.unsubscribe();
        };
    }, []);

    return null;
};

export default RPYDisplay;
