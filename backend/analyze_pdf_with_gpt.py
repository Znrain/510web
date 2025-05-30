from openai import OpenAI
import fitz  # PyMuPDF
import sys

def extract_text_from_pdf(path):
    doc = fitz.open(path)
    return "\n".join(page.get_text() for page in doc)

def analyze_portfolio(text):
    client = OpenAI()  # 自动读取OPENAI_API_KEY
    res = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "你是UX设计导师，请给以下作品集提供建议"},
            {"role": "user", "content": text[:3000]}
        ]
    )
    # print("res:", res)
    # print("res.choices[0].message.content:", res.choices[0].message.content)
    print("call backend success")
    return res.choices[0].message.content

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python analyze_pdf_with_gpt.py <pdf_path>")
        sys.exit(1)
    pdf_path = sys.argv[1]
    pdf_text = extract_text_from_pdf(pdf_path)
    print("------ PDF文本提取结果 ------")
    print(pdf_text[:1000] + ("..." if len(pdf_text) > 1000 else ""))
    print("\n------ GPT-3.5 分析建议 ------")
    result = analyze_portfolio(pdf_text)
    print(result) 