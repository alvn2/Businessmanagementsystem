import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reports.css';

function Reports() {
  const [report, setReport] = useState({ totalSales: 0, profit: 0, lowStock: 0 });

  useEffect(() => {
    const fetchReports = async () => {
      const response = await axios.get('http://localhost:5000/reports'); // Add reports to `db.json` if needed
      setReports(response.data);
    };
  
    fetchReports();
  }, []);
  

  const handleDownload = async () => {
    try {
      const response = await axios.get('/api/reports/download', {
        responseType: 'blob', // Handle binary data
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  return (
    <div className="reports-container">
      <h1>Reports</h1>
      <div className="report-cards">
        <div className="report-card">
          <h2>Total Sales</h2>
          <p>${report.totalSales}</p>
        </div>
        <div className="report-card">
          <h2>Total Profit</h2>
          <p>${report.profit}</p>
        </div>
        <div className="report-card">
          <h2>Low Stock Items</h2>
          <p>{report.lowStock}</p>
        </div>
      </div>
      <button className="download-button" onClick={handleDownload}>
        Download Report
      </button>
    </div>
  );
}

export default Reports;
