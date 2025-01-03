import React, { useEffect, useState, useCallback, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getSpriteStyle } from '../utils/spriteUtils';
import './ItemDisplay.css';

interface MinecraftItem {
  item: string;
  id: string;
  survival_obtainable: string;
  survival_available: string;
  spriteClass: string;
  spriteX: number;
  spriteY: number;
}

interface ItemDisplayProps {
  setShowConfetti: (show: boolean) => void;
  useTimer: boolean;
}

const ItemDisplay: React.FC<ItemDisplayProps> = ({ setShowConfetti, useTimer }) => {
  const [items, setItems] = useState<MinecraftItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MinecraftItem[]>([]);
  const [randomItem, setRandomItem] = useState<MinecraftItem | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [filters, setFilters] = useState({
    survival_obtainable: '',
  });
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = import.meta.env.BASE_URL;
        const itemDataResponse = await fetch(`${baseUrl}assets/item_data.json`);
        const itemData = await itemDataResponse.json();
        const blockDataResponse = await fetch(`${baseUrl}assets/block_data.json`);
        const blockData = await blockDataResponse.json();
        const blockData112Response = await fetch(`${baseUrl}assets/block_data_1.12.json`);
        const blockData112 = await blockData112Response.json();

        const extractSurvivalObtainable = (entries: Record<string, string | Record<string, string>>, item: string): string => {
          if (typeof entries[item] === 'string') {
            return entries[item];
          } else if (typeof entries[item] === 'object') {
            for (const key in entries[item]) {
              if (Object.prototype.hasOwnProperty.call(entries[item], key)) {
                if (key.split('<br>').includes(item)) {
                  return entries[item][key];
                }
              }
            }
          }
          return 'Yes';
        };

        const combinedData = [
          ...itemData.key_list.map((item: string) => ({
            item,
            spriteInfo: itemData.sprites[item],
            survival_obtainable: extractSurvivalObtainable(itemData.properties.survival_obtainable.entries, item),
          })),
          ...blockData.key_list.map((item: string) => ({
            item,
            spriteInfo: blockData.sprites[item],
            survival_available: blockData.properties.survival_available?.entries?.[item] || 'Creatable',
          })),
          ...blockData112.key_list.map((item: string) => ({
            item,
            spriteInfo: blockData112.sprites[item],
            survival_available: blockData112.survival_available?.entries?.[item] || 'Creatable',
          })),
        ].map((item) => ({
          item: item.item,
          id: item.item.toLowerCase().replace(/ /g, '_'),
          survival_obtainable: item.survival_obtainable,
          survival_available: item.survival_available,
          spriteClass: item.spriteInfo ? item.spriteInfo[0] : '',
          spriteX: item.spriteInfo ? item.spriteInfo[1] : 0,
          spriteY: item.spriteInfo ? item.spriteInfo[2] : 0,
        }));

        setItems(combinedData);
        setFilteredItems(combinedData);

      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
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
      if (filters.survival_obtainable) {
        filtered = filtered.filter(item => {
          const survivalStatus = item.survival_obtainable !== 'No' && item.survival_available !== 'No';
          return filters.survival_obtainable === 'Yes'
            ? survivalStatus
            : !survivalStatus;
        });
      }
      setFilteredItems(filtered);
    };
    applyFilters();
  }, [filters, items]);

  const generateRandomItem = useCallback(() => {
    if (isRolling) return; // Ne pas relancer si un tirage est déjà en cours

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

              // Start the timer when the item has finished generating
              setTimer(0);
              startTimeRef.current = performance.now();
              if (timerRef.current) {
                cancelAnimationFrame(timerRef.current);
              }
              if (useTimer) {
                const updateTimer = (currentTime: number) => {
                  if (startTimeRef.current !== null) {
                    setTimer(Math.floor((currentTime - startTimeRef.current) / 1000));
                    timerRef.current = requestAnimationFrame(updateTimer);
                  }
                };
                timerRef.current = requestAnimationFrame(updateTimer);
              } else {
                setShowConfetti(true);
              }
            }, 500);
          }
        }, 100);
      }, 200);
    }
  }, [filteredItems, setShowConfetti, useTimer, isRolling]);

  const handleItemObtained = () => {
    if (timerRef.current) {
      cancelAnimationFrame(timerRef.current);
    }
    setShowConfetti(true);
  };

  useEffect(() => {
    if (filteredItems.length > 0) {
      generateRandomItem();
    }
  }, [filteredItems]); // Appeler generateRandomItem lorsque filteredItems est mis à jour

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="d-flex flex-column align-items-center mt-1 position-relative">
      <div className="d-flex mb-3">
        <div className="me-3">
          <label className="form-label" htmlFor="survival_obtainable">Survival Obtainable</label>
          <select
            className="form-select"
            id="survival_obtainable"
            name="survival_obtainable"
            value={filters.survival_obtainable}
            onChange={handleFilterChange}
          >
            <option value="">Any</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
      <div className={`card p-3 ${isRolling ? 'rolling' : ''}`}>
        {filteredItems.length === 0 ? (
          <p>No items to display</p>
        ) : randomItem ? (
          <div className="d-flex flex-column align-items-center">
            <span style={getSpriteStyle(randomItem.spriteClass, randomItem.spriteX, randomItem.spriteY)}></span>
            <h2 className="mt-3">{randomItem.item}</h2>
            <p>Survival Obtainable: {(randomItem.survival_obtainable === 'Yes' || randomItem.survival_available === 'Creatable') ? 'Yes' : 'No'}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {useTimer && randomItem && (
        <div className="timer mt-2">
          {formatTime(timer)}
        </div>
      )}
      <div className="d-flex mt-3">
        <button className="btn btn-primary me-2" onClick={generateRandomItem} disabled={isRolling || filteredItems.length === 0}>
          {isRolling ? "🎲 Drawing..." : "Generate another item"}
        </button>
        {useTimer && (
          <button className="btn btn-success" onClick={handleItemObtained} disabled={isRolling || !randomItem}>
            Item obtained
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemDisplay;