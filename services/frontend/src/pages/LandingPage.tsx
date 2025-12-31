import React from 'react';
import VormirexLanding from '../components/layout/VormirexLanding';
import SoundFamiliar from '../components/layout/SoundFamiliar';
import Whatisvormirex from '../components/layout/Whatisvormirex';
import BuiltForEveryone from '../components/layout/BuiltForEveryone';
import HowItWorks from '../components/layout/HowItWorks';
import CourseGrid from '../components/layout/CourseGrid';
import TestimonialSection from '../components/layout/TestimonialSection';
import PricingSection from '../components/layout/PricingSection';
import LearningCTA from '../components/layout/LearningCTA';
import Footer from '../components/layout/Footer';

const LandingPage = () => {
  return (
    <div className="app-wrapper">
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
      <TestimonialSection />
      <section id="pricing">
        <PricingSection />
      </section>
      <LearningCTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
