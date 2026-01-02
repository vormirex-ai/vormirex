import React from 'react';
import { Sparkles, Play, Apple } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  title?: string;
  highlightText?: string;
  description?: string;
  primaryBtnText?: string;
  secondaryBtnText?: string;
}

const LearningCTA = (props: Props) => {
  const navigate = useNavigate();

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
        <div className="glow-effect"></div>

        <div className="cta-content">
          <div className="cta-badge">
            <Sparkles size={14} color="#ffffff" />
            <span>Start Learning Today</span>
          </div>

          <h1 className="cta-title">
            {title} <br />
            <span className="cta-highlight">{highlightText}</span>
          </h1>

          <p className="cta-description">{description}</p>

          <div className="cta-button-group">
            <button
              className="cta-btn-primary"
              onClick={() => navigate('/auth/signup')} // FIXED: Pointed to the correct route
            >
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
        .cta-container { display: flex; justify-content: center; align-items: center; padding: 80px 20px; background-color: #0a0b10; }
        .cta-card { position: relative; width: 100%; max-width: 900px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 40px; padding: 50px 40px 70px; overflow: hidden; text-align: center; box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.7); }
        .glow-effect { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 500px; height: 400px; background: radial-gradient(circle, rgba(106, 236, 225, 0.15), transparent 70%); filter: blur(80px); z-index: 0; }
        .cta-content { position: relative; z-index: 1; }
        .cta-badge { display: inline-flex; align-items: center; gap: 8px; background-color: #6aece1; color: #000; padding: 6px 16px; border-radius: 100px; font-size: 13px; font-weight: 700; margin-bottom: 35px; }
        .cta-title { color: #fff; font-size: 52px; font-weight: 800; line-height: 1.1; margin-bottom: 20px; }
        .cta-highlight { background: linear-gradient(to right, #6aece1, #33e0ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .cta-description { color: #94a3b8; font-size: 18px; max-width: 580px; margin: 0 auto 40px; }
        .cta-button-group { display: flex; gap: 16px; justify-content: center; margin-bottom: 50px; }
        .cta-btn-primary { display: flex; align-items: center; gap: 10px; background: #6aece1; color: #0a0b10; padding: 16px 36px; border-radius: 16px; font-weight: 700; border: none; cursor: pointer; transition: transform 0.2s; }
        .cta-btn-primary:hover { transform: scale(1.02); }
        .cta-btn-secondary { background: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.1); padding: 16px 36px; border-radius: 16px; cursor: pointer; }
        .cta-store-group { display: flex; gap: 20px; justify-content: center; }
        .cta-store-button { display: flex; align-items: center; gap: 12px; background: #000; padding: 10px 24px; border-radius: 14px; color: white; border: 1px solid rgba(255,255,255,0.1); }
        .cta-store-text { display: flex; flex-direction: column; text-align: left; }
        .cta-store-label { font-size: 10px; color: #94a3b8; }
        .cta-store-name { font-size: 16px; font-weight: 600; }
        @media (max-width: 768px) { .cta-title { font-size: 36px; } .cta-button-group, .cta-store-group { flex-direction: column; align-items: center; } }
      `}</style>
    </div>
  );
};

export default LearningCTA;
