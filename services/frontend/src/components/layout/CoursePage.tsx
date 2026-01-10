import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LayoutDashboard, ArrowLeft, Send } from 'lucide-react';
import './CoursePage.css';
import { COURSES, CourseId, CourseLevel } from '../../data/courses';

/* ================= ASSET IMPORTS ================= */
import CyberVideo from '../../assets/cybersecurity.mp4';
import DataScienceVideo from '../../assets/datascience.mp4';
import DataAnalyticsVideo from '../../assets/dataanalytics.mp4';
import AIMLVideo from '../../assets/ai-ml.mp4';

import WhyCyber from '../../assets/whylearncyber.jpg';
import WhyDS from '../../assets/whylearndatascince.jpeg';
import WhyDA from '../../assets/whylearndataana.jpeg';
import WhyAI from '../../assets/whyaiml.png';

import CareerCyber from '../../assets/carrerincyber.jpeg';
import CareerDA from '../../assets/carrerindataana.jpeg';
import CareerDS from '../../assets/carrerindatascience.jpeg';
import CareerAI from '../../assets/carrerinaiml.png';

import GainCyber from '../../assets/gainincyber.jpeg';
import GainDS from '../../assets/gainindatascience.jpeg';
import GainDA from '../../assets/gainindatascience.jpeg';
import GainAI from '../../assets/gainaiml.png';

import SyllabusPDF from '../../assets/CoursesPdf (2).pdf';

export default function CoursePage() {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: CourseId }>();
  const course = courseId ? COURSES[courseId] : undefined;

  const [level, setLevel] = useState<CourseLevel>('Foundation');
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  /* ================= TITLE ================= */
  useEffect(() => {
    document.title = course
      ? `${course.title} | Vormirex`
      : 'Explore Courses | Vormirex';
  }, [course]);

  /* ================= CATALOG IMAGE ================= */
  const getCatalogImage = (id: string) => {
    const map: Record<string, string> = {
      'data-science': WhyDS,
      'data-analytics': WhyDA,
      'cyber-security': WhyCyber,
      'ai-ml': WhyAI,
    };
    return map[id] || WhyCyber;
  };

  /* ================= HERO VIDEO ================= */
  const heroMedia = useMemo(() => {
    const videoMap: Record<CourseId, string> = {
      'cyber-security': CyberVideo,
      'data-science': DataScienceVideo,
      'data-analytics': DataAnalyticsVideo,
      'ai-ml': AIMLVideo,
    };
    return { type: 'video' as const, src: videoMap[courseId!] };
  }, [courseId]);

  /* ================= DETAIL IMAGES ================= */
  const detailImages = useMemo(() => {
    const images: Record<CourseId, { career: string; gain: string }> = {
      'cyber-security': { career: CareerCyber, gain: GainCyber },
      'data-science': { career: CareerDS, gain: GainDS },
      'data-analytics': { career: CareerDA, gain: GainDA },
      'ai-ml': { career: CareerAI, gain: GainAI },
    };
    return images[courseId!];
  }, [courseId]);

  /* ================= LEVEL DATA ================= */
  const levelBlock = useMemo(() => {
    if (!course) return null;
    return course.levels.find((l) => l.level === level) ?? course.levels[0];
  }, [course, level]);

  /* ================= FORM ================= */
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Request for ${course?.title}:`, formData);
    alert(
      'Request submitted successfully! Our counselor will reach out to you.'
    );
    setFormData({ name: '', email: '', phone: '' });
  };

  /* ================= VIDEO AUTOPLAY ================= */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    const play = () =>
      video.play().catch(() => console.log('Autoplay blocked'));

    if (video.readyState >= 3) play();
    else video.addEventListener('canplay', play);

    return () => video.removeEventListener('canplay', play);
  }, [heroMedia]);

  /* ================= COURSE LIST PAGE ================= */
  if (!courseId) {
    const uniqueCourses = Array.from(
      new Map(Object.values(COURSES).map((c) => [c.id, c])).values()
    );

    return (
      <div className="course-list-page">
        <div className="course-list-header">
          <h1>Our Courses</h1>
        </div>

        <div className="course-grid">
          {uniqueCourses.map((item) => (
            <div
              key={item.id}
              className="course-card"
              onClick={() => navigate(`/course/${item.id}`)}
            >
              <img
                src={getCatalogImage(item.id)}
                alt={item.title}
                className="course-card-img"
              />
              <div className="course-card-content">
                <h3>{item.title}</h3>
                <p className="course-card-desc">{item.description}</p>
                <button className="course-card-btn">View Details →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ================= COURSE DETAIL PAGE ================= */
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
            preload="auto"
          >
            <source src={heroMedia.src} type="video/mp4" />
          </video>

          <div className="course-hero-overlay" />

          {/* HERO TEXT (Issue #34 FIX – NO REMOVALS) */}
          <div className="course-hero-content">
            <h1 className="course-hero-title">{course?.title}</h1>
            <p className="course-hero-subtitle">
              Master the future of technology
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
                className={`tab ${level === 'Foundation' ? 'active' : ''}`}
                onClick={() => setLevel('Foundation')}
              >
                Foundation
              </button>
              <button
                className={`tab ${level === 'Advanced' ? 'active' : ''}`}
                onClick={() => setLevel('Advanced')}
              >
                Advanced
              </button>
            </div>
          </div>
        </header>

        <div className="course-level-tabs below-hero">
          <button
            className={`tab ${level === 'Foundation' ? 'active' : ''}`}
            onClick={() => setLevel('Foundation')}
          >
            Foundation
          </button>
          <button
            className={`tab ${level === 'Advanced' ? 'active' : ''}`}
            onClick={() => setLevel('Advanced')}
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

        {/* WHY / CAREER / GAIN */}
        <section className="course-info-cards">
          <div
            className="info-card"
            onClick={() => setModalImage(getCatalogImage(courseId))}
          >
            <div className="info-card-image-wrapper">
              <img src={getCatalogImage(courseId)} alt="Why" />
            </div>
            <p className="info-card-title">Why {course?.title}</p>
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

        {/* CURRICULUM */}
        <section className="course-content">
          <h2 className="section-title">{level} Curriculum</h2>

          <div className="modules">
            {levelBlock?.modules.map((m, idx) => (
              <details key={m.title} className="module" open={idx === 0}>
                <summary className="module-summary">
                  <span className="module-title">{m.title}</span>
                  <span className="module-meta">{m.items.length} topics</span>
                </summary>
                <ul className="module-list">
                  {m.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </section>

        {/* REQUEST FORM */}
        <section className="course-request-form">
          <div className="form-container">
            <div className="form-text">
              <h2>Request Details</h2>
              <p>
                Interested in <strong>{course?.title}</strong>? Submit your
                request to get a personalized syllabus walkthrough and discount
                details.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="details-form">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />
              <input
                type="tel"
                placeholder="Phone"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
              />
              <button type="submit" className="form-submit-btn">
                <Send size={18} style={{ marginRight: '8px' }} />
                Submit Request
              </button>
            </form>
          </div>
        </section>

        {/* IMAGE MODAL */}
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
