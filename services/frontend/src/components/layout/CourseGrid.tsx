// src/components/CourseGrid.jsx

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
  slug?: string;
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
    slug: 'cyber-security',
  },
  {
    id: 2,
    title: 'Exam Preparation Kit',
    learners: '8K+ learners',
    icon: <Brain size={24} />,
    slug: 'exam-preparation-kit',
  },
  {
    id: 3,
    title: 'Data Science',
    learners: '20K+ learners',
    icon: <Globe size={24} />,
    slug: 'data-science',
  },
  {
    id: 4,
    title: 'Data Analytics',
    learners: '6K+ learners',
    icon: <Palette size={24} />,
    slug: 'data-analytics',
  },
  {
    id: 5,
    title: 'AI & Machine Learning',
    learners: '4K+ learners',
    icon: <Sparkles size={24} />,
    slug: 'ai-ml-engineer',
  },
  {
    id: 6,
    title: 'Career Transition Programs',
    learners: '5K+ learners',
    icon: <Users size={24} />,
    slug: 'career-programs',
  },
  {
    id: 7,
    title: 'AI-Powered Learning Paths',
    learners: '11K+ learners',
    icon: <Heart size={24} />,
    slug: 'ai-learning-paths',
  },
];

const CourseGrid: React.FC<CourseGridProps> = ({
  title = 'Unlock Your Tech Potential',
  subtitle = 'Industry-ready courses in Cyber Security, Data Science, AI/ML, and Software Development',
  buttonText = 'Explore All Courses',
  categories = DEFAULT_CATEGORIES,
}) => {
  const navigate = useNavigate();

  const handleCourseClick = (slug: string) => {
    // Map the grid slug to the actual course slug if needed
    const slugMap: Record<string, string> = {
      'ai-ml': 'ai-ml-engineer',
      // Add other mappings as needed
    };

    const mappedSlug = slugMap[slug] || slug;
    navigate(`/course/${mappedSlug}`);
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
            onClick={() => category.slug && handleCourseClick(category.slug)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && category.slug) {
                handleCourseClick(category.slug);
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
        }

        .course-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 32px 20px;
          text-align: center;
          transition: 0.3s;
          cursor: pointer;
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
