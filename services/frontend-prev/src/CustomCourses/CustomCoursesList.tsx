import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomCoursePage.css';
import { LayoutDashboard } from 'lucide-react';

// ==================== IMPORT IMAGES ====================
import robotBooster from './assets/robotbooster.png';
import codingMastery from './assets/codingmastery.jpg';
import examprep from './assets/Examprep.jpg';
import savedchats from './assets/savedchatss.jpeg';
import yourprogress from './assets/yourprogress.png';

const CustomCoursesList: React.FC = () => {
  const navigate = useNavigate();

  const courses = [
    {
      id: 'booster-pack',
      title: 'Booster Pack',
      description: 'Accelerate your progress with intense, focused modules',
      image: robotBooster,
      path: '/custom/booster-pack',
      heroTextOverlay: 'Accelerate Your Learning',
      heroTextSubtitle:
        'Break through plateaus with focused, intensive modules',
    },
    {
      id: 'coding-mastery',
      title: 'Coding Mastery',
      description: 'Transform from beginner to job-ready developer',
      image: codingMastery,
      path: '/custom/coding-mastery',
      heroTextOverlay: 'Master the Code',
      heroTextSubtitle: 'From beginner to job-ready developer',
    },
    {
      id: 'exam-prep',
      title: 'Exam Preparation',
      description: 'Score higher with realistic mock exams',
      image: examprep,
      path: '/custom/exam-prep',
      heroTextOverlay: 'Ace Your Exams',
      heroTextSubtitle: 'Realistic practice tests that prepare you for success',
    },
    {
      id: 'saved-chats',
      title: 'Saved Chats',
      description: 'Your personal knowledge vault',
      image: savedchats,
      path: '/custom/saved-chats',
      heroTextOverlay: 'Your Knowledge Vault',
      heroTextSubtitle: 'Never lose a valuable insight again',
    },
    {
      id: 'your-progress',
      title: 'Your Progress',
      description: "See exactly how far you've come",
      image: yourprogress,
      path: '/custom/your-progress',
      heroTextOverlay: 'Track Your Journey',
      heroTextSubtitle: 'Visualize your growth and stay motivated',
    },
  ];

  return (
    <div className="custom-courses-list">
      <div className="courses-header">
        <button
          className="nav-button dashboard-btn" // Changed from dashboard-button-header to dashboard-btn
          onClick={() => navigate('/')}
        >
          <LayoutDashboard size={22} />
        </button>

        <h1 className="courses-title">Custom Courses</h1>
        <p className="courses-subtitle">Choose your learning path</p>
      </div>

      <div className="courses-grid">
        {courses.map((course) => (
          <div
            key={course.id}
            className="course-card"
            onClick={() => navigate(course.path)}
          >
            <div className="course-card-image">
              <img src={course.image} alt={course.title} />
              <div className="course-card-overlay">
                <h3>{course.heroTextOverlay}</h3>
                <p>{course.heroTextSubtitle}</p>
              </div>
            </div>
            <div className="course-card-content">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button className="course-card-button">Explore Course</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCoursesList;
