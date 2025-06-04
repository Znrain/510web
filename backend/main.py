from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tempfile
import os
from analyze_pdf_with_gpt import extract_text_from_pdf, analyze_portfolio
from analyze_audio_with_gpt import convert_to_wav, transcribe_audio, analyze_audio_with_gpt
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# 添加CORS中间件，允许所有来源跨域（开发环境）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 生产环境建议写具体域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("OPENAI_API_KEY in python:", os.getenv("OPENAI_API_KEY"))

@app.post("/api/analyze-portfolio")
async def analyze_portfolio_api(file: UploadFile = File(...)):
    tmp_path = None
    try:
        # 创建临时文件
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp:
            content = await file.read()
            tmp.write(content)
            tmp_path = tmp.name
        
        print(f"Processing file: {file.filename}, temp path: {tmp_path}")
        
        # 提取PDF文本
        text = extract_text_from_pdf(tmp_path)
        print(f"Extracted text length: {len(text)}")
        
        if not text.strip():
            return {"suggestion": "PDF appears to be empty or contains no extractable text."}
        
        # AI分析
        suggestion = analyze_portfolio(text)
        print("AI analysis completed successfully")
        
        return {"suggestion": suggestion}
        
    except Exception as e:
        print(f"Error in analyze_portfolio_api: {str(e)}")
        print(f"Error type: {type(e).__name__}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")
        
    finally:
        # 清理临时文件
        if tmp_path and os.path.exists(tmp_path):
            try:
                os.unlink(tmp_path)
                print(f"Cleaned up temp file: {tmp_path}")
            except Exception as cleanup_error:
                print(f"Failed to cleanup temp file: {cleanup_error}")

@app.post("/api/analyze-audio")
async def analyze_audio_api(file: UploadFile = File(...)):
    tmp_path = None
    wav_path = None
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[-1]) as tmp:
            content = await file.read()
            tmp.write(content)
            tmp_path = tmp.name
            
        wav_path = convert_to_wav(tmp_path)
        asr_text = transcribe_audio(wav_path)
        suggestion = analyze_audio_with_gpt(asr_text)
        return {"asr_text": asr_text, "suggestion": suggestion}
        
    except Exception as e:
        print(f"Error in analyze_audio_api: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Audio analysis failed: {str(e)}")
        
    finally:
        # 清理临时文件
        for path in [tmp_path, wav_path]:
            if path and os.path.exists(path):
                try:
                    os.unlink(path)
                except Exception as cleanup_error:
                    print(f"Failed to cleanup temp file {path}: {cleanup_error}")

@app.get("/")
def read_root():
    return {"message": "Hello from Railway"} 