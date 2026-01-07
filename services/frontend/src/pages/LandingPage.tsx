import React from 'react';
import SEO from '../components/common/SEO';
import VormirexLanding from '../components/layout/VormirexLanding';
import SoundFamiliar from '../components/layout/SoundFamiliar';
import Whatisvormirex from '../components/layout/Whatisvormirex';
import BuiltForEveryone from '../components/layout/BuiltForEveryone';
import HowItWorks from '../components/layout/HowItWorks';
import CourseGrid from '../components/layout/CourseGrid';
import PricingSection from '../components/layout/PricingSection';
import LearningCTA from '../components/layout/LearningCTA';

const HomePage = () => {
  return (
    <div className="app-wrapper">
      <SEO
        title="Vormirex – AI-Powered Learning Platform"
        description="Vormirex is an AI-powered learning platform offering personalized study paths, group learning rooms, and a 24/7 AI teacher to help you learn faster and smarter."
      />
      <VormirexLanding />
      <SoundFamiliar />
      <section id="about">
        <Whatisvormirex />
      </section>
      <section id="features">
        <BuiltForEveryone />
      </section>
      <HowItWorks />
      <section id="courses">
        <CourseGrid />
      </section>
      <section id="pricing">
        <PricingSection />
      </section>
      <LearningCTA />
    </div>
  );
};

export default HomePage;
