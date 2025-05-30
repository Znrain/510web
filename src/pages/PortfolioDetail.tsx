import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { analyzePortfolioByFile } from '../services/ai';

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

const InputBox = styled.div`
  background: rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 16px;
  outline: none;
`;

const SendButton = styled.button`
  background: #8f6fff;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.5rem;
  margin-left: 1rem;
  font-size: 16px;
  cursor: pointer;
`;

const PortfolioDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location as any;
  const project = state?.project;
  const pdfFile = state?.file; // base64 PDF
  const fileObj = state?.project?.file; // File 对象

  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(1);
  const [pageHeight, setPageHeight] = useState(1);
  const [containerWidth, setContainerWidth] = useState(1);
  const [containerHeight, setContainerHeight] = useState(1);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const [aiSuggestion, setAiSuggestion] = useState<string>('AI 正在分析你的作品集...');

  useEffect(() => {
    if (fileObj) {
      setAiSuggestion('AI 正在分析你的作品集...');
      analyzePortfolioByFile(fileObj).then(res => {
        setAiSuggestion(res.suggestion || '暂无AI建议');
      }).catch(() => {
        setAiSuggestion('AI分析失败，请稍后重试');
      });
    }
  }, [fileObj]);

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
              loading={<div style={{ color: '#fff' }}>正在加载 PDF...</div>}
              error={<div style={{ color: '#fff' }}>PDF 加载失败</div>}
            >
              <Page
                pageNumber={pageNumber}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                scale={scale}
                onLoadSuccess={onPageLoadSuccess}
                loading={<div style={{ color: '#fff' }}>正在加载页面...</div>}
              />
              {numPages && numPages > 1 && (
                <div style={{ marginTop: 16 }}>
                  <button
                    onClick={() => setPageNumber(page => Math.max(page - 1, 1))}
                    disabled={pageNumber <= 1}
                  >上一页</button>
                  <span style={{ margin: '0 12px', color: '#fff' }}>
                    {pageNumber} / {numPages}
                  </span>
                  <button
                    onClick={() => setPageNumber(page => Math.min(page + 1, numPages))}
                    disabled={pageNumber >= numPages}
                  >下一页</button>
                </div>
              )}
            </Document>
          ) : (
            <div style={{ color: '#fff' }}>请先上传 PDF 文件</div>
          )}
        </PDFContainer>
      </Left>
      <Right>
        <SuggestionBox>
          <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 12 }}>AI 建议</div>
          <div>{aiSuggestion}</div>
        </SuggestionBox>
        <InputBox>
          <Input placeholder="输入问题..." />
          <SendButton>发送</SendButton>
        </InputBox>
      </Right>
    </Container>
  );
};

export default PortfolioDetail; 