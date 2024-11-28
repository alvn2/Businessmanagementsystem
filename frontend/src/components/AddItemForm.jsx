import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddItemForm.css';

function AddItemForm({ onItemAdded }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');

  const categories = ['Electronics', 'Clothing', 'Home', 'Books', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !category || !brand || !price || !quantity) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const newItem = {
      name,
      category,
      brand,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      description,
    };

    onItemAdded(newItem);
    toast.success('Item added successfully!');

    setName('');
    setCategory('');
    setBrand('');
    setPrice('');
    setQuantity('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">Add New Item</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium">
          Name:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 block w-full border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium">
          Category:
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 p-2 block w-full border rounded-md"
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="brand" className="block text-sm font-medium">
          Brand:
        </label>
        <input
          id="brand"
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="mt-1 p-2 block w-full border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium">
          Price:
        </label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1 p-2 block w-full border rounded-md"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="quantity" className="block text-sm font-medium">
          Quantity:
        </label>
        <input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="mt-1 p-2 block w-full border rounded-md"
          min="0"
          step="1"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium">
          Description (Optional):
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 block w-full border rounded-md"
        />
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={!name || !category || !brand || !price || !quantity}
        >
          Add Item
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          onClick={() => {
            setName('');
            setCategory('');
            setBrand('');
            setPrice('');
            setQuantity('');
            setDescription('');
          }}
        >
          Reset
        </button>
      </div>
    </form>
  );
}

export default AddItemForm;
