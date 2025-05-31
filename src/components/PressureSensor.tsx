import React, { useEffect, useState } from 'react';

import ROSLIB from 'roslib';
import { ros } from '../ros/rosConnection';

interface PressureMsg {
    pressure_sensor_1: number;
    pressure_sensor_2: number;
}

const PressureSensor: React.FC = () => {
    const [pressure1, setPressure1] = useState<number | null>(null);
    const [pressure2, setPressure2] = useState<number | null>(null);

    useEffect(() => {
        const pressureTopic = new ROSLIB.Topic({
            ros,
            name: '/mprls_pressures',
            messageType: 'mux_bus/MPRLSPressures',
        });

        pressureTopic.subscribe((message: PressureMsg) => {
            setPressure1(message.pressure_sensor_1);
            setPressure2(message.pressure_sensor_2);
        });

        return () => {
            pressureTopic.unsubscribe();
        };
    }, []);

    return (
        <div>
            <h2>Pressure Sensor</h2>
            <p>Pressure1: {pressure1 !== null ? `${pressure1} Pa` : 'Waiting for data...'}</p>
            <p>Pressure2: {pressure2 !== null ? `${pressure2} Pa` : 'Waiting for data...'}</p>
        </div>
    );
};

export default PressureSensor;