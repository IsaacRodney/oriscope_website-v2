// src/ros.ts
import ROSLIB from 'roslib';

export const ros = new ROSLIB.Ros({
  url: 'ws://<ROS_DEVICE_IP>:9090', // <-- placeholder to replace
});

ros.on('connection', () => console.log('✅ Connected to ROSBridge'));
ros.on('error', (error) => console.error('❌ Connection error:', error));
ros.on('close', () => console.log('🔌 Disconnected from ROSBridge'));
