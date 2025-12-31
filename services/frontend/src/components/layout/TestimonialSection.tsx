import React from 'react';
import { Star } from 'lucide-react';

// ================= TYPES =================
interface Testimonial {
  id: number;
  emoji: string;
  text: string;
  name: string;
  role: string;
}

interface TestimonialSectionProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
}

// ================= DEFAULT DATA =================
const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    emoji: '👧',
    text: 'Vormirex made learning math actually fun! The AI tutor explains things way better than my textbooks.',
    name: 'Aria Chen',
    role: 'High School Student',
  },
  {
    id: 2,
    emoji: '👨‍💻',
    text: 'I used Vormirex to learn Python and got my dream job within 3 months. The personalized path was perfect.',
    name: 'Marcus Johnson',
    role: 'Software Developer',
  },
  {
    id: 3,
    emoji: '👩',
    text: 'My kids love the gamified learning! They actually ask to study now. Best investment in their education.',
    name: 'Priya Sharma',
    role: 'Parent',
  },
  {
    id: 4,
    emoji: '👨',
    text: 'The 24/7 AI support saved me during finals. I could ask questions at 2 AM and get instant help!',
    name: 'David Kim',
    role: 'College Student',
  },
];

// ================= COMPONENT =================
const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  title = 'Loved by Learners',
  subtitle = 'Join thousands of happy students transforming their learning',
  testimonials = DEFAULT_TESTIMONIALS,
}) => {
  const titleParts = title.split(' ');
  const mainTitle = titleParts.slice(0, -1).join(' ');
  const lastWord = titleParts[titleParts.length - 1];

  return (
    <section className="testimonial-container">
      {/* Header */}
      <div className="header-section">
        <h2 className="title">
          {mainTitle} <span className="highlight">{lastWord}</span>
        </h2>
        <p className="subtitle">{subtitle}</p>
      </div>

      {/* TESTIMONIAL CARDS */}
      <div className="cards-grid">
        {testimonials.map((item, index) => (
          <div
            key={item.id}
            className="testimonial-card"
            style={{ '--card-index': index + 1 } as React.CSSProperties}
          >
            <div className="card-header">
              <span className="emoji-avatar">{item.emoji}</span>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} stroke="#6aece1" fill="none" />
                ))}
              </div>
            </div>

            <p className="testimonial-text">"{item.text}"</p>

            <div className="author-info">
              <h4 className="author-name">{item.name}</h4>
              <p className="author-role">{item.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* RATING BADGE */}
      <div className="rating-badge">
        <div className="badge-stars">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} stroke="#FFD700" fill="none" />
          ))}
        </div>
        <span className="rating-score">4.9/5</span>
        <span className="rating-count">from 10,000+ reviews</span>
      </div>

      {/* STYLES */}
      <style>{`
        .testimonial-container {
          background: #0b0e14;
          color: #fff;
          padding: 80px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: system-ui, sans-serif;
        }

        .header-section {
          text-align: center;
          margin-bottom: 50px;
        }

        .title {
          font-size: 42px;
          font-weight: 700;
        }

        .highlight {
          color: #6aece1;
        }

        .subtitle {
          color: #94a3b8;
          max-width: 600px;
          margin: auto;
        }

        /* ===== CARDS GRID ===== */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr); /* 4 cards in single row */
          gap: 24px;
          width: 100%;
          max-width: 1400px;
          margin-bottom: 60px;
        }

        /* RESPONSIVE */
        @media (max-width: 1200px) {
          .cards-grid {
            grid-template-columns: repeat(2, 1fr); /* 2 cards in row for tablets */
          }
        }

        @media (max-width: 768px) {
          .title {
            font-size: 32px;
          }
          .cards-grid {
            grid-template-columns: 1fr; /* 1 card per row on mobile */
          }
        }

        .testimonial-card {
          background: #1a1f26;
          border: 1px solid #2d3748;
          border-radius: 24px;
          padding: 40px;
          min-height: 340px;
          display: flex;
          flex-direction: column;
          opacity: 0;
          animation: slideUp 0.6s ease forwards;
          animation-delay: calc(var(--card-index) * 0.15s);
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .testimonial-card:hover {
          transform: translateY(-10px);
          border-color: #6aece1;
          box-shadow: 0 25px 50px rgba(106,236,225,0.25);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .emoji-avatar {
          font-size: 28px;
        }

        .stars {
          display: flex;
          gap: 2px;
        }

        .testimonial-text {
          flex-grow: 1;
          color: #cbd5e0;
          font-style: italic;
          line-height: 1.6;
        }

        .author-info {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 16px;
        }

        .author-name {
          margin: 0;
          font-size: 16px;
        }

        .author-role {
          margin: 0;
          font-size: 13px;
          color: #94a3b8;
        }

        .rating-badge {
          display: flex;
          gap: 12px;
          padding: 16px 32px;
          border-radius: 100px;
          background: rgba(255,255,255,0.05);
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;
