from openai import OpenAI
import fitz  # PyMuPDF
import sys
import os

def extract_text_from_pdf(path):
    try:
        print(f"Opening PDF file: {path}")
        doc = fitz.open(path)
        text = "\n".join(page.get_text() for page in doc)
        doc.close()
        print(f"PDF text extraction successful, length: {len(text)}")
        return text
    except Exception as e:
        print(f"Error extracting text from PDF: {str(e)}")
        raise Exception(f"Failed to extract text from PDF: {str(e)}")

def analyze_portfolio(text):
    try:
        print("Starting OpenAI API call...")
        
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            # 返回错误信息而不是抛出异常，避免中断流程
            return "OPENAI_API_KEY environment variable not set"

        # 明确禁用代理，并还原其他参数
        client = OpenAI(api_key=api_key, http_client=None) 
        
        limited_text = text[:3000] if len(text) > 3000 else text
        print(f"Sending text to OpenAI (length: {len(limited_text)})")
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a UX design mentor. Please provide constructive feedback and suggestions for the following portfolio. IMPORTANT: Your response must be in English only, regardless of the language used in the input text."},
                {"role": "user", "content": f"Please review this portfolio and provide feedback in English: {limited_text}"}
            ],
            max_tokens=1000, # 还原 token 限制
            temperature=0.7  # 还原 temperature
        )
        
        result = response.choices[0].message.content
        print("OpenAI API call successful")
        return result
        
    except Exception as e:
        print(f"Error in OpenAI API call: {str(e)}")
        error_message = f"AI analysis failed: {str(e)}"
        # 特殊处理 proxies 错误
        if "proxies" in str(e):
            error_message = "AI analysis failed due to a proxy configuration issue. Please contact support."
        return error_message

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python analyze_pdf_with_gpt.py <pdf_path>")
        sys.exit(1)
    pdf_path = sys.argv[1]
    try:
        pdf_text = extract_text_from_pdf(pdf_path)
        print("------ PDF Text Extraction Results ------")
        print(pdf_text[:1000] + ("..." if len(pdf_text) > 1000 else ""))
        print("\n------ GPT-3.5 Analysis Suggestions ------")
        result = analyze_portfolio(pdf_text)
        print(result)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1) 