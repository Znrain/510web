from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import tempfile
from analyze_pdf_with_gpt import extract_text_from_pdf, analyze_portfolio
from analyze_audio_with_gpt import convert_to_wav, transcribe_audio, analyze_audio_with_gpt
from dotenv import load_dotenv
import os

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
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    text = extract_text_from_pdf(tmp_path)
    # print("text:", text)
    suggestion = analyze_portfolio(text)
    return {"suggestion": suggestion}

@app.post("/api/analyze-audio")
async def analyze_audio_api(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[-1]) as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name
    wav_path = convert_to_wav(tmp_path)
    asr_text = transcribe_audio(wav_path)
    suggestion = analyze_audio_with_gpt(asr_text)
    return {"asr_text": asr_text, "suggestion": suggestion} 