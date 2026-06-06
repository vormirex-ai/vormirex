import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Bot,
  Users,
  Target,
  BookOpen,
  ArrowLeft,
  CheckCircle,
  Image as ImageIcon,
} from 'lucide-react';

interface FeatureData {
  icon: React.ReactNode;
  title: string;
  tagline: string;
  mainImage: string;
  additionalImages: string[];
  description: string;
  points: string[];
  extra: string;
  cta: string;
}

const contentMap: Record<string, FeatureData> = {
  'ai-teacher': {
    icon: <Bot size={40} />,
    title: '24/7 AI Teacher',
    tagline: 'Personalized tutoring that never sleeps.',
    mainImage:
      'https://www.shutterstock.com/image-photo/ai-artificial-intelligence-supports-24hour-600nw-2647800225.jpg',
    additionalImages: [
      'https://46968845.fs1.hubspotusercontent-na1.net/hubfs/46968845/AI-Generated%20Media/Images/In%20a%20vibrant%20classroom%20setting%20a%20human%20tutor%20and%20an%20AI%20tutora%20sleek%20humanoid%20robot%20with%20glowing%20blue%20accentsare%20engaged%20in%20a%20lively%20debate%20about%20the%20f-1.png',
      'https://static1.squarespace.com/static/63c867491abe131843b09837/t/66df6e0efbccf326f812640d/1725918734173/24_7+Teach+-+Icon+-+Orange.png',
      'https://nlcbharat.org/wp-content/uploads/2024/03/image1.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQFpPMaII4qHVuxyGeD8I6fgGSmE74xNeZWw&s',
    ],
    description:
      'Vormirex AI Teacher acts as your personal tutor available 24/7. It understands your learning style and provides instant explanations, examples, and practice questions tailored to you. Powered by advanced AI, it adapts in real-time to your progress, ensuring you grasp concepts deeply before moving on.',
    points: [
      'Instant doubt clearing anytime, anywhere',
      'Step-by-step explanations with interactive examples',
      'Supports math, science, coding, languages, and more',
      'Personalized quizzes and feedback loops',
      'Integration with your study schedule for reminders',
    ],
    extra:
      'This feature is perfect for students, professionals, and self-learners who want instant guidance without waiting for a human tutor. Join thousands who have boosted their grades and skills effortlessly.',
    cta: 'Start Your Free Trial Today',
  },

  'learning-rooms': {
    icon: <Users size={40} />,
    title: 'Group Learning Rooms',
    tagline: 'Collaborative study, reimagined.',
    mainImage:
      'https://images.pexels.com/photos/7644076/pexels-photo-7644076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://i0.wp.com/writegroup.io/wp-content/uploads/2019/05/Image-by-You-X-Ventures-on-Unsplash.jpg?resize=866%2C577&ssl=1',
      'https://qnextech.com/wp-content/uploads/2024/05/Q-NEX-31-1024x627.webp',
    ],
    description:
      'Study together with friends or learners worldwide in interactive virtual rooms. Share ideas, solve problems, and stay motivated through collaboration. Features real-time screen sharing and collaborative note-taking for seamless group sessions.',
    points: [
      'Live shared whiteboards with drawing tools',
      'Voice, video & text chat support',
      'Peer-to-peer learning with breakout rooms',
      'Session recording for later review',
      'Gamified elements like points for participation',
    ],
    extra:
      'Best suited for exam preparation, group projects, and accountability-driven studying. Connect with like-minded learners and make studying fun and social.',
    cta: 'Join a Room Now',
  },

  'personalized-paths': {
    icon: <Target size={40} />,
    title: 'Personalized Paths',
    tagline: 'Your unique roadmap to success.',
    mainImage:
      'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://www.techfunnel.com/wp-content/uploads/2024/08/Personalized-Learning-Paths.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ621lguNbsOh1Ul10zmRXfy1n4uW5I8ZyAUg&s',
      'https://www.cpduk.co.uk/sites/default/files/news-imported/cpd-iam-learning-personalised-learning-pathways.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL57vo10mFzW-htEHZj5MdhbnzT8XC4IyQ0A&s',
    ],
    description:
      'AI analyzes your strengths and weaknesses to create a personalized learning roadmap that evolves as you progress. Track your journey with visual progress maps and receive recommendations for resources that match your needs.',
    points: [
      'Adaptive difficulty scaling based on performance',
      'Skill-gap analysis with detailed reports',
      'Progress tracking dashboard with analytics',
      'Goal-setting tools with milestone celebrations',
      'Integration with calendars for scheduled learning',
    ],
    extra:
      'No more random learning. Every lesson is designed specifically for your goals, helping you achieve mastery faster and more efficiently.',
    cta: 'Build Your Path',
  },

  'all-subjects': {
    icon: <BookOpen size={40} />,
    title: 'All Subjects',
    tagline: 'One platform for everything you want to learn.',
    mainImage:
      'https://www.teachhub.com/wp-content/uploads/2020/09/Sept-9-Benefits-of-Group-Work_web.jpg',
    additionalImages: [
      'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://transitionsusa.org/wp-content/uploads/2024/12/shutterstock_2111420681-scaled.jpg',
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description:
      'From academics and technology to creativity and life skills, access hundreds of subjects on one unified platform. Curated by experts, with interactive modules, videos, and hands-on projects.',
    points: [
      '500+ subjects across all disciplines',
      'Beginner to advanced levels with certifications',
      'Frequently updated content with latest trends',
      'Searchable library with recommendations',
      'Community forums for subject-specific discussions',
    ],
    extra:
      "Learn anything, anytime – all under one platform without switching tools. Whether you're upskilling for a job or exploring hobbies, we've got you covered.",
    cta: 'Explore Subjects',
  },
};

const FeatureDetail: React.FC = () => {
  const { id = 'ai-teacher' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const data = contentMap[id] || contentMap['ai-teacher'];
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleImageError = (imageId: string) => {
    setImageErrors((prev) => ({ ...prev, [imageId]: true }));
  };

  const titleParts = data.title.split(' ');
  const firstWord = titleParts[0];
  const restOfTitle = titleParts.slice(1).join(' ');

  return (
    <div className="feature-container">
      <button className="back-btn" onClick={handleBack} aria-label="Go back">
        <ArrowLeft size={20} />
        <span>Back to Features</span>
      </button>

      <div className="content-wrapper">
        <header className="header-section">
          <div className="icon-box">{data.icon}</div>
          <h1 className="title">
            {firstWord} <span className="gradient-text">{restOfTitle}</span>
          </h1>
          <p className="tagline">{data.tagline}</p>
        </header>

        <div className="hero-image-container">
          {imageErrors['hero'] ? (
            <div className="image-error-placeholder">
              <ImageIcon size={48} />
              <span>Image unavailable</span>
            </div>
          ) : (
            <img
              src={data.mainImage}
              alt={data.title}
              className="hero-image"
              onError={() => handleImageError('hero')}
              loading="lazy"
            />
          )}
          <div className="image-overlay"></div>
        </div>

        <div className="info-card">
          <section className="description-section">
            <p className="description-text">{data.description}</p>

            <div className="features-grid">
              {data.points.map((point, index) => (
                <div key={index} className="feature-item">
                  <div className="check-wrapper">
                    <CheckCircle size={18} />
                  </div>
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <p className="extra-text">{data.extra}</p>
          </section>

          <section className="gallery-section">
            <h2 className="gallery-title">Experience the Interface</h2>
            <div className="gallery-grid">
              {data.additionalImages.map((img, idx) => (
                <div
                  key={idx}
                  className="gallery-item"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {imageErrors[`gallery-${idx}`] ? (
                    <div className="image-error-placeholder">
                      <ImageIcon size={24} />
                    </div>
                  ) : (
                    <img
                      src={img}
                      alt="Feature preview"
                      onError={() => handleImageError(`gallery-${idx}`)}
                      loading="lazy"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>

          <div className="cta-wrapper">
            <button className="primary-cta">{data.cta}</button>
          </div>
        </div>
      </div>

      <style>{`
        :root {
          --primary: #6aece1;
          --primary-dark: #4ab8d1;
          --bg-dark: #0a0f1e;
          --bg-card: rgba(255, 255, 255, 0.03);
          --text-main: #ffffff;
          --text-muted: #8e92a4;
          --text-body: #cfd2dc;
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
         
          --font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          --font-size-xs: 0.75rem;
          --font-size-sm: 0.875rem;
          --font-size-base: 1rem;
          --font-size-lg: 1.125rem;
          --font-size-xl: 1.25rem;
          --font-size-2xl: 1.5rem;
          --font-size-3xl: 1.75rem;
          --font-size-4xl: 2.25rem;
          --font-size-5xl: 3rem;
         
          --line-height-tight: 1.25;
          --line-height-normal: 1.5;
          --line-height-relaxed: 1.75;
         
          --font-weight-normal: 400;
          --font-weight-medium: 500;
          --font-weight-semibold: 600;
          --font-weight-bold: 700;
          --font-weight-extrabold: 800;
        }

        .feature-container {
          min-height: 100vh;
          background: radial-gradient(circle at top right, #1a2238, #0a0f1e);
          color: var(--text-main);
          font-family: var(--font-family);
          font-size: var(--font-size-base);
          line-height: var(--line-height-normal);
          padding: 40px 20px;
          overflow-x: hidden;
        }

        .content-wrapper {
          max-width: 1000px;
          margin: 0 auto;
          animation: slideUp 0.6s ease-out;
        }

        .back-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          border-radius: 30px;
          cursor: pointer;
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          transition: var(--transition);
          margin: 0 0 40px 20px;
        }

        .back-btn:hover {
          color: var(--primary);
          border-color: var(--primary);
          background: rgba(106, 236, 221, 0.05);
          transform: translateX(-5px);
        }

        .header-section {
          text-align: center;
          margin-bottom: 50px;
        }

        .icon-box {
          width: 80px;
          height: 80px;
          background: rgba(106, 236, 225, 0.1);
          border: 1px solid rgba(106, 236, 225, 0.2);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          color: var(--primary);
          box-shadow: 0 0 30px rgba(106, 236, 225, 0.1);
          animation: float 3s ease-in-out infinite;
        }

        .title {
          font-size: clamp(var(--font-size-3xl), 5vw, var(--font-size-5xl));
          font-weight: var(--font-weight-extrabold);
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .tagline {
          font-size: var(--font-size-xl);
          color: var(--text-muted);
          max-width: 600px;
          margin: 0 auto;
          font-weight: var(--font-weight-medium);
        }

        .hero-image-container {
          position: relative;
          width: 100%;
          height: 450px;
          border-radius: 32px;
          overflow: hidden;
          margin-bottom: -60px;
          z-index: 1;
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
        }

        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }

        .hero-image-container:hover .hero-image {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 60%, rgba(10, 15, 30, 0.8));
        }

        .image-error-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
          gap: 10px;
        }

        .info-card {
          background: rgba(20, 25, 45, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 40px;
          padding: 100px 60px 60px;
          position: relative;
          z-index: 0;
        }

        .description-text {
          font-size: var(--font-size-lg);
          line-height: var(--line-height-relaxed);
          color: var(--text-body);
          margin-bottom: 40px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .feature-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 16px 20px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 15px;
          transition: var(--transition);
          font-size: var(--font-size-sm);
        }

        .feature-item:hover {
          background: rgba(106, 236, 225, 0.05);
          border-color: rgba(106, 236, 225, 0.2);
          transform: translateY(-3px);
        }

        .check-wrapper {
          color: var(--primary);
          display: flex;
          flex-shrink: 0;
        }

        .extra-text {
          font-size: var(--font-size-base);
          color: var(--text-muted);
          font-style: italic;
          border-left: 3px solid var(--primary);
          padding-left: 20px;
          margin: 40px 0;
          line-height: var(--line-height-relaxed);
        }

        .gallery-section {
          margin-top: 60px;
        }

        .gallery-title {
          font-size: var(--font-size-2xl);
          margin-bottom: 30px;
          text-align: center;
          font-weight: var(--font-weight-semibold);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .gallery-item {
          aspect-ratio: 4/3;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          opacity: 0;
          animation: fadeIn 0.5s ease-out forwards;
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }

        .gallery-item:hover img {
          transform: scale(1.1);
        }

        .gallery-item .image-error-placeholder {
          height: 100%;
          min-height: 150px;
        }

        .cta-wrapper {
          margin-top: 60px;
          display: flex;
          justify-content: center;
        }

        .primary-cta {
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          color: var(--bg-dark);
          border: none;
          padding: 18px 48px;
          border-radius: 50px;
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          cursor: pointer;
          transition: var(--transition);
          box-shadow: 0 10px 30px rgba(106, 236, 225, 0.3);
        }

        .primary-cta:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 15px 40px rgba(106, 236, 225, 0.5);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @media (max-width: 768px) {
          .info-card { padding: 80px 30px 40px; border-radius: 30px; }
          .hero-image-container { height: 300px; border-radius: 24px; }
          .features-grid { grid-template-columns: 1fr; }
          .title { font-size: var(--font-size-4xl); }
          .tagline { font-size: var(--font-size-lg); }
        }

        @media (max-width: 480px) {
          .feature-container { padding: 20px 15px; }
          .info-card { padding: 70px 20px 30px; }
          .primary-cta { width: 100%; padding: 16px 20px; font-size: var(--font-size-base); }
          .description-text { font-size: var(--font-size-base); }
          .gallery-title { font-size: var(--font-size-xl); }
          .back-btn { margin-left: 15px; }
        }
      `}</style>
    </div>
  );
};

export default FeatureDetail;
