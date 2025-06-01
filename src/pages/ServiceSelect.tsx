import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import LogoComponent from '../components/Logo';

const AppContainer = styled.div`
  background: #151515;
  min-height: 100vh;
  color: white;
  position: relative;
  overflow: hidden;
`;

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

const Content = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 4rem;
  padding-top: 12rem;
  padding-bottom: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-family: 'Press Start 2P', monospace;
  font-size: 48px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
  line-height: 1.3;
  transform: scaleX(0.75);
`;

const Description = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-bottom: 4rem;
  max-width: 600px;
`;

const ServiceCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  max-width: 800px;
  width: 100%;
`;

const ServiceCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-4px);
  }
`;

const ServiceIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`;

const ServiceTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ServiceDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
`;

const ServiceSelect: React.FC = () => {
  const navigate = useNavigate();

  const handlePortfolioReviewClick = () => {
    navigate('/portfolio-review');
  };

  const handleAudioSummaryClick = () => {
    navigate('/audio-summary');
  };

  return (
    <AppContainer>
      <BackgroundGlow />
      <BackgroundGlow2 />
      
      <TopBarContainer>
        <LogoComponent />
      </TopBarContainer>

      <Content>
        <Title>Choose Your Service</Title>
        <Description>
          Select the service that best fits your needs to get started with AI-powered career preparation.
        </Description>
        
        <ServiceCards>
          <ServiceCard onClick={handlePortfolioReviewClick}>
            <ServiceIcon>📄</ServiceIcon>
            <ServiceTitle>Portfolio Review</ServiceTitle>
            <ServiceDescription>
              Upload your design portfolio and get AI-powered feedback to improve your work and storytelling.
            </ServiceDescription>
          </ServiceCard>
          
          <ServiceCard onClick={handleAudioSummaryClick}>
            <ServiceIcon>🎵</ServiceIcon>
            <ServiceTitle>Audio Summary</ServiceTitle>
            <ServiceDescription>
              Upload interview or feedback recordings and get AI-generated summaries and improvement suggestions.
            </ServiceDescription>
          </ServiceCard>
        </ServiceCards>
      </Content>
    </AppContainer>
  );
};

export default ServiceSelect; 