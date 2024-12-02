import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      icon: <i className="fas fa-box h-8 w-8 text-blue-500" />,
      title: "Advanced Inventory Tracking",
      description: "Real-time stock monitoring with intelligent low-stock alerts and comprehensive item management.",
      demoContent: "Track every item with precision. Get instant notifications when stock levels drop, ensuring you never miss a sales opportunity."
    },
    {
      icon: <i className="fas fa-chart-line h-8 w-8 text-green-500" />,
      title: "Comprehensive Reporting",
      description: "Powerful analytics to understand sales trends, profit margins, and inventory performance.",
      demoContent: "Generate detailed reports with visual insights. Understand your business's financial health at a glance."
    },
    {
      icon: <i className="fas fa-user-cog h-8 w-8 text-purple-500" />,
      title: "Customizable Workflow",
      description: "Flexible system adaptable to your unique business requirements and processes.",
      demoContent: "Customize dashboards, set personalized alerts, and configure workflows that match your business model."
    },
    {
      icon: <i className="fas fa-users h-8 w-8 text-teal-500" />,
      title: "Customer Management",
      description: "Manage and track customer information to improve sales and support.",
      demoContent: "Create customer profiles, track order history, and personalize communications to build stronger customer relationships."
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="home-header text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Inventory Manager
        </h1>
        <p>Your ultimate tool to track, optimize, and grow your inventory seamlessly.</p>
        <Link to="/login" className="cta-button primary">
          Get Started
        </Link>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2>Features You'll Love</h2>
        <div className="features">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              {activeFeature === index && (
                <div className="demo-content">
                  <p>{feature.demoContent}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="quick-links">
        <h2>Explore Key Features</h2>
        <div className="link-cards">
          <Link to="/inventory" className="link-card">
            <i className="fas fa-warehouse h-8 w-8 text-blue-500"></i>
            <h3>Inventory</h3>
            <p>Manage your stock efficiently.</p>
          </Link>
          <Link to="/orders" className="link-card">
            <i className="fas fa-shopping-cart h-8 w-8 text-green-500"></i>
            <h3>Orders</h3>
            <p>Track and fulfill customer orders.</p>
          </Link>
          <Link to="/reports" className="link-card">
            <i className="fas fa-chart-pie h-8 w-8 text-orange-500"></i>
            <h3>Reports</h3>
            <p>Analyze your business performance.</p>
          </Link>
          <Link to="/settings" className="link-card">
            <i className="fas fa-cogs h-8 w-8 text-purple-500"></i>
            <h3>Settings</h3>
            <p>Customize your app preferences.</p>
          </Link>
        </div>
      </section>

      {/* Role Information Section */}
      <section className="role-info">
        <h2>Role-Based Features</h2>
        <div className="roles">
          <div className="role">
            <h3>Admin</h3>
            <p>Full access to all features including user management and advanced analytics.</p>
          </div>
          <div className="role">
            <h3>Standard User</h3>
            <p>Access to essential tools like inventory management and order tracking.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
        <div className="testimonials">
          <div className="testimonial-item">
            <p className="text-gray-700">"Inventory Manager has transformed our business. We've seen a significant increase in efficiency and productivity."</p>
            <div className="testimonial-author">
              <span className="font-bold">John Doe</span>, CEO of XYZ Inc.
            </div>
          </div>
          <div className="testimonial-item">
            <p className="text-gray-700">"The support team is fantastic. They've helped us every step of the way, ensuring a smooth onboarding process."</p>
            <div className="testimonial-author">
              <span className="font-bold">Jane Smith</span>, COO of ABC Enterprises
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq">
          <div className="faq-item">
            <h3>How do I get started?</h3>
            <p>Sign up for a free trial, or contact us for more information.</p>
          </div>
          <div className="faq-item">
            <h3>What are the benefits of the Admin role?</h3>
            <p>Admins have full control over settings, user management, and advanced reporting features.</p>
          </div>
          <div className="faq-item">
            <h3>Can I track orders and customers?</h3>
            <p>Yes, our system supports order and customer management for seamless operations.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section text-center bg-gray-50 py-8">
        <h2 className="text-2xl font-bold">Ready to get started?</h2>
        <p>Join thousands of businesses already using Inventory Manager to streamline their inventory management.</p>
        <div className="cta-actions space-x-4 mt-6">
          <Link to="/signup" className="cta-button primary">
            Start Free Trial
          </Link>
          <Link to="/contact" className="cta-button secondary">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
