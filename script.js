const questions = [
  {
    question: "Which country is considered the birthplace of cricket?",
    answers: [
      { text: "India", correct: false },
      { text: "Australia", correct: false },
      { text: "England", correct: true },
      { text: "New-zealand", correct: false },
    ],
  },
  {
    question:
      "What is the name of the flat, oval-shaped area in the center of the field where the bowler runs to deliver the ball?",
    answers: [
      { text: "Pitch", correct: true },
      { text: "Square", correct: false },
      { text: "Wicket", correct: false },
      { text: "Boundary", correct: false },
    ],
  },
  {
    question:
      " What is the name of the three wooden stumps topped by two bails on which the ball is aimed?",
    answers: [
      { text: "Wicket", correct: true },
      { text: "Pitch", correct: false },
      { text: "Boundary", correct: false },
      { text: "Crease", correct: false },
    ],
  },
  {
    question:
      "How many players are there in each cricket team on the field during a match?",
    answers: [
      { text: "8", correct: false },
      { text: "10", correct: false },
      { text: "11", correct: true },
      { text: "12", correct: false },
    ],
  },
  {
    question:
      "Which bowler holds the record for the most wickets taken in Test cricket history?",
    answers: [
      { text: "Shane Warne (Australia)", correct: false },
      { text: "James Anderson (England)", correct: false },
      { text: "Muttiah Muralitharan (Sri Lanka)", correct: true },
      { text: " Glenn McGrath (Australia)", correct: false },
    ],
  },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.textContent = questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    answerButtons.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = `You score ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
