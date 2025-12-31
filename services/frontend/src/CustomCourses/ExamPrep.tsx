import React from 'react';
import CustomCoursePage from './CustomCoursePage';

// Import local images
import examprep from '../CustomCourses/assets/Examprep.jpg';
import examprep1 from '../CustomCourses/assets/examprep1.png';
import examprep2 from '../CustomCourses/assets/examprep2.png';
import examprep3 from '../CustomCourses/assets/examprep3.png';
import examprep4 from '../CustomCourses/assets/examprep4.png';
import examPrepPDF from '../CustomCourses/assets/CoursesPdf (2).pdf'; // PDF import

const ExamPrep: React.FC = () => {
  return (
    <CustomCoursePage
      title="Exam Prep"
      description="Score higher with realistic mock exams, smart revision plans, and proven strategies that turn stress into success."
      benefits={[
        'Unlimited full-length practice tests with instant scoring',
        'AI-generated explanations that make weak areas your strengths',
        'Personalized study schedules based on your progress',
        'Techniques used by top scorers worldwide',
      ]}
      testimonials={[
        {
          name: 'Mike L.',
          text: 'Scored 95% on my certification — thank you VORMIREX!',
        },
        {
          name: 'Emma R.',
          text: 'The mock exams felt exactly like the real thing.',
        },
      ]}
      heroImageUrl={examprep} // hero image
      featureImages={[examprep1, examprep2, examprep3, examprep4]} // feature images
      pdfUrl={examPrepPDF} // Pass PDF to component
    />
  );
};

export default ExamPrep;
