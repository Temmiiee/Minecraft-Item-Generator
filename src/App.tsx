import React from 'react';
import ItemDisplay from './components/ItemDisplay';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <div className="App container text-center mt-5">
      <h1 className="display-4">🎰 Minecraft Item Generator 🎰</h1>
      <ItemDisplay />
    </div>
  );
};

export default App;