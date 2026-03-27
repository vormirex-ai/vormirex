// src/pages/CourseList.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Courses.css';
import { LayoutDashboard } from 'lucide-react';
import { getAllCourses, Course } from '../../api/courses';
import { getCatalogImage, getSlug } from '../../utils/courseUtils';

// Hardcoded array removed because we now fetch dynamically from the backend

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
        setCoursesList(parsedCourses);
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
        setCoursesList(list);

        // Cache the fetched data (excluding static courses)
        localStorage.setItem('vormirex_courses_cache', JSON.stringify(list));
        localStorage.setItem(
          'vormirex_courses_cache_timestamp',
          Date.now().toString()
        );
      } catch (err) {
        console.error('Failed to fetch courses', err);
        setCoursesList([]);
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
