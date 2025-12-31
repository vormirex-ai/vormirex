import React from 'react';
import { BookX, Youtube, Users, Clock, ArrowRight } from 'lucide-react';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: CardProps) => (
  <div className="feature-card">
    <div className="icon-container">{icon}</div>
    <h3 className="card-title">{title}</h3>
    <p className="card-description">{description}</p>
  </div>
);

const SoundFamiliar = () => {
  const features = [
    {
      icon: <BookX size={22} />,
      title: 'Boring Studies',
      description: 'Traditional learning feels like a chore',
    },
    {
      icon: <Youtube size={22} />,
      title: 'Confusing Content',
      description: 'Hours wasted on random videos',
    },
    {
      icon: <Users size={22} />,
      title: 'No Personal Help',
      description: 'Group classes leave you behind',
    },
    {
      icon: <Clock size={22} />,
      title: 'Time Wasted',
      description: 'Endless searching for answers',
    },
  ];

  return (
    <section className="sound-familiar-container">
      <div className="bg-gradient-glow"></div>

      <div className="header">
        <h2 className="main-title">
          Sound <span className="highlight">Familiar?</span>
        </h2>
        <p className="subtitle">
          We&apos;ve all been there. Traditional learning just doesn&apos;t cut
          it anymore.
        </p>
      </div>

      <div className="grid">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>

      <div className="cta-wrapper">
        <div className="cta-pill">
          <span className="cta-text">With Vormirex</span>
          <ArrowRight size={16} className="cta-arrow" />
          <span className="cta-highlight">Learning becomes fun!</span>
        </div>
      </div>

      <style>{`
        :root{
          /* Vormirex accent */
          --vx-accent: #6aece1;
          --vx-accent-2: #1fb8ae;
          --vx-accent-bg: rgba(106, 236, 225, 0.12);
          --vx-accent-border: rgba(106, 236, 225, 0.28);
        }

        .sound-familiar-container {
          color: #ffffff;
          padding: 100px 20px;
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .header {
          text-align: center;
          margin-bottom: 50px;
          position: relative;
          z-index: 2;
        }

        .main-title {
          font-size: 52px;
          font-weight: 800;
          margin: 0 0 16px 0;
          letter-spacing: -2px;
        }

        .highlight {
          color: var(--vx-accent);
          text-shadow: 0 0 24px rgba(106, 236, 225, 0.12);
        }

        .subtitle {
          color: #94a3b8;
          font-size: 18px;
          max-width: 600px;
          margin: 0 auto;
          opacity: 0.85;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          width: 100%;
          max-width: 1200px;
          margin-bottom: 60px;
          position: relative;
          z-index: 2;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.10);
          border-radius: 24px;
          padding: 40px 30px;
          transition: transform 0.35s ease, border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease;
          position: relative;
          overflow: hidden;
        }

        /* subtle accent wash */
        .feature-card::before{
          content:"";
          position:absolute;
          inset:-2px;
          background: radial-gradient(500px 160px at 15% 0%,
            rgba(106, 236, 225, 0.10),
            transparent 60%);
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events:none;
        }

        .feature-card:hover {
          background: rgba(255, 255, 255, 0.045);
          border-color: var(--vx-accent-border);
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.45);
        }
        .feature-card:hover::before{ opacity: 1; }

        .icon-container {
          color: var(--vx-accent);
          margin-bottom: 24px;
          background: var(--vx-accent-bg);
          border: 1px solid rgba(106, 236, 225, 0.16);
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 22px rgba(0,0,0,0.25);
        }

        .card-title {
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 12px 0;
          color: #ffffff;
          position: relative;
          z-index: 1;
        }

        .card-description {
          font-size: 15px;
          color: #8b949e;
          line-height: 1.6;
          position: relative;
          z-index: 1;
        }

        .cta-pill {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.10);
          padding: 12px 28px;
          border-radius: 999px;
          z-index: 2;
          backdrop-filter: blur(8px);
        }

        .cta-text { color: #c9d1d9; }

        .cta-arrow { color: var(--vx-accent); }

        .cta-highlight {
          color: var(--vx-accent);
          font-weight: 600;
        }

        .bg-gradient-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 650px;
          height: 650px;
          background: radial-gradient(circle,
            rgba(106, 236, 225, 0.06) 0%,
            rgba(31, 184, 174, 0.03) 35%,
            transparent 70%);
          pointer-events: none;
          z-index: 1;
          filter: blur(2px);
        }

        @media (max-width: 1024px) {
          .grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .grid { grid-template-columns: 1fr; }
          .main-title { font-size: 38px; }
        }
      `}</style>
    </section>
  );
};

export default SoundFamiliar;
