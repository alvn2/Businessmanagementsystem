import React, { useEffect, useState, useMemo } from 'react';
import { getItems, addItem, deleteItem } from '../Services/Api';
import InventoryTable from '../components/InventoryTable';
import AddItemForm from '../components/AddItemForm';
import './Inventory.css';

function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch items from the API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const data = await getItems();
        setItems(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch items. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Handle deleting a single item
  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete item.');
    }
  };

  // Handle adding a new item
  const handleItemAdded = async (newItem) => {
    try {
      const addedItem = await addItem(newItem);
      setItems((prevItems) => [...prevItems, addedItem]);
    } catch (err) {
      console.error(err);
      setError('Failed to add item.');
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectedItems.map((id) => deleteItem(id)));
      setItems((prevItems) => prevItems.filter((item) => !selectedItems.includes(item.id)));
      setSelectedItems([]);
    } catch (err) {
      console.error(err);
      setError('Failed to delete selected items.');
    }
  };

  // Export selected items
  const handleExport = () => {
    const exportData = items.filter((item) => selectedItems.includes(item.id));
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'inventory_export.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Filtered items based on search and category
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((item) => (filterCategory ? item.category === filterCategory : true));
  }, [items, searchTerm, filterCategory]);

  // Paginated items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Handle pagination navigation
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="inventory-container">
      <h1>Inventory Management</h1>
      <p>Manage your inventory efficiently with real-time updates.</p>

      {/* Error message */}
      {error && <div className="error-message">{error}</div>}

      {/* Search and Filter */}
      <div className="inventory-filters">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Apparel">Apparel</option>
        </select>
        <button onClick={handleBulkDelete} disabled={!selectedItems.length}>
          Bulk Delete
        </button>
        <button onClick={handleExport} disabled={!selectedItems.length}>
          Export Selected
        </button>
      </div>

      {/* Add Item Form */}
      <div className="inventory-actions">
        <AddItemForm onItemAdded={handleItemAdded} />
      </div>

      {/* Low-stock notification */}
      <div className="low-stock-alert">
        {items.some((item) => item.quantity < 5) && (
          <div className="alert">
            ⚠️ Some items are running low on stock! Check your inventory.
          </div>
        )}
      </div>

      {/* Loading or inventory table */}
      {loading ? (
        <div className="loading-message">Loading items...</div>
      ) : (
        <>
          <InventoryTable
            items={currentItems}
            onDelete={handleDelete}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />

          {/* Pagination */}
          <div className="pagination">
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={page === currentPage ? 'active' : ''}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button onClick={goToNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Inventory;
