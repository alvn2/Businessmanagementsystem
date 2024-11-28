// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // JSON Server base URL
});

// API calls for items (transforming object to array during fetch)
export const getItems = async () => {
  const response = await api.get('/items');
  const itemsArray = Object.keys(response.data).map((key) => response.data[key]);
  return itemsArray;
};
export const addItem = (item) => api.post('/items', item); // Add a new item
export const deleteItem = (id) => api.delete(`/items/${id}`); // Delete an item
export const updateItem = (id, item) => api.put(`/items/${id}`, item); // Update an item

export const getCredentials = () => api.get('/credentials'); // Fetch admin credentials (if needed)

export default api;
