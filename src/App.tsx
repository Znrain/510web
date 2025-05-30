import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import PortfolioReview from './pages/PortfolioReview';
import PortfolioDetail from './pages/PortfolioDetail';
import LogoComponent from './components/Logo';
import AudioUpload from './pages/AudioUpload';
import AudioDetail from './pages/AudioDetail';
import AudioSummary from './pages/AudioSummary';
import MockInterview from './pages/MockInterview';

const BackgroundGlow = styled.div`
  position: absolute;
  top: -200px;
  right: -200px;
  width: 900px;
  height: 900px;
  background-image: url('/images/glow.png');
  background-size: cover;
  background-position: right top;
  background-repeat: no-repeat;
  z-index: 0;
  pointer-events: none;
  opacity: 0.5;
  filter: blur(80px);
`;

const BackgroundGlow2 = styled.div`
  position: absolute;
  bottom: -200px;
  left: -200px;
  width: 900px;
  height: 900px;
  background-image: url('/images/glow2.png');
  background-size: cover;
  background-position: left bottom;
  background-repeat: no-repeat;
  z-index: 0;
  pointer-events: none;
  opacity: 0.5;
  filter: blur(80px);
`;

const AppContainer = styled.div`
  background: #151515;
  min-height: 100vh;
  color: white;
  position: relative;
  overflow: hidden;
`;

const TopBarContainer = styled.div`
  position: fixed;
  top: 24px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4rem;
  z-index: 10;
`;

const TopBar = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  border-radius: 16px;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 4rem;
  padding-bottom: 8rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  width: fit-content;
`;

const LogoText = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 48px;
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1;
  width: 100%;
  transform: scaleX(1.2);
  transform-origin: left;
`;

const LogoSubtext = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  opacity: 0.9;
  margin-top: -2px;
  width: 100%;
  text-align: left;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  align-items: center;
`;

const SignInButton = styled(motion.button)`
  background: #FFFFFF;
  color: #000000;
  border: none;
  border-radius: 12px;
  padding: 8px 24px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

const Section = styled.section`
  text-align: center;
  margin-bottom: 8rem;
  margin-top: 10rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Press Start 2P', monospace;
  font-size: 48px;
  font-weight: 400;
  margin-bottom: 4rem;
  letter-spacing: -0.02em;
  line-height: 1.3;
  transform: scaleX(0.75);
`;

const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
  margin: 0 auto;
  max-width: 1200px;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const StepNumber = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const StepIcon = styled.div`
  width: 64px;
  height: 64px;
  margin-bottom: 1.5rem;

  img {
    width: 100%;
    height: 100%;
  }
`;

const StepTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const StepDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  line-height: 1.6;
  opacity: 0.9;
  max-width: 300px;
  margin: 0 auto;
`;

const Features = styled.section`
  text-align: center;
  margin-top: 10rem;
  margin-bottom: 8rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const FeatureTitle = styled.h2`
  font-family: 'Press Start 2P', monospace;
  font-size: 48px;
  font-weight: 400;
  margin-bottom: 4rem;
  letter-spacing: -0.02em;
  line-height: 1.3;
  transform: scaleX(0.75);
`;

const FeatureCards = styled.div`
  display: flex;
  gap: 4rem;
  margin: 0 auto;
  max-width: 1200px;
  justify-content: center;
  flex-wrap: nowrap;
  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    flex-wrap: wrap;
  }
`;

const FeatureCard = styled.div`
  text-align: center;
  margin-bottom: 0;
  max-width: 360px;
  min-width: 280px;
  margin-left: auto;
  margin-right: auto;
  padding: 3rem 2rem;
  position: relative;
  border-radius: 32px;
  background: rgba(255,255,255,0.03);
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  flex: 1 1 360px;
`;

const FeatureCardTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const FeatureCardDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  line-height: 1.6;
  opacity: 0.9;
  max-width: 300px;
  margin: 0 auto 2rem;
`;

const FeatureButton = styled(motion.button)`
  background: #FFFFFF;
  color: #000000;
  border: none;
  border-radius: 16px;
  padding: 16px 40px;
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  margin: 0 auto;
  display: block;
`;

const Hero = styled.section`
  max-width: 800px;
  padding-top: 160px;
  margin-bottom: 12rem;
`;

const HeroTitle = styled.h1`
  font-family: 'Press Start 2P', monospace;
  font-size: 48px;
  font-weight: 400;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
  text-align: left;
  transform: scaleX(1);
  transform-origin: left;
  max-width: 1100px;
  white-space: pre-line;
`;

const HeroDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  line-height: 1.5;
  opacity: 0.9;
  margin-bottom: 3rem;
  text-align: left;
  max-width: 500px;
  margin-left: 0;
`;

const GetStartedButton = styled(motion.button)`
  background: #FFFFFF;
  color: #000000;
  border: none;
  border-radius: 16px;
  padding: 16px 40px;
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  align-items: center;
`;

const TabDecor = styled.span`
  display: inline-block;
  width: 32px;
  height: 16px;
  margin-left: 12px;
  background: rgba(40,40,40,0.8);
  border-radius: 8px;
  vertical-align: middle;
`;

const NavBarBg = styled.div`
  background: rgba(40,40,40,0.8);
  border-radius: 2.5rem;
  padding: 0.3rem 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  margin: 0 auto;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  padding: 0.3rem 1.2rem;
  font-size: 16px;
  margin: 0 0.2rem;
  display: inline-block;
  background: none;
  border-radius: 0;
  &:hover {
    color: #FFD700;
  }
`;

const App: React.FC = () => {
  return (
    <Router>
      <AppContainer>
        <BackgroundGlow />
        <BackgroundGlow2 />
        <TopBarContainer>
          <LogoComponent />
          <NavBarBg>
            <NavLinks>
              <NavLink to="/portfolio-review">Portfolio Review</NavLink>
              <NavLink to="/mock-interview">Mock Interview</NavLink>
              <NavLink to="/audio-summary">Audio Summary</NavLink>
            </NavLinks>
          </NavBarBg>
          <SignInButton>Sign In</SignInButton>
        </TopBarContainer>

        <Routes>
          <Route path="/" element={
            <Content>
              <Hero>
                <HeroTitle>
                  Smarter design career prep,{"\n"}built for creatives.
                </HeroTitle>
                <HeroDescription>
                  DesignPilot helps you refine your portfolio, review real feedback,
                  and train for interviews — all in one place.
                </HeroDescription>
                <GetStartedButton>Get Started <span style={{fontSize:'28px',marginLeft:'8px'}}>→</span></GetStartedButton>
              </Hero>

              <Section>
                <SectionTitle>
                  How does it work?
                </SectionTitle>
                <StepsContainer>
                  <Step>
                    <StepNumber>Step1</StepNumber>
                    <StepIcon>
                      <img src="/icons/upload.svg" alt="Upload" />
                    </StepIcon>
                    <StepTitle>Upload</StepTitle>
                    <StepDescription>
                      Submit your resume, portfolio, and (optional) audio
                      feedback to get started.
                    </StepDescription>
                  </Step>
                  <Step>
                    <StepNumber>Step2</StepNumber>
                    <StepIcon>
                      <img src="/icons/review.svg" alt="Review" />
                    </StepIcon>
                    <StepTitle>Review</StepTitle>
                    <StepDescription>
                      Let AI analyze your content and generate insights,
                      feedback, and mock interview questions.
                    </StepDescription>
                  </Step>
                  <Step>
                    <StepNumber>Step3</StepNumber>
                    <StepIcon>
                      <img src="/icons/iterate.svg" alt="Iterate" />
                    </StepIcon>
                    <StepTitle>Iterate</StepTitle>
                    <StepDescription>
                      Use the suggestions to polish your work and practice for
                      your next big opportunity.
                    </StepDescription>
                  </Step>
                </StepsContainer>
              </Section>

              <Features>
                <FeatureTitle>
                  What will you gain?
                </FeatureTitle>
                <FeatureCards>
                  <FeatureCard>
                    <FeatureCardTitle>
                      Refine your portfolio with AI insight
                    </FeatureCardTitle>
                    <FeatureCardDescription>
                      Upload your work and get smart suggestions to improve each project.
                      Identify weak points, enhance storytelling, and align with industry expectations.
                    </FeatureCardDescription>
                    <FeatureButton>Upload Portfolio</FeatureButton>
                  </FeatureCard>
                  <FeatureCard>
                    <FeatureCardTitle>
                      Train with personalized interview questions
                    </FeatureCardTitle>
                    <FeatureCardDescription>
                      AI generates mock interview questions tailored to your background and portfolio.
                      Practice with real-world prompts and feel confident in your next interview.
                    </FeatureCardDescription>
                    <FeatureButton>Start Mock Interview</FeatureButton>
                  </FeatureCard>
                  <FeatureCard>
                    <FeatureCardTitle>
                      Turn feedback recordings into action plans
                    </FeatureCardTitle>
                    <FeatureCardDescription>
                      Upload audio from mentor reviews or mock interviews.
                      AI will extract key suggestions and map them to the right portfolio sections.
                    </FeatureCardDescription>
                    <FeatureButton>Upload Audio</FeatureButton>
                  </FeatureCard>
                </FeatureCards>
              </Features>
            </Content>
          } />
          <Route path="/portfolio-review" element={<PortfolioReview />} />
          <Route path="/portfolio-detail" element={<PortfolioDetail />} />
          <Route path="/audio-summary" element={<AudioUpload />} />
          <Route path="/audio-upload" element={<AudioUpload />} />
          <Route path="/audio-detail" element={<AudioDetail />} />
          <Route path="/mock-interview" element={<MockInterview />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
