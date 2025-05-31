import React, { useEffect } from 'react';

import OriscopeDashboard from './OriscopeDashboard';
import PressureSensor from './components/PressureSensor';
import RPYDisplay from './components/RPYDisplay';
import QuaternionVisualizer from './components/QuaternionVisualizer';


const App: React.FC = () => {
  useEffect(() => {
    // your ros connection or other side effects here
    
  }, []);

  return (
    <div>
      <OriscopeDashboard />
      <PressureSensor />
      <RPYDisplay />
      <QuaternionVisualizer />
    </div>
  );
};

export default App;
