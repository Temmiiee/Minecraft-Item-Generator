import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import ItemDisplay from './components/ItemDisplay';
import './App.css';

const App = () => {
  const [isNightMode, setIsNightMode] = useState(true); // Mode nuit par défaut
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiPieces = 200;

  useEffect(() => {
    document.body.classList.toggle('night-mode', isNightMode);
  }, [isNightMode]);

  return (
    <div className="App container text-center">
      {showConfetti && <Confetti numberOfPieces={confettiPieces} width={window.innerWidth} height={window.innerHeight} />}
      <h1 className="display-4">🎰 Minecraft Item Generator 🎰</h1>
      <button className="btn btn-secondary mb-3 mt-4" onClick={() => setIsNightMode(!isNightMode)}>
        {isNightMode ? 'Switch to Day Mode' : 'Switch to Night Mode'}
      </button>
      <ItemDisplay setShowConfetti={setShowConfetti} />
      <a href="https://github.com/Temmiiee/Minecraft-Item-Generator" target="_blank" rel="noopener noreferrer" className="github-icon">
        <svg viewBox="0 0 16 16" width="40" height="40" aria-hidden="true">
          <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
      </a>
    </div>
  );
};

export default App;