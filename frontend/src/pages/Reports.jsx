import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './Reports.css';

function Reports() {
  const [report, setReport] = useState({ totalSales: 0, profit: 0, lowStock: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chartData, setChartData] = useState(null);

  // Fetch report data
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('http://localhost:5000/reports', {
          params: { startDate, endDate },
        });
        setReport(response.data.summary);
        setChartData(response.data.chartData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load reports. Please try again later.');
        setLoading(false);
      }
    };

    fetchReports();
  }, [startDate, endDate]);

  // Handle download in multiple formats
  const handleDownload = async (format) => {
    try {
      const response = await axios.get(`/api/reports/download?format=${format}`, {
        responseType: 'blob', // Handle binary data
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report.${format}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      setError('Error downloading report. Please try again.');
    }
  };

  return (
    <div className="reports-container">
      <h1>Reports</h1>

      {loading && <p className="loading-message">Loading reports...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <>
          <div className="date-filter">
            <label>
              Start Date:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label>
              End Date:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
            <button onClick={() => setLoading(true)}>Fetch Reports</button>
          </div>

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

          {chartData && (
            <div className="chart-container">
              <h3>Sales and Profit Trends</h3>
              <Bar
                data={{
                  labels: chartData.dates,
                  datasets: [
                    {
                      label: 'Total Sales',
                      data: chartData.sales,
                      backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    },
                    {
                      label: 'Total Profit',
                      data: chartData.profit,
                      backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Sales and Profit Trends' },
                  },
                }}
              />
            </div>
          )}

          <div className="download-buttons">
            <button className="download-button" onClick={() => handleDownload('csv')}>
              Download CSV
            </button>
            <button className="download-button" onClick={() => handleDownload('pdf')}>
              Download PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Reports;
