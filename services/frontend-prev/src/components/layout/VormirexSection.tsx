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

const VormirexSection = (props: Props) => {
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
    <div className="vormirex-container">
      <div className="vormirex-content">
        {/* Left Side: Chat Interface */}
        <div className="chat-card">
          <div className="chat-header">
            <div className="avatar-container">
              <Sparkles size={18} color="#fff" />
            </div>
            <div className="header-info">
              <div className="header-name">Chat with VORMI</div>
              <div className="status-indicator">
                <span className="dot"></span>
                Online now
              </div>
            </div>
          </div>

          <div className="chat-body">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                <div className="message-bubble">{msg.text}</div>
              </div>
            ))}
            <div className="typing-indicator">
              <div className="dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              Vormi is typing...
            </div>
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="text-content">
          <h1 className="main-title">
            {title}
            <span className="gradient-text">{highlightTitle}</span>
          </h1>
          <p className="description">{description}</p>
          <ul className="feature-list">
            {features.map((feature, index) => (
              <li key={index} className="feature-item">
                <CheckCircle2 className="check-icon" size={20} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .vormirex-container {
          background-color: #050a10;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #ffffff;
        }

        .vormirex-content {
          max-width: 1100px;
          width: 100%;
          display: flex;
          flex-direction: row;
          gap: 60px;
          align-items: center;
        }

        @media (max-width: 900px) {
          .vormirex-content {
            flex-direction: column;
            text-align: center;
          }
          .feature-item {
            justify-content: center;
          }
        }

        /* Chat Card Styles */
        .chat-card {
          flex: 1;
          background-color: #161b22;
          border-radius: 24px;
          border: 1px solid #2d333b;
          padding: 24px;
          width: 100%;
          max-width: 450px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .chat-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 30px;
        }

        .avatar-container {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #00a8a8 0%, #007a7a 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .header-name {
          font-weight: 600;
          font-size: 16px;
          color: #fff;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #4ade80;
          margin-top: 2px;
        }

        .dot {
          width: 6px;
          height: 6px;
          background-color: #4ade80;
          border-radius: 50%;
        }

        .chat-body {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .message-wrapper {
          display: flex;
          width: 100%;
        }

        .message-wrapper.user {
          justify-content: flex-end;
        }

        .message-wrapper.ai {
          justify-content: flex-start;
        }

        .message-bubble {
          max-width: 85%;
          padding: 12px 16px;
          font-size: 14px;
          line-height: 1.5;
        }

        .user .message-bubble {
          background-color: #008b8b;
          color: white;
          border-radius: 18px 18px 4px 18px;
        }

        .ai .message-bubble {
          background-color: #21262d;
          color: #c9d1d9;
          border-radius: 18px 18px 18px 4px;
        }

        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #8b949e;
          margin-top: 10px;
        }

        .dots {
          display: flex;
          gap: 4px;
        }

        .dots span {
          width: 4px;
          height: 4px;
          background-color: #8b949e;
          border-radius: 50%;
          animation: blink 1.4s infinite both;
        }

        .dots span:nth-child(2) { animation-delay: 0.2s; }
        .dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes blink {
          0%, 80%, 100% { opacity: 0.3; }
          40% { opacity: 1; }
        }

        /* Text Content Styles */
        .text-content {
          flex: 1.2;
        }

        .main-title {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 24px;
          letter-spacing: -1px;
        }

        .gradient-text {
          background: linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .description {
          font-size: 18px;
          line-height: 1.6;
          color: #8b949e;
          margin-bottom: 32px;
        }

        .feature-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 16px;
          color: #c9d1d9;
        }

        .check-icon {
          color: #00d2ff;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
};

export default VormirexSection;
