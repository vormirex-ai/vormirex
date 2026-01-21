import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomCoursePage.css';

// ==================== IMPORT IMAGES ====================
// Booster Pack Images
import robotBooster from './assets/robotbooster.png';
import booster1 from './assets/booster1.png';
import booster2 from './assets/booster2.png';
import booster3 from './assets/booster3.png';
import booster4 from './assets/booster4.png';

// Coding Mastery Images
import codingMastery from './assets/codingmastery.png';
import codingMastery1 from './assets/codingmastery1.png';
import codingMastery2 from './assets/codingmastery2.png';
import codingMastery3 from './assets/codingmastery3.png';
import codingMastery4 from './assets/codingmastery4.png';

// Exam Prep Images
import examprep from './assets/Examprep.jpg';
import examprep1 from './assets/examprep1.png';
import examprep2 from './assets/examprep2.png';
import examprep3 from './assets/examprep3.png';
import examprep4 from './assets/examprep4.png';

// Saved Chats Images
import savedchats from './assets/savedchatss.jpg';
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

// ==================== CUSTOM COURSE PAGE COMPONENT ====================
interface CustomCoursePageProps {
  title: string;
  description: string;
  benefits: string[];
  testimonials?: { name: string; text: string }[];
  heroImageUrl: string;
  featureImages: string[];
  pdfUrl?: string;
}

const CustomCoursePage: React.FC<CustomCoursePageProps> = ({
  title,
  description,
  benefits,
  testimonials = [],
  heroImageUrl,
  featureImages,
  pdfUrl,
}) => {
  const navigate = useNavigate();

  const handlePdfOpen = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    } else {
      alert('PDF not available.');
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
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        {/* Navigation Buttons */}
        <div className="course-navigation">
          <button
            className="nav-button back-button animate-fade-in"
            onClick={handleBackToCourses}
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
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Courses
          </button>
          <button
            className="nav-button dashboard-button animate-fade-in"
            onClick={handleDashboard}
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
        </div>

        <div className="hero-content">
          <h1 className="custom-title animate-fade-in">{title}</h1>
          <p className="custom-desc animate-fade-in delay-1">{description}</p>
          <button
            className="hero-cta animate-fade-in delay-2"
            onClick={handlePdfOpen}
          >
            Enroll Now & Transform Your Future
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
              className={`benefit-card animate-slide-up delay-${Math.min(
                idx + 4,
                10
              )}`}
            >
              {featureImages[idx] && (
                <img
                  src={featureImages[idx]}
                  alt={benefit}
                  className="benefit-img"
                />
              )}
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
                className={`testimonial-card animate-slide-up delay-${Math.min(
                  idx + 8,
                  10
                )}`}
              >
                <p className="testimonial-text">"{t.text}"</p>
                <p className="testimonial-name">— {t.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="final-cta-section">
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
          Start Learning Today – It's Free to Begin!
        </button>
      </section>
    </main>
  );
};

// ==================== COURSE-SPECIFIC COMPONENTS ====================

// Booster Pack Component
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

// Coding Mastery Component
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

// Exam Preparation Component
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

// Saved Chats Component
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
        {
          name: 'Anita G.',
          text: 'Like having my own private tutor archive.',
        },
      ]}
      heroImageUrl={savedchats}
      featureImages={[savedchats1, savedchats2, savedchats3, savedchats4]}
      pdfUrl={boosterPDF}
    />
  );
};

// Your Progress Component
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
  BoosterPack,
  CodingMastery,
  ExamPrep,
  SavedChats,
  YourProgress,
};

export default CustomCoursePage;
