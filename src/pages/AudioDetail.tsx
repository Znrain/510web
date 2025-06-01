import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { analyzeAudioByFile } from '../services/ai';
import { saveAudio, AudioData } from '../utils/storage';

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

const TranscriptionTitle = styled.div`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 12px;
`;

const TranscriptionContent = styled.div`
  line-height: 1.6;
  white-space: pre-wrap;
`;

const AudioDetail: React.FC = () => {
  const location = useLocation();
  const { state } = location as any;
  const audio = state?.audio;
  const fileObj = state?.audio?.fileObj; // File 对象
  const isHistory = state?.isHistory; // 是否为历史音频

  const [transcription, setTranscription] = useState<string>('');
  const [aiSuggestion, setAiSuggestion] = useState<string>('');

  useEffect(() => {
    if (audio) {
      // 如果是历史音频，直接显示保存的转写和建议
      if (isHistory || (audio.transcription && audio.transcription !== 'AI is transcribing the audio...' && audio.aiSuggestion && audio.aiSuggestion !== 'AI is analyzing the audio...')) {
        setTranscription(audio.transcription || 'No transcription available');
        setAiSuggestion(audio.aiSuggestion || 'No AI suggestions available');
      } 
      // 如果是新上传的音频，需要实时分析
      else if (fileObj) {
        setTranscription('AI is transcribing the audio...');
        setAiSuggestion('AI is analyzing the audio...');
        
        analyzeAudioByFile(fileObj).then(res => {
          const newTranscription = res.asr_text || 'Transcription failed';
          const newSuggestion = res.suggestion || 'No AI suggestions available';
          
          setTranscription(newTranscription);
          setAiSuggestion(newSuggestion);
          
          // 更新音频数据并保存
          const updatedAudio: AudioData = {
            ...audio,
            transcription: newTranscription,
            aiSuggestion: newSuggestion
          };
          saveAudio(updatedAudio);
          
        }).catch(() => {
          const errorTranscription = 'Audio transcription failed, please try again later';
          const errorSuggestion = 'AI analysis failed, please try again later';
          
          setTranscription(errorTranscription);
          setAiSuggestion(errorSuggestion);
          
          // 更新音频数据并保存
          const updatedAudio: AudioData = {
            ...audio,
            transcription: errorTranscription,
            aiSuggestion: errorSuggestion
          };
          saveAudio(updatedAudio);
        });
      }
      // 如果既没有保存的内容也没有文件对象，显示默认信息
      else {
        setTranscription('No transcription available');
        setAiSuggestion('No AI suggestions available');
      }
    }
  }, [audio, fileObj, isHistory]);

  return (
    <Container>
      <Left>
        <TranscriptionTitle>Audio Transcription</TranscriptionTitle>
        <TranscriptionContent>
          {transcription}
        </TranscriptionContent>
        {audio?.fileName && (
          <div style={{ marginTop: '2rem', fontSize: '14px', opacity: 0.7 }}>
            File: {audio.fileName}
          </div>
        )}
      </Left>
      <Right>
        <SuggestionBox>
          <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 12 }}>AI Suggestions</div>
          <div>{aiSuggestion}</div>
        </SuggestionBox>
      </Right>
    </Container>
  );
};

export default AudioDetail; 