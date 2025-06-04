import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectGrid } from '../components/ProjectGrid';
import styled from '@emotion/styled';
import { analyzePortfolioByFile } from '../services/ai';
import { saveProject, getProjects, ProjectData } from '../utils/storage';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #131416;
  color: #FFFFFF;
  padding: 2rem;
  padding-top: 7rem;
`;

const UploadSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 3rem;
  margin-bottom: 4rem;
  text-align: center;
  margin-top: 7rem;
`;

const UploadTitle = styled.h2`
  font-family: 'Press Start 2P', monospace;
  font-size: 32px;
  margin-bottom: 1.5rem;
`;

const UploadDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
`;

const UploadButton = styled.button`
  background: #FFFFFF;
  color: #000000;
  border: none;
  border-radius: 16px;
  padding: 16px 40px;
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const PortfolioReview = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [projects, setProjects] = useState<ProjectData[]>([]);

  // 页面每次显示时都重新加载项目
  useEffect(() => {
    const loadProjects = () => {
      const loadedProjects = getProjects();
      console.log('加载的项目:', loadedProjects); // 调试信息
      setProjects(loadedProjects);
    };
    
    loadProjects();
    
    // 页面获得焦点时也重新加载（用户从其他页面返回时）
    const handleFocus = () => {
      loadProjects();
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      try {
        // 生成项目ID和基本信息
        const projectId = Date.now().toString();
        const projectName = file.name.replace('.pdf', '');
        
        // 读取文件为base64
        const reader = new FileReader();
        reader.onload = async (e) => {
          const pdfBase64 = e.target?.result as string;
          
          // 先跳转到详情页显示PDF和"AI正在分析..."
          const tempProject = {
            id: projectId,
            name: projectName,
            fileName: file.name,
            uploadTime: new Date().toISOString(),
            pdfBase64: pdfBase64,
            aiSuggestion: 'AI is analyzing your portfolio...',
            fileObj: file
          };
          
          navigate('/portfolio-detail', {
            state: {
              project: tempProject,
              file: pdfBase64
            }
          });
          
          // 后台分析并保存结果
          try {
            const result = await analyzePortfolioByFile(file);
            const finalProject: ProjectData = {
              ...tempProject,
              aiSuggestion: result.suggestion || 'No AI suggestions available'
            };
            
            // 保存到本地存储
            saveProject(finalProject);
            
            // 更新项目列表
            setProjects(getProjects());
          } catch (error) {
            console.error('AI分析失败:', error);
            const errorProject: ProjectData = {
              ...tempProject,
              aiSuggestion: 'AI analysis failed, please try again later'
            };
            saveProject(errorProject);
            setProjects(getProjects());
          }
        };
        reader.readAsDataURL(file);
      } catch (error) {
        alert('Failed to read file, please try again');
      }
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleProjectClick = (project: ProjectData) => {
    console.log('点击项目:', project); // 调试信息
    if (project.pdfBase64 || (project.aiSuggestion && project.aiSuggestion !== 'AI is analyzing your portfolio...')) {
      navigate('/portfolio-detail', { 
        state: { 
          project: project,
          file: project.pdfBase64 || null
        } 
      });
    } else {
      alert('No data available for this project');
    }
  };

  // 创建占位项目卡片
  const getDisplayProjects = () => {
    const displayProjects = [...projects];
    
    // 填充空项目卡片到3个
    while (displayProjects.length < 3) {
      displayProjects.push({
        id: `empty-${displayProjects.length}`,
        name: `Project ${displayProjects.length + 1}`,
        fileName: '',
        uploadTime: '',
        pdfBase64: '',
        aiSuggestion: '',
      });
    }
    
    console.log('显示的项目:', displayProjects.slice(0, 3)); // 调试信息
    return displayProjects.slice(0, 3);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No upload yet';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  return (
    <PageContainer>
      <UploadSection>
        <UploadTitle>Upload Your Portfolio</UploadTitle>
        <UploadDescription>
          Share your design work and get personalized AI feedback to improve your portfolio
        </UploadDescription>
        <UploadButton onClick={handleUploadClick}>
          Upload Portfolio
        </UploadButton>
        <HiddenInput
          type="file"
          ref={fileInputRef}
          accept=".pdf"
          onChange={handleFileChange}
        />
      </UploadSection>
    <ProjectGrid>
        {getDisplayProjects().map((project, index) => (
          <ProjectCard
            key={project.id}
            title={project.name}
            date={formatDate(project.uploadTime)}
            onClick={() => handleProjectClick(project)}
          />
        ))}
    </ProjectGrid>
    </PageContainer>
  );
};

export default PortfolioReview; 