import React, { useState } from 'react';
import './InventoryTable.css';

function InventoryTable({ items, onDelete, onEdit }) {
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

  // Sorting logic
  const sortedItems = [...items].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
    return 0;
  });

  // Sort handler
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'ascending' ? 'descending' : 'ascending',
    }));
  };

  // Edit handler
  const handleEdit = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    if (itemToEdit) onEdit(itemToEdit);
  };

  return (
    <div className="inventory-table-container">
      <table className="inventory-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')} className={sortConfig.key === 'id' ? sortConfig.direction : ''}>
              ID
            </th>
            <th onClick={() => handleSort('name')} className={sortConfig.key === 'name' ? sortConfig.direction : ''}>
              Name
            </th>
            <th onClick={() => handleSort('brand')} className={sortConfig.key === 'brand' ? sortConfig.direction : ''}>
              Brand
            </th>
            <th onClick={() => handleSort('category')} className={sortConfig.key === 'category' ? sortConfig.direction : ''}>
              Category
            </th>
            <th onClick={() => handleSort('cost_price')} className={sortConfig.key === 'cost_price' ? sortConfig.direction : ''}>
              Cost Price
            </th>
            <th onClick={() => handleSort('selling_price')} className={sortConfig.key === 'selling_price' ? sortConfig.direction : ''}>
              Selling Price
            </th>
            <th onClick={() => handleSort('quantity')} className={sortConfig.key === 'quantity' ? sortConfig.direction : ''}>
              Quantity
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name || 'N/A'}</td>
              <td>{item.brand || 'N/A'}</td>
              <td>{item.category || 'N/A'}</td>
              <td>{item.cost_price ? item.cost_price.toFixed(2) : 'N/A'}</td>
              <td>{item.selling_price ? item.selling_price.toFixed(2) : 'N/A'}</td>
              <td>{item.quantity !== undefined ? item.quantity : 'N/A'}</td>
              <td>
                <button onClick={() => handleEdit(item.id)} className="action-btn edit-btn">
                  Edit
                </button>
                <button onClick={() => onDelete(item.id)} className="action-btn delete-btn">
                  Delete
                </button>
                <button
                  onClick={() => alert(JSON.stringify(item, null, 2))}
                  className="action-btn view-btn"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;
