import React from 'react';
import {
  Rocket,
  Brain,
  Code,
  Globe,
  Palette,
  Heart,
  Briefcase,
  Baby,
  Sparkles,
  Users,
  ArrowRight,
} from 'lucide-react';

// --- Types ---

interface CourseCategory {
  id: number;
  title: string;
  learners: string;
  icon: React.ReactNode;
}

interface CourseGridProps {
  title?: string;
  subtitle?: string;
  categories?: CourseCategory[];
  buttonText?: string;
}

// --- Default Data ---
const DEFAULT_CATEGORIES: CourseCategory[] = [
  {
    id: 1,
    title: 'Smart School Booster',
    learners: '12K+ learners',
    icon: <Rocket size={24} />,
  },
  {
    id: 2,
    title: 'Exam Prep Kit',
    learners: '8K+ learners',
    icon: <Brain size={24} />,
  },
  {
    id: 3,
    title: 'Coding Master',
    learners: '15K+ learners',
    icon: <Code size={24} />,
  },
  {
    id: 4,
    title: 'English Fluency',
    learners: '20K+ learners',
    icon: <Globe size={24} />,
  },
  {
    id: 5,
    title: 'Digital Skills',
    learners: '6K+ learners',
    icon: <Palette size={24} />,
  },
  {
    id: 6,
    title: 'Life Skills',
    learners: '4K+ learners',
    icon: <Heart size={24} />,
  },
  {
    id: 7,
    title: 'Career Accelerator',
    learners: '9K+ learners',
    icon: <Briefcase size={24} />,
  },
  {
    id: 8,
    title: 'Kids Bundle',
    learners: '7K+ learners',
    icon: <Baby size={24} />,
  },
  {
    id: 9,
    title: 'AI Custom Path',
    learners: '5K+ learners',
    icon: <Sparkles size={24} />,
  },
  {
    id: 10,
    title: 'Study With Friends',
    learners: '11K+ learners',
    icon: <Users size={24} />,
  },
];

const CourseGrid: React.FC<CourseGridProps> = ({
  title = 'Unlock Your Potential',
  subtitle = 'Explore our curated courses designed to transform your learning journey',
  buttonText = 'Explore All Courses',
  categories = DEFAULT_CATEGORIES,
}) => {
  // Logic to split title for highlighting
  const titleWords = title.split(' ');
  const firstWord = titleWords[0];
  const restOfTitle = titleWords.slice(1).join(' ');

  return (
    <div className="course-container">
      <header className="course-header">
        <h1 className="course-main-title">
          {firstWord} <span className="course-highlight">{restOfTitle}</span>
        </h1>
        <p className="course-subtitle">{subtitle}</p>
      </header>

      <div className="course-grid">
        {categories.map((category) => (
          <div
            key={category.id}
            className="course-card"
            tabIndex={0}
            role="button"
          >
            <div className="course-icon-wrapper">{category.icon}</div>
            <h3 className="course-card-title">{category.title}</h3>
            <p className="course-card-learners">{category.learners}</p>
            <div className="course-dots" aria-hidden="true">
              <span className="course-dot active"></span>
              <span className="course-dot"></span>
              <span className="course-dot"></span>
            </div>
          </div>
        ))}
      </div>

      <div className="course-footer">
        <button className="course-cta-button">
          {buttonText} <ArrowRight size={18} />
        </button>
      </div>

      <style>{`
        .course-container {
          background-color: #0B0E14; /* Matched previous Vormirex BG */
          color: #ffffff;
          padding: 80px 20px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .course-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .course-main-title {
          font-size: 42px;
          font-weight: 700;
          margin-bottom: 16px;
          letter-spacing: -0.5px;
        }

        /* UPDATED: Brand color */
        .course-highlight {
          color: #6aece1;
        }

        .course-subtitle {
          color: #94a3b8;
          font-size: 18px;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .course-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          width: 100%;
          max-width: 1200px;
          margin-bottom: 60px;
        }

        .course-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 32px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          outline: none;
        }

        /* UPDATED: Hover effect with brand color and glow */
        .course-card:hover, .course-card:focus {
          background: rgba(255, 255, 255, 0.06);
          transform: translateY(-5px);
          border-color: #6aece1;
          box-shadow: 0 10px 30px -10px rgba(106, 236, 225, 0.15);
        }

        .course-icon-wrapper {
          background: rgba(255, 255, 255, 0.05);
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          /* UPDATED: Brand color */
          color: #6aece1;
        }

        .course-card-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
          text-align: center;
        }

        .course-card-learners {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 16px;
        }

        .course-dots {
          display: flex;
          gap: 6px;
        }

        .course-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #334155;
        }

        /* UPDATED: Active dot brand color */
        .course-dot.active {
          background: #6aece1;
        }

        .course-footer {
          display: flex;
          justify-content: center;
        }

        .course-cta-button {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding: 14px 32px;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        /* UPDATED: Button hover brand color */
        .course-cta-button:hover {
          background: #6aece1;
          color: #0B0E14;
          border-color: #6aece1;
        }

        @media (max-width: 768px) {
          .course-main-title { font-size: 32px; }
          .course-container { padding: 40px 20px; }
        }
      `}</style>
    </div>
  );
};

export default CourseGrid;
