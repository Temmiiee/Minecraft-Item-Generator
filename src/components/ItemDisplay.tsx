import React, { useEffect, useState } from 'react';
import './Items.css'; // Import CSS for icons
import './ItemDisplay.css'; // Import CSS for animations
import Confetti from 'react-confetti';

interface MinecraftItem {
  label: string;
  name: string;
  css: string;
}

const ItemDisplay: React.FC = () => {
  const [items, setItems] = useState<MinecraftItem[]>([]);
  const [randomItem, setRandomItem] = useState<MinecraftItem | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    fetch('/minecraft-block-and-entity.json')
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error loading items:", error));
  }, []);

  const generateRandomItem = () => {
    if (items.length > 0) {
      setIsRolling(true);
      setShowConfetti(false); // Hide confetti at the start of the draw

      // Draw animation with acceleration/deceleration
      setTimeout(() => {
        let count = 0;
        const interval = setInterval(() => {
          const randomIndex = Math.floor(Math.random() * items.length);
          setRandomItem(items[randomIndex]);
          count++;
          if (count === 30) {  // After 30 cycles, slow down the animation
            clearInterval(interval);
            setTimeout(() => {
              const finalIndex = Math.floor(Math.random() * items.length);
              setRandomItem(items[finalIndex]);
              setIsRolling(false);
              setShowConfetti(true); // Show confetti
            }, 500); // Slow down time before stopping
          }
        }, 100); // Item changes every 100ms for 30 times
      }, 200); // Start the draw with a small delay
    }
  };

  useEffect(() => {
    generateRandomItem(); // Generate an item on initial load
  }, [items]);

  return (
    <div className="item-display-container">
      {showConfetti && <Confetti width={window.innerWidth-855} height={window.innerHeight} />}
      <div className={`machine-slot ${isRolling ? 'rolling' : ''}`}>
        {randomItem ? (
          <div className="item-display">
            <i className={`icon-minecraft ${randomItem.css}`} style={{ width: 32, height: 32 }}></i>
            <h3 className="item-label">{randomItem.label}</h3>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <button className="generate-button" onClick={generateRandomItem} disabled={isRolling}>
        {isRolling ? "🎲 Drawing..." : "Generate another item"}
      </button>
    </div>
  );
};

export default ItemDisplay;