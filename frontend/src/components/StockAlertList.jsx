import React, { useEffect, useState } from 'react';
import './StockAlert.css';

function StockAlert({ inventory }) {
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    const threshold = 10;
    const lowStock = inventory.filter((item) => item.quantity <= threshold);
    setLowStockItems(lowStock);
  }, [inventory]);

  return (
    <div className="stock-alert-container">
      <h2>Low Stock Alerts</h2>
      {lowStockItems.length === 0 ? (
        <p>No items are low on stock.</p>
      ) : (
        <ul>
          {lowStockItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} remaining
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StockAlert;
