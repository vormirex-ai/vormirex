import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LayoutDashboard, ArrowLeft } from 'lucide-react';
import './CoursePage.css';
import { COURSES, CourseId, CourseLevel } from '../../data/courses';

/* ASSET IMPORTS */
import CyberVideo from '../../assets/cybersecurity.mp4';
import DataScienceVideo from '../../assets/datascience.mp4';
import DataAnalyticsVideo from '../../assets/dataanalytics.mp4';

// NEW: Static hero image for AI/ML
import AIMLHero from '../../assets/aiml.jpg'; // ← Create this (1920x1080 recommended)

import WhyCyber from '../../assets/whylearncyber.jpg';
import WhyDS from '../../assets/whylearndatascince.jpeg';
import WhyDA from '../../assets/whylearndataana.jpeg';
import WhyAI from '../../assets/aiml.jpg';

import CareerCyber from '../../assets/carrerincyber.jpeg';
import CareerDA from '../../assets/carrerindataana.jpeg';
import CareerDS from '../../assets/carrerindatascience.jpeg';
import CareerAI from '../../assets/aiml.jpg';

import GainCyber from '../../assets/gainincyber.jpeg';
import GainDS from '../../assets/gainindatascience.jpeg';
import GainDA from '../../assets/gainindatascience.jpeg';
import GainAI from '../../assets/aiml.jpg';

import SyllabusPDF from '../../assets/CoursesPdf (2).pdf';

export default function CoursePage() {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: CourseId }>();
  const course = courseId ? COURSES[courseId] : undefined;

  const [level, setLevel] = useState<CourseLevel>('Foundation');
  const [modalImage, setModalImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.title = course
      ? `${course.title} | Vormirex`
      : 'Explore Courses | Vormirex';
  }, [course]);

  const getCatalogImage = (id: string) => {
    const map: Record<string, string> = {
      'data-science': WhyDS,
      'data-analytics': WhyDA,
      'cyber-security': WhyCyber,
      'ai-ml': WhyAI || WhyDS,
    };
    return map[id] || WhyCyber;
  };

  // Hero media: video for others, static image for AI/ML
  const heroMedia = useMemo(() => {
    if (courseId === 'ai-ml') {
      return { type: 'image' as const, src: AIMLHero };
    }

    const videoMap: Record<string, string> = {
      'cyber-security': CyberVideo,
      'data-science': DataScienceVideo,
      'data-analytics': DataAnalyticsVideo,
    };
    return {
      type: 'video' as const,
      src: videoMap[courseId!] || CyberVideo,
    };
  }, [courseId]);

  const detailImages = useMemo(() => {
    const images: Record<string, { career: string; gain: string }> = {
      'cyber-security': { career: CareerCyber, gain: GainCyber },
      'data-science': { career: CareerDS, gain: GainDS },
      'data-analytics': { career: CareerDA, gain: GainDA },
      'ai-ml': { career: CareerAI || CareerDS, gain: GainAI || GainDS },
    };
    return courseId ? images[courseId] : images['cyber-security'];
  }, [courseId]);

  const levelBlock = useMemo(() => {
    if (!course) return null;
    return course.levels.find((l) => l.level === level) ?? course.levels[0];
  }, [course, level]);

  // Autoplay only for video
  useEffect(() => {
    if (heroMedia.type !== 'video') return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    const playVideo = () => {
      video.play().catch(() => console.log('Autoplay blocked'));
    };

    if (video.readyState >= 3) playVideo();
    else video.addEventListener('canplay', playVideo);

    return () => video.removeEventListener('canplay', playVideo);
  }, [heroMedia]);

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

  return (
    <div className="course-page" data-course={courseId}>
      <div className="course-shell">
        <header className="course-hero">
          {/* Conditional Hero Media */}
          {heroMedia.type === 'video' ? (
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
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={heroMedia.src}
              alt={`${course?.title} Hero`}
              className="hero-video-bg hero-image-bg" // Reuse same class + new one
            />
          )}

          <div className="course-hero-overlay" />
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

        {/* Mobile Tabs */}
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

        <section className="course-info-cards">
          <div className="info-card">
            <img
              src={getCatalogImage(courseId!)}
              onClick={() => setModalImage(getCatalogImage(courseId!))}
              alt="Why"
              loading="lazy"
            />
            <p className="info-card-title">Why {course?.title}</p>
          </div>
          <div className="info-card">
            <img
              src={detailImages.career}
              onClick={() => setModalImage(detailImages.career)}
              alt="Career"
              loading="lazy"
            />
            <p className="info-card-title">Career Path</p>
          </div>
          <div className="info-card">
            <img
              src={detailImages.gain}
              onClick={() => setModalImage(detailImages.gain)}
              alt="Gain"
              loading="lazy"
            />
            <p className="info-card-title">What You'll Gain</p>
          </div>
        </section>

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

        {modalImage && (
          <div className="image-modal" onClick={() => setModalImage(null)}>
            <img src={modalImage} alt="Enlarged" />
          </div>
        )}
      </div>
    </div>
  );
}
