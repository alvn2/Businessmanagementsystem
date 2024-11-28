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

function Dashboard() {
  // Sample data for the chart
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Sales',
        data: [5000, 7000, 6000, 8000],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4, // Smooth line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Trend',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `$${tooltipItem.raw.toLocaleString()}`; // Format tooltip values as currency
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`, // Format y-axis values as currency
        },
      },
    },
  };

  // Simulate fetching data for dashboard stats
  const [stats, setStats] = useState({
    totalItems: 150,
    profitThisMonth: 20000,
    lowStockItems: 25,
    totalSales: 100,
    totalOrders: 75,
    turnoverRate: 1.5,
  });

  useEffect(() => {
    // Simulate an API call to fetch updated stats (e.g., after 5 seconds)
    const timer = setTimeout(() => {
      setStats({
        totalItems: 160,
        profitThisMonth: 25000,
        lowStockItems: 30,
        totalSales: 120,
        totalOrders: 90,
        turnoverRate: 1.8,
      });
    }, 5000);

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Overview of your business performance and inventory status.</p>
      </header>

      {/* Stats Section */}
      <section className="dashboard-stats">
        {Object.keys(stats).map((key) => (
          <div className="stat" key={key}>
            <h2>{key === 'profitThisMonth' ? `$${stats[key].toLocaleString()}` : stats[key]}</h2>
            <p>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</p>
          </div>
        ))}
      </section>

      {/* Sales Trend Chart */}
      <section className="dashboard-chart">
        <h2>Sales Trend</h2>
        <Line data={data} options={options} />
      </section>

      {/* Recent Activity Section */}
      <section className="recent-activity">
        <h2>Recent Activity</h2>
        <ul>
          <li>Sold 10 items of Product A</li>
          <li>Restocked 5 items of Product B</li>
          <li>Added new item: Product C</li>
          <li>Sold 3 items of Product D</li>
        </ul>
      </section>

      {/* Notifications Section */}
      <section className="notifications">
        <h2>Notifications</h2>
        <ul>
          <li>⚠️ 5 items are low in stock!</li>
          <li>📦 New order received for Product E.</li>
          <li>🔔 Reminder: Monthly inventory audit due next week.</li>
        </ul>
      </section>

      {/* Action Buttons Section */}
      <section className="action-buttons">
        <h2>Quick Actions</h2>
        <div className="buttons-container">
          <button className="action-button">Add New Inventory Item</button>
          <button className="action-button">View Reports</button>
          <button className="action-button">Manage Orders</button>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
