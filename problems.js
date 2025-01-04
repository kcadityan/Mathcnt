let currentProblemIndex = 0;
let selectedChoices = [];
let problems = [];

fetch('problems.json')
  .then(response => response.json())
  .then(data => {
    problems = data;
    selectedChoices = new Array(problems.length).fill(null);
    displayProblem(currentProblemIndex);
  })
  .catch(error => console.error('Error fetching problems:', error));

function displayProblem(index) {
  const container = document.getElementById('problems-container');
  container.innerHTML = '';

  const problem = problems[index];
  const problemDiv = document.createElement('div');
  problemDiv.className = 'problem';

  if (problem.question) {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    questionDiv.innerHTML = `<img src="${problem.question}" alt="Question Image" style="max-width: 100%; height: auto;">`;
    problemDiv.appendChild(questionDiv);
  }

  if (problem.image) {
    const imageDiv = document.createElement('div');
    imageDiv.className = 'image';
    imageDiv.innerHTML = `<img src="${problem.image}" alt="Problem Image" style="max-width: 100%; height: auto;">`;
    problemDiv.appendChild(imageDiv);
  }

  if (problem.steps) {
    const stepsDiv = document.createElement('div');
    stepsDiv.className = 'steps';
    stepsDiv.id = 'steps';
    stepsDiv.style.display = 'none'; // Initially hide the steps image
    stepsDiv.innerHTML = `<img src="${problem.steps}" alt="Steps Image" style="max-width: 100%; height: auto;">`;
    problemDiv.appendChild(stepsDiv);
  }

  const exDiv = document.createElement('div');
  exDiv.className = 'ex';
  exDiv.innerHTML = `<strong>Exam:</strong> ${problem.ex}`;
  problemDiv.appendChild(exDiv);

  const chDiv = document.createElement('div');
  chDiv.className = 'ch';
  chDiv.innerHTML = `<strong>Chapter:</strong> ${problem.ch}`;
  problemDiv.appendChild(chDiv);

  const choicesDiv = document.createElement('div');
  choicesDiv.className = 'choices';
  choicesDiv.innerHTML = '<strong>Choices:</strong>';
  problem.choices.forEach((choice, choiceIndex) => {
    const choiceDiv = document.createElement('div');
    choiceDiv.className = 'choice';
    choiceDiv.innerHTML = `
      <input type="radio" name="choice" id="choice${choiceIndex}" value="${choiceIndex}" ${selectedChoices[index] == choiceIndex ? 'checked' : ''}>
      <label for="choice${choiceIndex}">${choice.content}</label>
    `;
    choicesDiv.appendChild(choiceDiv);
  });
  problemDiv.appendChild(choicesDiv);

  container.appendChild(problemDiv);

  // Add event listeners to radio buttons to enable the submit button
  document.querySelectorAll('input[name="choice"]').forEach(radio => {
    radio.addEventListener('change', () => {
      document.getElementById('submit-button').disabled = false;
    });
  });

  document.getElementById('hint-button').disabled = !problem.steps;
}

document.getElementById('back-button').addEventListener('click', () => {
  if (currentProblemIndex > 0) {
    currentProblemIndex--;
    displayProblem(currentProblemIndex);
    document.getElementById('submit-button').disabled = true;
  }
});

document.getElementById('next-button').addEventListener('click', () => {
  if (currentProblemIndex < problems.length - 1) {
    currentProblemIndex++;
  } else {
    currentProblemIndex = 0; // Go back to the first question
  }
  displayProblem(currentProblemIndex);
  document.getElementById('submit-button').disabled = true;
});

document.getElementById('submit-button').addEventListener('click', () => {
  const selectedRadio = document.querySelector('input[name="choice"]:checked');
  if (selectedRadio) {
    selectedChoices[currentProblemIndex] = selectedRadio.value;
    const isCorrect = problems[currentProblemIndex].choices[selectedRadio.value].isCorrect;
    const resultLabel = document.getElementById('result-label');
    resultLabel.textContent = isCorrect ? 'Correct' : 'Wrong';
    resultLabel.style.color = isCorrect ? 'green' : 'red';
    console.log(`Selected choice for problem ${currentProblemIndex + 1}: ${selectedRadio.value}`);
    // You can add code here to record the answer
    setTimeout(() => {
      resultLabel.textContent = '';
    }, 5000);
    if (currentProblemIndex < problems.length - 1) {
      currentProblemIndex++;
    } else {
      currentProblemIndex = 0; // Go back to the first question
    }
    displayProblem(currentProblemIndex);
    document.getElementById('submit-button').disabled = true;
  } else {
    alert('Please select an answer before submitting.');
  }
});

document.getElementById('hint-button').addEventListener('click', () => {
  const stepsElement = document.getElementById('steps');
  if (stepsElement) {
    stepsElement.style.display = 'block';
  }
});

document.getElementById('submit-exam-button').addEventListener('click', () => {
  window.location.href = 'index.html';
});