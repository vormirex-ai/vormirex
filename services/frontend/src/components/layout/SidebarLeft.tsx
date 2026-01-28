import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SidebarLeft.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faPlus,
  faCog,
  faUserCircle,
  faGlobe,
  faCode,
  faChartLine,
  faCubes,
  faLaptopCode,
  faClipboardList,
  faBookmark,
  faChevronDown,
  faChevronRight,
  faRobot,
  faShieldAlt,
  faChartBar,
  faFlask,
} from '@fortawesome/free-solid-svg-icons';
import logoWithoutText from '../../assets/logo.png';
import { getAllCourses, getCourseById, Course } from '../../api/courses'; // Import getCourseById

// Extend the Window interface for our global cache
declare global {
  interface Window {
    __PREFETCHED_COURSES__?: { [key: string]: any };
  }
}

interface SidebarLeftProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  showComingSoon: () => void;
}

const SidebarLeft: React.FC<SidebarLeftProps> = ({
  isOpen,
  toggleSidebar,
  showComingSoon,
}) => {
  const navigate = useNavigate();
  const [isSubjectsOpen, setIsSubjectsOpen] = useState(false);
  const [isCustomCoursesOpen, setIsCustomCoursesOpen] = React.useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setCoursesLoading(true);
        const fetchedCourses = await getAllCourses();
        setCourses(fetchedCourses);
      } catch (error) {
        console.error('Failed to load courses', error);
      } finally {
        setCoursesLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const toggleSubjects = () => setIsSubjectsOpen(!isSubjectsOpen);
  const toggleCustomCourses = () =>
    setIsCustomCoursesOpen(!isCustomCoursesOpen);

  // Function to get the appropriate icon based on course title
  const getCourseIcon = (courseTitle: string) => {
    const title = courseTitle.toLowerCase();
    if (
      title.includes('ai') ||
      title.includes('ml') ||
      title.includes('machine learning')
    ) {
      return faRobot;
    } else if (title.includes('cyber') || title.includes('security')) {
      return faShieldAlt;
    } else if (
      title.includes('analytics') ||
      title.includes('data analytics')
    ) {
      return faChartBar;
    } else if (title.includes('data science')) {
      return faFlask;
    } else {
      return faCode; // Default icon
    }
  };

  // Pre-fetch course data on hover for instant navigation
  const handleCourseHover = async (courseId: string) => {
    // Initialize global cache if it doesn't exist
    if (!window.__PREFETCHED_COURSES__) {
      window.__PREFETCHED_COURSES__ = {};
    }
    // Only fetch if we haven't already cached it
    if (!window.__PREFETCHED_COURSES__[courseId]) {
      try {
        const courseData = await getCourseById(courseId);
        window.__PREFETCHED_COURSES__[courseId] = courseData;
      } catch (error) {
        console.error(`Failed to pre-fetch course ${courseId}`, error);
      }
    }
  };

  return (
    <aside className={`sidebar-left ${isOpen ? 'sidebar-open' : ''}`}>
      <button
        className="sidebar-close-button close-left"
        onClick={toggleSidebar}
        aria-label="Close sidebar"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>

      <div className="sidebar-header">
        <img
          src={logoWithoutText}
          className="sidebar-logo-img"
          alt="Vormirex Logo"
          role="button"
          tabIndex={0}
          onClick={() => navigate('/home')}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/home')}
        />
        <span
          className="sidebar-company-name"
          role="button"
          tabIndex={0}
          onClick={() => navigate('/home')}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/home')}
        >
          VORMIREX
        </span>
      </div>

      <Link
        to="/"
        className="new-chat-button"
        onClick={(e) => {
          e.preventDefault();
          showComingSoon();
        }}
      >
        <FontAwesomeIcon icon={faPlus} /> NEW CHAT
      </Link>

      <Link to="/home" className="vormirex-button">
        <FontAwesomeIcon icon={faGlobe} /> VORMIREX
      </Link>

      <nav className="main-nav">
        <div className="nav-section">
          <div className="nav-section-header" onClick={toggleSubjects}>
            <h3>SUBJECTS</h3>
            <FontAwesomeIcon
              icon={isSubjectsOpen ? faChevronDown : faChevronRight}
              className="section-toggle-icon"
            />
          </div>
          {isSubjectsOpen && (
            <ul>
              {coursesLoading ? (
                <li className="loading-courses">Loading courses...</li>
              ) : courses.length > 0 ? (
                courses.map((course) => (
                  <li
                    key={course._id}
                    onClick={() => navigate(`/course/${course._id}`)}
                    onMouseEnter={() => handleCourseHover(course._id)} // Pre-fetch on hover
                  >
                    <FontAwesomeIcon
                      icon={getCourseIcon(course.title)}
                      className="nav-icon"
                    />{' '}
                    {course.title}
                  </li>
                ))
              ) : (
                <li className="no-courses">No courses available</li>
              )}
            </ul>
          )}
        </div>

        <div className="nav-section">
          <div className="nav-section-header" onClick={toggleCustomCourses}>
            <h3>CUSTOM COURSES</h3>
            <FontAwesomeIcon
              icon={isCustomCoursesOpen ? faChevronDown : faChevronRight}
              className="section-toggle-icon"
            />
          </div>
          {isCustomCoursesOpen && (
            <ul>
              <li onClick={() => navigate('/custom/booster-pack')}>
                <FontAwesomeIcon icon={faCubes} className="nav-icon" /> Booster
                Pack
              </li>
              <li onClick={() => navigate('/custom/coding-mastery')}>
                <FontAwesomeIcon icon={faLaptopCode} className="nav-icon" />{' '}
                Coding Mastery
              </li>
              <li onClick={() => navigate('/custom/exam-prep')}>
                <FontAwesomeIcon icon={faClipboardList} className="nav-icon" />{' '}
                Exam Preparation
              </li>
              <li onClick={() => navigate('/custom/your-progress')}>
                <FontAwesomeIcon icon={faChartLine} className="nav-icon" /> Your
                Progress
              </li>
              <li onClick={() => navigate('/custom/saved-chats')}>
                <FontAwesomeIcon icon={faBookmark} className="nav-icon" /> Saved
                Chats
              </li>
            </ul>
          )}
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="footer-link" onClick={showComingSoon}>
          <FontAwesomeIcon icon={faCog} /> Settings
        </div>
        <div className="footer-link" onClick={showComingSoon}>
          <FontAwesomeIcon icon={faUserCircle} /> Profile
        </div>
      </div>
    </aside>
  );
};

export default SidebarLeft;
