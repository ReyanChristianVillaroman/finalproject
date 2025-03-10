const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result');

let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {
      question: "What percentage of global carbon emissions come from energy production?",
      answers: [
        { text: "20%", correct: false },
        { text: "40%", correct: true }, // From index.html
        { text: "60%", correct: false },
        { text: "80%", correct: false }
      ]
    },
    {
      question: "By what year could global carbon emissions double if no changes are made?",
      answers: [
        { text: "2030", correct: false },
        { text: "2040", correct: false },
        { text: "2050", correct: true }, // From index.html
        { text: "2060", correct: false }
      ]
    },
    {
      question: "What percentage of energy is lost through devices left on standby?",
      answers: [
        { text: "5%", correct: false },
        { text: "10%", correct: true }, // From index.html
        { text: "15%", correct: false },
        { text: "20%", correct: false }
      ]
    },
    {
      question: "How much less energy do LED bulbs use compared to traditional incandescent bulbs?",
      answers: [
        { text: "50%", correct: false },
        { text: "60%", correct: false },
        { text: "70%", correct: false },
        { text: "80%", correct: true } // From WhatToDo.html
      ]
    },
    {
      question: "What is the email address provided for contacting SILAW?",
      answers: [
        { text: "silaw@example.com", correct: false },
        { text: "reyanvillaroman@smc.pshs.edu.ph", correct: true }, // From contact.html
        { text: "info@silaw.org", correct: false },
        { text: "contact@silaw.com", correct: false }
      ]
    }
  ];
  
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionContainer.innerHTML = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === 'true';
  if (correct) {
    score++;
  }
  Array.from(answerButtons.children).forEach(button => {
    setStatusClass(button, button.dataset.correct === 'true');
  });
  nextButton.style.display = 'block';
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

function showResult() {
  resetState();
  questionContainer.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Restart";
  nextButton.style.display = 'block';
  resultContainer.innerHTML = "";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

nextButton.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();