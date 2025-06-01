import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectGrid } from '../components/ProjectGrid';
import { getAudios, AudioData } from '../utils/storage';

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

const AudioUpload = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [audios, setAudios] = useState<AudioData[]>([]);

  // 页面每次显示时都重新加载音频
  useEffect(() => {
    const loadAudios = () => {
      const loadedAudios = getAudios();
      console.log('加载的音频:', loadedAudios);
      setAudios(loadedAudios);
    };
    
    loadAudios();
    
    // 页面获得焦点时也重新加载
    const handleFocus = () => {
      loadAudios();
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'audio/mpeg' || file.type === 'audio/wav' || file.type === 'audio/x-m4a' || file.type === 'audio/mp4' || file.name.endsWith('.m4a'))) {
      // 生成音频ID和基本信息
      const audioId = Date.now().toString();
      const audioName = file.name.replace(/\.(mp3|wav|m4a|mp4)$/i, '');
      
      // 读取文件为base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const audioBase64 = e.target?.result as string;
        
        // 创建临时音频数据并跳转到详情页
        const tempAudio = {
          id: audioId,
          name: audioName,
          fileName: file.name,
          uploadTime: new Date().toISOString(),
          audioBase64: audioBase64,
          transcription: 'AI is transcribing the audio...',
          aiSuggestion: 'AI is analyzing the audio...',
          fileObj: file
        };

        navigate('/audio-detail', {
          state: {
            audio: tempAudio,
            file: audioBase64
          }
        });
      };
      reader.onerror = (error) => {
        alert('Failed to read file, please try again');
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload mp3/wav/m4a format audio files');
    }
  };

  const handleAudioClick = (audio: AudioData) => {
    console.log('点击音频:', audio);
    if (audio.transcription || audio.aiSuggestion) {
      navigate('/audio-detail', { 
        state: { 
          audio: audio,
          file: audio.audioBase64 || null,
          isHistory: true
        } 
      });
    } else {
      alert('No analysis data available for this audio');
    }
  };

  // 创建占位音频卡片
  const getDisplayAudios = () => {
    const displayAudios = [...audios];
    
    // 填充空音频卡片到3个
    while (displayAudios.length < 3) {
      displayAudios.push({
        id: `empty-${displayAudios.length}`,
        name: `Audio ${displayAudios.length + 1}`,
        fileName: '',
        uploadTime: '',
        audioBase64: '',
        transcription: '',
        aiSuggestion: '',
      });
    }
    
    console.log('显示的音频:', displayAudios.slice(0, 3));
    return displayAudios.slice(0, 3);
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
        <UploadTitle>Upload Interview Audio</UploadTitle>
        <UploadDescription>
          Upload your interview recordings, AI will automatically transcribe and provide analysis suggestions
        </UploadDescription>
        <UploadButton onClick={handleUploadClick}>
          Upload Audio
        </UploadButton>
        <HiddenInput
          type="file"
          ref={fileInputRef}
          accept="audio/mp3,audio/mpeg,audio/wav,audio/x-m4a,audio/mp4,.m4a"
          onChange={handleFileChange}
        />
      </UploadSection>
      <ProjectGrid>
        {getDisplayAudios().map((audio, index) => (
          <ProjectCard
            key={audio.id}
            title={audio.name}
            date={formatDate(audio.uploadTime)}
            onClick={() => handleAudioClick(audio)}
          />
        ))}
      </ProjectGrid>
    </PageContainer>
  );
};

export default AudioUpload; 