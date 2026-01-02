import React from 'react';
import { Link } from 'react-router-dom';
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
  LucideIcon,
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: 'small' | 'large';
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  variant = 'small',
}) => {
  return (
    <div className={`card ${variant}`}>
      <div className="icon-container">{icon}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
};

const BuiltForEveryone: React.FC = () => {
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
      id: 'ai-teacher',
      icon: <Bot size={24} />,
      title: '24/7 AI Teacher',
      description:
        'Your personal tutor never sleeps. Get instant help whenever you need it.',
    },
    {
      id: 'learning-rooms',
      icon: <Users size={24} />,
      title: 'Group Learning Rooms',
      description:
        'Study with friends in virtual rooms. Collaborate and learn together.',
    },
    {
      id: 'personalized-paths',
      icon: <Target size={24} />,
      title: 'Personalized Paths',
      description:
        'AI creates custom learning journeys based on your goals and pace.',
    },
    {
      id: 'all-subjects',
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
          {featuresData.map((item) => (
            <Link
              to={`/feature/${item.id}`}
              key={item.id}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
              }}
            >
              <FeatureCard {...item} variant="large" />
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        .built-everyone-shell {
          background-color: #0a0b14; color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          padding: 80px 20px; min-height: 100vh; display: flex; flex-direction: column; gap: 100px; align-items: center;
        }
        .section { max-width: 1200px; width: 100%; text-align: center; }
        .header { margin-bottom: 48px; }
        .main-title { font-size: 42px; font-weight: 700; margin-bottom: 16px; letter-spacing: -0.5px; }
        .highlight {
          background: linear-gradient(90deg, #6aece1, #1fb8ae);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .subtitle { color: #8e92a4; font-size: 18px; max-width: 600px; margin: 0 auto; }
        .grid-small { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; }
        .grid-large { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; }
        .card {
          background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px; padding: 32px 24px; transition: all 0.3s ease;
          display: flex; flex-direction: column; align-items: center; text-align: center; height: 100%;
        }
        .card.large { align-items: flex-start; text-align: left; padding: 40px; width: 100%; }
        .card:hover {
          transform: translateY(-5px); background: rgba(255, 255, 255, 0.05);
          border-color: rgba(106, 236, 225, 0.32); box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);
        }
        .icon-container {
          background: rgba(106, 236, 225, 0.10); color: #6aece1;
          width: 48px; height: 48px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center; margin-bottom: 20px;
        }
        .card-title { font-size: 18px; font-weight: 600; margin-bottom: 12px; color: #ffffff; }
        .card.large .card-title { font-size: 22px; }
        .card-description { font-size: 14px; color: #8e92a4; line-height: 1.6; }
        @media (max-width: 768px) { 
            .grid-small, .grid-large { grid-template-columns: 1fr; }
            .main-title { font-size: 32px; }
        }
      `}</style>
    </div>
  );
};

export default BuiltForEveryone;
