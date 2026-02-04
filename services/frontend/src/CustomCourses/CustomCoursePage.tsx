import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomCoursePage.css';
import {
  ArrowLeft,
  LayoutDashboard,
  CheckCircle,
  Star,
  ArrowRight,
  Clock,
  Users,
} from 'lucide-react';

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
import examprep from './assets/Examprep.jpg';
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
  heroTextOverlay?: string;
  heroTextSubtitle?: string;
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
  heroTextOverlay = '',
  heroTextSubtitle = '',
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

  // Apply custom CSS variables for dynamic styling
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--hero-height', heroHeight);
    root.style.setProperty('--bg-dark', bgDark);
    root.style.setProperty('--bg-medium', bgMedium);
    root.style.setProperty('--color-teal', colorTeal);
    root.style.setProperty('--color-primary', colorPrimary);
    root.style.setProperty('--card-border-radius', cardBorderRadius);
    root.style.setProperty('--card-padding', cardPadding);
    root.style.setProperty('--section-padding', sectionPadding);

    // Handle parallax
    const heroElement = document.querySelector('.custom-hero');
    if (heroElement) {
      if (!showParallax) {
        heroElement.classList.add('no-parallax');
      } else {
        heroElement.classList.remove('no-parallax');
      }
    }

    return () => {
      // Reset styles when component unmounts
      root.style.removeProperty('--hero-height');
      root.style.removeProperty('--bg-dark');
      root.style.removeProperty('--bg-medium');
      root.style.removeProperty('--color-teal');
      root.style.removeProperty('--color-primary');
      root.style.removeProperty('--card-border-radius');
      root.style.removeProperty('--card-padding');
      root.style.removeProperty('--section-padding');
    };
  }, [
    heroHeight,
    bgDark,
    bgMedium,
    colorTeal,
    colorPrimary,
    showParallax,
    cardBorderRadius,
    cardPadding,
    sectionPadding,
  ]);

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
        }}
      >
        {/* --- CORRECTED NAVIGATION CONTAINER --- */}
        <div className="navigation-container">
          <button
            className="nav-button back-btn"
            onClick={handleBackToCourses}
            aria-label="Back to courses"
          >
            <ArrowLeft size={22} />
          </button>
          <button
            className="nav-button dashboard-btn"
            onClick={handleDashboard}
            aria-label="Go to dashboard"
          >
            <LayoutDashboard size={22} />
          </button>
        </div>

        <div className="hero-content">
          <div className="hero-text-wrapper">
            <h1 className="custom-title animate-fade-in">{title}</h1>
            <p className="custom-desc animate-fade-in delay-1">{description}</p>
            <button
              className="hero-cta animate-fade-in delay-2"
              onClick={handlePdfOpen}
            >
              {ctaText}
            </button>
          </div>
        </div>

        {/* Hero Image Text Overlay */}
        {heroTextOverlay && (
          <div className="hero-image-text-overlay">
            <h2 className="hero-image-title">{heroTextOverlay}</h2>
            {heroTextSubtitle && (
              <p className="hero-image-subtitle">{heroTextSubtitle}</p>
            )}
          </div>
        )}
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
      heroTextOverlay: 'Accelerate Your Learning',
      heroTextSubtitle:
        'Break through plateaus with focused, intensive modules',
      badge: 'Popular',
      rating: 4.8,
      duration: '2 weeks',
      students: '12,000+',
      isNew: true,
    },
    {
      id: 'coding-mastery',
      title: 'Coding Mastery',
      description: 'Transform from beginner to job-ready developer',
      image: codingMastery,
      path: '/custom/coding-mastery',
      heroTextOverlay: 'Master the Code',
      heroTextSubtitle: 'From beginner to job-ready developer',
      badge: 'Bestseller',
      rating: 4.9,
      duration: '8 weeks',
      students: '25,000+',
      isNew: false,
    },
    {
      id: 'exam-prep',
      title: 'Exam Preparation',
      description: 'Score higher with realistic mock exams',
      image: examprep,
      path: '/custom/exam-prep',
      heroTextOverlay: 'Ace Your Exams',
      heroTextSubtitle: 'Realistic practice tests that prepare you for success',
      badge: 'Top Rated',
      rating: 4.7,
      duration: '4 weeks',
      students: '18,000+',
      isNew: false,
    },
    {
      id: 'saved-chats',
      title: 'Saved Chats',
      description: 'Your personal knowledge vault',
      image: savedchats,
      path: '/custom/saved-chats',
      heroTextOverlay: 'Your Knowledge Vault',
      heroTextSubtitle: 'Never lose a valuable insight again',
      badge: 'New',
      rating: 4.6,
      duration: 'Lifetime',
      students: '8,000+',
      isNew: true,
    },
    {
      id: 'your-progress',
      title: 'Your Progress',
      description: "See exactly how far you've come",
      image: yourprogress,
      path: '/custom/your-progress',
      heroTextOverlay: 'Track Your Journey',
      heroTextSubtitle: 'Visualize your growth and stay motivated',
      badge: 'Essential',
      rating: 4.8,
      duration: 'Ongoing',
      students: '15,000+',
      isNew: false,
    },
  ];

  return (
    <div className="custom-courses-list">
      <div className="courses-header">
        <button
          className="nav-button dashboard-btn" // Changed from dashboard-button-header to dashboard-btn
          onClick={() => navigate('/')}
        >
          <LayoutDashboard size={22} /> // Only icon, no text
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

              {/* Course Badge */}
              <div
                className={`course-badge ${course.isNew ? 'new-badge' : ''}`}
              >
                {course.badge}
              </div>

              {/* Course Stats */}
              <div className="course-stats">
                <div className="course-stat">
                  <Star size={14} fill="#FFD700" color="#FFD700" />
                  <span>{course.rating}</span>
                </div>
                <div className="course-stat">
                  <Clock size={14} />
                  <span>{course.duration}</span>
                </div>
                <div className="course-stat">
                  <Users size={14} />
                  <span>{course.students}</span>
                </div>
              </div>

              <div className="course-card-overlay">
                <h3>{course.heroTextOverlay}</h3>
                <p>{course.heroTextSubtitle}</p>
                <div className="overlay-cta">
                  Explore Course <ArrowRight size={16} />
                </div>
              </div>
            </div>
            <div className="course-card-content">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button className="course-card-button">Explore Course</button>
            </div>
          </div>
        ))}
      </div>
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
      heroTextOverlay="Accelerate Your Learning"
      heroTextSubtitle="Break through plateaus with focused, intensive modules"
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
      heroTextOverlay="Master the Code"
      heroTextSubtitle="From beginner to job-ready developer"
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
      heroTextOverlay="Ace Your Exams"
      heroTextSubtitle="Realistic practice tests that prepare you for success"
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
      heroTextOverlay="Your Knowledge Vault"
      heroTextSubtitle="Never lose a valuable insight again"
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
      heroTextOverlay="Track Your Journey"
      heroTextSubtitle="Visualize your growth and stay motivated"
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
