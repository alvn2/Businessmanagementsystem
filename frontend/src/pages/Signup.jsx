import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const existingUser = await axios.get(`http://localhost:5000/users?email=${email}`);
      if (existingUser.data.length > 0) {
        setError('Email is already registered.');
        return;
      }

      const newUser = { name, email, password };
      await axios.post('http://localhost:5000/users', newUser);
      setSuccessMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <InputField
          id="name"
          name="name"
          label="Name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <InputField
          id="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <InputField
          id="password"
          name="password"
          label="Password"
          placeholder="Create a password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <InputField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      <div className="signup-links">
        <span>Already have an account?</span>
        <Link to="/login"> Login</Link>
      </div>
    </div>
  );
}

export default Signup;
