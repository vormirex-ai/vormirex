import React, { useState, useEffect } from 'react';
import { Sparkles, Play, Circle } from 'lucide-react';
import logo from '../../assets/logo.png';

interface LandingPageProps {
  brandName?: string;
  heroSubtitle?: string;
}

const VormirexLanding: React.FC<LandingPageProps> = ({
  brandName = 'VORMIREX',
  heroSubtitle = 'Your friendly AI teacher available 24/7 to turn studying into an exciting adventure.',
}) => {
  const [scrolled, setScrolled] = useState(false);

  const goToDashboard = () => {
    console.log('Navigating...');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="container">
      {/* Watermark Logo - Fixed Position */}
      <div className={`watermark-logo ${scrolled ? 'visible' : ''}`}>
        <img src={logo} alt="Vormirex Watermark" />
      </div>

      {/* Hero Section */}
      <main className="hero">
        <div className="glow-bg"></div>
        <div className="badge">
          <Sparkles size={14} className="cyan-text" />
          <span>AI-Powered Learning Platform</span>
        </div>{' '}
        <h1 className="hero-title">
          Learning That Feels <span className="cyan-text">Like Playing</span>
        </h1>
        <p className="hero-subtitle">{heroSubtitle}</p>
        {/* Buttons using the new color */}
        <div className="cta-group">
          <button className="btn-primary-hero large">
            <Sparkles size={18} />
            Start Free
          </button>
          <button className="btn-secondary large">
            <Play size={18} fill="currentColor" />
            Try AI Demo
          </button>
        </div>
        {/* Stats */}
        <div className="stats-container">
          <div className="stat-item">
            <h3>50K+</h3>
            <p>Active Learners</p>
          </div>
          <div className="stat-item">
            <h3>100+</h3>
            <p>Courses</p>
          </div>
          <div className="stat-item">
            <h3>4.9</h3>
            <p>User Rating</p>
          </div>
        </div>
        {/* AI Chat Card */}
        <div className="ai-card-wrapper">
          <div className="status-indicator">
            <Circle size={8} fill="#6aece1" color="#6aece1" />
            <span>24/7 AI Active</span>
          </div>
          <div className="ai-card">
            <div className="ai-card-header">
              <div className="ai-avatar">
                <Sparkles size={20} color="#000" />
              </div>
              <div className="ai-info">
                <span className="ai-name">VORMII</span>
                <span className="ai-tag">AI Tutor</span>
              </div>
            </div>
            <p className="ai-message">
              Hello! 👋 I'm Vormi, your personal AI learning companion. What
              would you like to learn today?
            </p>
            <div className="ai-suggestions">
              <button className="suggestion-chip">Math Help</button>
              <button className="suggestion-chip">Learn Python</button>
              <button className="suggestion-chip">English Practice</button>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        /* RESET & BASE */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .container {
          min-height: 100vh;
          background-color: #0a0b14; /* Reverted to Dark Background */
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow-y: auto;
        }

        /* WATERMARK LOGO */
/* WATERMARK LOGO */
.watermark-logo {
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  height: 420px;
  opacity: 0;
  z-index: 0;
  pointer-events: none;
  transition: opacity 0.6s ease;
}

.watermark-logo.visible {
  opacity: 0.02; /* VERY SUBTLE */
}

.watermark-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: blur(1.2px);
}
@media (max-width: 768px) {
  .watermark-logo {
    width: 260px;
    height: 260px;
  }
}






        /* HERO SECTION */
        .hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 92px 0 60px 0;
          position: relative;
          width: 100%;
          z-index: 2;
        }

        .glow-bg {
          position: absolute;
          top: 20%;
          width: 600px;
          height: 600px;
          /* Updated glow to match new color */
          background: radial-gradient(circle, rgba(106, 236, 225, 0.15) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
          left: 50%;
          transform: translateX(-50%);
        }

        .badge {
          background: rgba(255, 255, 255, 0.05);
          margin-top: 40px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 8px 16px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: #94a3b8;
          margin-bottom: 24px;
          position: relative;
          z-index: 2;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          max-width: 850px;
          line-height: 1.1;
          margin-bottom: 20px;
          position: relative;
          z-index: 2;
          padding: 0 20px;
        }

        /* Updated Text Accent Color */
        .cyan-text { color: #6aece1; }

        .hero-subtitle {
          color: #94a3b8;
          font-size: 1.2rem;
          max-width: 600px;
          margin-bottom: 40px;
          position: relative;
          z-index: 2;
          padding: 0 20px;
        }

        .cta-group {
          display: flex;
          gap: 20px;
          margin-bottom: 60px;
          position: relative;
          z-index: 2;
        }

        /* --- UPDATED HERO START FREE BUTTON --- */
        .btn-primary-hero {
          background: #6aece1; /* YOUR REQUESTED COLOR */
          border: none;
          color: #0a0b14; /* Dark text for contrast */
          padding: 14px 32px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
          z-index: 2;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .btn-primary-hero:hover {
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(106, 236, 225, 0.5);
        }

        /* --- UPDATED TRY AI DEMO BUTTON --- */
        .btn-secondary {
          background: rgba(106, 236, 225, 0.05); /* Slight tint of the color */
          border: 1px solid #6aece1; /* Border is the requested color */
          color: #6aece1; /* Text is the requested color */
          padding: 14px 32px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
          z-index: 2;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .btn-secondary:hover {
            transform: scale(1.05);
            background: rgba(106, 236, 225, 0.15);
        }

        .stats-container {
          display: flex;
          gap: 60px;
          margin-bottom: 60px;
          position: relative;
          z-index: 2;
        }

        .stat-item h3 {
          font-size: 2.5rem;
          margin: 0;
          color: #6aece1; /* Updated to new color */
        }

        .stat-item p {
          color: #94a3b8;
          font-size: 0.9rem;
        }

        .ai-card-wrapper {
          width: 100%;
          max-width: 600px;
          position: relative;
          z-index: 2;
          padding: 0 20px;
        }

        .status-indicator {
          position: absolute;
          top: -35px;
          right: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: #94a3b8;
          z-index: 2;
        }

        .ai-card {
          background: rgba(13, 17, 28, 0.8);
          border: 1px solid rgba(106, 236, 225, 0.2); /* Border tint */
          border-radius: 24px;
          padding: 30px;
          text-align: left;
          backdrop-filter: blur(10px);
          position: relative;
          z-index: 2;
        }

        .ai-card-header {
          display: flex;
          gap: 12px;
          margin-bottom: 15px;
        }

        .ai-avatar {
          width: 40px;
          height: 40px;
          background: #6aece1; /* Updated avatar background */
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ai-name {
          font-weight: 700;
        }

        .ai-tag {
          font-size: 0.7rem;
          color: #6aece1;
          background: rgba(106, 236, 225, 0.1);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .ai-message {
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .suggestion-chip {
          background: none;
          border: 1px solid rgba(255,255,255,0.1);
          color: #94a3b8;
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          margin-right: 8px;
          font-size: 0.85rem;
          transition: all 0.2s ease;
        }

        .suggestion-chip:hover {
            background: rgba(106, 236, 225, 0.1);
            border-color: #6aece1;
            color: #6aece1;
        }

        @media (max-width: 960px) {
          .hero-title { font-size: 2.5rem; }
          .stats-container {
              flex-direction: column;
              gap: 20px;
              margin-bottom: 40px;
          }
          .hero { padding-top: 80px; }
          .watermark-logo {
            width: 300px;
            height: 300px;
          }
        }

        @media (max-width: 480px) {
          .watermark-logo {
            width: 250px;
            height: 250px;
          }
          .hero-title { font-size: 2rem; }
          .hero-subtitle { font-size: 1rem; }
          .cta-group { flex-direction: column; }
          .btn-primary-hero, .btn-secondary { width: 100%; }
          .status-indicator { display: none; }
          .ai-card-wrapper { padding: 0 10px; }
        }
      `}</style>
    </div>
  );
};

export default VormirexLanding;
