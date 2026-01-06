import React from 'react';
import CustomCoursePage from './CustomCoursePage';

// Import local images
import savedchats from '../CustomCourses/assets/savedchatss.jpg';
import savedchats1 from '../CustomCourses/assets/savedchats1.jpg';
import savedchats2 from '../CustomCourses/assets/savedchat2.png';
import savedchats3 from '../CustomCourses/assets/savedchat3.png';
import savedchats4 from '../CustomCourses/assets/savedchats4.png';
import savedChatsPDF from '../CustomCourses/assets/CoursesPdf (2).pdf'; // PDF import

const SavedChats: React.FC = () => {
  return (
    <CustomCoursePage
      title="Saved Chats"
      description="Your personal knowledge vault. Every brilliant explanation, code snippet, and insight — organized and ready when you need it."
      benefits={[
        'Search thousands of past conversations instantly',
        'Tag, categorize, and export your best learning moments',
        'Build your own reference library of solved problems',
        'Resume any chat exactly where you left off',
      ]}
      testimonials={[
        {
          name: 'David H.',
          text: 'I refer back to my saved explanations all the time — pure gold.',
        },
        {
          name: 'Anita G.',
          text: 'Like having my own private tutor archive.',
        },
      ]}
      heroImageUrl={savedchats} // hero image
      featureImages={[savedchats1, savedchats2, savedchats3, savedchats4]} // feature images
      pdfUrl={savedChatsPDF} // Pass PDF to component
    />
  );
};

export default SavedChats;
