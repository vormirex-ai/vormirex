import React from 'react';
import CustomCoursePage from './CustomCoursePage';

// Import local images
import codingMastery from '../CustomCourses/assets/codingmastery.png';
import codingMastery1 from '../CustomCourses/assets/codingmastery1.png';
import codingMastery2 from '../CustomCourses/assets/codingmastery2.png';
import codingMastery3 from '../CustomCourses/assets/codingmastery3.png';
import codingMastery4 from '../CustomCourses/assets/codingmastery4.png';
import codingPDF from '../CustomCourses/assets/CoursesPdf (2).pdf'; // PDF import

const CodingMastery: React.FC = () => {
  return (
    <CustomCoursePage
      title="Coding Mastery"
      description="Transform from beginner to job-ready developer with real-world projects, AI code reviews, and paths trusted by top tech companies."
      benefits={[
        'Build full apps: frontend, backend, databases, deployment',
        'Get instant AI feedback like having a senior mentor 24/7',
        'Master clean code, algorithms & system design',
        'Create a stunning portfolio that gets you hired',
      ]}
      testimonials={[
        {
          name: 'Alex T.',
          text: 'Landed a full-stack role just 4 months after starting!',
        },
        {
          name: 'Priya S.',
          text: 'The AI code reviews are better than most human tutors.',
        },
      ]}
      heroImageUrl={codingMastery} // hero image
      featureImages={[
        codingMastery1,
        codingMastery2,
        codingMastery3,
        codingMastery4,
      ]} // feature images
      pdfUrl={codingPDF} // Pass PDF to component
    />
  );
};

export default CodingMastery;
