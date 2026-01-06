import React from 'react';
import './SidebarRight.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faFire,
  faCircleQuestion,
  faBookOpen,
  faPaperclip,
  faCalculator,
  faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';
import { RECENT_CHATS, QA_CARDS } from '../../constants';

interface SidebarRightProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  showComingSoon: () => void;
}

const SidebarRight: React.FC<SidebarRightProps> = ({
  isOpen,
  toggleSidebar,
  showComingSoon,
}) => {
  return (
    <aside className={`sidebar-right ${isOpen ? 'sidebar-open' : ''}`}>
      {/* CLOSE BUTTON – MOBILE */}
      <button
        className="sidebar-close-button close-right"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h2>Learning Tools</h2>

      <div className="progress-card">
        <h3>TODAY'S PROGRESS</h3>
        <div className="progress-details">
          <div className="daily-goals">
            <span className="number tech-progress">45/60</span>
            <p>Skill Points</p>
          </div>
          <div className="day-streak">
            <span className="number tech-streak">
              <FontAwesomeIcon icon={faFire} className="streak-fire-icon" /> 12
            </span>
            <p>Coding Streak</p>
          </div>
        </div>
      </div>

      <div className="recent-questions">
        <h3>RECENT CHATS</h3>
        <ul>
          <li className="recent-item" onClick={showComingSoon}>
            <FontAwesomeIcon icon={faCircleQuestion} /> SQL Joins: LEFT vs.
            INNER
          </li>
          <li className="recent-item" onClick={showComingSoon}>
            <FontAwesomeIcon icon={faCircleQuestion} /> Python Decorators
          </li>
          <li className="recent-item" onClick={showComingSoon}>
            <FontAwesomeIcon icon={faCircleQuestion} /> Cross-Site Scripting
            (XSS)
          </li>
        </ul>
      </div>

      {/* QA CARDS */}
      <div className="qa-grid">
        <div className="qa-card" onClick={showComingSoon}>
          <FontAwesomeIcon icon={faBookOpen} className="qa-icon" />
          <h4>Summarize Tech Article</h4>
        </div>
        <div className="qa-card" onClick={showComingSoon}>
          <FontAwesomeIcon icon={faCircleQuestion} className="qa-icon" />
          <h4>Generate Coding Challenge</h4>
        </div>
        <div className="qa-card" onClick={showComingSoon}>
          <FontAwesomeIcon icon={faPaperclip} className="qa-icon" />
          <h4>Convert Code to Docs</h4>
        </div>
        <div className="qa-card" onClick={showComingSoon}>
          <FontAwesomeIcon icon={faCalculator} className="qa-icon" />
          <h4>Debug Step-by-Step</h4>
        </div>
      </div>

      <div className="recommended-card">
        <h3>
          <FontAwesomeIcon icon={faGraduationCap} /> RECOMMENDED
        </h3>
        <div className="exam-prep-bundle">
          <h4>Certification Prep Bundle</h4>
          <p>Master CompTIA Security+ and AWS Certified Cloud Practitioner.</p>
          <button
            className="start-learning-button primary-button"
            onClick={showComingSoon}
          >
            Start Learning
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SidebarRight;
