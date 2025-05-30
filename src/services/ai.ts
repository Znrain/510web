import axios from 'axios';

interface AIAnalysisResponse {
  suggestions: string[];
  error?: string;
}

export const analyzePortfolio = async (pdfContent: string): Promise<AIAnalysisResponse> => {
  try {
    const response = await axios.post('http://localhost:8010/api/analyze-portfolio', {
      content: pdfContent
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("response.data:", response.data);
    return response.data;
  } catch (error) {
    console.error('AI分析失败:', error);
    return {
      suggestions: [],
      error: '分析过程中出现错误，请稍后重试'
    };
  }
};

export const analyzePortfolioByFile = async (file: File): Promise<{ suggestion: string, file_path: string, file_name: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post('http://localhost:8010/api/analyze-portfolio', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const analyzeAudioByFile = async (file: File): Promise<{ asr_text: string, suggestion: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post('http://localhost:8010/api/analyze-audio', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}; 