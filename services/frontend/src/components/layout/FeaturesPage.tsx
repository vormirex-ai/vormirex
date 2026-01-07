import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import SEO from '../common/SEO';

/* =============================
   THEME COLORS (ABOUT MATCH)
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
  letter-spacing: -1px;
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
   FEATURES
============================= */

const FeaturesSection = styled.section`
  padding: 90px 20px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.4rem;
  font-weight: 800;
  margin-bottom: 70px;
  color: #6aece1;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 34px;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.35s ease;

  &:hover {
    transform: translateY(-10px);
    border-color: #6aece1;
    box-shadow: 0 18px 40px rgba(106, 236, 225, 0.18);
    background: rgba(255, 255, 255, 0.06);
  }
`;

const FeatureImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

const FeatureTitle = styled.h3`
  padding: 26px 26px 10px;
  font-size: 1.35rem;
  font-weight: 700;
  color: #6aece1;
`;

const FeatureDescription = styled.p`
  padding: 0 26px 30px;
  font-size: 0.95rem;
  line-height: 1.7;
  color: #a9b8c2;
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
        description="Explore the powerful features of Vormirex: Real-time code editing, AI tutor, gamified progress, and live virtual classes."
        url="https://vormirex.com/features"
      />
      <Hero>
        <HeroContent>
          <HeroTitle>Powerful Features That Elevate Learning</HeroTitle>
          <HeroSubtitle>
            Vormirex blends technology, AI, and design to deliver an immersive
            coding experience for modern learners.
          </HeroSubtitle>
          <CTAButton onClick={() => navigate('/auth/signup')}>
            Start Free Today
          </CTAButton>
        </HeroContent>
      </Hero>

      <FeaturesSection>
        <Container>
          <SectionTitle>Why Students Love Vormirex</SectionTitle>

          <CardsGrid>
            <FeatureCard>
              <FeatureImage src="https://cpwebassets.codepen.io/assets/packs/editor-projects-a0d6a9e16cf1c2c46219ef3d49370823.png" />
              <FeatureTitle>Real-Time Code Editor</FeatureTitle>
              <FeatureDescription>
                Write, run, and debug code instantly without any setup.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureImage src="https://verge-ai.com/wp-content/uploads/2024/04/How-AI-Chatbot-Tutors-Are-Disrupting-Traditional-Education.webp" />
              <FeatureTitle>AI-Powered Tutor</FeatureTitle>
              <FeatureDescription>
                24/7 intelligent guidance to help you learn faster.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureImage src="https://i0.wp.com/getrapl.com/wp-content/uploads/2023/02/Image-6-Docebo-gamification.png?ssl=1" />
              <FeatureTitle>Gamified Progress</FeatureTitle>
              <FeatureDescription>
                Track skills, earn rewards, and stay motivated.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureImage src="https://cdn.prod.website-files.com/61f7efd44d01cc87c88dc6f3/6933c69e5a99a4e54096b45b_8502b3d6-0fe1-46dc-a00e-b83832adf275.jpeg" />
              <FeatureTitle>Live Virtual Classes</FeatureTitle>
              <FeatureDescription>
                Learn directly from mentors in real-time sessions.
              </FeatureDescription>
            </FeatureCard>
          </CardsGrid>
        </Container>
      </FeaturesSection>

      <FinalCTA>
        <FinalCTATitle>Start Your Learning Journey Today</FinalCTATitle>
        <FinalCTASubtitle>
          Thousands of learners trust Vormirex to master coding skills.
        </FinalCTASubtitle>
        <LargeCTAButton onClick={() => navigate('/auth/signup')}>
          Get Started Free
        </LargeCTAButton>
      </FinalCTA>
    </PageWrapper>
  );
};

export default FeaturesPage;
