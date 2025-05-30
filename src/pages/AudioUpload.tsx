import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

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

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'audio/mpeg' || file.type === 'audio/wav' || file.type === 'audio/x-m4a' || file.type === 'audio/mp4' || file.name.endsWith('.m4a'))) {
      const newAudio = {
        id: Date.now(),
        name: file.name,
        file: file,
        uploadTime: new Date().toISOString(),
      };
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target?.result;
        navigate('/audio-detail', {
          state: {
            audio: newAudio,
            file: fileContent
          }
        });
      };
      reader.onerror = (error) => {
        alert('文件读取失败，请重试');
      };
      reader.readAsDataURL(file);
    } else {
      alert('请上传 mp3/wav/m4a 格式的音频文件');
    }
  };

  return (
    <PageContainer>
      <UploadSection>
        <UploadTitle>上传面试音频</UploadTitle>
        <UploadDescription>
          上传你的面试录音，AI将自动转写并给出分析建议
        </UploadDescription>
        <UploadButton onClick={handleUploadClick}>
          上传音频
        </UploadButton>
        <HiddenInput
          type="file"
          ref={fileInputRef}
          accept="audio/mp3,audio/mpeg,audio/wav,audio/x-m4a,audio/mp4,.m4a"
          onChange={handleFileChange}
        />
      </UploadSection>
    </PageContainer>
  );
};

export default AudioUpload; 