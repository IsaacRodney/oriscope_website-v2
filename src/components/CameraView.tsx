import React, { useEffect, useState } from 'react';
import ROSLIB from 'roslib';
import { ros2 } from '../ros/rosConnection';

interface CompressedImageMsg {
  header: any;
  format: string;  // e.g. "jpeg"
  data: string;    // base-64 payload
}

const CameraView: React.FC = () => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    const imageTopic = new ROSLIB.Topic({
      ros: ros2,
      name: '/image_raw/compressed',
      messageType: 'sensor_msgs/CompressedImage',
      queue_size: 1,
    });

    imageTopic.subscribe((msg: CompressedImageMsg) => {
      // Build a data-URI the browser can display.
      const mime = msg.format || 'jpeg';
      setImgSrc(`data:image/${mime};base64,${msg.data}`);
    });

    return () => {
      imageTopic.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h2>Camera View</h2>
      {imgSrc ? (
        <img src={imgSrc} alt="ROS Camera Feed" style={{ maxWidth: '100%' }} />
      ) : (
        <p>Waiting for image...</p>
      )}
    </div>
  );
};

export default CameraView;
