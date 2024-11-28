import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InventoryTable from '../components/InventoryTable';
import AddItemForm from '../components/AddItemForm';
import './Inventory.css';

function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch items data from JSON Server
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/items'); // Match endpoint with your db.json
        const fetchedItems = Object.values(response.data); // Transform object into array
        setItems(fetchedItems);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch items.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Handle delete item functionality
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete item.');
    }
  };

  // Handle adding a new item
  const handleItemAdded = async (newItem) => {
    try {
      const response = await axios.post('http://localhost:5000/items', newItem);
      setItems([...items, response.data]);
    } catch (err) {
      console.error(err);
      setError('Failed to add item.');
    }
  };

  return (
    <div className="inventory-container">
      <h1>Inventory Management</h1>
      <p>Manage your inventory efficiently with real-time updates.</p>

      {/* Error message */}
      {error && <div className="error-message">{error}</div>}

      <div className="inventory-actions">
        <AddItemForm onItemAdded={handleItemAdded} />
      </div>

      {/* Loading message or inventory table */}
      {loading ? (
        <div className="loading-message">Loading items...</div>
      ) : (
        <InventoryTable items={items} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default Inventory;
