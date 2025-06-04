# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# AI-Powered Job Preparation Platform for Designers

## Project Scope
This platform helps designers prepare for job applications by analyzing their resumes and portfolios. It generates customized mock interview questions and summarizes feedback from audio recordings. The goal is to streamline job preparation, improve portfolio quality, and help users practice interview skills.

## Target Users
- Graphic, UX, UI, and product designers preparing for job applications.
- Designers seeking structured portfolio improvement and interview preparation.

## Features
- Upload resume and portfolio for AI analysis.
- Upload audio feedback (interviews or mentor reviews) for AI summarization.
- Generate customized mock interview questions.
- Provide improvement suggestions even without audio input.

## Timeline
- Week 2: Project setup, basic web interface
- Week 3–4: Integrate AI for resume & portfolio analysis
- Week 4–5: Add audio upload and feedback summarization
- Week 6: Testing and final presentation

## Contact Information
- **Client:** Oulu Zhang
- **Developer:** Xinyu Wang

## Repository
https://github.com/Znrain/TECHIN510-demo.git

## Developer Milestone 2 - Meeting Note and Progress Report

Project: DesignPilot - AI-powered job prep platform for designers  
Date: May 15, 2025  
Developer: Xinyu Wang  
Client: Oulu Zhang

### Features Completed or Near Completion:
--------------------------------------
1. Portfolio Upload and Review Page:
 - Users can upload PDF portfolios.
 - Extracted text is sent to GPT-3.5 for content-based suggestions.
 - Suggestions are displayed alongside uploaded file name.
2. Homepage and Navigation:
 - Fully responsive homepage with working navigation bar.
 - Pages for Upload, Suggestions, and Mock Interview accessible via sidebar.
3. Mock Interview Generation (Prototype):
 - Hardcoded example questions now displayed for uploaded resumes.
 - AI integration planned as final step (currently simulates functionality).
4. Feedback Handling:
 - GitHub Issues have been opened by client for PDF parsing and text overflow bugs.
 - Suggestions for better UX layout (e.g., side-by-side view) have been implemented.

### Client Feedback Addressed:
---------------------------
- Adjusted layout of suggestion panel to avoid text overflow.
- Handled large file upload error and improved status messages.
- Outstanding: Real GPT API integration for mock interview is pending.

### README Update Summary:
----------------------
- Setup instructions (virtual env, requirements install, Streamlit run)
- Configuration of OpenAI API key and usage notes
- Description of each feature module and usage guide
- Known issues: No real-time streaming yet; placeholder data still used in one area

### Reflection:
-----------
The project is nearly complete. Core features are working end-to-end.
Client feedback has helped refine UI and improve flow. Final task is to connect
mock interview logic to actual GPT API and polish file export features.

# DesignPilot – AI-Powered Portfolio & Interview Reviewer

Client Milestone 2 – Final Review Meeting Note
Project Name: DesignPilot – AI-Powered Portfolio & Interview Reviewer
Date: May 30, 2025
Client: Oulu Zhang
Developer: Xinyu Wang
GitHub Repo: https://github.com/Znrain/510web

Project Testing Summary
Features Completed
Users can upload portfolio PDFs and receive AI-generated suggestions.

Users can upload interview audio files and receive a summary and improvement suggestions.

GPT-4o Mini TTS model is integrated to optimize performance and reduce API costs.

Frontend pages completed for file upload, suggestion display, and overall workflow.


No account system or data persistence.

Future feature: mock interview generation module (not yet started).

Goal Check
The current version fulfills the initial goal: to help users improve their portfolios and interview performance through AI-based feedback. Core features are functional and ready for user testing.

Client Feedback and Requested Changes
Group suggestions by type: structure, content, language.

Add progress indicators during file analysis.

Add optional rating or comment modules for interview summaries.

Developer has acknowledged the suggestions and will continue refining the interface and output.

Reflection
The project achieved key goals and implemented two complete, usable features. Some technical limitations exist in speech transcription and PDF formatting consistency, but the overall result is stable and usable. Deployment is the next step for real user testing, followed by potential development of the mock interview module.

# Vercel 部署指南

本项目支持一键部署到 [Vercel](https://vercel.com/)，实现前后端一体化托管。

## 目录结构

- `src/` 前端 React/TypeScript 代码
- `backend/` FastAPI 后端代码
- `api/`（如需 Serverless Function，可将后端迁移至此）

## 环境变量

1. 在 Vercel 控制台为项目添加所需环境变量（如 `OPENAI_API_KEY` 等）。
2. 本地开发可在 `.env` 文件中配置，**不要将敏感信息上传到 GitHub**。

## 部署流程

1. 推送代码到 GitHub。
2. 登录 Vercel，导入你的 GitHub 仓库。
3. 选择前端（如 `src/`）为主部署目录，或根目录（如有 Next.js/Monorepo）。
4. 如需后端 API，参考 Vercel [Serverless Functions](https://vercel.com/docs/functions) 文档，将 FastAPI 代码迁移到 `api/` 目录下（或用 Node.js/TS 实现）。
5. 在 Vercel 控制台设置好环境变量。
6. 部署完成后，Vercel 会自动分配域名，前端可通过 `/api/xxx` 访问后端接口。

## 注意事项

- Vercel Serverless Functions 对 Python 支持有限，复杂后端建议用 Render/Railway 部署，前端用 Vercel。
- 如遇依赖或冷启动问题，请查阅 Vercel 官方文档或社区。
