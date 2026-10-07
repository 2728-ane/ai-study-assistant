# 🤖 AI Study Assistant

An AI-powered study assistant that helps users understand topics, summarize study material, and generate quizzes using Google Gemini AI.

## 🌐 Live Demo

[Try the AI Study Assistant](YOUR_RENDER_URL_HERE)

## ✨ Features

- 💡 **Explain** — Get beginner-friendly explanations of difficult topics
- 📝 **Summarize** — Turn long study material into clear, concise summaries
- 🧠 **Quiz Me** — Generate a 5-question quiz on any topic
- ✅ **Show Answers** — Generate answers corresponding to the quiz questions
- ⏳ Loading feedback while AI responses are generated
- 📱 Responsive design for desktop and mobile devices
- 🔐 Gemini API key securely stored on the server using environment variables

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js
- REST API

### AI Integration
- Google Gemini API
- `@google/genai`

### Deployment & Tools
- Render
- Git
- GitHub
- VS Code

## 📁 Project Structure

```text
ai-study-assistant/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .gitignore
│
└── frontend/
    ├── index.html
    ├── style.css
    └── script.js
```

> The `.env` file containing the Gemini API key is excluded from GitHub for security.

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/ask` | Generates explanations, summaries, or quizzes |
| POST | `/api/answers` | Generates answers for the current quiz |

## 💻 Run Locally

Clone the repository:

```bash
git clone https://github.com/2728-ane/ai-study-assistant.git
```

Go into the backend folder:

```bash
cd ai-study-assistant/backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder:

```text
GEMINI_API_KEY=your_gemini_api_key
```

Start the server:

```bash
node server.js
```

Then open:

```text
http://localhost:3000
```

## 📚 What I Learned

Building this project helped me practice:

- Integrating an AI API into a full-stack application
- Building API endpoints with Node.js and Express
- Sending asynchronous requests with JavaScript `fetch()`
- Handling AI-generated responses
- Using environment variables to protect API credentials
- Connecting a frontend to a backend
- Error handling and loading states
- Deploying a Node.js application to Render
- Using Git and GitHub for version control

## 🚀 Future Improvements

- Add user authentication
- Save previous study sessions
- Add quiz scoring
- Support different quiz difficulty levels
- Add Markdown formatting for AI responses
- Add rate limiting for the public API

## 👩‍💻 Author

**Ane Tabitha Wesonga**

Junior Full-Stack Developer | Software Engineering Graduate

- [Portfolio](https://2728-ane.github.io/my-portfolio/)
- [GitHub](https://github.com/2728-ane)
- [LinkedIn](https://www.linkedin.com/in/ane-tabitha-651003442/)
- Email: anewesonga@email.com
