import React, { useState, useEffect } from 'react';
import ItemDisplay from './components/ItemDisplay';
import 'bootstrap/dist/css/bootstrap.min.css';
import Confetti from 'react-confetti';
import './App.css';

const App: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState(200);
  const [isNightMode, setIsNightMode] = useState(true); // Default to night mode

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    if (showConfetti) {
      setConfettiPieces(200);
      timer = setTimeout(() => {
        interval = setInterval(() => {
          setConfettiPieces((prev) => {
            if (prev <= 0) {
              clearInterval(interval);
              return 0;
            }
            return prev - 10;
          });
        }, 100);
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [showConfetti]);

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
    </div>
  );
};

export default App;