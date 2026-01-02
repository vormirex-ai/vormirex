import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate(); // ✅ REQUIRED ONLY

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
        <button
          className="course-cta-button"
          onClick={() => navigate('/courses')}
        >
          {/* ✅ ONLY FUNCTIONAL ADD */}
          {buttonText} <ArrowRight size={18} />
        </button>
      </div>

      <style>{`
        .course-container {
          background-color: #0B0E14;
          color: #ffffff;
          padding: 80px 20px;
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
        }

        .course-highlight {
          color: #6aece1;
        }

        .course-subtitle {
          color: #94a3b8;
          font-size: 18px;
          max-width: 600px;
          margin: auto;
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
          text-align: center;
          transition: 0.3s;
        }

        .course-card:hover {
          border-color: #6aece1;
          transform: translateY(-5px);
        }

        .course-icon-wrapper {
          color: #6aece1;
          margin-bottom: 20px;
        }

        .course-cta-button {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding: 14px 32px;
          border-radius: 30px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .course-cta-button:hover {
          background: #6aece1;
          color: #0B0E14;
        }
      `}</style>
    </div>
  );
};

export default CourseGrid;
