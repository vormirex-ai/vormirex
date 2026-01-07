import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../common/SEO';
import './AboutSection.css';

const AboutVormirex: React.FC = () => {
  const navigate = useNavigate(); // Hook to handle page navigation

  return (
    <div className="about-wrapper">
      <SEO
        title="About Us – Vormirex"
        description="Learn about Vormirex, the AI-powered learning platform bridging the gap between traditional education and industry demands."
        url="https://vormirex.com/about"
      />
      {/* ================= HERO SECTION ================= */}
      <section className="about-hero">
        <h1>About Us</h1>
        <p>
          We’re building Vormirex to make mastering high-demand tech skills
          interactive, industry-focused, and powered by AI.
        </p>
      </section>

      {/* ================= STORY SECTION ================= */}
      <section className="about-story">
        <div className="story-content">
          <h2>Our Story</h2>

          <p>
            Traditional learning paths for tech often feel disconnected from the
            real world. Generic tutorials are often outdated, and self-learning
            can feel isolated and overwhelming without the right guidance.
          </p>

          <p>
            <strong>Vormirex</strong> was created to bridge this gap. It is an
            AI-powered skill development platform that transforms complex
            technical subjects into engaging, hands-on experiences through live
            collaboration and instant AI support.
          </p>

          <p>
            Whether you are diving into{' '}
            <strong>Cyber Security, Data Science, or Data Analytics</strong>,
            Vormirex provides a collaborative environment that feels like
            working in a real-world tech team.
          </p>
        </div>

        <div className="story-image">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Tech professionals collaborating"
          />
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="about-features">
        <h2>Why Vormirex?</h2>

        <ul>
          <li>
            🛡️ Specialized tracks in Cyber Security, Data Science, and Analytics
          </li>
          <li>🤖 24/7 AI Mentor to debug code and explain complex concepts</li>
          <li>💻 Live group sessions with real-world project simulations</li>
          <li>🛠️ Hands-on labs designed for industry readiness</li>
          <li>📊 Personalized skill-mapping to track your career growth</li>
        </ul>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="about-features">
        <h2>The Vormirex Experience</h2>

        <ul>
          <li>🚀 Select your career-focused learning path</li>
          <li>📹 Join live collaborative workshops with peers</li>
          <li>🔍 Solve real-world datasets and security challenges</li>
          <li>🤖 Get instant feedback from the AI technical assistant</li>
          <li>💼 Build a portfolio that gets you noticed by recruiters</li>
        </ul>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="about-cta">
        <h2>Master the Future of Tech</h2>
        <p>
          Join a community of innovators and start building the skills that the
          modern industry demands.
        </p>

        <div className="cta-buttons">
          {/* Navigates to the Courses page */}
          <button className="primary-btn" onClick={() => navigate('/courses')}>
            View Courses
          </button>

          {/* Navigates to the Contact page */}
          <button
            className="secondary-btn"
            onClick={() => navigate('/contact')}
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutVormirex;
