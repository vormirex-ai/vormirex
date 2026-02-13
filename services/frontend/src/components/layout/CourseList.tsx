// src/pages/CourseList.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Courses.css';
import { LayoutDashboard } from 'lucide-react';
import { getAllCourses, Course } from '../../api/courses';
import { getCatalogImage, getSlug } from '../../utils/courseUtils';

// Static course data for the new courses
const STATIC_COURSES = [
  {
    _id: 'exam-preparation-kit',
    title: 'Exam Preparation Kit',
    description:
      'Prepare for industry-recognized certifications with our comprehensive study materials and practice tests.',
    price: 0,
    status: 'PUBLISHED' as const,
    isHidden: false,
    instructor: 'Vormirex',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'career-transition-programs',
    title: 'Career Transition Programs',
    description:
      'Transform your career with our guided transition programs designed for successful career changes.',
    price: 0,
    status: 'PUBLISHED' as const,
    isHidden: false,
    instructor: 'Vormirex',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'ai-powered-learning-paths',
    title: 'AI-Powered Learning Paths',
    description:
      'Experience personalized learning with AI-driven course recommendations and adaptive content.',
    price: 0,
    status: 'PUBLISHED' as const,
    isHidden: false,
    instructor: 'Vormirex',
    createdAt: new Date().toISOString(),
  },
];

export default function CourseList() {
  const navigate = useNavigate();
  const [coursesList, setCoursesList] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Explore Courses | Vormirex';

    // Check if we have cached data first
    const cachedCourses = localStorage.getItem('vormirex_courses_cache');
    const cacheTimestamp = localStorage.getItem(
      'vormirex_courses_cache_timestamp'
    );

    // Consider cache valid for 5 minutes (300000 ms)
    const isCacheValid =
      cacheTimestamp && Date.now() - parseInt(cacheTimestamp) < 300000;

    if (cachedCourses && isCacheValid) {
      try {
        const parsedCourses = JSON.parse(cachedCourses);
        // Combine with static courses
        setCoursesList([...parsedCourses, ...STATIC_COURSES]);
        setLoading(false);
        return;
      } catch (err) {
        console.error('Failed to parse cached courses', err);
      }
    }

    // If no valid cache, fetch fresh data
    const fetchData = async () => {
      try {
        const list = await getAllCourses();
        // Combine with static courses
        const allCourses = [...list, ...STATIC_COURSES];
        setCoursesList(allCourses);

        // Cache the fetched data (excluding static courses)
        localStorage.setItem('vormirex_courses_cache', JSON.stringify(list));
        localStorage.setItem(
          'vormirex_courses_cache_timestamp',
          Date.now().toString()
        );
      } catch (err) {
        console.error('Failed to fetch courses', err);
        // If API fails, at least show static courses
        setCoursesList(STATIC_COURSES);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCourseClick = (course: Course) => {
    const slug = getSlug(course);
    navigate(`/course/${slug}`);
  };

  // Skeleton loader for loading state
  if (loading) {
    return (
      <div className="course-list-page">
        <div className="course-list-header">
          <h1>Our Courses</h1>
        </div>
        <div className="course-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="course-card skeleton-card">
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text short"></div>
                <div className="skeleton-button"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="course-list-page">
      <div className="course-list-header">
        <button
          className="back-to-dashboard-btn"
          onClick={() => navigate('/')}
          title="Back to Dashboard"
        >
          <LayoutDashboard size={24} />
        </button>
        <h1>Our Courses</h1>
      </div>
      <div className="course-grid">
        {coursesList.map((item) => (
          <div
            key={item._id}
            className="course-card"
            onClick={() => handleCourseClick(item)}
          >
            <img
              src={getCatalogImage(item)}
              alt={item.title}
              className="course-card-img"
            />
            <div className="course-card-content">
              <h3>{item.title}</h3>
              <p className="course-card-desc">{item.description}</p>
              <button className="course-card-btn">View Details →</button>
            </div>
          </div>
        ))}
        {coursesList.length === 0 && (
          <p style={{ textAlign: 'center' }}>No courses found.</p>
        )}
      </div>
    </div>
  );
}
