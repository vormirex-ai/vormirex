import React from 'react';
import CustomCoursePage from './CustomCoursePage';

// Import local images
import yourprogress from '../CustomCourses/assets/yourprogress.png';
import yourprogress1 from '../CustomCourses/assets/heatmaps.jpg';
import yourprogress2 from '../CustomCourses/assets/badges.jpg';
import yourprogress3 from '../CustomCourses/assets/airecommends.jpg';
import yourprogress4 from '../CustomCourses/assets/improvement.jpg';
import progressPDF from '../CustomCourses/assets/CoursesPdf (2).pdf'; // PDF import

const YourProgress: React.FC = () => {
  return (
    <CustomCoursePage
      title="Your Progress"
      description="See exactly how far you've come with stunning dashboards, badges, and insights that keep you motivated every day."
      benefits={[
        'Beautiful heatmaps showing your daily learning streaks',
        'Earn exclusive badges for milestones and mastery',
        'AI recommendations to close skill gaps faster',
        'Track improvement across all subjects in one place',
      ]}
      testimonials={[
        {
          name: 'Jordan P.',
          text: 'Seeing my streak grow keeps me coming back every day.',
        },
        {
          name: 'Lisa W.',
          text: 'Finally understand where I need to improve — game changer!',
        },
      ]}
      heroImageUrl={yourprogress}
      featureImages={[
        yourprogress1,
        yourprogress2,
        yourprogress3,
        yourprogress4,
      ]}
      pdfUrl={progressPDF} // Pass PDF to component
    />
  );
};

export default YourProgress;
