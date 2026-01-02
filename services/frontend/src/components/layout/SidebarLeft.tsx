import React from 'react';
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
  faDatabase,
  faLightbulb,
  faChartLine,
  faCubes,
  faLaptopCode,
  faClipboardList,
  faBookmark,
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import logoWithoutText from '../../assets/logo.png';

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
  const [isSubjectsOpen, setIsSubjectsOpen] = React.useState(false);
  const [isCustomCoursesOpen, setIsCustomCoursesOpen] = React.useState(false);

  const toggleSubjects = () => setIsSubjectsOpen(!isSubjectsOpen);
  const toggleCustomCourses = () =>
    setIsCustomCoursesOpen(!isCustomCoursesOpen);

  return (
    <aside className={`sidebar-left ${isOpen ? 'sidebar-open' : ''}`}>
      {/* Close Sidebar Button */}
      <button
        className="sidebar-close-button close-left"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>

      {/* Logo Section */}
      <div className="sidebar-header">
        <img
          src={logoWithoutText}
          className="sidebar-logo-img"
          alt="Vormirex Logo"
        />
        <span className="sidebar-company-name">VORMIREX</span>
      </div>

      {/* Action Buttons */}

      {/* FIXED: New Chat Right-click support added */}
      <Link
        to="/dashboard"
        className="new-chat-button"
        style={{
          textDecoration: 'none',
          display: 'block',
          textAlign: 'center',
        }}
        onClick={(e) => {
          // Normal click chesthe Coming Soon modal chupistundi
          // Right-click chesthe browser URL ni kotha tab lo open chestundi
          showComingSoon();
        }}
      >
        <FontAwesomeIcon icon={faPlus} /> New Chat
      </Link>

      {/* FIXED: VORMIREX Right-click support added */}
      <Link
        to="/landing"
        className="new-chat-button"
        style={{
          textDecoration: 'none',
          display: 'block',
          textAlign: 'center',
        }}
      >
        <FontAwesomeIcon icon={faGlobe} /> VORMIREX
      </Link>

      {/* Navigation Sections */}
      <nav className="main-nav">
        {/* SUBJECTS */}
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
              <li onClick={() => navigate('/course/cyber-security')}>
                <FontAwesomeIcon icon={faCode} className="nav-icon" /> Cyber
                Security
              </li>
              <li onClick={() => navigate('/course/data-science')}>
                <FontAwesomeIcon icon={faDatabase} className="nav-icon" /> Data
                Science
              </li>
              <li onClick={() => navigate('/course/data-analytics')}>
                <FontAwesomeIcon icon={faChartLine} className="nav-icon" /> Data
                Analytics
              </li>
              <li onClick={showComingSoon}>
                <FontAwesomeIcon icon={faLightbulb} className="nav-icon" /> AI /
                ML
              </li>
            </ul>
          )}
        </div>

        {/* CUSTOM COURSES */}
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
                Exam Prep
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

      {/* Footer Links */}
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
