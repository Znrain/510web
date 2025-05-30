import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { analyzeAudioByFile } from '../services/ai';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, #181a20 60%, #2b2250 100%);
  display: flex;
  align-items: flex-start;
  padding: 100px 2rem 2rem 2rem;
`;

const Left = styled.div`
  flex: 2;
  background: #222;
  border-radius: 24px;
  margin-right: 2rem;
  min-height: 600px;
  max-width: 700px;
  max-height: 900px;
  overflow: auto;
  padding: 2rem;
  color: #fff;
  font-size: 18px;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SuggestionBox = styled.div`
  background: rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 2rem;
  min-height: 200px;
  color: #fff;
  font-size: 18px;
`;

const AudioDetail: React.FC = () => {
  const location = useLocation() as any;
  const audioObj = location.state?.audio;
  const fileObj = audioObj?.file;

  const [asrText, setAsrText] = useState<string>('AI 正在转写音频...');
  const [aiSuggestion, setAiSuggestion] = useState<string>('AI 正在分析你的面试内容...');

  useEffect(() => {
    if (fileObj) {
      setAsrText('AI 正在转写音频...');
      setAiSuggestion('AI 正在分析你的面试内容...');
      analyzeAudioByFile(fileObj).then(res => {
        setAsrText(res.asr_text || '暂无转写结果');
        setAiSuggestion(res.suggestion || '暂无AI建议');
      }).catch(() => {
        setAsrText('音频转写失败，请稍后重试');
        setAiSuggestion('AI分析失败，请稍后重试');
      });
    }
  }, [fileObj]);

  return (
    <Container>
      <Left>
        <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 12 }}>音频转写文本</div>
        <div>{asrText}</div>
      </Left>
      <Right>
        <SuggestionBox>
          <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 12 }}>AI 建议</div>
          <div>{aiSuggestion}</div>
        </SuggestionBox>
      </Right>
    </Container>
  );
};

export default AudioDetail; 