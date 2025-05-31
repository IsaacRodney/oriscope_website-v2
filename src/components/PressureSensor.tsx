import React, { useEffect } from 'react';
import ROSLIB from 'roslib';
import { ros } from '../ros/rosConnection';

interface PressureMsg {
    pressure_sensor_1: number;
    pressure_sensor_2: number;
}

const PressureSensor: React.FC<{ onUpdate: (p1: number, p2: number) => void }> = ({ onUpdate }) => {
    useEffect(() => {
        const pressureTopic = new ROSLIB.Topic({
            ros,
            name: '/mprls_pressures',
            messageType: 'mux_bus/MPRLSPressures',
        });

        pressureTopic.subscribe((message: PressureMsg) => {
            onUpdate(message.pressure_sensor_1, message.pressure_sensor_2);
        });

        return () => {
            pressureTopic.unsubscribe();
        };
    }, [onUpdate]);

    return null;
};

export default PressureSensor;
