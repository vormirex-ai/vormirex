import React from 'react';
import {
  UserPlus,
  Video,
  MessageSquare,
  Gamepad2,
  TrendingUp,
  Users,
  BookOpen,
  Star,
  Clock,
} from 'lucide-react';

interface StepProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StepCard = ({ number, icon, title, description }: StepProps) => (
  <div className="step-card">
    <div className="step-number">{number}</div>
    <div className="step-icon-container">{icon}</div>
    <h3 className="step-title">{title}</h3>
    <p className="step-description">{description}</p>
  </div>
);

const StatCard = ({ icon, value, label }: StatProps) => (
  <div className="stat-card">
    <div className="stat-icon-container">{icon}</div>
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
  </div>
);

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: <UserPlus size={24} />,
      title: 'Sign Up',
      description: 'Create your free account in seconds',
    },
    {
      number: 2,
      icon: <Video size={24} />,
      title: 'Join Sessions',
      description: 'Attend live or recorded lessons',
    },
    {
      number: 3,
      icon: <MessageSquare size={24} />,
      title: 'Ask AI',
      description: 'Get instant answers from Vormi',
    },
    {
      number: 4,
      icon: <Gamepad2 size={24} />,
      title: 'Play Quizzes',
      description: 'Test your knowledge with fun games',
    },
    {
      number: 5,
      icon: <TrendingUp size={24} />,
      title: 'Track Progress',
      description: 'Watch yourself grow every day',
    },
  ];

  const stats = [
    { icon: <Users size={24} />, value: '50,000+', label: 'Active Learners' },
    {
      icon: <BookOpen size={24} />,
      value: '100+',
      label: 'Interactive Courses',
    },
    { icon: <Star size={24} />, value: '4.9/5', label: 'User Rating' },
    { icon: <Clock size={24} />, value: '24/7', label: 'AI Support' },
  ];

  const partners = ['MIT', 'Stanford', 'Harvard', 'Google', 'Microsoft'];

  return (
    <div className="how-it-works-root">
      <section className="how-it-works-content">
        <h1 className="main-title">
          How It <span className="highlight">Works</span>
        </h1>
        <p className="subtitle">
          Start your learning journey in just a few simple steps
        </p>

        <div className="steps-wrapper">
          <div className="connecting-line">
            <svg
              width="100%"
              height="40"
              viewBox="0 0 1000 40"
              fill="none"
              preserveAspectRatio="none"
              style={{ position: 'relative', top: '15px' }}
            >
              <path
                d="M0,20 Q125,0 250,20 T500,20 T750,20 T1000,20"
                stroke="rgba(106, 236, 225, 0.2)"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </svg>
          </div>

          <div className="steps-grid">
            {steps.map((step) => (
              <StepCard key={step.number} {...step} />
            ))}
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-container">
            <span className="progress-text">Your Progress</span>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill"></div>
            </div>
            <span className="progress-percentage">60%</span>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </section>

      <style>{`
        .how-it-works-root {
          background-color: #050a15;
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
        }

        .how-it-works-content {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
          padding: 80px 20px 120px 20px;
        }

        .main-title {
          font-size: 2.8rem;
          font-weight: 800;
          margin-bottom: 15px;
          letter-spacing: -1px;
        }

        /* UPDATED: Vormirex accent */
        .highlight { color: #6aece1; }

        .subtitle {
          color: #8892b0;
          font-size: 1.1rem;
          margin-bottom: 20px;
        }

        .steps-wrapper {
          position: relative;
          margin-top: 60px;
          margin-bottom: 60px;
        }

        .connecting-line {
          position: absolute;
          top: 60px;
          left: 0; right: 0;
          z-index: 0;
          opacity: 0.4;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
          position: relative;
          z-index: 1;
        }

        .step-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 35px 15px;
          transition: all 0.3s ease;
          position: relative;
        }

        .step-card:hover {
          transform: translateY(-6px);
          border-color: rgba(106, 236, 225, 0.35);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
        }

        .step-number {
          position: absolute;
          top: -12px; left: 50%;
          transform: translateX(-50%);
          background: #050a15;
          color: #6aece1;
          width: 28px; height: 28px;
          border-radius: 50%;
          font-size: 12px;
          font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid #6aece1;
        }

        /* UPDATED: Vormirex accent */
        .step-icon-container {
          color: #6aece1;
          margin-bottom: 20px;
          display: flex;
          justify-content: center;
        }

        .step-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 10px; }
        .step-description { color: #94a3b8; font-size: 0.85rem; line-height: 1.5; }

        .progress-section { display: flex; justify-content: center; margin-top: 80px; }
        .progress-container {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 14px 28px;
          border-radius: 100px;
          display: flex; align-items: center; gap: 20px;
          width: 100%; max-width: 600px;
        }
        .progress-bar-bg {
          flex-grow: 1;
          height: 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          overflow: hidden;
        }

        /* UPDATED: Vormirex gradient + glow */
        .progress-bar-fill {
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, #6aece1, #1fb8ae);
          box-shadow: 0 0 15px rgba(106, 236, 225, 0.28);
        }

        .stats-section {
          background: linear-gradient(to bottom, #080f1e, #050a15);
          padding-bottom: 100px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .stats-grid {
          max-width: 1100px;
          margin: -60px auto 80px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 25px;
          padding: 0 20px;
          position: relative;
          z-index: 10;
        }

        .stat-card {
          background: #0d121f;
          border: 1px solid rgba(106, 236, 225, 0.15);
          border-radius: 24px;
          padding: 45px 20px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        /* UPDATED: Vormirex hover */
        .stat-card:hover {
          transform: translateY(-8px);
          border-color: #6aece1;
          box-shadow: 0 22px 55px rgba(0, 0, 0, 0.45);
        }

        /* UPDATED: Vormirex accent */
        .stat-icon-container {
          color: #6aece1;
          margin-bottom: 15px;
          display: flex;
          justify-content: center;
          opacity: 0.9;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: #6aece1;
          margin-bottom: 5px;
        }

        .stat-label {
          color: #94a3b8;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          font-weight: 600;
        }

        .partners-section { text-align: center; margin-top: 20px; }
        .partners-title { color: #4a5568; font-size: 0.9rem; margin-bottom: 30px; }
        .partners-list { display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; opacity: 0.5; }
        .partner-item { font-size: 1.3rem; font-weight: 700; color: #94a3b8; }

        @media (max-width: 1024px) {
          .steps-grid { grid-template-columns: repeat(3, 1fr); gap: 15px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); margin-top: -40px; }
          .connecting-line { display: none; }
        }

        @media (max-width: 640px) {
          .steps-grid, .stats-grid { grid-template-columns: 1fr; }
          .main-title { font-size: 2rem; }
          .stats-grid { margin-top: -30px; }
        }
      `}</style>
    </div>
  );
};

export default HowItWorks;
