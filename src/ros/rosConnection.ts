import ROSLIB from 'roslib';

export const ros = new ROSLIB.Ros({
    url: 'ws://172.27.32.243:9090',
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