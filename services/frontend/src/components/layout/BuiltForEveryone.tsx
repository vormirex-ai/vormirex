import React from 'react';
import {
  Baby,
  GraduationCap,
  Code,
  Languages,
  Briefcase,
  Bot,
  Users,
  Target,
  BookOpen,
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: 'small' | 'large';
}

const FeatureCard = ({
  icon,
  title,
  description,
  variant = 'small',
}: FeatureCardProps) => {
  return (
    <div className={`card ${variant}`}>
      <div className="icon-container">{icon}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
};

const BuiltForEveryone = () => {
  const audienceData = [
    {
      icon: <Baby size={24} />,
      title: 'School Kids',
      description: 'Fun learning for young minds',
    },
    {
      icon: <GraduationCap size={24} />,
      title: 'Exam Learners',
      description: 'Ace your tests with AI help',
    },
    {
      icon: <Code size={24} />,
      title: 'Coding Students',
      description: 'Master programming easily',
    },
    {
      icon: <Languages size={24} />,
      title: 'English Learners',
      description: 'Speak fluently with practice',
    },
    {
      icon: <Briefcase size={24} />,
      title: 'Job Seekers',
      description: 'Upskill for career growth',
    },
  ];

  const featuresData = [
    {
      icon: <Bot size={24} />,
      title: '24/7 AI Teacher',
      description:
        'Your personal tutor never sleeps. Get instant help whenever you need it.',
    },
    {
      icon: <Users size={24} />,
      title: 'Group Learning Rooms',
      description:
        'Study with friends in virtual rooms. Collaborate and learn together.',
    },
    {
      icon: <Target size={24} />,
      title: 'Personalized Paths',
      description:
        'AI creates custom learning journeys based on your goals and pace.',
    },
    {
      icon: <BookOpen size={24} />,
      title: 'All Subjects',
      description:
        'From math to music, coding to cooking. One platform, endless possibilities.',
    },
  ];

  return (
    <div className="built-everyone-shell">
      <section className="section">
        <div className="header">
          <h2 className="main-title">
            Built for <span className="highlight">Everyone</span>
          </h2>
          <p className="subtitle">
            Whether you're 8 or 80, Vormirex adapts to your learning style
          </p>
        </div>

        <div className="grid-small">
          {audienceData.map((item, index) => (
            <FeatureCard key={index} {...item} variant="small" />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="header">
          <h2 className="main-title">
            Powerful <span className="highlight">Features</span>
          </h2>
          <p className="subtitle">
            Everything you need for an amazing learning experience
          </p>
        </div>

        <div className="grid-large">
          {featuresData.map((item, index) => (
            <FeatureCard key={index} {...item} variant="large" />
          ))}
        </div>
      </section>

      <style>{`
        .built-everyone-shell {
          background-color: #0a0b14;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          padding: 80px 20px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          gap: 100px;
          align-items: center;
        }

        .built-everyone-shell .section {
          max-width: 1200px;
          width: 100%;
          text-align: center;
        }

        .built-everyone-shell .header { margin-bottom: 48px; }

        .built-everyone-shell .main-title {
          font-size: 42px;
          font-weight: 700;
          margin-bottom: 16px;
          letter-spacing: -0.5px;
        }

        /* UPDATED: Vormirex accent + gradient */
        .built-everyone-shell .highlight {
          color: #6aece1;
          background: linear-gradient(90deg, #6aece1, #1fb8ae);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .built-everyone-shell .subtitle {
          color: #8e92a4;
          font-size: 18px;
          max-width: 600px;
          margin: 0 auto;
        }

        .built-everyone-shell .grid-small {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          justify-content: center;
        }

        .built-everyone-shell .grid-large {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
          justify-content: center;
        }

        .built-everyone-shell .card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 32px 24px;
          transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .built-everyone-shell .card.large {
          align-items: flex-start;
          text-align: left;
          padding: 40px;
        }

        /* UPDATED: border tint on hover */
        .built-everyone-shell .card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(106, 236, 225, 0.32);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);
        }

        /* UPDATED: Vormirex icon tile */
        .built-everyone-shell .icon-container {
          background: rgba(106, 236, 225, 0.10);
          color: #6aece1;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          box-shadow: 0 0 0 1px rgba(106, 236, 225, 0.10) inset;
        }

        .built-everyone-shell .card-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #ffffff;
        }

        .built-everyone-shell .card.large .card-title { font-size: 22px; }

        .built-everyone-shell .card-description {
          font-size: 14px;
          color: #8e92a4;
          line-height: 1.6;
        }

        .built-everyone-shell .card.large .card-description { font-size: 16px; }

        @media (max-width: 768px) {
          .built-everyone-shell .main-title { font-size: 32px; }
          .built-everyone-shell .grid-small,
          .built-everyone-shell .grid-large {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default BuiltForEveryone;
