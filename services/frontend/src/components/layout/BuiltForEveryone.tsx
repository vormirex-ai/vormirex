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
import { getSlug } from '../../utils/courseUtils'; // Import the getSlug function

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
      slug: 'ai-ml-engineer', // Updated to match the slug in courseUtils.js
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

  // Helper function to find a course by its slug using the getSlug utility
  const getCourseBySlug = (slug: string): Course | undefined => {
    // Special case for career-programs
    if (slug === 'career-programs') {
      // Find a course that might be related to career programs
      // This is a fallback since we don't have a specific career programs course
      const careerCourse = courses.find(
        (c) =>
          c.title.toLowerCase().includes('career') ||
          c.title.toLowerCase().includes('program')
      );
      return careerCourse || courses[0]; // Fallback to first course if no match
    }

    return courses.find((c) => getSlug(c) === slug);
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
            // Use the course's actual slug if found, otherwise fallback to the item slug
            const linkTo = course
              ? `/course/${getSlug(course)}`
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

        /* --- DESKTOP/LAPTOP GRID STYLES (Original) --- */
        .grid-small {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
        }

        .grid-large {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
        }
        /* --- END OF DESKTOP STYLES --- */

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
          cursor: pointer;
          box-sizing: border-box; /* Ensures padding is included in the width/height */
          /* REMOVED: height: 100%; This was causing inconsistent heights on mobile */
        }

        .card.large {
          align-items: flex-start;
          text-align: left;
          padding: 40px;
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
          flex-shrink: 0; /* Prevents the icon from shrinking */
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

        /* --- RESPONSIVE MEDIA QUERIES FOR ALL DEVICES --- */

        /* Mobile (small phones) - up to 480px */
        @media (max-width: 480px) {
          .built-everyone-shell {
            padding: 60px 16px;
          }
          
          .main-title {
            font-size: 32px;
          }
          
          .subtitle {
            font-size: 16px;
            max-width: 100%;
          }
          
          /* Grid layouts for mobile */
          .grid-small,
          .grid-large {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          /* Card styling for mobile */
          .card {
            width: 100%;
            padding: 24px 20px;
          }
          
          .card.large {
            padding: 28px 22px;
            text-align: left;
            align-items: flex-start;
          }
          
          .card-title {
            font-size: 16px;
          }
          
          .card-description {
            font-size: 13px;
          }
          
          .icon-container {
            width: 44px;
            height: 44px;
          }
        }

        /* Mobile (larger phones) - 481px to 768px */
        @media (min-width: 481px) and (max-width: 768px) {
          .built-everyone-shell {
            padding: 70px 20px;
          }
          
          .main-title {
            font-size: 36px;
          }
          
          /* Grid layouts for larger phones */
          .grid-small {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
          
          .grid-large {
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          }
          
          /* Card styling for larger phones */
          .card {
            padding: 28px 22px;
          }
          
          .card.large {
            padding: 32px 24px;
          }
          
          .card-title {
            font-size: 17px;
          }
        }

        /* Tablet - 769px to 1024px */
        @media (min-width: 769px) and (max-width: 1024px) {
          .built-everyone-shell {
            padding: 75px 30px;
          }
          
          .main-title {
            font-size: 40px;
          }
          
          /* Grid layouts for tablets */
          .grid-small {
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          }
          
          .grid-large {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          }
          
          /* Card styling for tablets */
          .card {
            padding: 30px 24px;
          }
          
          .card.large {
            padding: 34px 26px;
          }
          
          .card-title {
            font-size: 18px;
          }
        }

        /* Desktop - 1025px and above */
        @media (min-width: 1025px) {
          .built-everyone-shell {
            padding: 80px 40px;
          }
          
          .main-title {
            font-size: 42px;
          }
          
          /* Grid layouts for desktop */
          .grid-small {
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 20px;
          }
          
          .grid-large {
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 24px;
          }
          
          /* Card styling for desktop */
          .card {
            padding: 32px 24px;
          }
          
          .card.large {
            padding: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default BuiltForEveryone;
