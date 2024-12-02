import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  LineController,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Dashboard.css';

// Register the necessary components for the chart
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, LineController, Title, Tooltip, Legend);

function Dashboard({ navigateTo }) {
  const [stats, setStats] = useState({
    totalItems: 0,
    profitThisMonth: 0,
    lowStockItems: 0,
    totalSales: 0,
    totalOrders: 0,
    turnoverRate: 0,
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Fetch stats from the backend
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:3000/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    // Fetch chart data from the backend
    const fetchChartData = async () => {
      try {
        const response = await fetch('http://localhost:3000/salesTrend');
        const data = await response.json();
        setChartData({
          labels: data.labels,
          datasets: [
            {
              label: 'Sales',
              data: data.values,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchStats();
    fetchChartData();
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Sales Trend' },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `$${tooltipItem.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Overview of your business performance and inventory status.</p>
      </header>

      {/* Stats Section */}
      <section className="dashboard-stats">
        {Object.entries(stats).map(([key, value]) => (
          <div className="stat" key={key} onClick={() => navigateTo(key)}>
            <h2>{key === 'profitThisMonth' ? `$${value.toLocaleString()}` : value}</h2>
            <p>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</p>
          </div>
        ))}
      </section>

      {/* Sales Trend Chart */}
      <section className="dashboard-chart">
        <h2>Sales Trend</h2>
        <Line data={chartData} options={chartOptions} />
      </section>

      {/* Notifications Section */}
      <section className="notifications">
        <h2>Notifications</h2>
        <ul>
          <li>⚠️ {stats.lowStockItems} items are low in stock!</li>
          <li>📦 New order received.</li>
          <li>🔔 Reminder: Monthly inventory audit due next week.</li>
        </ul>
      </section>

      {/* Action Buttons Section */}
      <section className="action-buttons">
        <h2>Quick Actions</h2>
        <div className="buttons-container">
          <button className="action-button" onClick={() => navigateTo('inventory')}>Manage Inventory</button>
          <button className="action-button" onClick={() => navigateTo('reports')}>View Reports</button>
          <button className="action-button" onClick={() => navigateTo('orders')}>Manage Orders</button>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
