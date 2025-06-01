import React from 'react';
import styled from '@emotion/styled';

export const ProjectCardContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
  padding: 2rem;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:hover {
    transform: translateY(-4px);
  }
`;

export const ProjectInfo = styled.div`
  text-align: center;
`;

export const ProjectTitle = styled.h4`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  margin-bottom: 0.5rem;
  color: #ffffff;
`;

export const ProjectDate = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
`;

interface ProjectCardProps {
  title: string;
  date: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, date, onClick, children }) => (
  <ProjectCardContainer onClick={onClick}>
    <ProjectInfo>
      <ProjectTitle>{title}</ProjectTitle>
      <ProjectDate>{date}</ProjectDate>
      {children}
    </ProjectInfo>
  </ProjectCardContainer>
); 