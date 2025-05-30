import './OriscopeDashboard.css';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import type { ChartOptions, ChartData } from 'chart.js';
import CylinderViewer from './CylinderViewer';
// TODO: Replace mock image with actual ROS camera feed when available
import polyp from './assets/polyp.png';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip);

export default function OriscopeDashboard() {
  const [currentTime, setCurrentTime] = useState('');
  const [imuData, setImuData] = useState({ roll: 0, pitch: 0, yaw: 0 });

  const [labels, setLabels] = useState<number[]>([]);
  const [frontPressure, setFrontPressure] = useState<number[]>([]);
  const [backPressure, setBackPressure] = useState<number[]>([]);

  // Update live clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const dateString = now.toLocaleDateString('en-US');
      setCurrentTime(`${timeString} ${dateString}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // TODO: Connect ROSBridge WebSocket for Front Balloon Pressure (in hPa)
  // Convert hPa to psi (1 hPa ≈ 0.0145038 psi)
  useEffect(() => {
    const interval = setInterval(() => {
      // Replace with ROS WebSocket subscription for front pressure
      const simulatedFrontPsi = Math.random() * 16;
      setFrontPressure((prev) => [...prev, simulatedFrontPsi].slice(-50));
      setLabels((prev) => [...prev, prev.length].slice(-50));
    }, 250);
    return () => clearInterval(interval);
  }, []);

  // TODO: Connect ROSBridge WebSocket for Back Balloon Pressure (in hPa)
  // Convert hPa to psi (1 hPa ≈ 0.0145038 psi)
  useEffect(() => {
    const interval = setInterval(() => {
      // Replace with ROS WebSocket subscription for back pressure
      const simulatedBackPsi = Math.random() * 16;
      setBackPressure((prev) => [...prev, simulatedBackPsi].slice(-50));
    }, 250);
    return () => clearInterval(interval);
  }, []);

  // TODO: Connect ROSBridge WebSocket for IMU orientation (roll, pitch, yaw)
  useEffect(() => {
    const interval = setInterval(() => {
      // Replace with ROS WebSocket subscription for IMU
      setImuData({
        roll: Math.random() * 360,
        pitch: Math.random() * 180,
        yaw: Math.random() * 360,
      });
    }, 250);
    return () => clearInterval(interval);
  }, []);

  const chartData: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Front Balloon',
        data: frontPressure,
        borderColor: 'green',
        fill: false,
        tension: 0.3,
      },
      {
        label: 'Back Balloon',
        data: backPressure,
        borderColor: 'red',
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (s)',
          font: {
            size: 18,
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 16,
        title: {
          display: true,
          text: 'Pressure (psi)',
          font: {
            size: 18,
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 20,
          },
        },
      },
    },
  };

  return (
    <div className="oriscope-container">
      <header className="oriscope-header">
        <div className="oriscope-title">Oriscope</div>
        <div className="oriscope-time">{currentTime}</div>
      </header>

      <div className="oriscope-main">
        <div className="scope-image-wrapper">
          {/* TODO: Replace with actual ROS camera stream */}
          <img src={polyp} alt="Scope View" className="scope-image" />
        </div>

        <div className="top-right-container">
          <div className="imu-data">
            <div>Scope Angle</div>
            <div>Roll: {imuData.roll.toFixed(2)}°</div>
            <div>Pitch: {imuData.pitch.toFixed(2)}°</div>
            <div>Yaw: {imuData.yaw.toFixed(2)}°</div>
            <CylinderViewer
              roll={imuData.roll}
              pitch={imuData.pitch}
              yaw={imuData.yaw}
            />
          </div>

          <div className="patient-info">
            <div className="patient-id-box">
              <div><strong>Patient name:</strong> John Doe</div>
              <div><strong>Patient ID:</strong> __________</div>
            </div>
            <div className="patient-data-box">
              <div><strong>Procedure Time:</strong> 10:00</div>
              <div><strong>Insertion Depth:</strong> 10 cm</div>
              <div><strong>Scope Speed:</strong> 0.42 cm/s</div>
            </div>
          </div>
        </div>

        <div className="pressure-graph-wrapper">
          <div className="pressure-graph">
            <h3 className="pressure-title">Balloon Air Pressure</h3>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
