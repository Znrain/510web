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
            {"role": "system", "content": "You are a UX design mentor. Please provide constructive feedback and suggestions for the following portfolio. IMPORTANT: Your response must be in English only, regardless of the language used in the input text."},
            {"role": "user", "content": f"Please review this portfolio and provide feedback in English: {text[:3000]}"}
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
    print("------ PDF Text Extraction Results ------")
    print(pdf_text[:1000] + ("..." if len(pdf_text) > 1000 else ""))
    print("\n------ GPT-3.5 Analysis Suggestions ------")
    result = analyze_portfolio(pdf_text)
    print(result) 