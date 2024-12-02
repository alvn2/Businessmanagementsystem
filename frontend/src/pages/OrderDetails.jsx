import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import './OrderDetails.css';

function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/api/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    history.push('/orders');
  };

  return (
    <div className="order-details-container">
      <h2>Order Details</h2>
      <div className="order-info">
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Customer Name:</strong> {order.customerName}</p>
        <p><strong>Item(s):</strong> {order.items.join(', ')}</p>
        <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
        <p><strong>Quantity:</strong> {order.quantity}</p>
        <p><strong>Status:</strong> {order.status}</p>
      </div>
      <button onClick={handleBack} className="back-button">Back to Orders</button>
    </div>
  );
}

export default OrderDetails;
