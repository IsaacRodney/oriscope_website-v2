import ROSLIB from 'roslib';

const ip1 = import.meta.env.VITE_IP_1;
const ip2 = import.meta.env.VITE_IP_2;
const rosbridgePort = 9090;

export const ros1 = new ROSLIB.Ros({
    url: `ws://${ip1}:${rosbridgePort}`,
});

export const ros2 = new ROSLIB.Ros({
    url: `ws://${ip2}:${rosbridgePort}`,
});

ros1.on('connection', () => {
    console.log(`Connected to ROS Bridge at ${ip1}`);
});

ros1.on('error', (error: any) => {
    console.error(`Error connecting to ROS bridge at ${ip1}:`, error);
});

ros1.on('close', () => {
    console.log(`Connection to ROS bridge at ${ip1} closed.`);
});

ros2.on('connection', () => {
    console.log(`Connected to ROS Bridge at ${ip2}`);
});

ros2.on('error', (error: any) => {
    console.error(`Error connecting to ROS bridge at ${ip2}:`, error);
});

ros2.on('close', () => {
    console.log(`Connection to ROS bridge at ${ip2} closed.`);
});