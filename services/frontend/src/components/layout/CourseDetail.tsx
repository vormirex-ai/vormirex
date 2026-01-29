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
  getSlug, // Ensure this is imported
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
