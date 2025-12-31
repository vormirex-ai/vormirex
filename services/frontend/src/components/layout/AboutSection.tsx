import React from 'react';
import './AboutSection.css';

const AboutVormirex: React.FC = () => {
  return (
    <div className="about-wrapper">
      {/* ================= HERO SECTION ================= */}
      <section className="about-hero">
        <h1>About Us</h1>
        <p>
          We’re building Vormirex to make learning fun, interactive,
          stress-free, and powered by AI for students everywhere.
        </p>
      </section>

      {/* ================= STORY SECTION ================= */}
      <section className="about-story">
        <div className="story-content">
          <h2>Our Story</h2>

          <p>
            School studies often feel boring and difficult to enjoy. YouTube
            videos are mixed and distracting, and group study becomes hard
            without the right tools. Students end up wasting time searching for
            quality content instead of actually learning.
          </p>

          <p>
            <strong>Vormirex</strong> was created to solve this problem. It is
            an AI-powered education app that turns boring study sessions into
            fun, interactive learning experiences through live video calls,
            quizzes, and instant AI doubt solving.
          </p>

          <p>
            Whether it’s Maths, Science, Coding, English, or Job Skills,
            Vormirex feels like learning from a close friend sitting right next
            to you.
          </p>
        </div>

        <div className="story-image">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Students learning together"
          />
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="about-features">
        <h2>Why Vormirex?</h2>

        <ul>
          <li>🎯 AI tutor available 24/7 to clear all doubts</li>
          <li>🎮 Live group video classes with games & quizzes</li>
          <li>
            📚 All subjects in one place — Maths, Science, Coding, English
          </li>
          <li>🧠 Personalized learning paths for every student</li>
          <li>📊 Progress tracking via smart dashboards</li>
        </ul>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="about-features">
        <h2>How Students Use Vormirex</h2>

        <ul>
          <li>📝 Sign up easily</li>
          <li>📹 Join live group video sessions</li>
          <li>🤖 Ask questions to the AI tutor anytime</li>
          <li>🧩 Participate in quizzes and activities</li>
          <li>📈 Track learning progress on dashboard</li>
        </ul>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="about-cta">
        <h2>Join Us on Our Journey</h2>
        <p>
          We’re building the future of stress-free education and looking for
          learners, educators, and innovators to grow with us.
        </p>

        <div className="cta-buttons">
          <button className="primary-btn">View Courses</button>
          <button className="secondary-btn">Contact Us</button>
        </div>
      </section>
    </div>
  );
};

export default AboutVormirex;
