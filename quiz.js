const quizContainer = document.getElementById('quiz-container');

const questions = [
  {
    question: "Quel est le principal neurotransmetteur impliqué dans la transmission synaptique?",
    options: ["Dopamine", "Acétylcholine", "Glutamate", "Sérotonine"],
    answer: 2
  },
  {
    question: "Quelle région du cerveau est principalement associée à la mémoire?",
    options: ["Cortex préfrontal", "Hippocampe", "Cervelet", "Thalamus"],
    answer: 1
  }
];

let currentQuestionIndex = 0;
let score = 0;

const resultContainer = document.getElementById('result-container');

// Show the score text
resultContainer.textContent = `Vous avez obtenu ${score} / ${questions.length} bonnes réponses.`;

// Create the "Voir les erreurs" button
const errorsBtn = document.createElement('button');
errorsBtn.textContent = "Voir les erreurs";
errorsBtn.style.marginTop = "20px";
errorsBtn.style.padding = "10px 20px";
errorsBtn.style.cursor = "pointer";

// Add the button to the page
resultContainer.appendChild(errorsBtn);

// When clicked, run showErrors function
errorsBtn.addEventListener('click', showErrors);


function showQuestion() {
  const q = questions[currentQuestionIndex];
  quizContainer.innerHTML = `
    <div>
      <p>Question ${currentQuestionIndex + 1} / ${questions.length}</p>
      <p>${q.question}</p>
      <form id="quiz-form">
        ${q.options.map((opt, i) => `
          <label>
            <input type="radio" name="answer" value="${i}" required />
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
    if(selected === q.answer) {
      score++;
    }
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResults();
    }
  });
}

function showResults() {
  quizContainer.innerHTML = `
    <div>
      <h2>Quiz terminé !</h2>
      <p>Votre score : ${score} / ${questions.length}</p>
      <button id="restart-btn">Recommencer</button>
    </div>
  `;
  document.getElementById('restart-btn').addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
  });
}

showQuestion();

function showErrors() {
  questions.forEach((q, index) => {
    // Find which option the user selected for this question
    const selected = document.querySelector(`input[name="question${index}"]:checked`);

    // Get all the labels for this question’s answers
    const labels = document.querySelectorAll(`input[name="question${index}"] + label`);

    // If user got it wrong or didn't select an answer
    if (!selected || selected.value !== q.correctAnswer) {
      // Highlight the correct answer label (in green here)
      labels.forEach(label => {
        if (label.htmlFor === `${index}-${q.correctAnswer}`) {
          label.style.backgroundColor = '#4caf50'; // green background
          label.style.color = 'white';
        }
      });

      // If user selected a wrong answer, highlight it in red
      if (selected) {
        const wrongLabel = document.querySelector(`label[for="${selected.id}"]`);
        if (wrongLabel) {
          wrongLabel.style.backgroundColor = '#f44336'; // red background
          wrongLabel.style.color = 'white';
        }
      }
    }
  });

  // Disable the button so it can’t be clicked again
  event.target.disabled = true;
}

