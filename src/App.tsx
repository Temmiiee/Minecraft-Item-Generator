import React from 'react';
import ItemDisplay from './components/ItemDisplay';

const App: React.FC = () => {
  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1> 🎰 Minecraft Item Generator 🎰 </h1>
      <ItemDisplay />
    </div>
  );
};

export default App;
