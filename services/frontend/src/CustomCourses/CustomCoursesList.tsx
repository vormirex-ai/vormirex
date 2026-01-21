import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomCoursePage.css';

// ==================== IMPORT IMAGES ====================
import robotBooster from './assets/robotbooster.png';
import codingMastery from './assets/codingmastery.png';
import examprep from './assets/Examprep.jpg';
import savedchats from './assets/savedchatss.jpg';
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
    },
    {
      id: 'coding-mastery',
      title: 'Coding Mastery',
      description: 'Transform from beginner to job-ready developer',
      image: codingMastery,
      path: '/custom/coding-mastery',
    },
    {
      id: 'exam-prep',
      title: 'Exam Preparation',
      description: 'Score higher with realistic mock exams',
      image: examprep,
      path: '/custom/exam-prep',
    },
    {
      id: 'saved-chats',
      title: 'Saved Chats',
      description: 'Your personal knowledge vault',
      image: savedchats,
      path: '/custom/saved-chats',
    },
    {
      id: 'your-progress',
      title: 'Your Progress',
      description: "See exactly how far you've come",
      image: yourprogress,
      path: '/custom/your-progress',
    },
  ];

  return (
    <div className="custom-courses-list">
      <div className="courses-header">
        <button
          className="nav-button dashboard-button"
          onClick={() => navigate('/')}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ marginRight: '8px' }}
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          Dashboard
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
            <div
              className="course-card-image"
              style={{ backgroundImage: `url(${course.image})` }}
            />
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
