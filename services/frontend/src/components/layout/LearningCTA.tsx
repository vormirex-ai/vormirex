import React from 'react';
import { Sparkles, Play, Apple } from 'lucide-react';

interface Props {
  title?: string;
  highlightText?: string;
  description?: string;
  primaryBtnText?: string;
  secondaryBtnText?: string;
}

const LearningCTA = (props: Props) => {
  const {
    title = 'Ready to Transform Your',
    highlightText = 'Learning?',
    description = 'Join 50,000+ learners already using Vormirex to make studying fun and effective. Your AI tutor is waiting!',
    primaryBtnText = 'Start Free Now',
    secondaryBtnText = 'Watch Demo',
  } = props;

  return (
    <div className="cta-container">
      <div className="cta-card">
        {/* Animated Background Glow - Updated to Cyan */}
        <div className="glow-effect"></div>

        <div className="cta-content">
          {/* Badge: Solid #6aece1 background, White Icon, Black Text */}
          <div className="cta-badge">
            <Sparkles size={14} color="#ffffff" fill="transparent" />
            <span>Start Learning Today</span>
          </div>

          <h1 className="cta-title">
            {title} <br />
            <span className="cta-highlight">{highlightText}</span>
          </h1>

          <p className="cta-description">{description}</p>

          <div className="cta-button-group">
            <button className="cta-btn-primary">
              <Sparkles size={18} />
              {primaryBtnText}
            </button>
            <button className="cta-btn-secondary">{secondaryBtnText}</button>
          </div>

          <div className="cta-store-group">
            <div className="cta-store-button">
              <Apple size={24} />
              <div className="cta-store-text">
                <span className="cta-store-label">Download on the</span>
                <span className="cta-store-name">App Store</span>
              </div>
            </div>
            <div className="cta-store-button">
              <div className="play-icon-wrapper">
                <Play size={18} fill="currentColor" />
              </div>
              <div className="cta-store-text">
                <span className="cta-store-label">Get it on</span>
                <span className="cta-store-name">Google Play</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cta-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 80px 20px;
          background-color: #0a0b10;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .cta-card {
          position: relative;
          width: 100%;
          max-width: 900px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 40px;
          padding: 50px 40px 70px 40px; 
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.7);
        }

        .glow-effect {
          position: absolute;
          top: 0%;
          left: 50%;
          transform: translateX(-50%);
          width: 500px;
          height: 400px;
          /* Updated glow to match the cyan brand */
          background: radial-gradient(circle, rgba(106, 236, 225, 0.15) 0%, rgba(106, 236, 225, 0) 70%);
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }

        .cta-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        /* --- UPDATED BADGE STYLING --- */
        .cta-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: #6aece1; /* Solid Cyan */
          color: #000000;            /* Black Text */
          border: none;              /* Removed border for cleaner look */
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: -10px; 
          margin-bottom: 35px;
          transition: transform 0.3s ease;
          box-shadow: 0 4px 15px rgba(106, 236, 225, 0.2);
        }

        .cta-card:hover .cta-badge {
          transform: translateY(-3px);
        }

        .cta-title {
          color: #ffffff;
          font-size: 52px;
          font-weight: 800;
          line-height: 1.1;
          margin: 0 0 20px 0;
          letter-spacing: -0.03em;
        }

        /* --- UPDATED HIGHLIGHT TEXT --- */
        .cta-highlight {
          color: #6aece1;
          /* Optional subtle gradient using the brand color */
          background: linear-gradient(to right, #6aece1, #33e0ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .cta-description {
          color: #94a3b8;
          font-size: 18px;
          line-height: 1.6;
          max-width: 580px;
          margin-bottom: 40px;
        }

        .cta-button-group {
          display: flex;
          gap: 16px;
          margin-bottom: 50px;
        }

        /* --- UPDATED PRIMARY BUTTON --- */
        .cta-btn-primary {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #6aece1; /* Brand Cyan */
          color: #0a0b10;      /* Dark text for contrast */
          border: none;
          padding: 16px 36px;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 10px 20px -10px rgba(106, 236, 225, 0.4);
        }

        .cta-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -10px rgba(106, 236, 225, 0.5);
          filter: brightness(1.1);
        }

        .cta-btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 16px 36px;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cta-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #6aece1; /* Highlight border on hover */
          color: #6aece1;
        }

        .cta-store-group {
          display: flex;
          gap: 20px;
        }

        .cta-store-button {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #000000;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 10px 24px;
          border-radius: 14px;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .cta-store-button:hover {
          background: #111;
          border-color: #6aece1;
          transform: translateY(-2px);
        }

        .cta-store-text { display: flex; flex-direction: column; }
        .cta-store-label { font-size: 10px; color: #94a3b8; text-transform: uppercase; }
        .cta-store-name { font-size: 16px; font-weight: 600; }

        .play-icon-wrapper { width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; }

        @media (max-width: 768px) {
          .cta-title { font-size: 36px; }
          .cta-button-group, .cta-store-group { flex-direction: column; width: 100%; }
          .cta-btn-primary, .cta-btn-secondary, .cta-store-button { width: 100%; justify-content: center; }
          .cta-card { padding: 40px 24px; }
        }
      `}</style>
    </div>
  );
};

export default LearningCTA;
