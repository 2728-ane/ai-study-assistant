const askBtn = document.getElementById("askBtn");
const questionInput = document.getElementById("question");
const answerElement = document.getElementById("answer");
const modeButtons = document.querySelectorAll(".mode-btn");
const showAnswersBtn = document.getElementById("showAnswersBtn");

let currentQuizTopic = "";
let currentQuizQuestions = "";

let selectedMode = "explain";

// Handle mode buttons
modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modeButtons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");
    selectedMode = button.dataset.mode;

    showAnswersBtn.classList.add("hidden");

    if (selectedMode === "explain") {
      questionInput.placeholder =
        "Enter a topic you want explained...";
    } else if (selectedMode === "summarize") {
      questionInput.placeholder =
        "Paste your notes or text to summarize...";
    } else if (selectedMode === "quiz") {
      questionInput.placeholder =
        "Enter a topic you want to be quizzed on...";
    }
  });
});

// Ask AI
askBtn.addEventListener("click", async () => {
  const question = questionInput.value.trim();

  if (!question) {
    answerElement.textContent = "Please enter something first.";
    return;
  }

  answerElement.textContent = "Thinking...";
  askBtn.disabled = true;
  askBtn.textContent = "Generating...";

  try {
    console.log("Sending request to backend...", question, selectedMode);
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        question: question,
        mode: selectedMode,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong.");
    }

    answerElement.textContent = data.answer;

if (selectedMode === "quiz") {
  currentQuizTopic = question;
  currentQuizQuestions = data.answer;
  showAnswersBtn.classList.remove("hidden");
} else {
  showAnswersBtn.classList.add("hidden");
}

  } catch (error) {
    console.error(error);

    answerElement.textContent =
      "Sorry, I couldn't generate an answer. Please try again.";
  } finally {
    askBtn.disabled = false;
    askBtn.textContent = "Ask AI";
  }
});

showAnswersBtn.addEventListener("click", async () => {
  if (!currentQuizTopic) return;

  showAnswersBtn.disabled = true;
  showAnswersBtn.textContent = "Getting answers...";

  try {
    const response = await fetch("/api/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: currentQuizTopic,
        questions: currentQuizQuestions,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Could not generate answers.");
    }

    answerElement.textContent += `\n\nANSWERS\n\n${data.answer}`;

    showAnswersBtn.classList.add("hidden");
  } catch (error) {
    console.error(error);
    alert("Sorry, I couldn't generate the answers.");
  } finally {
    showAnswersBtn.disabled = false;
    showAnswersBtn.textContent = "Show Answers";
  }
});