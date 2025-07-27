const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
console.log("Questions loaded:", questionBank.length);

// Filter questions by tag (example: only "neuro")
const filteredQuestions = questionBank.filter(q => q.tags.includes("neuro"));

// Shuffle and take the first N questions
function getRandomQuestions(num = 5) {
  return filteredQuestions
    .sort(() => Math.random() - 0.5)
    .slice(0, num);
}

const selectedQuestions = getRandomQuestions();

const questions = selectedQuestions;

let currentQuestionIndex = 0;
let score = 0;
const userAnswers = [];

function showQuestion() {
  const q = selectedQuestions[currentQuestionIndex];
  quizContainer.innerHTML = `
    <div>
      <p>Question ${currentQuestionIndex + 1} / ${selectedQuestions.length}</p>
      <p>${q.question}</p>
      <form id="quiz-form">
        ${q.options.map((opt, i) => `
          <label for="q${currentQuestionIndex}-opt${i}">
            <input type="radio" name="answer" id="q${currentQuestionIndex}-opt${i}" value="${i}" required />
            ${opt}
          </label><br/>
        `).join('')}
        <button type="submit">Submit</button>
      </form>
    </div>
  `;

  document.getElementById('quiz-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const selected = +this.answer.value;

    userAnswers[currentQuestionIndex] = selected;

    const selectedOptionText = q.options[selected];
if (selectedOptionText === q.answer) {
  score++;
}
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  });
}

function showResults() {
  resultContainer.innerHTML = `
    <h2>Quiz terminé !</h2>
    <p>Votre score : ${score} / ${selectedQuestions.length}</p>
  `;

  const errorsBtn = document.createElement('button');
  errorsBtn.textContent = "Voir les erreurs";
  errorsBtn.style.marginTop = "20px";
  errorsBtn.style.padding = "10px 20px";
  errorsBtn.style.cursor = "pointer";

  resultContainer.appendChild(errorsBtn);
  errorsBtn.addEventListener('click', showErrors);

  const restartBtn = document.createElement('button');
  restartBtn.textContent = "Recommencer";
  restartBtn.style.marginLeft = "10px";
  restartBtn.style.padding = "10px 20px";
  restartBtn.style.cursor = "pointer";

  resultContainer.appendChild(restartBtn);
  restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers.length = 0;
    resultContainer.innerHTML = '';
    showQuestion();
  });
}

function showErrors() {
  quizContainer.innerHTML = ''; // clear quiz container

  selectedQuestions.forEach((q, index) => {
  const userAnswer = userAnswers[index];
  const correctAnswerIndex = q.options.indexOf(q.answer);

  let questionHtml = `<div><p><strong>Question ${index + 1}:</strong> ${q.question}</p><ul>`;

  q.options.forEach((opt, i) => {
    let style = '';
    if (i === correctAnswerIndex) style = 'background-color: #4caf50; color: white;';
    if (userAnswer === i && i !== correctAnswerIndex) style = 'background-color: #f44336; color: white;';

    questionHtml += `<li style="${style}">${opt}</li>`;
  });

  questionHtml += '</ul></div><hr>';
  quizContainer.innerHTML += questionHtml;
});
  // Disable the "Voir les erreurs" button after it's clicked
  const errorsBtn = resultContainer.querySelector('button');
  if (errorsBtn) errorsBtn.disabled = true;
}

showQuestion();
