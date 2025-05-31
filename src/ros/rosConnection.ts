import ROSLIB from 'roslib';

const ip = import.meta.env.VITE_IP;
const rosbridgePort = 9090;

export const ros = new ROSLIB.Ros({
    url: `ws://${ip}:${rosbridgePort}`,
});

ros.on('connection', () => {
    console.log('Connected to ROS Bridge Websocket Server.');
});

ros.on('error', (error: any) => {
    console.error('Error connecting to ROS bridge websocket server:', error);
});

ros.on('close', () => {
    console.log('Connection to ROS bridge websocket server closed.');
});