import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';

import { ros1 } from '../ros/rosConnection';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface ROSHeader {
    stamp: {
        sec: number;
        nanosec: number;
    };
    frame_id: string;
}

interface PressureGraphProps {
  header: ROSHeader;
  pressure1: number | null;
  pressure2: number | null;
}

const PressureGraph: React.FC<PressureGraphProps> = ({ pressure1, pressure2 }) => {
  const [labels, setLabels] = useState<number[]>([]);
  const [data1, setData1] = useState<number[]>([]);
  const [data2, setData2] = useState<number[]>([]);

  useEffect(() => {
    if (pressure1 !== null && pressure2 !== null) {
      setLabels((prev) => [...prev, prev.length * 0.25]);
      setData1((prev) => [...prev, pressure1].slice(-50));
      setData2((prev) => [...prev, pressure2].slice(-50));
    }
  }, [pressure1, pressure2]);

  const chartData: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Distal Balloon',
        data: data1,
        borderColor: 'green',
        fill: false,
      },
      {
        label: 'Proximal Balloon',
        data: data2,
        borderColor: 'red',
        fill: false,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (s)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Pressure (Pa)',
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16,
          },
        },
      },
    },
  };

 return (
  <div className="pressure-graph">
    <div className="chart-wrapper">
      <Line data={chartData} options={options} />
    </div>
  </div>
);

};

export default PressureGraph;
