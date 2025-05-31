// import './OriscopeDashboard.css';
// import { useState, useEffect } from 'react';
// import polyp from './assets/polyp.png';
// import PressureSensor from './components/PressureSensor';
// import PressureGraph from './components/PressureGraph';
// import QuaternionVisualizer from './components/QuaternionVisualizer';

// export default function OriscopeDashboard() {
//   const [currentTime, setCurrentTime] = useState('');
//   const [imuData, setImuData] = useState({ roll: 0, pitch: 0, yaw: 0 });
//   const [labels, setLabels] = useState<number[]>([]);
//   const [frontPressure, setFrontPressure] = useState<number[]>([]);
//   const [backPressure, setBackPressure] = useState<number[]>([]);

//   useEffect(() => {
//     const updateClock = () => {
//       const now = new Date();
//       const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//       const dateString = now.toLocaleDateString('en-US');
//       setCurrentTime(`${timeString} ${dateString}`);
//     };

//     updateClock();
//     const interval = setInterval(updateClock, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div style={{ height: '100vh', overflow: 'hidden' }}>
//       <div className="oriscope-container">
//         <header className="oriscope-header">
//           <div className="oriscope-title">Oriscope</div>
//           <div className="oriscope-time">{currentTime}</div>
//         </header>

//         <div className="oriscope-main">
//           <div className="scope-image-wrapper">
//             <img src={polyp} alt="Scope View" className="scope-image" />
//           </div>

//           <div className="top-right-container">
//             <div className="imu-box">
//               <div className="imu-title">Scope Angle</div>
//               <div>Roll: {imuData.roll.toFixed(2)}°</div>
//               <div>Pitch: {imuData.pitch.toFixed(2)}°</div>
//               <div>Yaw: {imuData.yaw.toFixed(2)}°</div>
//               <QuaternionVisualizer />
//             </div>

//             <div className="patient-box">
//               <div className="patient-id-box">
//                 <div><strong>Patient name:</strong> John Doe</div>
//                 <div><strong>Patient ID:</strong> __________</div>
//               </div>
//               <div className="patient-data-box">
//                 <div><strong>Procedure Time:</strong> 10:00</div>
//                 <div><strong>Insertion Depth:</strong> 10 cm</div>
//                 <div><strong>Scope Speed:</strong> 0.42 cm/s</div>
//               </div>
//             </div>
//           </div>

//           <PressureSensor
//             onUpdate={(p1, p2) => {
//               setFrontPressure(prev => [...prev, p1].slice(-40));
//               setBackPressure(prev => [...prev, p2].slice(-40));
//               setLabels(prev => {
//                 const last = prev.at(-1) ?? 0;
//                 const next = parseFloat((last + 0.25).toFixed(2));
//                 return [...prev, next].slice(-40);
//               });
//             }}
//           />

//           <div className="pressure-graph-wrapper">
//             <div className="pressure-graph">
//               <PressureGraph labels={labels} frontPressure={frontPressure} backPressure={backPressure} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
