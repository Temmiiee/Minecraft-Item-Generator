import React, { useEffect, useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Confetti from 'react-confetti';

interface MinecraftItem {
  item: string;
  id: string;
  stackability: number;
  survival_obtainable: string;
  peaceful_obtainable: string;
}

const ItemDisplay: React.FC = () => {
  const [items, setItems] = useState<MinecraftItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MinecraftItem[]>([]);
  const [randomItem, setRandomItem] = useState<MinecraftItem | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [filters, setFilters] = useState({
    stackability: '',
    survival_obtainable: '',
    peaceful_obtainable: '',
  });

  useEffect(() => {
    fetch('src/assets/itemlist.json')
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data);
      })
      .catch((error) => console.error("Error loading items:", error));
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = items;
      if (filters.stackability) {
        filtered = filtered.filter(item => item.stackability === parseInt(filters.stackability));
      }
      if (filters.survival_obtainable) {
        filtered = filtered.filter(item => item.survival_obtainable === filters.survival_obtainable);
      }
      if (filters.peaceful_obtainable) {
        filtered = filtered.filter(item => item.peaceful_obtainable === filters.peaceful_obtainable);
      }
      setFilteredItems(filtered);
    };
    applyFilters();
  }, [filters, items]);

  const generateRandomItem = useCallback(() => {
    if (filteredItems.length > 0) {
      setIsRolling(true);
      setShowConfetti(false);

      setTimeout(() => {
        let count = 0;
        const interval = setInterval(() => {
          const randomIndex = Math.floor(Math.random() * filteredItems.length);
          setRandomItem(filteredItems[randomIndex]);
          count++;
          if (count === 30) {
            clearInterval(interval);
            setTimeout(() => {
              const finalIndex = Math.floor(Math.random() * filteredItems.length);
              setRandomItem(filteredItems[finalIndex]);
              setIsRolling(false);
              setShowConfetti(true);
            }, 500);
          }
        }, 100);
      }, 200);
    }
  }, [filteredItems]);

  useEffect(() => {
    generateRandomItem();
  }, [filteredItems, generateRandomItem]);

  return (
    <div className="d-flex flex-column align-items-center mt-5 position-relative">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <div className="d-flex mb-3">
        <div className="me-3">
          <label className="form-label">Stackability</label>
          <select className="form-select" name="stackability" value={filters.stackability} onChange={handleFilterChange}>
            <option value="">Any</option>
            <option value="64">64</option>
            <option value="16">16</option>
            <option value="Unstackable">Unstackable</option>
          </select>
        </div>
        <div className="me-3">
          <label className="form-label">Survival Obtainable</label>
          <select className="form-select" name="survival_obtainable" value={filters.survival_obtainable} onChange={handleFilterChange}>
            <option value="">Any</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label className="form-label">Peaceful Obtainable</label>
          <select className="form-select" name="peaceful_obtainable" value={filters.peaceful_obtainable} onChange={handleFilterChange}>
            <option value="">Any</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
      <div className={`card p-3 ${isRolling ? 'rolling' : ''}`}>
        {randomItem ? (
          <div className="d-flex flex-column align-items-center">
            <i className={`icon-minecraft ${randomItem.id}`} style={{ width: 64, height: 64 }}></i>
            <h3 className="mt-3">{randomItem.item}</h3>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <button className="btn btn-primary mt-3" onClick={generateRandomItem} disabled={isRolling}>
        {isRolling ? "🎲 Drawing..." : "Generate another item"}
      </button>
    </div>
  );
};

export default ItemDisplay;
