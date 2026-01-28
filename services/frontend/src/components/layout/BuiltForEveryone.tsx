// src/components/BuiltForEveryone.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  BarChart3,
  PieChart,
  Brain,
  Briefcase,
  Bot,
  Users,
  Target,
  BookOpen,
} from 'lucide-react';
import { getAllCourses, Course } from '../../api/courses'; // Adjust path if needed

// --- Type Declaration for Prefetching ---
// This should ideally be in a separate file like 'types/global.d.ts'
// but is included here for completeness.
declare global {
  interface Window {
    __PREFETCHED_COURSES__?: Record<string, any>;
  }
}

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
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Static UI data - this will be matched with dynamic course data
  const audienceData = [
    {
      slug: 'cyber-security',
      icon: <ShieldCheck size={24} />,
      title: 'Cyber Security',
      description: 'Protect systems and networks from cyber threats',
    },
    {
      slug: 'data-science',
      icon: <BarChart3 size={24} />,
      title: 'Data Science',
      description: 'Analyze data and build intelligent solutions',
    },
    {
      slug: 'data-analytics',
      icon: <PieChart size={24} />,
      title: 'Data Analytics',
      description: 'Turn raw data into meaningful insights',
    },
    {
      slug: 'ai-ml', // This slug should match what's generated in courseUtils
      icon: <Brain size={24} />,
      title: 'Artificial Intelligence & ML',
      description: 'Build smart models for real-world problems',
    },
    {
      slug: 'career-programs', // This might need a specific course or could be handled differently
      icon: <Briefcase size={24} />,
      title: 'Career Programs',
      description: 'Job-ready skills with real-world projects',
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
        'From fundamentals to advanced tech. One platform, endless learning.',
    },
  ];

  // Fetch courses and prefetch them for instant navigation
  useEffect(() => {
    const fetchAndPrefetchCourses = async () => {
      // Check cache first
      const cachedCourses = localStorage.getItem('vormirex_courses_cache');
      const cacheTimestamp = localStorage.getItem(
        'vormirex_courses_cache_timestamp'
      );
      const isCacheValid =
        cacheTimestamp && Date.now() - parseInt(cacheTimestamp) < 300000; // 5 mins

      if (cachedCourses && isCacheValid) {
        try {
          const parsedCourses = JSON.parse(cachedCourses);
          setCourses(parsedCourses);
          // Prefetch into window object
          window.__PREFETCHED_COURSES__ = {};
          parsedCourses.forEach((course: Course) => {
            window.__PREFETCHED_COURSES__![course._id] = course;
          });
          setLoading(false);
          return;
        } catch (err) {
          console.error('Failed to parse cached courses', err);
        }
      }

      // If no valid cache, fetch fresh data
      try {
        const coursesList = await getAllCourses();
        setCourses(coursesList);

        // Cache the fetched data in localStorage
        localStorage.setItem(
          'vormirex_courses_cache',
          JSON.stringify(coursesList)
        );
        localStorage.setItem(
          'vormirex_courses_cache_timestamp',
          Date.now().toString()
        );

        // Prefetch into window object for instant navigation
        window.__PREFETCHED_COURSES__ = {};
        coursesList.forEach((course) => {
          window.__PREFETCHED_COURSES__![course._id] = course;
        });
      } catch (err) {
        console.error('Failed to fetch courses', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndPrefetchCourses();
  }, []);

  // Helper function to find a course by its slug
  const getCourseBySlug = (slug: string): Course | undefined => {
    return courses.find((c) => {
      const courseSlug = c.title
        .toLowerCase()
        .replace(/ \/ /g, '-')
        .replace(/\//g, '-')
        .replace(/ /g, '-');
      return courseSlug === slug;
    });
  };

  const handleCardClick = () => {
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="built-everyone-shell">
        <div className="loading">Loading courses...</div>
        <style>{`
          .built-everyone-shell {
            background-color: #0a0b14;
            color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            padding: 80px 20px;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .loading {
            font-size: 18px;
            color: #8e92a4;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="built-everyone-shell">
      {/* COURSES SECTION */}
      <section className="section">
        <div className="header">
          <h2 className="main-title">
            Our <span className="highlight">Courses</span>
          </h2>
          <p className="subtitle">
            Industry-focused programs designed for modern careers
          </p>
        </div>

        <div className="grid-small">
          {audienceData.map((item) => {
            const course = getCourseBySlug(item.slug);
            // Use the course's actual _id if found, otherwise fallback to the slug
            const linkTo = course
              ? `/course/${course._id}`
              : `/course/${item.slug}`;

            return (
              <Link
                to={linkTo}
                key={item.slug}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                }}
                onClick={handleCardClick}
              >
                <FeatureCard {...item} variant="small" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="section">
        <div className="header">
          <h2 className="main-title">
            Powerful <span className="highlight">Features</span>
          </h2>
          <p className="subtitle">
            Everything you need for a next-level learning experience
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
              onClick={handleCardClick}
            >
              <FeatureCard {...item} variant="large" />
            </Link>
          ))}
        </div>
      </section>

      {/* STYLES */}
      <style>{`
        .built-everyone-shell {
          background-color: #0a0b14;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          padding: 80px 20px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          gap: 100px;
          align-items: center;
        }

        .section {
          max-width: 1200px;
          width: 100%;
          text-align: center;
        }

        .header {
          margin-bottom: 48px;
        }

        .main-title {
          font-size: 42px;
          font-weight: 700;
          margin-bottom: 16px;
          letter-spacing: -0.5px;
        }

        .highlight {
          background: linear-gradient(90deg, #6aece1, #1fb8ae);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          color: #8e92a4;
          font-size: 18px;
          max-width: 600px;
          margin: 0 auto;
        }

        /* --- CORRECTED GRID STYLES --- */
        .grid-small {
          display: grid;
          /* Use a fixed width for each column to ensure consistent sizing */
          grid-template-columns: repeat(auto-fit, 180px);
          /* Center the grid items if there is extra space in the row */
          justify-content: center;
          gap: 20px;
        }

        .grid-large {
          display: grid;
          /* Use a fixed width for each column to ensure consistent sizing */
          grid-template-columns: repeat(auto-fit, 260px);
          /* Center the grid items if there is extra space in the row */
          justify-content: center;
          gap: 24px;
        }
        /* --- END OF CORRECTED STYLES --- */

        .card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 32px 24px;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          height: 100%;
          cursor: pointer;
          /* Ensure the card fills the grid cell */
          width: 100%;
          box-sizing: border-box;
        }

        .card.large {
          align-items: flex-start;
          text-align: left;
          padding: 40px;
          width: 100%;
        }

        .card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(106, 236, 225, 0.32);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);
        }

        .icon-container {
          background: rgba(106, 236, 225, 0.1);
          color: #6aece1;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .card-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .card.large .card-title {
          font-size: 22px;
        }

        .card-description {
          font-size: 14px;
          color: #8e92a4;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .grid-small,
          .grid-large {
            grid-template-columns: 1fr; /* On small screens, cards take full width */
          }

          .main-title {
            font-size: 32px;
          }
        }
      `}</style>
    </div>
  );
};

export default BuiltForEveryone;
