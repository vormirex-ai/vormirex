import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import './DashboardLayout.css';

import {
  faSearch,
  faThumbtack,
  faPaperclip,
  faMicrophone,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

import logoWithoutText from '../../assets/logo.png';

interface DashboardLayoutProps {
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  showComingSoon: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  toggleLeftSidebar,
  toggleRightSidebar,
  showComingSoon,
}) => {
  const navigate = useNavigate(); // ✅ Used for navigation

  return (
    <main className="main-content">
      {/* WATERMARK ELEMENT */}
      <div className="watermark-logo"></div>

      <header className="top-bar">
        <button className="mobile-menu-toggle" onClick={toggleLeftSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>

        {/* SEO FIX: Use an H1 for the mobile brand name or a hidden one if necessary */}
        <h1 className="logo-mobile">VORMIREX</h1>

        <div className="search-box">
          <label
            htmlFor="top-search"
            className="sr-only"
            style={{ display: 'none' }}
          >
            Search Topics
          </label>
          <FontAwesomeIcon icon={faSearch} />
          <input
            id="top-search"
            type="text"
            placeholder="Search Topics, Questions..."
            onKeyDown={(e) =>
              e.key === 'Enter' && (e.preventDefault(), showComingSoon())
            }
          />
        </div>

        <div className="tools-button" onClick={toggleRightSidebar}>
          Learning Tools <FontAwesomeIcon icon={faThumbtack} />
        </div>
      </header>

      <section className="ai-central-area">
        <div className="logo-with-text">
          <img
            src={logoWithoutText}
            className="logo-img"
            alt="Vormirex - AI-Powered Learning Platform Logo"
            role="button"
            tabIndex={0}
            onClick={() => navigate('/home')} // ✅ Logo click goes to home
            onKeyDown={(e) => e.key === 'Enter' && navigate('/home')}
          />

          {/* SEO FIX: Changed from span to h1 for primary keyword ranking */}
          <h1 className="company-name">VORMIREX</h1>
        </div>

        {/* SEO FIX: Added a hidden descriptive sub-heading for context */}
        <p style={{ display: 'none' }}>
          Vormirex is an AI-powered learning platform designed to help students
          master coding, data science, and more.
        </p>

        <div className="quick-pill-actions">
          <button onClick={showComingSoon}>Explain My Homework</button>
          <button onClick={showComingSoon}>Teach Me Python Basics</button>
          <button onClick={showComingSoon}>Solve A Math Problem</button>
          <button onClick={showComingSoon}>Give Me A Quiz Test</button>
        </div>

        <div className="ask-box">
          <input
            type="text"
            aria-label="Ask your doubts"
            placeholder="Ask Your Doubts..."
            onKeyDown={(e) =>
              e.key === 'Enter' && (e.preventDefault(), showComingSoon())
            }
          />
          <div className="ask-box-icons">
            <FontAwesomeIcon
              icon={faPaperclip}
              className="fa-icon"
              title="Attach File"
              onClick={showComingSoon}
            />
            <FontAwesomeIcon
              icon={faMicrophone}
              className="fa-icon"
              title="Voice Search"
              onClick={showComingSoon}
            />
          </div>
        </div>
      </section>

      <footer className="global-footer-note">
        VORMIREX can make mistakes. Verify important information.
      </footer>
    </main>
  );
};

export default DashboardLayout;
