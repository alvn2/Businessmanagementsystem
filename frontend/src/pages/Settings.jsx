import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Settings.css';

function Settings() {
  const [businessName, setBusinessName] = useState('My Business');
  const [currency, setCurrency] = useState('USD');
  const [lowStockThreshold, setLowStockThreshold] = useState(10);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  // Save settings handler
  const handleSave = () => {
    if (!businessName.trim()) {
      toast.error('Business Name cannot be empty.');
      return;
    }

    if (lowStockThreshold < 0) {
      toast.error('Low Stock Threshold must be a positive number.');
      return;
    }

    const settings = {
      businessName,
      currency,
      lowStockThreshold,
      darkMode,
      emailNotifications,
      smsNotifications,
    };

    // Simulate saving settings to server
    console.log('Settings saved:', settings);
    toast.success('Settings saved successfully!');
  };

  // Reset to default settings
  const handleReset = () => {
    setBusinessName('My Business');
    setCurrency('USD');
    setLowStockThreshold(10);
    setDarkMode(false);
    setEmailNotifications(true);
    setSmsNotifications(false);
    toast.info('Settings reset to default.');
  };

  return (
    <div className={`settings-container ${darkMode ? 'dark-mode' : ''}`}>
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
            min="0"
          />
        </label>
        <label>
          Dark Mode:
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
        </label>
        <label>
          Email Notifications:
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
          />
        </label>
        <label>
          SMS Notifications:
          <input
            type="checkbox"
            checked={smsNotifications}
            onChange={(e) => setSmsNotifications(e.target.checked)}
          />
        </label>
        <div className="button-group">
          <button type="button" onClick={handleSave} className="save-button">
            Save Settings
          </button>
          <button type="button" onClick={handleReset} className="reset-button">
            Reset to Default
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
