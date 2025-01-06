let currentExamIndex = 0;
let selectedChoices = [];
let exams = [];
let startTime = Date.now();
let questionTimes = [];

fetch('exams.json')
  .then(response => response.json())
  .then(data => {
    exams = data;
    selectedChoices = new Array(exams.length).fill(null);
    questionTimes = new Array(exams.length).fill(0);
    displayExam(currentExamIndex);
  })
  .catch(error => console.error('Error fetching exams:', error));

function displayExam(index) {
  const container = document.getElementById('exams-container');
  container.innerHTML = '';

  const exam = exams[index];
  const examDiv = document.createElement('div');
  examDiv.className = 'exam';

  if (exam.question) {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    questionDiv.innerHTML = `<img src="${exam.question}" alt="Question Image" style="max-width: 100%; height: auto;">`;
    examDiv.appendChild(questionDiv);
  }

  const exDiv = document.createElement('div');
  exDiv.className = 'ex';
  exDiv.innerHTML = `<strong>Exam:</strong> ${exam.ex}`;
  examDiv.appendChild(exDiv);

  const chDiv = document.createElement('div');
  chDiv.className = 'ch';
  chDiv.innerHTML = `<strong>Chapter:</strong> ${exam.ch}`;
  examDiv.appendChild(chDiv);

  const choicesDiv = document.createElement('div');
  choicesDiv.className = 'choices';
  choicesDiv.innerHTML = '<strong>Choices:</strong>';
  exam.choices.forEach((choice, choiceIndex) => {
    const choiceDiv = document.createElement('div');
    choiceDiv.className = 'choice';
    choiceDiv.innerHTML = `
      <input type="radio" name="choice" id="choice${choiceIndex}" value="${choiceIndex}" ${selectedChoices[index] == choiceIndex ? 'checked' : ''}>
      <label for="choice${choiceIndex}">${choice.content}</label>
    `;
    choicesDiv.appendChild(choiceDiv);
  });
  examDiv.appendChild(choicesDiv);

  container.appendChild(examDiv);

  // Add event listeners to radio buttons to enable the submit button
  document.querySelectorAll('input[name="choice"]').forEach(radio => {
    radio.addEventListener('change', () => {
      document.getElementById('submit-button').disabled = false;
    });
  });

  // Record the start time for the current question
  questionTimes[currentExamIndex] = Date.now();
}

document.getElementById('back-button').addEventListener('click', () => {
  if (currentExamIndex > 0) {
    // Record the time taken for the current question
    questionTimes[currentExamIndex] = Date.now() - questionTimes[currentExamIndex];
    currentExamIndex--;
    displayExam(currentExamIndex);
    document.getElementById('submit-button').disabled = true;
  }
});

document.getElementById('next-button').addEventListener('click', () => {
  if (currentExamIndex < exams.length - 1) {
    // Record the time taken for the current question
    questionTimes[currentExamIndex] = Date.now() - questionTimes[currentExamIndex];
    currentExamIndex++;
  } else {
    currentExamIndex = 0; // Go back to the first question
  }
  displayExam(currentExamIndex);
  document.getElementById('submit-button').disabled = true;
});

document.getElementById('submit-button').addEventListener('click', () => {
  const selectedRadio = document.querySelector('input[name="choice"]:checked');
  if (selectedRadio) {
    selectedChoices[currentExamIndex] = selectedRadio.value;
    // Record the time taken for the current question
    questionTimes[currentExamIndex] = Date.now() - questionTimes[currentExamIndex];
    if (currentExamIndex < exams.length - 1) {
      currentExamIndex++;
    } else {
      currentExamIndex = 0; // Go back to the first question
    }
    displayExam(currentExamIndex);
    document.getElementById('submit-button').disabled = true;
  } else {
    alert('Please select an answer before submitting.');
  }
});

document.getElementById('submit-exam-button').addEventListener('click', () => {
  // Calculate the total time taken
  const totalTime = (Date.now() - startTime) / 1000; // in seconds

  // Calculate the number of correct answers
  let correctAnswers = 0;
  selectedChoices.forEach((choice, index) => {
    if (choice !== null && exams[index].choices[choice].isCorrect) {
      correctAnswers++;
    }
  });

  // Calculate the accuracy
  const accuracy = (correctAnswers / exams.length) * 100;

  // Store the results in localStorage
  localStorage.setItem('examResults', JSON.stringify({
    correctAnswers,
    totalQuestions: exams.length,
    accuracy,
    totalTime,
    questionTimes: questionTimes.map(time => time / 1000) // Convert to seconds
  }));

  // Redirect to results.html
  window.location.href = 'results.html';
});