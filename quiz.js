const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');

console.log("Questions loaded:", questionBank.length);

// Filter questions by tag "neuro"
const filteredQuestions = questionBank.filter(q => q.tags.includes("neuro"));

// Shuffle and pick first N questions (default 5)
function getRandomQuestions(num = 5) {
  return filteredQuestions
    .sort(() => Math.random() - 0.5)
    .slice(0, num);
}

const selectedQuestions = getRandomQuestions();

let currentQuestionIndex = 0;
let score = 0;
const userAnswers = []; // store selected option indexes

function showQuestion() {
  const q = selectedQuestions[currentQuestionIndex];

  // Build options HTML to avoid nested template literals issues
  let optionsHtml = '';
  for (let i = 0; i < q.options.length; i++) {
    optionsHtml += `
      <label for="q${currentQuestionIndex}-opt${i}">
        <input type="radio" name="answer" id="q${currentQuestionIndex}-opt${i}" value="${i}" required />
        ${q.options[i]}
      </label><br/>
    `;
  }

  quizContainer.innerHTML = `
    <div>
      <p>Question ${currentQuestionIndex + 1} / ${selectedQuestions.length}</p>
      <p>${q.question}</p>
      <form id="quiz-form">
        ${optionsHtml}
        <button type="submit">Submit</button>
      </form>
    </div>
  `;

  document.getElementById('quiz-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const selectedIndex = +this.answer.value;
    userAnswers[currentQuestionIndex] = selectedIndex;

    const selectedText = q.options[selectedIndex];
    if (selectedText === q.answer) {
      score++;
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
  quizContainer.innerHTML = ''; // clear quiz area

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

  errorsBtn.addEventListener('click', () => {
    showErrors();
    errorsBtn.disabled = true;
  });

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
    const userAnswerIndex = userAnswers[index];
    const correctAnswerIndex = q.options.indexOf(q.answer);

    let questionHtml = `<div><p><strong>Question ${index + 1}:</strong> ${q.question}</p><ul>`;

    q.options.forEach((opt, i) => {
      let style = '';
      if (i === correctAnswerIndex) {
        style = 'background-color: #4caf50; color: white;'; // green for correct
      }
      if (userAnswerIndex === i && i !== correctAnswerIndex) {
        style = 'background-color: #f44336; color: white;'; // red for wrong
      }
      questionHtml += `<li style="${style}">${opt}</li>`;
    });

    questionHtml += '</ul></div><hr>';
    quizContainer.innerHTML += questionHtml;
  });
}

// Start the quiz
showQuestion();
