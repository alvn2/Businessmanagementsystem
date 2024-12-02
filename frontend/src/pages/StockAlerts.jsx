import React, { useEffect, useState } from 'react';
import './StockAlerts.css';

function StockAlerts({ inventory }) {
  const [lowStockItems, setLowStockItems] = useState([]);
  const lowStockThreshold = 10; // Threshold for low stock

  useEffect(() => {
    const filterLowStockItems = () => {
      const lowStock = inventory.filter(item => item.quantity <= lowStockThreshold);
      setLowStockItems(lowStock);
    };
    filterLowStockItems();
  }, [inventory]);

  return (
    <div className="stock-alerts-container">
      <h2>Low Stock Alerts</h2>
      {lowStockItems.length === 0 ? (
        <p>No items are low on stock.</p>
      ) : (
        <ul>
          {lowStockItems.map(item => (
            <li key={item.id}>
              <span>{item.name} - {item.quantity} remaining</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StockAlerts;
