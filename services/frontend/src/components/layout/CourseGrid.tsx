// src/components/CourseGrid.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Rocket,
  Brain,
  Globe,
  Palette,
  Heart,
  Sparkles,
  Users,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { getSlug } from '../../utils/courseUtils';

// --- Types ---
interface CourseCategory {
  id: number;
  title: string;
  learners: string;
  icon: React.ReactNode;
  // 'slug' property is no longer needed as we generate it dynamically
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
    title: 'Cyber Security',
    learners: '12K+ learners',
    icon: <Rocket size={24} />,
  },
  {
    id: 2,
    title: 'Exam Preparation Kit',
    learners: '8K+ learners',
    icon: <BookOpen size={24} />,
  },
  {
    id: 3,
    title: 'Data Science',
    learners: '20K+ learners',
    icon: <Globe size={24} />,
  },
  {
    id: 4,
    title: 'Data Analytics',
    learners: '6K+ learners',
    icon: <Palette size={24} />,
  },
  {
    id: 5,
    title: 'AI & Machine Learning',
    learners: '4K+ learners',
    icon: <Sparkles size={24} />,
  },
  {
    id: 6,
    title: 'Career Transition Programs',
    learners: '5K+ learners',
    icon: <TrendingUp size={24} />,
  },
  {
    id: 7,
    title: 'AI-Powered Learning Paths',
    learners: '11K+ learners',
    icon: <Zap size={24} />,
  },
];

const CourseGrid: React.FC<CourseGridProps> = ({
  title = 'Unlock Your Tech Potential',
  subtitle = 'Industry-ready courses in Cyber Security, Data Science, AI/ML, and Software Development',
  buttonText = 'Explore All Courses',
  categories = DEFAULT_CATEGORIES,
}) => {
  const navigate = useNavigate();

  // --- KEY CHANGE ---
  // This function now uses the official `getSlug` utility to create a consistent URL.
  const handleCourseClick = (title: string) => {
    const mockCourse = { title }; // Create a temp object to match the utility's expected input
    const slug = getSlug(mockCourse);
    navigate(`/course/${slug}`);
  };

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
            onClick={() => handleCourseClick(category.title)} // Pass the title
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCourseClick(category.title); // Pass the title
              }
            }}
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
          overflow: visible;
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
          max-width: 700px;
          margin: auto;
        }

        .course-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          width: 100%;
          max-width: 1200px;
          margin-bottom: 60px;
          overflow: visible;
          padding: 8px; /* gives shadow room to breathe inside the grid */
          margin: -8px; /* compensate for padding so layout doesn't shift */
          width: calc(100% + 16px);
        }

        .course-card {
          background: rgba(255, 255, 255, 0.03);
          border: none;
          border-radius: 24px;
          padding: 32px 24px;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          cursor: pointer;
          box-sizing: border-box; /* Ensures padding is included in the width/height */
          /* REMOVED: height: 100%; This was causing inconsistent heights on mobile */
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);

        }

        .course-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 0 1px #6aece1, 0 20px 45px rgba(0, 0, 0, 0.35);
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
          transition: 0.3s;
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
