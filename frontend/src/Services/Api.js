import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // JSON Server base URL
});

// Fetch all items (transforms object to array)
export const getItems = async () => {
  try {
    const response = await api.get('/items');
    // Transform the object response into an array
    const itemsArray = Object.keys(response.data).map((key) => response.data[key]);
    return itemsArray;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error; // Let the caller handle the error
  }
};

// Add a new item
export const addItem = async (item) => {
  try {
    const response = await api.post('/items', item);
    return response.data; // Return the added item
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
};

// Delete an item by ID
export const deleteItem = async (id) => {
  try {
    await api.delete(`/items/${id}`);
    return { success: true, message: 'Item deleted successfully' };
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

// Update an item by ID
export const updateItem = async (id, updatedItem) => {
  try {
    const response = await api.put(`/items/${id}`, updatedItem);
    return response.data; // Return the updated item
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

// Fetch admin credentials
export const getCredentials = async () => {
  try {
    const response = await api.get('/credentials');
    return response.data;
  } catch (error) {
    console.error('Error fetching credentials:', error);
    throw error;
  }
};

// Search items by name or category
export const searchItems = async (query) => {
  try {
    const response = await api.get(`/items?name_like=${query}`);
    return response.data; // Returns an array of matching items
  } catch (error) {
    console.error('Error searching items:', error);
    throw error;
  }
};

// Login (checks credentials)
export const login = async (username, password) => {
  try {
    const credentials = await getCredentials();
    if (credentials.username === username && credentials.password === password) {
      return { success: true, message: 'Login successful' };
    } else {
      throw new Error('Invalid username or password');
    }
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, message: error.message };
  }
};

export default api;
