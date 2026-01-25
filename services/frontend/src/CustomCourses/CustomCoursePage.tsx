import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LayoutDashboard, CheckCircle, Star } from 'lucide-react';

// ==================== IMPORT IMAGES ====================
// Booster Pack Images
import robotBooster from './assets/robotbooster.png';
import booster1 from './assets/booster1.png';
import booster2 from './assets/booster2.png';
import booster3 from './assets/booster3.png';
import booster4 from './assets/booster4.png';

// Coding Mastery Images
import codingMastery from './assets/codingmastery.jpg';
import codingMastery1 from './assets/codingmastery1.png';
import codingMastery2 from './assets/codingmastery2.png';
import codingMastery3 from './assets/codingmastery3.png';
import codingMastery4 from './assets/codingmastery4.png';

// Exam Prep Images
import examprep from './assets/ExamPrep.jpeg';
import examprep1 from './assets/examprep1.png';
import examprep2 from './assets/examprep2.png';
import examprep3 from './assets/examprep3.png';
import examprep4 from './assets/examprep4.png';

// Saved Chats Images
import savedchats from './assets/savedchatss.jpeg';
import savedchats1 from './assets/savedchats1.jpg';
import savedchats2 from './assets/savedchat2.png';
import savedchats3 from './assets/savedchat3.png';
import savedchats4 from './assets/savedchats4.png';

// Your Progress Images
import yourprogress from './assets/yourprogress.png';
import yourprogress1 from './assets/heatmaps.jpg';
import yourprogress2 from './assets/badges.jpg';
import yourprogress3 from './assets/airecommends.jpg';
import yourprogress4 from './assets/improvement.jpg';

// PDF
import boosterPDF from './assets/CoursesPdf (2).pdf';

// ==================== INTERFACES ====================
interface Testimonial {
  name: string;
  text: string;
}

interface CustomCoursePageProps {
  title?: string;
  description?: string;
  benefits?: string[];
  testimonials?: Testimonial[];
  heroImageUrl?: string;
  featureImages?: string[];
  pdfUrl?: string;
  // Additional props for customization
  heroHeight?: string;
  bgDark?: string;
  bgMedium?: string;
  colorTeal?: string;
  colorPrimary?: string;
  showParallax?: boolean;
  cardBorderRadius?: string;
  cardPadding?: string;
  sectionPadding?: string;
  ctaText?: string;
  finalCtaText?: string;
}

// ==================== CUSTOM COURSE PAGE COMPONENT ====================
const CustomCoursePage: React.FC<CustomCoursePageProps> = ({
  title = 'Course Title',
  description = 'Course description goes here.',
  benefits = [],
  testimonials = [],
  heroImageUrl = '',
  featureImages = [],
  pdfUrl = '',
  // Default values for additional props
  heroHeight = '80vh',
  bgDark = '#0a0a0a',
  bgMedium = '#121212',
  colorTeal = '#00ced1',
  colorPrimary = '#6aece1',
  showParallax = true,
  cardBorderRadius = '24px',
  cardPadding = '32px',
  sectionPadding = '80px 24px',
  ctaText = 'Enroll Now & Transform Your Future',
  finalCtaText = "Start Learning Today – It's Free to Begin!",
}) => {
  const navigate = useNavigate();

  const handlePdfOpen = () => {
    if (pdfUrl && pdfUrl !== '#') {
      window.open(pdfUrl, '_blank');
    } else {
      alert('Enrollment process started!');
    }
  };

  const handleBackToCourses = () => {
    navigate('/custom-courses');
  };

  const handleDashboard = () => {
    navigate('/');
  };

  return (
    <main className="custom-course-main">
      {/* Hero Section */}
      <section
        className="custom-hero"
        style={{
          backgroundImage: `url(${heroImageUrl})`,
          height: heroHeight,
        }}
      >
        <div className="course-hero-top">
          <div className="hero-nav-group">
            <button
              className="nav-icon-btn back-btn"
              onClick={handleBackToCourses}
              aria-label="Back to courses"
            >
              <ArrowLeft size={22} />
            </button>
            <button
              className="nav-icon-btn dashboard-btn"
              onClick={handleDashboard}
              aria-label="Go to dashboard"
            >
              <LayoutDashboard size={22} />
            </button>
          </div>
        </div>

        <div className="hero-content">
          <h1 className="custom-title animate-fade-in">{title}</h1>
          <p className="custom-desc animate-fade-in delay-1">{description}</p>
          <button
            className="hero-cta animate-fade-in delay-2"
            onClick={handlePdfOpen}
          >
            {ctaText}
          </button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <h2 className="section-title animate-fade-in delay-3">
          Why Thousands of Students Choose This
        </h2>
        <div className="benefits-grid">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className={`benefit-card animate-slide-up delay-${Math.min(idx + 4, 10)}`}
            >
              <div className="benefit-visual">
                {featureImages[idx] && (
                  <img
                    src={featureImages[idx]}
                    alt={benefit}
                    className="benefit-img"
                  />
                )}
                <div className="benefit-icon-overlay">
                  <CheckCircle size={32} color={colorTeal} />
                </div>
              </div>
              <p>{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="testimonials-section">
          <h2 className="section-title animate-fade-in delay-7">
            What Our Students Are Saying
          </h2>
          <div className="testimonials-grid">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className={`testimonial-card animate-slide-up delay-${Math.min(idx + 8, 10)}`}
              >
                <div className="star-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={colorTeal}
                      color={colorTeal}
                    />
                  ))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <p className="testimonial-name">— {t.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="final-cta-section">
        <div className="final-cta-container">
          <h2 className="animate-fade-in delay-9">
            Ready to Unlock Your Potential?
          </h2>
          <p className="animate-fade-in delay-9">
            Join over 50,000+ learners mastering tech skills with VORMIREX AI.
          </p>
          <button
            className="final-cta-button animate-fade-in delay-10"
            onClick={handlePdfOpen}
          >
            {finalCtaText}
          </button>
        </div>
      </section>

      <style>{`
        :root {
          --bg-dark: ${bgDark};
          --bg-medium: ${bgMedium};
          --bg-light: #1a1a1a;
          --color-teal: ${colorTeal};
          --color-primary: ${colorPrimary};
          --color-primary-glow: rgba(106, 236, 225, 0.4);
          --color-border: rgba(106, 236, 225, 0.15);
          --color-text-main: #ffffff;
          --text-secondary: #a0a0a5;
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          --card-border-radius: ${cardBorderRadius};
          --card-padding: ${cardPadding};
          --section-padding: ${sectionPadding};
        }

        .custom-course-main {
          min-height: 100vh;
          background-color: var(--bg-medium);
          color: var(--color-text-main);
          overflow-x: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        /* HERO SECTION */
        .custom-hero {
          position: relative;
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-color: var(--bg-medium);
          /* High Clarity Settings */
          image-rendering: -webkit-optimize-contrast;
          image-rendering: auto;
          backface-visibility: hidden;
          transform: translateZ(0);
          height: ${heroHeight};
        }

        /* Parallax effect for desktop */
        @media (min-width: 1024px) {
          ${
            showParallax
              ? `
            .custom-hero {
              background-attachment: fixed;
            }
          `
              : ''
          }
        }

        .custom-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(10, 10, 10, 0.5),
            rgba(18, 18, 18, 0.85)
          );
          z-index: 1;
        }

        .course-hero-top {
          position: absolute;
          top: 30px;
          left: 30px;
          right: 30px;
          display: flex;
          justify-content: flex-start;
          z-index: 10;
        }

        .hero-nav-group {
          display: flex;
          gap: 15px;
        }

        /* Navigation Button Styles */
        .nav-icon-btn {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(8px);
          cursor: pointer;
          transition: var(--transition);
          z-index: 100;
          position: relative;
          overflow: hidden;
        }

        .nav-icon-btn:hover {
          background: var(--color-teal) !important;
          color: #000 !important;
          box-shadow: 0 0 20px var(--color-primary-glow) !important;
          transform: translateY(-2px) scale(1.05);
        }

        .nav-icon-btn:active {
          transform: translateY(0) scale(0.98);
        }

        /* Hero Content */
        .hero-content {
          position: absolute;
          bottom: 40px;
          left: 30px; /* Changed from fixed 400px to responsive 30px */
          right: 24px;
          max-width: 900px;
          z-index: 5; /* Increased z-index to ensure it's above the overlay */
          text-align: left;
          padding: 0 24px; /* Added padding for better mobile display */
        }

        .custom-title {
          font-size: clamp(2.5rem, 8vw, 5rem);
          color: var(--color-teal);
          margin-bottom: 24px;
          font-weight: 900;
          letter-spacing: -1px;
          text-shadow: 0 4px 30px rgba(0, 0, 0, 0.8); /* Increased shadow for better contrast */
        }

        .custom-desc {
          font-size: clamp(1.1rem, 3vw, 1.8rem);
          color: #f0f0f0;
          margin-bottom: 48px;
          line-height: 1.5;
          max-width: 800px;
          text-shadow: 0 2px 15px rgba(0, 0, 0, 0.8); /* Increased shadow for better contrast */
        }

        /* Button Styles */
        .hero-cta {
          background-color: var(--color-teal);
          color: #000;
          font-weight: 800;
          padding: 18px 40px;
          font-size: clamp(1.1rem, 2.5vw, 1.4rem);
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 10px 40px rgba(0, 206, 209, 0.4);
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          overflow: hidden;
        }

        .hero-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .hero-cta:hover::before {
          left: 100%;
        }

        .hero-cta:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 15px 50px rgba(0, 206, 209, 0.6);
        }

        /* Benefits Section */
        .benefits-section {
          padding: var(--section-padding);
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        .benefits-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--color-teal), transparent);
          opacity: 0.3;
        }

        .section-title {
          text-align: center;
          font-size: clamp(2rem, 5vw, 3rem);
          color: var(--color-teal);
          margin-bottom: 60px;
          font-weight: 800;
          position: relative;
          display: inline-block;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background: var(--color-teal);
          border-radius: 2px;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .benefit-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--card-border-radius);
          padding: var(--card-padding);
          text-align: center;
          transition: all 0.4s ease;
          opacity: 0;
        }

        /* Card Hover Effects */
        .benefit-card:hover {
          transform: translateY(-12px);
          border-color: var(--color-teal);
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .benefit-visual {
          position: relative;
          margin-bottom: 20px;
          border-radius: 16px;
          overflow: hidden;
          height: 200px;
        }

        .benefit-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .benefit-card:hover .benefit-img {
          transform: scale(1.05);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }

        .benefit-icon-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.3);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .benefit-card:hover .benefit-icon-overlay {
          opacity: 1;
        }

        .benefit-card p {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #e0e0e0;
        }

        /* Testimonials Section */
        .testimonials-section {
          padding: 100px 24px;
          background-color: var(--bg-dark);
          position: relative;
          overflow: hidden;
        }

        .testimonials-section::before {
          content: '"';
          position: absolute;
          top: 20px;
          left: 20px;
          font-size: 200px;
          color: rgba(0, 206, 209, 0.05);
          font-family: Georgia, serif;
          z-index: 0;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .testimonial-card {
          background: var(--bg-medium);
          padding: 40px;
          border-radius: var(--card-border-radius);
          border-left: 6px solid var(--color-teal);
          opacity: 0;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
          border-left-width: 8px;
        }

        .star-rating {
          display: flex;
          gap: 4px;
          margin-bottom: 16px;
        }

        .testimonial-text {
          font-style: italic;
          font-size: 1.25rem;
          margin-bottom: 24px;
          color: #d0d0d0;
          line-height: 1.6;
        }

        .testimonial-name {
          text-align: right;
          font-weight: 700;
          color: var(--color-teal);
          font-size: 1.1rem;
        }

        /* Final CTA Section */
        .final-cta-section {
          text-align: center;
          padding: 120px 24px;
          background: linear-gradient(180deg, var(--bg-medium) 0%, var(--bg-dark) 100%);
          position: relative;
        }

        .final-cta-section::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--color-teal), transparent);
          opacity: 0.3;
        }

        .final-cta-container {
          max-width: 800px;
          margin: 0 auto;
          background: linear-gradient(135deg, rgba(0,206,209,0.1), transparent);
          padding: 60px 40px;
          border-radius: 40px;
          border: 1px solid rgba(0,206,209,0.2);
        }

        .final-cta-section h2 {
          font-size: clamp(2rem, 5vw, 3rem);
          color: var(--color-teal);
          margin-bottom: 20px;
          font-weight: 800;
        }

        .final-cta-section p {
          font-size: clamp(1.1rem, 3vw, 1.4rem);
          color: #aaa;
          margin-bottom: 48px;
        }

        .final-cta-button {
          background-color: var(--color-teal);
          color: #000;
          padding: 20px 50px;
          font-size: clamp(1.2rem, 2.5vw, 1.6rem);
          font-weight: 800;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.4s;
          box-shadow: 0 10px 40px rgba(0, 206, 209, 0.4);
          position: relative;
          overflow: hidden;
        }

        .final-cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .final-cta-button:hover::before {
          left: 100%;
        }

        .final-cta-button:hover {
          transform: scale(1.05);
          box-shadow: 0 20px 60px rgba(0, 206, 209, 0.6);
        }

        /* ANIMATIONS */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.8s ease-out forwards; }

        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
        .delay-4 { animation-delay: 0.8s; }
        .delay-5 { animation-delay: 1.0s; }
        .delay-6 { animation-delay: 1.2s; }
        .delay-7 { animation-delay: 1.4s; }
        .delay-8 { animation-delay: 1.6s; }
        .delay-9 { animation-delay: 1.8s; }
        .delay-10 { animation-delay: 2.0s; }

        /* Media Queries */
        @media (max-width: 768px) {
          .course-hero-top { 
            top: 20px; 
            left: 20px; 
            right: 20px; 
          }
          .custom-hero { 
            min-height: 80vh; 
            background-attachment: scroll; 
          }
          .benefits-section { 
            padding: 60px 20px; 
          }
          
          /* Enhanced mobile navigation buttons */
          .nav-icon-btn {
            width: 44px;
            height: 44px;
          }

          .benefits-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .testimonials-grid {
            grid-template-columns: 1fr;
          }

          .final-cta-container {
            padding: 40px 20px;
            border-radius: 24px;
          }

          .hero-cta, .final-cta-button {
            width: 100%;
            padding: 16px 24px;
          }

          .hero-content {
            padding: 0 24px 50px 30px;
          }
        }
      `}</style>
    </main>
  );
};

// ==================== CUSTOM COURSES LIST COMPONENT ====================
const CustomCoursesList: React.FC = () => {
  const navigate = useNavigate();

  const courses = [
    {
      id: 'booster-pack',
      title: 'Booster Pack',
      description: 'Accelerate your progress with intense, focused modules',
      image: robotBooster,
      path: '/custom/booster-pack',
    },
    {
      id: 'coding-mastery',
      title: 'Coding Mastery',
      description: 'Transform from beginner to job-ready developer',
      image: codingMastery,
      path: '/custom/coding-mastery',
    },
    {
      id: 'exam-prep',
      title: 'Exam Preparation',
      description: 'Score higher with realistic mock exams',
      image: examprep,
      path: '/custom/exam-prep',
    },
    {
      id: 'saved-chats',
      title: 'Saved Chats',
      description: 'Your personal knowledge vault',
      image: savedchats,
      path: '/custom/saved-chats',
    },
    {
      id: 'your-progress',
      title: 'Your Progress',
      description: "See exactly how far you've come",
      image: yourprogress,
      path: '/custom/your-progress',
    },
  ];

  return (
    <div className="custom-courses-list">
      <div className="courses-header">
        <button
          className="nav-button dashboard-button"
          onClick={() => navigate('/')}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ marginRight: '8px' }}
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          Dashboard
        </button>

        <h1 className="courses-title">Custom Courses</h1>
        <p className="courses-subtitle">Choose your learning path</p>
      </div>

      <div className="courses-grid">
        {courses.map((course) => (
          <div
            key={course.id}
            className="course-card"
            onClick={() => navigate(course.path)}
          >
            <div className="course-card-image">
              <img src={course.image} alt={course.title} />
            </div>
            <div className="course-card-content">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button className="course-card-button">Explore Course</button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        /* ==================== CUSTOM COURSES LIST ==================== */
        .custom-courses-list {
          min-height: 100vh;
          background-color: #121212;
          color: #ffffff;
          padding: 40px 20px;
        }

        .courses-header {
          text-align: center;
          margin-bottom: 60px;
          position: relative;
        }

        .courses-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          color: #00ced1;
          margin-bottom: 16px;
          font-weight: 900;
        }

        .courses-subtitle {
          font-size: clamp(1.2rem, 3vw, 1.5rem);
          color: #cccccc;
          margin-bottom: 40px;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 40px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .course-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .course-card:hover {
          transform: translateY(-10px);
          border-color: #00ced1;
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 20px 40px rgba(0, 206, 209, 0.2);
        }

        /* FIXED FOR VISIBILITY - Using img tag instead of background */
        .course-card-image {
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #222;
        }

        .course-card-image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 16px 16px 0 0;
        }

        .course-card-content {
          padding: 30px;
        }

        .course-card-content h3 {
          font-size: 1.8rem;
          color: #00ced1;
          margin-bottom: 12px;
        }

        .course-card-content p {
          font-size: 1.1rem;
          color: #e0e0e0;
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .course-card-button {
          background-color: #00ced1;
          color: #000;
          font-weight: bold;
          padding: 12px 24px;
          font-size: 1rem;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .course-card-button:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(0, 206, 209, 0.4);
        }

        .nav-button {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          padding: 10px 20px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-button:hover {
          background: #00ced1;
          color: #000;
        }

        @media (max-width: 768px) {
          .courses-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .course-card-content {
            padding: 20px;
          }

          .course-card-content h3 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

// ==================== COURSE-SPECIFIC COMPONENTS ====================

const BoosterPack: React.FC = () => {
  return (
    <CustomCoursePage
      title="Booster Pack"
      description="Accelerate your progress with intense, focused modules that deliver breakthrough results in days — perfect for overcoming plateaus and building unstoppable momentum."
      benefits={[
        'Master complex topics 3x faster with AI-guided drills',
        'Daily adaptive challenges that push your limits intelligently',
        'Earn streaks, badges, and real confidence boosts',
        'Ideal for students who want fast, measurable wins',
      ]}
      testimonials={[
        {
          name: 'Sarah K.',
          text: 'I finally understood recursion after just 5 days — incredible!',
        },
        {
          name: 'Raj M.',
          text: 'The daily challenges turned learning into an addiction (the good kind).',
        },
      ]}
      heroImageUrl={robotBooster}
      featureImages={[booster1, booster2, booster3, booster4]}
      pdfUrl={boosterPDF}
    />
  );
};

const CodingMastery: React.FC = () => {
  return (
    <CustomCoursePage
      title="Coding Mastery"
      description="Transform from beginner to job-ready developer with real-world projects, AI code reviews, and paths trusted by top tech companies."
      benefits={[
        'Build full apps: frontend, backend, databases, deployment',
        'Get instant AI feedback like having a senior mentor 24/7',
        'Master clean code, algorithms & system design',
        'Create a stunning portfolio that gets you hired',
      ]}
      testimonials={[
        {
          name: 'Alex T.',
          text: 'Landed a full-stack role just 4 months after starting!',
        },
        {
          name: 'Priya S.',
          text: 'The AI code reviews are better than most human tutors.',
        },
      ]}
      heroImageUrl={codingMastery}
      featureImages={[
        codingMastery1,
        codingMastery2,
        codingMastery3,
        codingMastery4,
      ]}
      pdfUrl={boosterPDF}
    />
  );
};

const ExamPrep: React.FC = () => {
  return (
    <CustomCoursePage
      title="Exam Preparation"
      description="Score higher with realistic mock exams, smart revision plans, and proven strategies that turn stress into success."
      benefits={[
        'Unlimited full-length practice tests with instant scoring',
        'AI-generated explanations that make weak areas your strengths',
        'Personalized study schedules based on your progress',
        'Techniques used by top scorers worldwide',
      ]}
      testimonials={[
        {
          name: 'Mike L.',
          text: 'Scored 95% on my certification — thank you VORMIREX!',
        },
        {
          name: 'Emma R.',
          text: 'The mock exams felt exactly like the real thing.',
        },
      ]}
      heroImageUrl={examprep}
      featureImages={[examprep1, examprep2, examprep3, examprep4]}
      pdfUrl={boosterPDF}
    />
  );
};

const SavedChats: React.FC = () => {
  return (
    <CustomCoursePage
      title="Saved Chats"
      description="Your personal knowledge vault. Every brilliant explanation, code snippet, and insight — organized and ready when you need it."
      benefits={[
        'Search thousands of past conversations instantly',
        'Tag, categorize, and export your best learning moments',
        'Build your own reference library of solved problems',
        'Resume any chat exactly where you left off',
      ]}
      testimonials={[
        {
          name: 'David H.',
          text: 'I refer back to my saved explanations all the time — pure gold.',
        },
        { name: 'Anita G.', text: 'Like having my own private tutor archive.' },
      ]}
      heroImageUrl={savedchats}
      featureImages={[savedchats1, savedchats2, savedchats3, savedchats4]}
      pdfUrl={boosterPDF}
    />
  );
};

const YourProgress: React.FC = () => {
  return (
    <CustomCoursePage
      title="Your Progress"
      description="See exactly how far you've come with stunning dashboards, badges, and insights that keep you motivated every day."
      benefits={[
        'Beautiful heatmaps showing your daily learning streaks',
        'Earn exclusive badges for milestones and mastery',
        'AI recommendations to close skill gaps faster',
        'Track improvement across all subjects in one place',
      ]}
      testimonials={[
        {
          name: 'Jordan P.',
          text: 'Seeing my streak grow keeps me coming back every day.',
        },
        {
          name: 'Lisa W.',
          text: 'Finally understand where I need to improve — game changer!',
        },
      ]}
      heroImageUrl={yourprogress}
      featureImages={[
        yourprogress1,
        yourprogress2,
        yourprogress3,
        yourprogress4,
      ]}
      pdfUrl={boosterPDF}
    />
  );
};

// ==================== EXPORTS ====================
export {
  CustomCoursePage,
  CustomCoursesList,
  BoosterPack,
  CodingMastery,
  ExamPrep,
  SavedChats,
  YourProgress,
};

export default CustomCoursePage;
