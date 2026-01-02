import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Bot,
  Users,
  Target,
  BookOpen,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react';

const contentMap: any = {
  'ai-teacher': {
    icon: <Bot size={40} />,
    title: '24/7 AI Teacher',
    tagline: 'Personalized tutoring that never sleeps.',
    mainImage:
      'https://www.leadsquared.com/wp-content/uploads/2023/06/education-chatbot-for-fee-payment-process.png',
    additionalImages: [
      'https://cdn.dribbble.com/userupload/17996829/file/original-9538d5106568eac4ae7c94c46523dd25.png?resize=752x&vertical=center',
      'https://www.biz4group.com/blog/images/build-ai-classroom-app/classroom-sync.webp',
      'https://www.shutterstock.com/image-vector/online-bot-chat-windows-website-600nw-2023618448.jpg',
      'https://thumbs.dreamstime.com/b/child-using-laptop-virtual-ai-icons-representing-artificial-intelligence-education-personalized-learning-digital-tools-e-404959473.jpg',
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
      'https://cms.vibe.dev/wp-content/uploads/2025/05/Remote_Team_Meeting_With_Multiple_People_Online-2-edited.png',
    additionalImages: [
      'https://images.ctfassets.net/w6r2i5d8q73s/137DRwrtiUeG5ivHZr4shO/866c5f66c56e0a50cd42c70e7db761f3/WWB_-_Business.png',
      'https://cms.vibe.dev/wp-content/uploads/2025/05/collaborate-on-interactive-whiteboard-edited.png',
      'https://www.leadinglearning.com/wp-content/uploads/2022/03/Group-collaborating-scaled.jpg',
      'https://wpvip.edutopia.org/wp-content/uploads/2022/10/iStock-1322369839-crop.jpg',
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
      'https://www.slidekit.com/wp-content/uploads/2024/10/5-Stage-Education-Roadmap-Template.jpg',
    additionalImages: [
      'https://www.slideteam.net/media/catalog/product/cache/1280x720/r/e/remote_learning_dashboard_for_tracking_student_progress_slide01.jpg',
      'https://www.slidekit.com/wp-content/uploads/2025/05/Learning-Path-PowerPoint-Template.jpg',
      'https://www.slideteam.net/wp/wp-content/uploads/2024/06/6-Steps-in-creating-personalized-learning-plans.png',
      'https://www.slidekit.com/wp-content/uploads/2025/01/Personal-Journey-Map-PPT-Template-and-Google-Slides.jpg',
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
      'https://s3-figma-hubfile-images-production.figma.com/hub/file/carousel/img/37208f4d0f268dba816d2590219f129c0751351d',
    additionalImages: [
      'https://www.oclc.org/content/dam/oclc/cloudlibrary/images/carousel_6_reports.png',
      'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Hero-Image-learning?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=2000&hei=1125&qlt=100&fmt=png-alpha&fit=constrain',
      'https://www.higherlogic.com/wp-content/uploads/2024/11/Learn_Hero.png',
      'https://media.istockphoto.com/id/514856668/vector/flat-modern-icons-for-education-and-professions.jpg?s=612x612&w=0&k=20&c=BiZE2ODfdsNwo9kd0qLguGk0G93eHmqsDv-7W8CZ8jw=',
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
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const data = id ? contentMap[id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!data) {
    return <div className="built-everyone-shell">Feature not found.</div>;
  }

  return (
    <div className="built-everyone-shell feature-page">
      <div className="detail-wrapper">
        <button className="back-link" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back
        </button>

        <div className="detail-hero">
          <div className="icon-container detail-icon">{data.icon}</div>

          <h1 className="main-title">
            {data.title.split(' ')[0]}{' '}
            <span className="highlight">
              {data.title.split(' ').slice(1).join(' ')}
            </span>
          </h1>

          <p className="subtitle">{data.tagline}</p>
        </div>

        <img
          src={data.mainImage}
          alt={data.title}
          className="detail-image animate-fade-in"
        />

        <div className="detail-body">
          <p className="detail-text">{data.description}</p>

          <div className="points-list">
            {data.points.map((p: string, i: number) => (
              <div key={i} className="point-item animate-hover-scale">
                <CheckCircle size={20} className="check-icon" />
                <span>{p}</span>
              </div>
            ))}
          </div>

          <p className="detail-extra">{data.extra}</p>

          {/* Image Gallery Section */}
          <div className="gallery-section">
            <h2 className="section-title">See It in Action</h2>
            <div className="image-gallery">
              {data.additionalImages.map((img: string, i: number) => (
                <img
                  key={i}
                  src={img}
                  alt={`${data.title} demo ${i + 1}`}
                  className="gallery-image animate-fade-in-stagger"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <button className="cta-button animate-hover-pulse">{data.cta}</button>
        </div>
      </div>

      {/* ================== CSS ================== */}
      <style>{`
        .feature-page {
          padding-top: 80px; /* Reduced from 120px to bring content higher up */
          background: linear-gradient(to bottom, #0a0f1e, #1a2238);
        }

        .detail-wrapper {
          max-width: 900px;
          margin: auto;
          padding: 0 20px;
          text-align: center;
          animation: fadeIn 0.6s ease-out;
        }

        .back-link {
          background: none;
          border: none;
          color: #8e92a4;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px; /* Slightly reduced */
          font-size: 16px;
          transition: color 0.3s ease;
        }

        .back-link:hover {
          color: #6aece1;
        }

        .detail-hero {
          margin-bottom: 30px; /* Reduced from 40px */
        }

        .detail-icon {
          width: 80px !important;
          height: 80px !important;
          margin: 0 auto 20px !important;
          background: rgba(106, 236, 225, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6aece1;
          animation: pulse 2s infinite;
        }

        .detail-image {
          width: 100%;
          max-width: 600px;
          margin: 20px auto; /* Reduced from 30px */
          display: block;
          border-radius: 22px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .detail-body {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 32px;
          padding: 40px; /* Reduced from 50px for tighter feel */
          text-align: left;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          margin-top: -20px; /* Added slight overlap to pull content up */
        }

        .detail-text {
          font-size: 18px;
          color: #cfd2dc;
          line-height: 1.8;
          margin-bottom: 28px; /* Slightly reduced */
        }

        .points-list {
          display: grid;
          gap: 14px; /* Reduced from 16px */
          margin-bottom: 30px; /* Reduced from 40px */
        }

        .point-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #ffffff;
          font-size: 16px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .point-item:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 15px rgba(106, 236, 225, 0.2);
        }

        .check-icon {
          color: #6aece1;
          min-width: 20px;
        }

        .detail-extra {
          margin-top: 30px;
          font-size: 17px;
          color: #cfd2dc;
          line-height: 1.7;
          margin-bottom: 40px; /* Reduced from 50px */
        }

        /* Gallery Section */
        .gallery-section {
          margin-top: 40px; /* Reduced from 50px */
        }

        .section-title {
          font-size: 24px;
          color: #ffffff;
          margin-bottom: 25px; /* Reduced */
          text-align: center;
        }

        .image-gallery {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }

        .gallery-image {
          width: 100%;
          max-width: 280px;
          border-radius: 16px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
          object-fit: cover;
          height: 200px;
        }

        .gallery-image:hover {
          transform: scale(1.05);
        }

        /* CTA Button */
        .cta-button {
          display: block;
          margin: 40px auto 0; /* Reduced from 50px */
          padding: 15px 40px;
          background: linear-gradient(135deg, #6aece1, #4ab8d1);
          color: #0a0f1e;
          font-size: 18px;
          font-weight: bold;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .cta-button:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(106, 236, 225, 0.4);
        }

        /* Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(106, 236, 225, 0.4);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(106, 236, 225, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(106, 236, 225, 0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-fade-in-stagger {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-hover-scale:hover {
          transform: scale(1.02);
        }

        .animate-hover-pulse:hover {
          animation: pulse 1.5s infinite;
        }

        /* ---------- RESPONSIVE ---------- */

        @media (max-width: 1024px) {
          .detail-body {
            padding: 30px;
          }
        }

        @media (max-width: 768px) {
          .feature-page {
            padding-top: 60px; /* Even less on mobile */
          }

          .main-title {
            font-size: 28px;
          }

          .detail-body {
            padding: 20px;
            border-radius: 22px;
            margin-top: 0;
          }

          .detail-text {
            font-size: 16px;
          }

          .image-gallery {
            flex-direction: column;
            align-items: center;
          }

          .gallery-image {
            max-width: 100%;
            height: auto;
          }
        }

        @media (max-width: 480px) {
          .main-title {
            font-size: 24px;
          }

          .detail-icon {
            width: 60px !important;
            height: 60px !important;
          }

          .detail-image {
            border-radius: 14px;
          }

          .cta-button {
            font-size: 16px;
            padding: 12px 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default FeatureDetail;
