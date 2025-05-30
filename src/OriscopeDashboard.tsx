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
import axios from 'axios';
import polyp from './assets/polyp.png';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip);

// Hook to fetch live balloon pressure data
function useBalloonData() {
  const [labels, setLabels] = useState<number[]>([]);
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/balloon1');
        setLabels(res.data.labels);
        setValues(res.data.values);
      } catch (err) {
        console.error("Error fetching balloon data", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 250);
    return () => clearInterval(interval);
  }, []);

  return { labels, values };
}

export default function OriscopeDashboard() {
  const [currentTime, setCurrentTime] = useState('');
  const { labels, values } = useBalloonData();

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

  const chartData: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Distal Balloon',
        data: values,
        borderColor: 'green',
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 1000,
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
          <img src={polyp} alt="Scope View" className="scope-image" />
        </div>

        <div className="scope-angle">
          <div>Scope Angle</div>
          <div>Roll: 0.00°</div>
          <div>Pitch: 0.00°</div>
          <div>Yaw: 15.00°</div>
          <div>Patient name: -------</div>
          <div>Patient ID: --------</div>
          <div>Insertion Depth: ---- cm</div>
          <div>Scope Speed: ----- cm/s</div>
        </div>

        <div className="pressure-graph">
          <h3>Balloon Air Pressure</h3>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
