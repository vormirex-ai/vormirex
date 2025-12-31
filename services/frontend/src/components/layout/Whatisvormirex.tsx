import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

interface Props {
  title?: string;
  highlightTitle?: string;
  description?: string;
  features?: string[];
}

const Whatisvormirex = (props: Props) => {
  const {
    title = 'What is ',
    highlightTitle = 'VORMIREX?',
    description = 'Vormirex is your personal AI-powered learning companion that makes studying feel like playing your favorite game. Our friendly AI tutor, Vormi, is available 24/7 to help you learn anything.',
    features = [
      'Personalized learning paths tailored to your pace',
      'Interactive conversations that make concepts stick',
      'Gamified progress with rewards and achievements',
      'Available anytime, anywhere - no scheduling needed',
    ],
  } = props;

  const messages: Message[] = [
    {
      id: 1,
      text: "Hey Vormi! I'm stuck on quadratic equations 🧐",
      sender: 'user',
    },
    {
      id: 2,
      text: "No worries! Let's break it down step by step. Think of it like solving a puzzle! 🧩",
      sender: 'ai',
    },
    { id: 3, text: 'That sounds easier! Can you show me?', sender: 'user' },
    {
      id: 4,
      text: "Of course! Let's use a real-world example with throwing a ball. Ready? 🏀",
      sender: 'ai',
    },
  ];

  return (
    <div className="vx-container">
      <div className="vx-content">
        {/* Chat Card */}
        <div className="vx-chat-card">
          <div className="vx-chat-header">
            <div className="vx-avatar">
              <Sparkles size={18} color="#071014" />
            </div>
            <div>
              <div className="vx-header-name">Chat with VORMI</div>
              <div className="vx-status">
                <span className="vx-dot"></span>
                Online now
              </div>
            </div>
          </div>

          <div className="vx-chat-body">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`vx-message-wrapper vx-${msg.sender}`}
              >
                <div className="vx-message-bubble">{msg.text}</div>
              </div>
            ))}

            <div className="vx-typing">
              <div className="vx-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              Vormi is typing...
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="vx-text">
          <h1 className="vx-title">
            {title}
            <span className="vx-gradient">{highlightTitle}</span>
          </h1>

          <p className="vx-description">{description}</p>

          <ul className="vx-features">
            {features.map((feature, index) => (
              <li key={index} className="vx-feature-item">
                <CheckCircle2 size={20} className="vx-check" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .vx-container {
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          color: #fff;
        }

        .vx-content {
          max-width: 1100px;
          width: 100%;
          display: flex;
          gap: 60px;
          align-items: center;
        }

        @media (max-width: 900px) {
          .vx-content {
            flex-direction: column;
            text-align: center;
          }
          .vx-feature-item {
            justify-content: center;
          }
        }

        .vx-chat-card {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.10);
          padding: 24px;
          max-width: 450px;
          width: 100%;
          box-shadow: 0 20px 40px rgba(0,0,0,0.45);
          position: relative;
          overflow: hidden;
        }

        /* subtle accent glow */
        .vx-chat-card::before {
          content: "";
          position: absolute;
          inset: -2px;
          background: radial-gradient(600px 200px at 20% 0%,
            rgba(106, 236, 225, 0.14),
            transparent 60%);
          pointer-events: none;
        }

        .vx-chat-header {
          position: relative;
          display: flex;
          gap: 12px;
          margin-bottom: 30px;
        }

        .vx-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #6aece1, #1fb8ae);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 10px 24px rgba(0, 0, 0, 0.35),
            0 0 0 1px rgba(106, 236, 225, 0.25) inset;
        }

        .vx-header-name {
          font-weight: 600;
        }

        .vx-status {
          display: flex;
          gap: 6px;
          font-size: 12px;
          color: #63f2c9;
        }

        .vx-dot {
          width: 6px;
          height: 6px;
          background: #63f2c9;
          border-radius: 50%;
          box-shadow: 0 0 0 3px rgba(99, 242, 201, 0.15);
        }

        .vx-chat-body {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .vx-message-wrapper {
          display: flex;
        }

        .vx-user {
          justify-content: flex-end;
        }

        .vx-ai {
          justify-content: flex-start;
        }

        .vx-message-bubble {
          max-width: 85%;
          padding: 12px 16px;
          font-size: 14px;
        }

        /* UPDATED: user bubble uses Vormirex accent */
        .vx-user .vx-message-bubble {
          background: rgba(106, 236, 225, 0.18);
          border: 1px solid rgba(106, 236, 225, 0.28);
          color: #eafffb;
          border-radius: 18px 18px 4px 18px;
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.25);
        }

        .vx-ai .vx-message-bubble {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #c9d1d9;
          border-radius: 18px 18px 18px 4px;
        }

        .vx-typing {
          display: flex;
          gap: 8px;
          font-size: 12px;
          color: #8b949e;
          align-items: center;
          margin-top: 4px;
        }

        .vx-dots {
          display: inline-flex;
          gap: 6px;
          align-items: center;
        }

        .vx-dots span {
          width: 4px;
          height: 4px;
          background: rgba(106, 236, 225, 0.85);
          border-radius: 50%;
          animation: blink 1.4s infinite;
        }
        .vx-dots span:nth-child(2) { animation-delay: 0.2s; }
        .vx-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes blink {
          0%, 80%, 100% { opacity: 0.25; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-1px); }
        }

        .vx-title {
          font-size: 48px;
          font-weight: 800;
          line-height: 1.05;
        }

        /* UPDATED: Vormirex gradient */
        .vx-gradient {
          background: linear-gradient(90deg, #6aece1, #1fb8ae);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .vx-description {
          font-size: 18px;
          color: #8b949e;
          margin-bottom: 32px;
        }

        .vx-features {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .vx-feature-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        /* UPDATED: check icon uses accent */
        .vx-check {
          color: #6aece1;
          margin-top: 2px;
          filter: drop-shadow(0 0 10px rgba(106, 236, 225, 0.25));
        }
      `}</style>
    </div>
  );
};

export default Whatisvormirex;
