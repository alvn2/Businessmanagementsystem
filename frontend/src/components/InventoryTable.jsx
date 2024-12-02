import React, { useState } from 'react';
import './InventoryTable.css';

function InventoryTable({ items, onDelete, onEdit }) {
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtering logic
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting logic
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = sortedItems.slice(startIndex, startIndex + itemsPerPage);

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

  // Pagination navigation
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="inventory-table-container">
      <div className="inventory-table-header">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="inventory-search-bar"
        />
      </div>

      <div className="inventory-table-wrapper">
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
            {paginatedItems.map((item) => (
              <tr key={item.id} className={item.quantity < 5 ? 'low-stock' : ''}>
                <td>{item.id}</td>
                <td>{item.name || 'N/A'}</td>
                <td>{item.brand || 'N/A'}</td>
                <td>{item.category || 'N/A'}</td>
                <td>{item.cost_price ? item.cost_price.toFixed(2) : 'N/A'}</td>
                <td>{item.selling_price ? item.selling_price.toFixed(2) : 'N/A'}</td>
                <td>{item.quantity !== undefined ? item.quantity : 'N/A'}</td>
                <td>
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="action-btn edit-btn"
                    title="Edit this item"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="action-btn delete-btn"
                    title="Delete this item"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => alert(JSON.stringify(item, null, 2))}
                    className="action-btn view-btn"
                    title="View item details"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="inventory-pagination">
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num + 1}
            onClick={() => handlePageChange(num + 1)}
            className={currentPage === num + 1 ? 'active' : ''}
          >
            {num + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default InventoryTable;
