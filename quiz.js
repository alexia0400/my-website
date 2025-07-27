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
  },
  {
    question: "Quel est le nerf crânien responsable de la vision?",
    options: ["Nerf optique", "Nerf facial", "Nerf trijumeau", "Nerf vague"],
    answer: 0
  }
];

// Shuffle questions array for random order
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

let shuffledQuestions = shuffleArray([...questions]);
let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
  const q = shuffledQuestions[currentQuestionIndex];
  quizContainer.innerHTML = `
    <div>
      <p>Question ${currentQuestionIndex + 1} / ${shuffledQuestions.length}</p>
      <p>${q.question}</p>
      <form id="quiz-form">
        ${q.options.map((opt, i) => `
          <label>
            <input type="radio" name="answer" value="${i}" required />
            ${opt}
          </label>
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
    if(currentQuestionIndex < shuffledQuestions.length) {
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
      <p>Votre score : ${score} / ${shuffledQuestions.length}</p>
      <button id="restart-btn">Recommencer</button>
    </div>
  `;
  document.getElementById('restart-btn').addEventListener('click', () => {
    currentQuestionIndex =
