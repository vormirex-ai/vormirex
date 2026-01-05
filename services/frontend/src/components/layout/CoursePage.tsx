import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LayoutDashboard, ArrowLeft } from 'lucide-react';
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

  // HD VIDEO & AUTOPLAY LOGIC
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (err) {
        console.warn('Autoplay blocked, waiting for interaction');
      }
    };

    if (video.readyState >= 3) {
      playVideo();
    } else {
      video.addEventListener('canplay', playVideo);
    }

    const handleInteraction = () => {
      video.play();
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      video.removeEventListener('canplay', playVideo);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [heroVideo]);

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
          <video
            ref={videoRef}
            key={heroVideo}
            className="hero-video-bg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>

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
              src={getCatalogImage(courseId)}
              onClick={() => setModalImage(getCatalogImage(courseId))}
              alt="Why"
            />
            <p className="info-card-title">Why {course?.title}</p>
          </div>
          <div className="info-card">
            <img
              src={detailImages.career}
              onClick={() => setModalImage(detailImages.career)}
              alt="Career"
            />
            <p className="info-card-title">Career Path</p>
          </div>
          <div className="info-card">
            <img
              src={detailImages.gain}
              onClick={() => setModalImage(detailImages.gain)}
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
          <div className="image-modal" onClick={() => setModalImage(null)}>
            <img src={modalImage} alt="Enlarged" />
          </div>
        )}
      </div>
    </div>
  );
}
