import React from 'react';
import CustomCoursePage from './CustomCoursePage';

// Import images
import robotBooster from '../CustomCourses/assets/robotbooster.png';
import booster1 from '../CustomCourses/assets/booster1.png';
import booster2 from '../CustomCourses/assets/booster2.png';
import booster3 from '../CustomCourses/assets/booster3.png';
import booster4 from '../CustomCourses/assets/booster4.png';
import boosterPDF from '../CustomCourses/assets/CoursesPdf (2).pdf'; // PDF import

const BoosterPack: React.FC = () => {
  return (
    <CustomCoursePage
      title="Booster Pack"
      description="Accelerate your progress with intense, focused modules that deliver breakthrough results in days — perfect for overcoming plateaus and building unstoppable momentum."
      benefits={[
        'Master complex topics 3x faster with AI-guided drills',
        'Daily adaptive challenges that push your limits intelligently',
        'Earn streaks, badges, and real confidence boosts',
        'Ideal for students who want fast, measurable wins',
      ]}
      testimonials={[
        {
          name: 'Sarah K.',
          text: 'I finally understood recursion after just 5 days — incredible!',
        },
        {
          name: 'Raj M.',
          text: 'The daily challenges turned learning into an addiction (the good kind).',
        },
      ]}
      heroImageUrl={robotBooster} // imported hero image
      featureImages={[booster1, booster2, booster3, booster4]} // imported feature images
      pdfUrl={boosterPDF} // Pass PDF to component
    />
  );
};

export default BoosterPack;
