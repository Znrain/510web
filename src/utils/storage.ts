export interface ProjectData {
  id: string;
  name: string;
  fileName: string;
  uploadTime: string;
  pdfBase64: string;
  aiSuggestion: string;
  fileObj?: File;
}

export interface AudioData {
  id: string;
  name: string;
  fileName: string;
  uploadTime: string;
  audioBase64: string;
  transcription: string;
  aiSuggestion: string;
  fileObj?: File;
}

const STORAGE_KEY = 'designpilot_projects';
const AUDIO_STORAGE_KEY = 'designpilot_audios';
const MAX_PROJECTS = 3;
const MAX_AUDIOS = 3;

export const saveProject = (project: ProjectData): void => {
  const projects = getProjects();
  
  // 删除fileObj，因为无法序列化
  const projectToSave = { 
    id: project.id,
    name: project.name,
    fileName: project.fileName,
    uploadTime: project.uploadTime,
    pdfBase64: project.pdfBase64,
    aiSuggestion: project.aiSuggestion
  };
  
  // 检查项目是否已存在
  const existingIndex = projects.findIndex(p => p.id === project.id);
  
  if (existingIndex >= 0) {
    // 更新现有项目
    projects[existingIndex] = projectToSave;
    console.log('更新现有项目:', projectToSave);
  } else {
    // 新项目插入到开头
    projects.unshift(projectToSave);
    console.log('保存新项目:', projectToSave);
    
    // 只保留最新的3个项目
    if (projects.length > MAX_PROJECTS) {
      projects.splice(MAX_PROJECTS);
    }
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    console.log('当前所有项目:', projects);
  } catch (error) {
    console.error('保存项目失败:', error);
    // 如果存储超限，尝试只保留最新1个项目
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.log('存储空间不足，只保留最新项目');
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.setItem(STORAGE_KEY, JSON.stringify([projectToSave]));
      } catch (retryError) {
        console.error('重试保存也失败:', retryError);
        // 如果还是失败，不保存pdfBase64
        const projectWithoutPDF = { ...projectToSave, pdfBase64: '' };
        localStorage.setItem(STORAGE_KEY, JSON.stringify([projectWithoutPDF]));
      }
    }
  }
};

export const getProjects = (): ProjectData[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const projects = stored ? JSON.parse(stored) : [];
    console.log('从存储获取项目:', projects);
    return projects;
  } catch (error) {
    console.error('获取项目历史失败:', error);
    return [];
  }
};

export const getProject = (id: string): ProjectData | null => {
  const projects = getProjects();
  return projects.find(p => p.id === id) || null;
};

export const clearProjects = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

// 音频相关的存储函数
export const saveAudio = (audio: AudioData): void => {
  const audios = getAudios();
  
  // 删除fileObj，因为无法序列化
  const audioToSave = { 
    id: audio.id,
    name: audio.name,
    fileName: audio.fileName,
    uploadTime: audio.uploadTime,
    audioBase64: audio.audioBase64,
    transcription: audio.transcription,
    aiSuggestion: audio.aiSuggestion
  };
  
  // 检查音频是否已存在
  const existingIndex = audios.findIndex(a => a.id === audio.id);
  
  if (existingIndex >= 0) {
    // 更新现有音频
    audios[existingIndex] = audioToSave;
    console.log('更新现有音频:', audioToSave);
  } else {
    // 新音频插入到开头
    audios.unshift(audioToSave);
    console.log('保存新音频:', audioToSave);
    
    // 只保留最新的3个音频
    if (audios.length > MAX_AUDIOS) {
      audios.splice(MAX_AUDIOS);
    }
  }
  
  try {
    localStorage.setItem(AUDIO_STORAGE_KEY, JSON.stringify(audios));
    console.log('当前所有音频:', audios);
  } catch (error) {
    console.error('保存音频失败:', error);
    // 如果存储超限，尝试只保留最新1个音频
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.log('存储空间不足，只保留最新音频');
      try {
        localStorage.removeItem(AUDIO_STORAGE_KEY);
        localStorage.setItem(AUDIO_STORAGE_KEY, JSON.stringify([audioToSave]));
      } catch (retryError) {
        console.error('重试保存也失败:', retryError);
        // 如果还是失败，不保存audioBase64
        const audioWithoutFile = { ...audioToSave, audioBase64: '' };
        localStorage.setItem(AUDIO_STORAGE_KEY, JSON.stringify([audioWithoutFile]));
      }
    }
  }
};

export const getAudios = (): AudioData[] => {
  try {
    const stored = localStorage.getItem(AUDIO_STORAGE_KEY);
    const audios = stored ? JSON.parse(stored) : [];
    console.log('从存储获取音频:', audios);
    return audios;
  } catch (error) {
    console.error('获取音频历史失败:', error);
    return [];
  }
};

export const getAudio = (id: string): AudioData | null => {
  const audios = getAudios();
  return audios.find(a => a.id === id) || null;
};

export const clearAudios = (): void => {
  localStorage.removeItem(AUDIO_STORAGE_KEY);
}; 