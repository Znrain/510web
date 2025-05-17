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
