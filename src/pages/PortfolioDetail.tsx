import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { analyzePortfolioByFile } from '../services/ai';
import { saveProject, ProjectData } from '../utils/storage';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

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
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 600px;
  max-width: 700px;
  max-height: 900px;
  overflow: auto;
`;

const PDFContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const PortfolioDetail: React.FC = () => {
  const location = useLocation();
  const { state } = location as any;
  const project = state?.project;
  const pdfFile = state?.file; // base64 PDF
  const fileObj = state?.project?.fileObj; // File 对象

  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(1);
  const [pageHeight, setPageHeight] = useState(1);
  const [containerWidth, setContainerWidth] = useState(1);
  const [containerHeight, setContainerHeight] = useState(1);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const [aiSuggestion, setAiSuggestion] = useState<string>('');

  useEffect(() => {
    if (project) {
      // 如果是历史项目，直接显示保存的AI建议
      if (project.aiSuggestion && project.aiSuggestion !== 'AI is analyzing your portfolio...') {
        setAiSuggestion(project.aiSuggestion);
      } 
      // 如果是新上传的项目，需要实时分析
      else if (fileObj) {
        setAiSuggestion('AI is analyzing your portfolio...');
        
        analyzePortfolioByFile(fileObj).then(res => {
          const newSuggestion = res.suggestion || 'No AI suggestions available';
          setAiSuggestion(newSuggestion);
          
          // 更新项目数据并保存
          const updatedProject: ProjectData = {
            ...project,
            aiSuggestion: newSuggestion
          };
          saveProject(updatedProject);
          
        }).catch(() => {
          const errorMessage = 'AI analysis failed, please try again later';
          setAiSuggestion(errorMessage);
          
          // 更新项目数据并保存
          const updatedProject: ProjectData = {
            ...project,
            aiSuggestion: errorMessage
          };
          saveProject(updatedProject);
        });
      }
      // 如果既没有保存的建议也没有文件对象，显示默认信息
      else {
        setAiSuggestion('No AI suggestions available');
      }
    }
  }, [project, fileObj]);

  useEffect(() => {
    if (pdfContainerRef.current) {
      setContainerWidth(pdfContainerRef.current.offsetWidth);
      setContainerHeight(pdfContainerRef.current.offsetHeight);
    }
    const handleResize = () => {
      if (pdfContainerRef.current) {
        setContainerWidth(pdfContainerRef.current.offsetWidth);
        setContainerHeight(pdfContainerRef.current.offsetHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const onPageLoadSuccess = (page: any) => {
    setPageWidth(page.originalWidth);
    setPageHeight(page.originalHeight);
  };

  // 计算scale，保证pdf完整显示在容器内
  let scale = 1;
  if (pageWidth > 1 && pageHeight > 1 && containerWidth > 1 && containerHeight > 1) {
    scale = Math.min(containerWidth / pageWidth, containerHeight / pageHeight);
  }

  return (
    <Container>
      <Left>
        <PDFContainer ref={pdfContainerRef}>
          {pdfFile ? (
            <Document
              file={pdfFile}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<div style={{ color: '#fff' }}>Loading PDF...</div>}
              error={<div style={{ color: '#fff' }}>PDF loading failed</div>}
            >
              <Page
                pageNumber={pageNumber}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                scale={scale}
                onLoadSuccess={onPageLoadSuccess}
                loading={<div style={{ color: '#fff' }}>Loading page...</div>}
              />
              {numPages && numPages > 1 && (
                <div style={{ marginTop: 16 }}>
                  <button
                    onClick={() => setPageNumber(page => Math.max(page - 1, 1))}
                    disabled={pageNumber <= 1}
                  >Previous</button>
                  <span style={{ margin: '0 12px', color: '#fff' }}>
                    {pageNumber} / {numPages}
                  </span>
                  <button
                    onClick={() => setPageNumber(page => Math.min(page + 1, numPages))}
                    disabled={pageNumber >= numPages}
                  >Next</button>
                </div>
              )}
            </Document>
          ) : (
            <div style={{ color: '#fff', textAlign: 'center', padding: '2rem' }}>
              {project?.fileName ? (
                <>
                  <h3>Project File</h3>
                  <p>PDF file temporarily unavailable</p>
                  <p style={{ fontSize: '14px', opacity: 0.7 }}>File: {project.fileName}</p>
                </>
              ) : (
                'Please upload a PDF file first'
              )}
            </div>
          )}
        </PDFContainer>
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

export default PortfolioDetail; 