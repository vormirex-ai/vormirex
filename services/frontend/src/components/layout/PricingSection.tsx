import React from 'react';
import { Check, Sparkles } from 'lucide-react';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
}

interface Props {
  plans?: PricingPlan[];
}

const DEFAULT_PLANS: PricingPlan[] = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    description: 'Perfect for trying out',
    features: [
      '5 AI questions per day',
      'Access to 10 free courses',
      'Basic progress tracking',
      'Community forum access',
    ],
    buttonText: 'Start Free',
  },
  {
    name: 'Pro',
    price: '₹1,499',
    period: '/month',
    description: 'Best for serious learners',
    features: [
      'Unlimited AI questions',
      'Access to all 100+ courses',
      'Personalized learning paths',
      'Priority AI response',
    ],
    buttonText: 'Start Pro Trial',
    isPopular: true,
  },
  {
    name: 'Team',
    price: 'Custom',
    period: '/month',
    description: 'For schools & groups',
    features: [
      'Everything in Pro',
      'Up to 10 team members',
      'Admin dashboard',
      'Dedicated support',
    ],
    buttonText: 'Contact Sales',
  },
];

const PricingSection: React.FC<Props> = ({ plans = DEFAULT_PLANS }) => {
  return (
    <div className="pricing-container">
      <div className="header">
        <h1>
          Simple <span className="highlight">Pricing</span>
        </h1>
        <p>Choose the plan that fits your learning goals</p>
      </div>

      <div className="cards-wrapper">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`card ${plan.isPopular ? 'popular' : ''}`}
          >
            {plan.isPopular && (
              <div className="badge">
                <Sparkles size={14} />
                <span>Most Popular</span>
              </div>
            )}
            <div className="card-content">
              <h3 className="plan-name">{plan.name}</h3>
              <div className="price-row">
                <span className="price">{plan.price}</span>
                <span className="period">{plan.period}</span>
              </div>
              <p className="plan-desc">{plan.description}</p>

              <ul className="features-list">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex}>
                    <Check size={14} className="check-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`cta-button ${
                  plan.isPopular ? 'primary' : 'secondary'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="footer-info">
        <Sparkles size={14} className="sparkle-icon" />
        <span>14-day money-back guarantee • No credit card required</span>
      </div>

      <style>{`
        .pricing-container {
          background-color: #0a0a12;
          color: #ffffff;
          padding: 60px 20px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .header {
          text-align: center;
          margin-bottom: 50px;
        }

        .header h1 {
          font-size: 40px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        /* UPDATED: Highlight color */
        .header .highlight { color: #6aece1; }
        .header p { color: #8e8e93; font-size: 16px; }

        .cards-wrapper {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1100px;
          width: 100%;
          margin: 0 auto;
        }

        .card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 32px 24px; 
          position: relative;
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        /* UPDATED: Popular card styling using RGBA of #6aece1 */
        .card.popular {
          background: rgba(106, 236, 225, 0.05);
          border: 1px solid rgba(106, 236, 225, 0.4);
          box-shadow: 0 0 30px rgba(106, 236, 225, 0.05);
        }

        /* UPDATED: Badge background */
        .badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: #6aece1;
          color: #000;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .plan-name {
          font-size: 18px;
          font-weight: 600;
          text-align: center;
          margin-bottom: 8px;
        }

        .price-row {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 4px;
          margin-bottom: 4px;
        }

        .price { font-size: 36px; font-weight: 700; }
        .period { color: #8e8e93; font-size: 14px; }

        .plan-desc {
          text-align: center;
          color: #8e8e93;
          font-size: 14px;
          margin-bottom: 24px; 
        }

        .features-list {
          list-style: none;
          padding: 0;
          margin: 0 0 24px 0; 
        }

        .features-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px; 
          font-size: 13px;
          color: #d1d1d6;
        }

        /* UPDATED: Check icon color */
        .check-icon { color: #6aece1; flex-shrink: 0; }

        .cta-button {
          width: 100%;
          padding: 12px; 
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          border: none;
          margin-top: auto;
          transition: all 0.2s ease;
        }

        .cta-button:hover {
          transform: translateY(-2px);
        }

        /* UPDATED: Primary button background */
        .cta-button.primary { 
          background: #6aece1; 
          color: #000; 
          box-shadow: 0 4px 12px rgba(106, 236, 225, 0.2);
        }
        
        .cta-button.secondary { 
          background: rgba(255, 255, 255, 0.05); 
          color: #fff; 
          border: 1px solid rgba(255, 255, 255, 0.1); 
        }

        .cta-button.secondary:hover {
          border-color: #6aece1;
          color: #6aece1;
        }

        .footer-info { margin-top: 40px; color: #8e8e93; font-size: 13px; display: flex; align-items: center; gap: 8px; }
        
        .sparkle-icon { color: #6aece1; }

        @media (max-width: 1024px) { .cards-wrapper { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { .cards-wrapper { grid-template-columns: 1fr; max-width: 320px; } }
      `}</style>
    </div>
  );
};

export default PricingSection;
