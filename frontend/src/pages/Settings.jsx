import React, { useState } from 'react';
import './Settings.css';

function Settings() {
  const [businessName, setBusinessName] = useState('My Business');
  const [currency, setCurrency] = useState('USD');
  const [lowStockThreshold, setLowStockThreshold] = useState(10);

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <form className="settings-form">
        <label>
          Business Name:
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </label>
        <label>
          Currency:
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="KES">KES</option>
            <option value="INR">INR</option>
          </select>
        </label>
        <label>
          Low Stock Threshold:
          <input
            type="number"
            value={lowStockThreshold}
            onChange={(e) => setLowStockThreshold(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleSave}>
          Save Settings
        </button>
      </form>
    </div>
  );
}

export default Settings;
