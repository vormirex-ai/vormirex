import React from 'react';
import SEO from '../common/SEO';
import './PricingSections.css';

const PricingPage: React.FC = () => {
  return (
    <section className="pricing-section">
      <SEO
        title="Pricing Plans – Vormirex"
        description="Choose the right plan for your learning journey with Vormirex. Flexible pricing for students and professionals."
        url="https://vormirex.com/pricing"
      />
      <div className="pricing-container">
        <h1 className="pricing-headline">Plans and Pricing</h1>
        <p className="pricing-subheadline">
          Choose a plan that fits your learning and growth journey.
        </p>

        <div className="pricing-grid">
          {/* Free Plan */}
          <div className="pricing-card">
            <div className="pricing-card-header">
              <h3>Free Plan</h3>
              <div className="price">
                ₹0 <span>/ month</span>
              </div>
            </div>

            <ul className="features-list">
              <li>Basic Courses</li>
              <li>Community Access</li>
              <li>Limited AI Assistance</li>
              <li>Email Support</li>
            </ul>

            <a href="#" className="pricing-btn">
              Start for Free
            </a>
          </div>

          {/* Pro Plan */}
          <div className="pricing-card featured">
            <div className="popular-badge">MOST POPULAR</div>

            <div className="pricing-card-header">
              <h3>Pro Plan</h3>
              <div className="price">
                ₹1,499 <span>/ month</span>
              </div>
            </div>

            <ul className="features-list">
              <li>All Courses Access</li>
              <li>Unlimited AI Sessions</li>
              <li>Hands-on Projects</li>
              <li>Priority Support</li>
            </ul>

            <a href="#" className="pricing-btn featured-btn">
              Start Free Trial
            </a>
          </div>

          {/* Advance Plan */}
          <div className="pricing-card">
            <div className="pricing-card-header">
              <h3>Advance Plan</h3>
              <div className="price">Custom</div>
            </div>

            <ul className="features-list">
              <li>Team Accounts</li>
              <li>Custom Learning Paths</li>
              <li>Dedicated Mentor</li>
              <li>Enterprise Support</li>
            </ul>

            <a href="#" className="pricing-btn">
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPage;
