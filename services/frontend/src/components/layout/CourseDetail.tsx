// src/pages/CourseDetail.jsx

import { useMemo, useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LayoutDashboard, ArrowLeft, Send } from 'lucide-react';
import './Courses.css';
import { getCourseById, getAllCourses } from '../../api/courses';
import {
  getCatalogImage,
  getHeroVideo,
  getDetailImages,
  getSlug,
} from '../../utils/courseUtils';

import SyllabusPDF from '../../assets/CoursesPdf (2).pdf';

// --- Type Declaration for Prefetching ---
declare global {
  interface Window {
    __PREFETCHED_COURSES__?: Record<string, any>;
  }
}

// Course content data for the new courses
const COURSE_CONTENT_DATA = {
  'exam-preparation-kit': {
    title: 'Exam Preparation Kit',
    subtitle:
      'Ace your certification exams with our comprehensive preparation resources',
    description:
      'Prepare for industry-recognized certifications with our curated study materials, practice tests, and expert guidance. Boost your confidence and increase your chances of passing on the first attempt.',
    levels: [
      {
        level: 'FOUNDATION',
        duration: '8-10 weeks',
        highlights: [
          'Comprehensive study guides for major certifications',
          '500+ practice questions with detailed explanations',
          'Mock exams that simulate real test conditions',
          'Time management strategies for exam day',
          'Access to a community of fellow exam takers',
        ],
        modules: [
          {
            title: 'Introduction to Certification Exams',
            items: [
              'Understanding different certification bodies',
              'Choosing the right certification for your career',
              'Exam formats and question types',
              'Creating an effective study schedule',
            ],
          },
          {
            title: 'Core Technical Concepts',
            items: [
              'Fundamental principles review',
              'Key terminology and definitions',
              'Common problem-solving approaches',
              'Best practices and industry standards',
            ],
          },
          {
            title: 'Practice Tests and Assessment',
            items: [
              'Diagnostic test to identify knowledge gaps',
              'Topic-specific practice questions',
              'Full-length mock exams',
              'Performance analysis and improvement strategies',
            ],
          },
          {
            title: 'Exam Day Preparation',
            items: [
              'Mental preparation and stress management',
              'Time allocation strategies',
              'Question-answering techniques',
              'Post-exam next steps',
            ],
          },
        ],
      },
      {
        level: 'ADVANCED',
        duration: '10-12 weeks',
        highlights: [
          'Specialized preparation for advanced certifications',
          'Complex scenario-based questions',
          'Performance-based task simulations',
          'Expert mentorship from certified professionals',
          'Personalized study plans based on assessment',
        ],
        modules: [
          {
            title: 'Advanced Certification Pathways',
            items: [
              'Specialized certifications for career advancement',
              'Prerequisites and requirements',
              'Exam difficulty and pass rates',
              'Career benefits of advanced certifications',
            ],
          },
          {
            title: 'Complex Problem Solving',
            items: [
              'Multi-step problem analysis',
              'Scenario-based question strategies',
              'Performance task preparation',
              'Troubleshooting methodologies',
            ],
          },
          {
            title: 'Industry-Specific Knowledge',
            items: [
              'Compliance and regulatory requirements',
              'Industry best practices and standards',
              'Emerging trends and technologies',
              'Case studies from real-world implementations',
            ],
          },
          {
            title: 'Mentorship and Support',
            items: [
              'One-on-one sessions with certified experts',
              'Peer study groups and discussions',
              'Access to exclusive resources and materials',
              'Career guidance and networking opportunities',
            ],
          },
        ],
      },
    ],
  },
  'career-transition-programs': {
    title: 'Career Transition Programs',
    subtitle:
      'Transform your career with our guided transition programs designed for success',
    description:
      "Make a successful career change with our comprehensive transition programs. Whether you're switching industries or roles, we provide the skills, knowledge, and support needed for a smooth transition.",
    levels: [
      {
        level: 'FOUNDATION',
        duration: '12-16 weeks',
        highlights: [
          'Career assessment and path planning',
          'Skill gap analysis and development',
          'Industry-specific knowledge transfer',
          'Resume building and interview preparation',
          'Networking strategies and opportunities',
        ],
        modules: [
          {
            title: 'Career Assessment and Planning',
            items: [
              'Identifying transferable skills',
              'Exploring new career opportunities',
              'Setting realistic career goals',
              'Creating a personalized transition plan',
            ],
          },
          {
            title: 'Skill Development',
            items: [
              'Core technical skills for your new field',
              'Industry-specific terminology and concepts',
              'Hands-on projects and practical applications',
              'Building a portfolio of relevant work',
            ],
          },
          {
            title: 'Personal Branding',
            items: [
              'Crafting a compelling career narrative',
              'Resume and cover letter optimization',
              'LinkedIn profile enhancement',
              'Creating a professional online presence',
            ],
          },
          {
            title: 'Job Search Strategies',
            items: [
              'Effective networking techniques',
              'Leveraging job boards and recruiters',
              'Preparing for technical and behavioral interviews',
              'Negotiating job offers and compensation',
            ],
          },
        ],
      },
      {
        level: 'ADVANCED',
        duration: '16-20 weeks',
        highlights: [
          'Specialized tracks for high-demand fields',
          'Mentorship from industry professionals',
          'Internship and project opportunities',
          'Advanced interview preparation and mock sessions',
          'Post-placement support and career growth guidance',
        ],
        modules: [
          {
            title: 'Specialized Field Knowledge',
            items: [
              'Deep dive into your chosen industry',
              'Advanced technical skills and tools',
              'Industry-specific challenges and solutions',
              'Emerging trends and future opportunities',
            ],
          },
          {
            title: 'Professional Experience Building',
            items: [
              'Real-world projects and case studies',
              'Internship opportunities with partner companies',
              'Contributing to open-source projects',
              'Building a professional portfolio',
            ],
          },
          {
            title: 'Industry Integration',
            items: [
              'Networking with industry professionals',
              'Attending industry events and conferences',
              'Joining professional associations',
              'Building long-term professional relationships',
            ],
          },
          {
            title: 'Career Growth and Advancement',
            items: [
              'Setting long-term career goals',
              'Continuous learning strategies',
              'Leadership and management skills',
              'Navigating organizational structures',
            ],
          },
        ],
      },
    ],
  },
  'ai-powered-learning-paths': {
    title: 'AI-Powered Learning Paths',
    subtitle:
      'Experience personalized learning with AI-driven course recommendations and adaptive content',
    description:
      'Leverage the power of artificial intelligence to create a personalized learning journey. Our AI-powered platform adapts to your learning style, pace, and goals to maximize your educational outcomes.',
    levels: [
      {
        level: 'FOUNDATION',
        duration: 'Self-paced',
        highlights: [
          'AI-driven skill assessment and gap analysis',
          'Personalized learning paths based on your goals',
          'Adaptive content that adjusts to your progress',
          'Intelligent recommendations for resources and materials',
          'AI-powered progress tracking and insights',
        ],
        modules: [
          {
            title: 'Introduction to AI-Powered Learning',
            items: [
              'How AI enhances the learning experience',
              'Setting up your personalized learning profile',
              'Understanding your learning style and preferences',
              'Navigating the AI-powered platform',
            ],
          },
          {
            title: 'Personalized Skill Development',
            items: [
              'AI assessment of current skills and knowledge',
              'Identifying skill gaps and learning opportunities',
              'Customized learning modules and resources',
              'Adaptive difficulty based on performance',
            ],
          },
          {
            title: 'Intelligent Learning Support',
            items: [
              'AI-powered tutoring and Q&A',
              'Automated feedback on assignments and projects',
              'Smart recommendations for additional resources',
              'Collaborative learning with AI-matched peers',
            ],
          },
          {
            title: 'Progress Analytics and Insights',
            items: [
              'Real-time tracking of learning progress',
              'AI-generated insights on learning patterns',
              'Predictive analytics for learning outcomes',
              'Personalized recommendations for improvement',
            ],
          },
        ],
      },
      {
        level: 'ADVANCED',
        duration: 'Self-paced',
        highlights: [
          'Advanced AI algorithms for hyper-personalization',
          'Machine learning models to predict learning success',
          'AI-powered career path recommendations',
          'Intelligent content creation and curation',
          'Neuroadaptive learning techniques',
        ],
        modules: [
          {
            title: 'Advanced Personalization Algorithms',
            items: [
              'Deep learning models for learning optimization',
              'Neural networks for content recommendation',
              'Reinforcement learning for adaptive assessments',
              'Natural language processing for intelligent tutoring',
            ],
          },
          {
            title: 'Predictive Analytics for Career Success',
            items: [
              'AI-driven career path planning',
              'Skill demand forecasting and market analysis',
              'Personalized recommendations for career advancement',
              'Matching with opportunities based on learned skills',
            ],
          },
          {
            title: 'Neuroadaptive Learning Techniques',
            items: [
              'Biometric feedback for learning optimization',
              'Cognitive load management with AI',
              'Attention and engagement monitoring',
              'Personalized learning based on cognitive patterns',
            ],
          },
          {
            title: 'AI-Powered Content Creation',
            items: [
              'Generating custom learning materials',
              'Automated creation of practice problems',
              'AI-assisted project and assignment design',
              'Dynamic content updates based on industry changes',
            ],
          },
        ],
      },
    ],
  },
};

export default function CourseDetail() {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();

  const [course, setCourse] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [level, setLevel] = useState<'FOUNDATION' | 'ADVANCED'>('FOUNDATION');
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId) {
        setError('Course ID is missing from URL.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Check if this is one of our new courses with static content
        if (COURSE_CONTENT_DATA[courseId as keyof typeof COURSE_CONTENT_DATA]) {
          // Create a mock course object with the static content
          const staticCourse = {
            _id: courseId,
            title:
              COURSE_CONTENT_DATA[courseId as keyof typeof COURSE_CONTENT_DATA]
                .title,
            subtitle:
              COURSE_CONTENT_DATA[courseId as keyof typeof COURSE_CONTENT_DATA]
                .subtitle,
            description:
              COURSE_CONTENT_DATA[courseId as keyof typeof COURSE_CONTENT_DATA]
                .description,
            levels:
              COURSE_CONTENT_DATA[courseId as keyof typeof COURSE_CONTENT_DATA]
                .levels,
            // Add other required properties
            price: 0,
            status: 'PUBLISHED',
            isHidden: false,
            instructor: 'Vormirex',
            createdAt: new Date().toISOString(),
          };
          setCourse(staticCourse);
        } else {
          // --- KEY CHANGE ---
          // The most reliable way is to fetch all courses and find the one
          // whose slug matches the `courseId` from the URL.
          const allCourses = await getAllCourses();
          const fetchedCourse = allCourses.find((c) => getSlug(c) === courseId);

          if (!fetchedCourse) {
            throw new Error(
              'Course not found. It may have been moved or renamed.'
            );
          }

          setCourse(fetchedCourse);

          // Optional: Cache the fetched course for faster navigation if user goes back and forth
          if (!window.__PREFETCHED_COURSES__) {
            window.__PREFETCHED_COURSES__ = {};
          }
          window.__PREFETCHED_COURSES__[courseId] = fetchedCourse;
        }
      } catch (err: any) {
        console.error('Failed to fetch course details', err);
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]); // Rerun effect if the courseId in the URL changes

  useEffect(() => {
    if (course) {
      document.title = `${course.title} | Vormirex`;
    }
  }, [course]);

  const heroMedia = useMemo(() => {
    if (!course) return { type: 'video' as const, src: '' };
    return { type: 'video' as const, src: getHeroVideo(course) };
  }, [course]);

  const detailImages = useMemo(() => {
    if (!course) return { career: '', gain: '' };
    return getDetailImages(course);
  }, [course]);

  const levelBlock = useMemo(() => {
    if (!course || !course.levels) return null;
    return (
      course.levels.find((l: any) => l.level === level) ?? course.levels[0]
    );
  }, [course, level]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Request for ${course?.title}:`, formData);
    alert('Request submitted successfully!');
    setFormData({ name: '', email: '', phone: '' });
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !heroMedia.src) return;

    video.muted = true;
    video.playsInline = true;
    const play = () =>
      video.play().catch(() => console.log('Autoplay blocked'));

    if (video.readyState >= 3) {
      play();
    } else {
      video.addEventListener('canplay', play, { once: true });
    }

    return () => {
      video.removeEventListener('canplay', play);
    };
  }, [heroMedia]);

  // --- SKELETON LOADER ---
  if (loading) {
    return (
      <div className="course-page">
        <div className="course-shell">
          <div className="skeleton-loader">
            <div className="skeleton-hero"></div>
            <div className="skeleton-content">
              <div className="skeleton-title"></div>
              <div className="skeleton-subtitle"></div>
              <div className="skeleton-button"></div>
            </div>
            <div className="skeleton-cards">
              <div className="skeleton-card"></div>
              <div className="skeleton-card"></div>
              <div className="skeleton-card"></div>
            </div>
            <div className="skeleton-modules">
              <div className="skeleton-module"></div>
              <div className="skeleton-module"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="course-page">
        <div className="course-shell">
          <div className="course-not-found">
            <h2>Course Not Found</h2>
            <p>
              {error ||
                "The course you're looking for doesn't exist or has been moved."}
            </p>
            <button
              className="course-btn main-cta"
              onClick={() => navigate('/courses')}
            >
              Browse All Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`course-page course-type-${courseId}`}
      data-course={courseId}
    >
      <div className="course-shell">
        <header className="course-hero">
          <video
            ref={videoRef}
            key={heroMedia.src}
            className="hero-video-bg"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={heroMedia.src} type="video/mp4" />
          </video>
          <div className="course-hero-overlay" />
          <div className="hero-content">
            <h1 className="hero-title">
              Unlock Your Potential with <br />
              <span className="highlight">{course.title}</span>
            </h1>
            <p className="hero-subtitle">
              {course.subtitle || 'Master the skills of tomorrow, today.'}
            </p>
          </div>

          <div className="course-hero-top">
            <div className="hero-nav-group">
              <button
                className="nav-icon-btn"
                onClick={() => navigate('/courses')}
              >
                <ArrowLeft size={24} />
              </button>
              <button
                className="nav-icon-btn"
                onClick={() => navigate('/dashboard')}
              >
                <LayoutDashboard size={24} />
              </button>
            </div>
            <div className="course-level-tabs desktop-tabs">
              <button
                className={`tab ${level === 'FOUNDATION' ? 'active' : ''}`}
                onClick={() => setLevel('FOUNDATION')}
              >
                Foundation
              </button>
              <button
                className={`tab ${level === 'ADVANCED' ? 'active' : ''}`}
                onClick={() => setLevel('ADVANCED')}
              >
                Advanced
              </button>
            </div>
          </div>
        </header>

        <div className="course-level-tabs below-hero">
          <button
            className={`tab ${level === 'FOUNDATION' ? 'active' : ''}`}
            onClick={() => setLevel('FOUNDATION')}
          >
            Foundation
          </button>
          <button
            className={`tab ${level === 'ADVANCED' ? 'active' : ''}`}
            onClick={() => setLevel('ADVANCED')}
          >
            Advanced
          </button>
        </div>

        <div className="hero-action-area">
          <button
            className="course-btn main-cta"
            onClick={() => window.open(SyllabusPDF, '_blank')}
          >
            Download Full Syllabus (PDF)
          </button>
        </div>

        <section className="course-info-cards">
          <div
            className="info-card"
            onClick={() => setModalImage(getCatalogImage(course))}
          >
            <div className="info-card-image-wrapper">
              <img src={getCatalogImage(course)} alt="Why" />
            </div>
            <p className="info-card-title">Why {course.title}</p>
          </div>

          <div
            className="info-card"
            onClick={() => setModalImage(detailImages.career)}
          >
            <div className="info-card-image-wrapper">
              <img src={detailImages.career} alt="Career" />
            </div>
            <p className="info-card-title">Career Path</p>
          </div>

          <div
            className="info-card"
            onClick={() => setModalImage(detailImages.gain)}
          >
            <div className="info-card-image-wrapper">
              <img src={detailImages.gain} alt="Gain" />
            </div>
            <p className="info-card-title">What You'll Gain</p>
          </div>
        </section>

        <section className="course-content">
          <h2 className="section-title">{level} Curriculum</h2>
          <div className="modules">
            {levelBlock &&
            levelBlock.modules &&
            levelBlock.modules.length > 0 ? (
              levelBlock.modules.map((m: any, idx: number) => (
                <details key={idx} className="module" open={idx === 0}>
                  <summary className="module-summary">
                    <span className="module-title">{m.title}</span>
                    <span className="module-meta">
                      {m.items?.length || 0} topics
                    </span>
                  </summary>
                  <ul className="module-list">
                    {m.items?.map((it: string, i: number) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                </details>
              ))
            ) : (
              <p>No modules found for this level.</p>
            )}
          </div>
        </section>

        <section className="course-request-form">
          <div className="form-container">
            <div className="form-text">
              <h2>Request Details</h2>
              <p>
                Interested in <strong>{course.title}</strong>? Submit your
                request.
              </p>
            </div>
            <form onSubmit={handleFormSubmit} className="details-form">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                type="tel"
                placeholder="Phone"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <button type="submit" className="form-submit-btn">
                <Send size={18} style={{ marginRight: '8px' }} />
                Submit Request
              </button>
            </form>
          </div>
        </section>

        {modalImage && (
          <div className="image-modal" onClick={() => setModalImage(null)}>
            <div className="modal-content">
              <img src={modalImage} alt="Preview" />
              <button className="modal-close">×</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
