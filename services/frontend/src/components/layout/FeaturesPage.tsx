import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SEO from '../common/SEO';

/* =============================
   PAGE WRAPPER
============================= */
const PageWrapper = styled.div`
  min-height: 100vh;
  background: #0a0b14;
  color: #e6f1f1;
  overflow-x: hidden;
  font-family: 'Poppins', sans-serif;
`;

/* =============================
   HERO
============================= */
const Hero = styled.section`
  padding: 120px 20px;
  text-align: center;
  background: radial-gradient(
      circle at top,
      rgba(106, 236, 225, 0.12),
      transparent 60%
    ),
    linear-gradient(180deg, #0a0b14, #06070c);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const HeroContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.6rem, 5vw, 3.8rem);
  font-weight: 800;
  color: #6aece1;
  margin-bottom: 20px;
`;

const HeroSubtitle = styled.p`
  max-width: 760px;
  margin: 0 auto 42px;
  font-size: 1.1rem;
  line-height: 1.7;
  color: #a9b8c2;
`;

const CTAButton = styled.button`
  padding: 14px 36px;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 30px;
  cursor: pointer;
  background: #6aece1;
  color: #000;
  border: none;
  box-shadow: 0 10px 30px rgba(106, 236, 225, 0.35);
  transition: all 0.3s ease;

  &:hover {
    background: #ffffff;
    transform: translateY(3px);
  }
`;

/* =============================
   FEATURES (POINT WISE)
============================= */
const FeaturesSection = styled.section`
  padding: 90px 20px;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.4rem;
  font-weight: 800;
  margin-bottom: 60px;
  color: #6aece1;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const FeatureItem = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 36px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #6aece1;
    box-shadow: 0 15px 35px rgba(106, 236, 225, 0.15);
    transform: translateY(-6px);
  }
`;

const FeatureHeading = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: #6aece1;
  margin-bottom: 16px;
`;

const FeaturePoints = styled.ul`
  padding-left: 18px;
  margin: 0;

  li {
    margin-bottom: 12px;
    font-size: 0.95rem;
    line-height: 1.7;
    color: #a9b8c2;
  }
`;

/* =============================
   FINAL CTA
============================= */
const FinalCTA = styled.section`
  margin-top: 120px;
  padding: 100px 20px;
  text-align: center;
  background: linear-gradient(
    180deg,
    rgba(106, 236, 225, 0.08),
    rgba(10, 11, 20, 0.95)
  );
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const FinalCTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: #6aece1;
  margin-bottom: 18px;
`;

const FinalCTASubtitle = styled.p`
  max-width: 650px;
  margin: 0 auto 40px;
  font-size: 1.05rem;
  color: #a9b8c2;
  line-height: 1.7;
`;

const LargeCTAButton = styled(CTAButton)`
  padding: 16px 44px;
`;

/* =============================
   COMPONENT
============================= */
const FeaturesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <SEO
        title="Features – Vormirex"
        description="Discover Vormirex features: AI-powered learning, real-time coding, gamified progress, and expert mentorship."
        url="https://vormirex.com/features"
      />

      <Hero>
        <HeroContent>
          <HeroTitle>Powerful Features That Elevate Learning</HeroTitle>
          <HeroSubtitle>
            Vormirex is designed to help learners build real-world coding skills
            through smart tools, AI guidance, and structured learning paths.
          </HeroSubtitle>
          <CTAButton onClick={() => navigate('/auth/signup')}>
            Start Free Today
          </CTAButton>
        </HeroContent>
      </Hero>

      <FeaturesSection>
        <Container>
          <SectionTitle>Why Students Choose Vormirex</SectionTitle>

          <FeatureList>
            <FeatureItem>
              <FeatureHeading>Real-Time Coding Environment</FeatureHeading>
              <FeaturePoints>
                <li>Instant code execution with zero setup</li>
                <li>Supports multiple programming languages</li>
                <li>Practice directly in the browser</li>
              </FeaturePoints>
            </FeatureItem>

            <FeatureItem>
              <FeatureHeading>AI-Powered Personal Tutor</FeatureHeading>
              <FeaturePoints>
                <li>24/7 intelligent assistance</li>
                <li>Instant doubt resolution</li>
                <li>Step-by-step explanations for beginners</li>
              </FeaturePoints>
            </FeatureItem>

            <FeatureItem>
              <FeatureHeading>Gamified Learning Experience</FeatureHeading>
              <FeaturePoints>
                <li>Earn points, badges, and achievements</li>
                <li>Track your progress visually</li>
                <li>Stay motivated throughout your journey</li>
              </FeaturePoints>
            </FeatureItem>

            <FeatureItem>
              <FeatureHeading>Live Mentor-Led Sessions</FeatureHeading>
              <FeaturePoints>
                <li>Interact with industry experts</li>
                <li>Real-time doubt clarification</li>
                <li>Hands-on project guidance</li>
              </FeaturePoints>
            </FeatureItem>
          </FeatureList>
        </Container>
      </FeaturesSection>

      <FinalCTA>
        <FinalCTATitle>Start Your Learning Journey Today</FinalCTATitle>
        <FinalCTASubtitle>
          Join thousands of learners building strong tech careers with Vormirex.
        </FinalCTASubtitle>
        <LargeCTAButton onClick={() => navigate('/auth/signup')}>
          Get Started Free
        </LargeCTAButton>
      </FinalCTA>
    </PageWrapper>
  );
};

export default FeaturesPage;
