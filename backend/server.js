const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Test route
app.get("/", (req, res) => {
  res.send("AI Study Assistant server is running!");
});

// AI route
app.post("/api/ask", async (req, res) => {
  try {
    const { question, mode } = req.body;

    if (!question) {
      return res.status(400).json({
        error: "Please enter something first.",
      });
    }

    let prompt;

    if (mode === "summarize") {
      prompt = `
Summarize the following study material clearly and concisely.
Use simple language and highlight the most important points.

Study material:
${question}
`;
    } else if (mode === "quiz") {
      prompt = `
Create a short study quiz about the following topic.

Generate 5 questions.
Do not give the answers immediately.
Number the questions from 1 to 5.

Topic:
${question}
`;
    } else {
      prompt = `
Explain the following topic in a beginner-friendly way.
Use simple language and examples when helpful.

Topic:
${question}
`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
      config: {
        systemInstruction:
          "You are a helpful AI study assistant. Give clear, accurate and educational responses.",
      },
    });

    res.json({
      answer: response.text,
    });
  } catch (error) {
    console.error("Gemini error:", error);

    res.status(500).json({
      error: "Something went wrong while generating the answer.",
    });
  }
});

// Generate quiz answers
app.post("/api/answers", async (req, res) => {
  try {
    const { topic, questions } = req.body;

    if (!topic) {
      return res.status(400).json({
        error: "Quiz topic is required.",
      });
    }

    
    const prompt = `
Below is a study quiz about ${topic}.

QUIZ QUESTIONS:

${questions}

Provide the correct answer to each of these exact questions.

Number the answers so they correspond exactly to the question numbers.

For example:
1. Answer to question 1
2. Answer to question 2

Keep the explanations clear, accurate and beginner-friendly.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
      config: {
        systemInstruction:
          "You are a helpful AI study assistant. Provide accurate and educational quiz answers.",
      },
    });

    res.json({
      answer: response.text,
    });
  } catch (error) {
    console.error("Quiz answers error:", error);

    res.status(500).json({
      error: "Something went wrong while generating the answers.",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});