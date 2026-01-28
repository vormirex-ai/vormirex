// src/pages/CourseDetail.jsx

import { useMemo, useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowLeft,
  Send,
  Clock,
  Users,
  Award,
  TrendingUp,
  PlayCircle,
  CheckCircle,
  Star,
  Target,
} from 'lucide-react';
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

  // Course-specific marketing content
  const getCourseSpecificContent = () => {
    const slug = getSlug(course);

    switch (slug) {
      case 'cyber-security':
        return {
          badge: '🔒 Most Popular',
          headline: 'Become a Cyber Security Expert',
          subtitle: 'Protect the Digital World',
          points: [
            'Master ethical hacking and penetration testing',
            'Learn to defend against real-world cyber threats',
            'Get hands-on experience with security tools',
            'Prepare for CEH, CompTIA Security+ certifications',
          ],
          highlights: [
            { icon: <TrendingUp size={20} />, text: 'Zero unemployment rate' },
            {
              icon: <Award size={20} />,
              text: 'Industry-recognized certification',
            },
            { icon: <Users size={20} />, text: 'Join 10,000+ professionals' },
          ],
          stats: [
            { value: '3.5M', label: 'Unfilled Jobs', desc: 'Global shortage' },
            {
              value: '$95K',
              label: 'Average Salary',
              desc: 'Entry to mid-level',
            },
            { value: '42%', label: 'Salary Growth', desc: 'In 3 years' },
            { value: '24/7', label: 'Lab Access', desc: 'Practice anytime' },
          ],
          cta: 'Start Your Security Journey',
          rating: 4.9,
          students: '12,543',
        };
      case 'data-science':
        return {
          badge: '📊 Top Rated',
          headline: 'Master Data Science',
          subtitle: 'Turn Data Into Decisions',
          points: [
            'Learn Python, R, and advanced analytics',
            'Build machine learning models from scratch',
            'Work on real industry projects',
            'Master data visualization with Tableau',
          ],
          highlights: [
            { icon: <Target size={20} />, text: 'Job-ready in 6 months' },
            { icon: <Star size={20} />, text: '4.9/5 student rating' },
            {
              icon: <CheckCircle size={20} />,
              text: '100% placement assistance',
            },
          ],
          stats: [
            { value: '11.5M', label: 'Jobs by 2026', desc: 'Growing rapidly' },
            {
              value: '$120K',
              label: 'Average Salary',
              desc: 'Industry standard',
            },
            { value: '36%', label: 'Industry Growth', desc: 'Annual rate' },
            { value: '50+', label: 'Projects', desc: 'Hands-on learning' },
          ],
          cta: 'Become a Data Scientist',
          rating: 4.8,
          students: '15,234',
        };
      case 'data-analytics':
        return {
          badge: '📈 Fast Track',
          headline: 'Excel in Data Analytics',
          subtitle: 'Drive Business With Insights',
          points: [
            'Master SQL, Excel, and Power BI',
            'Learn to create stunning dashboards',
            'Develop business intelligence skills',
            'Work with real-world datasets',
          ],
          highlights: [
            { icon: <Clock size={20} />, text: 'Complete in 3 months' },
            { icon: <Award size={20} />, text: 'Google Analytics certified' },
            { icon: <Users size={20} />, text: '8,000+ alumni' },
          ],
          stats: [
            { value: '2.7M', label: 'New Jobs', desc: 'By 2025' },
            { value: '$85K', label: 'Average Salary', desc: 'Competitive pay' },
            { value: '23%', label: 'Industry Growth', desc: 'Above average' },
            { value: '100%', label: 'Practical', desc: 'Hands-on training' },
          ],
          cta: 'Start Analyzing Data',
          rating: 4.7,
          students: '9,876',
        };
      case 'ai-ml-engineer':
        return {
          badge: '🤖 Future Ready',
          headline: 'Build AI & ML Solutions',
          subtitle: "Shape Tomorrow's Technology",
          points: [
            'Master deep learning with TensorFlow',
            'Build and deploy neural networks',
            'Work with computer vision and NLP',
            'Create real AI applications',
          ],
          highlights: [
            { icon: <Star size={20} />, text: 'Cutting-edge curriculum' },
            { icon: <Target size={20} />, text: 'Build 10+ AI projects' },
            { icon: <Award size={20} />, text: 'NVIDIA certified' },
          ],
          stats: [
            {
              value: '97M',
              label: 'AI Jobs by 2025',
              desc: 'Explosive growth',
            },
            { value: '$135K', label: 'Average Salary', desc: 'Top-tier pay' },
            { value: '74%', label: 'Annual Growth', desc: 'Fastest growing' },
            { value: '15+', label: 'AI Tools', desc: 'Master the stack' },
          ],
          cta: 'Become an AI Engineer',
          rating: 4.9,
          students: '11,234',
        };
      default:
        return {
          badge: '🚀 Launch Your Career',
          headline: 'Advance Your Tech Career',
          subtitle: 'Master In-Demand Skills',
          points: [
            'Learn from industry experts',
            'Build practical skills through projects',
            'Gain globally recognized certifications',
            'Join a network of professionals',
          ],
          highlights: [
            { icon: <CheckCircle size={20} />, text: 'Flexible learning' },
            { icon: <Users size={20} />, text: 'Mentor support' },
            { icon: <Award size={20} />, text: 'Certificate of completion' },
          ],
          stats: [
            { value: '1M+', label: 'Opportunities', desc: 'Global jobs' },
            {
              value: '$90K',
              label: 'Average Salary',
              desc: 'Good starting point',
            },
            { value: '30%', label: 'Industry Growth', desc: 'Steady increase' },
            { value: '24/7', label: 'Support', desc: 'Always here to help' },
          ],
          cta: 'Start Your Journey',
          rating: 4.6,
          students: '5,432',
        };
    }
  };

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

  const courseContent = getCourseSpecificContent();

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

          {/* Enhanced Video Text Overlay */}
          <div className="video-text-overlay">
            <div className="video-content-wrapper">
              <div className="video-badge">{courseContent.badge}</div>
              <h1 className="video-headline">{courseContent.headline}</h1>
              <p className="video-subtitle">{courseContent.subtitle}</p>

              <div className="video-highlights">
                {courseContent.highlights.map((highlight, index) => (
                  <div key={index} className="highlight-item">
                    <span className="highlight-icon">{highlight.icon}</span>
                    <span className="highlight-text">{highlight.text}</span>
                  </div>
                ))}
              </div>

              <div className="video-stats">
                {courseContent.stats.map((stat, index) => (
                  <div key={index} className="stat-box">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                    <div className="stat-desc">{stat.desc}</div>
                  </div>
                ))}
              </div>

              <button className="video-cta-btn">
                <PlayCircle size={20} style={{ marginRight: '8px' }} />
                {courseContent.cta}
              </button>

              <div className="video-social-proof">
                <div className="rating">
                  <Star size={16} className="star-icon filled" />
                  <Star size={16} className="star-icon filled" />
                  <Star size={16} className="star-icon filled" />
                  <Star size={16} className="star-icon filled" />
                  <Star size={16} className="star-icon filled" />
                  <span className="rating-text">{courseContent.rating}</span>
                </div>
                <div className="students-count">
                  <Users size={16} />
                  <span>{courseContent.students} students enrolled</span>
                </div>
              </div>
            </div>
          </div>

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
