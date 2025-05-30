from openai import OpenAI
# from faster_whisper import WhisperModel
from pydub import AudioSegment
import tempfile
import os

# 支持多格式音频转wav
SUPPORTED_FORMATS = ['mp3', 'wav', 'm4a']

def convert_to_wav(input_path):
    ext = input_path.split('.')[-1].lower()
    if ext == 'wav':
        return input_path
    audio = AudioSegment.from_file(input_path)
    wav_path = tempfile.mktemp(suffix='.wav')
    audio.export(wav_path, format='wav')
    return wav_path

def transcribe_audio(audio_path):
    client = OpenAI()
    with open(audio_path, 'rb') as audio_file:
        transcript = client.audio.transcriptions.create(
            model="gpt-4o-transcribe",
            file=audio_file,
            response_format="text"
        )
    return transcript

def analyze_audio_with_gpt(text):
    client = OpenAI()
    res = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "你是面试教练，请对以下面试内容进行总结、提炼亮点和不足，并给出提升建议。"},
            {"role": "user", "content": text[:3000]}
        ]
    )
    return res.choices[0].message.content

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python analyze_audio_with_gpt.py <audio_path>")
        exit(1)
    audio_path = sys.argv[1]
    wav_path = convert_to_wav(audio_path)
    asr_text = transcribe_audio(wav_path)
    print("asr_text:", asr_text)
    print("------ 音频转写文本 ------")
    print(asr_text[:1000] + ("..." if len(asr_text) > 1000 else ""))
    print("\n------ GPT-3.5 分析建议 ------")
    suggestion = analyze_audio_with_gpt(asr_text)
    print(suggestion) 