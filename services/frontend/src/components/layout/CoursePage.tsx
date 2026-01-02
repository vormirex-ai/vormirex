import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CoursePage.css';
import { COURSES, CourseId, CourseLevel } from '../../data/courses';

/* ASSET IMPORTS */
import CyberVideo from '../../assets/cybersecurity.mp4';
import DataScienceVideo from '../../assets/datascience.mp4';
import DataAnalyticsVideo from '../../assets/dataanalytics.mp4';

import WhyCyber from '../../assets/whylearncyber.jpg';
import WhyDS from '../../assets/whylearndatascince.jpeg';
import WhyDA from '../../assets/whylearndataana.jpeg';

import CareerCyber from '../../assets/carrerincyber.jpeg';
import CareerDA from '../../assets/carrerindataana.jpeg';
import CareerDS from '../../assets/carrerindatascience.jpeg';

import GainCyber from '../../assets/gainincyber.jpeg';
import GainDS from '../../assets/gainindatascience.jpeg';
import GainDA from '../../assets/carerindataana.jpeg';

import SyllabusPDF from '../../assets/CoursesPdf (2).pdf';

export default function CoursePage() {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: CourseId }>();

  const course = courseId ? COURSES[courseId] : undefined;

  const [level, setLevel] = useState<CourseLevel>('Foundation');
  const [modalImage, setModalImage] = useState<string | null>(null);

  const openImage = (img: string) => setModalImage(img);
  const closeImage = () => setModalImage(null);

  const handleViewSyllabus = () => {
    window.open(SyllabusPDF, '_blank', 'noopener,noreferrer');
  };

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
    };
    return map[id] || WhyCyber;
  };

  const heroVideo = useMemo(() => {
    const map: Record<string, string> = {
      'cyber-security': CyberVideo,
      'data-science': DataScienceVideo,
      'data-analytics': DataAnalyticsVideo,
    };
    return courseId ? map[courseId] : CyberVideo;
  }, [courseId]);

  const detailImages = useMemo(() => {
    const images: Record<string, { career: string; gain: string }> = {
      'cyber-security': { career: CareerCyber, gain: GainCyber },
      'data-science': { career: CareerDS, gain: GainDS },
      'data-analytics': { career: CareerDA, gain: GainDA },
    };
    return courseId ? images[courseId] : images['cyber-security'];
  }, [courseId]);

  const levelBlock = useMemo(() => {
    if (!course) return null;
    return course.levels.find((l) => l.level === level) ?? course.levels[0];
  }, [course, level]);

  /* VIEW 1: CATALOG */
  if (!courseId) {
    const uniqueCourses = Array.from(
      new Map(Object.values(COURSES).map((c) => [c.id, c])).values()
    );

    return (
      <div className="course-list-page">
        <div className="course-grid">
          {uniqueCourses.map((courseItem) => (
            <div
              key={courseItem.id}
              className="course-card"
              onClick={() => navigate(`/course/${courseItem.id}`)}
            >
              <img
                src={getCatalogImage(courseItem.id)}
                alt={courseItem.title}
                className="course-card-img"
              />
              <div className="course-card-content">
                <h3>{courseItem.title}</h3>
                <p className="course-card-desc">{courseItem.description}</p>
                <button className="course-card-btn">View Details →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* VIEW 2: ERROR */
  if (!course) {
    return (
      <div className="course-page">
        <div
          className="course-shell"
          style={{ textAlign: 'center', padding: '100px 0' }}
        >
          <h1>Course not found</h1>
          <button
            className="course-btn main-cta"
            onClick={() => navigate('/courses')}
          >
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  /* VIEW 3: DETAIL PAGE */
  return (
    <div className="course-page">
      <div className="course-shell">
        <header className="course-hero">
          <video autoPlay muted loop playsInline className="hero-video-bg">
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="course-hero-overlay" />

          <div className="course-hero-top">
            <div className="hero-nav-group">
              <button
                className="course-btn ghost back-btn"
                onClick={() => navigate('/courses')}
              >
                ←
              </button>
              <button
                className="course-btn ghost home-btn"
                onClick={() => navigate('/dashboard')}
              >
                🏠
              </button>
            </div>

            <div className="course-level-tabs">
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

        <div className="hero-action-area">
          <button className="course-btn main-cta" onClick={handleViewSyllabus}>
            Download Full Syllabus (PDF)
          </button>
        </div>

        <section className="course-info-cards">
          <div className="info-card">
            <img
              src={getCatalogImage(courseId)}
              onClick={() => openImage(getCatalogImage(courseId))}
              alt="Why"
            />
            <p className="info-card-title">Why {course.title}</p>
          </div>
          <div className="info-card">
            <img
              src={detailImages.career}
              onClick={() => openImage(detailImages.career)}
              alt="Career"
            />
            <p className="info-card-title">Career Path</p>
          </div>
          <div className="info-card">
            <img
              src={detailImages.gain}
              onClick={() => openImage(detailImages.gain)}
              alt="Gain"
            />
            <p className="info-card-title">What You’ll Gain</p>
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
          <div className="image-modal" onClick={closeImage}>
            <img src={modalImage} alt="Enlarged" />
          </div>
        )}
      </div>
    </div>
  );
}
