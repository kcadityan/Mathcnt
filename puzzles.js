fetch('puzzles.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('puzzles-container');
    data.forEach((puzzle, index) => {
      const puzzleDiv = document.createElement('div');
      puzzleDiv.className = 'puzzle';

      const questionDiv = document.createElement('div');
      questionDiv.className = 'question';
      questionDiv.innerHTML = `<strong>Question ${index + 1}:</strong> ${puzzle.question}`;
      puzzleDiv.appendChild(questionDiv);

      const stepsDiv = document.createElement('div');
      stepsDiv.className = 'steps';
      stepsDiv.innerHTML = `<strong>Steps:</strong> ${puzzle.steps.join('<br>')}`;
      puzzleDiv.appendChild(stepsDiv);

      const choicesDiv = document.createElement('div');
      choicesDiv.className = 'choices';
      choicesDiv.innerHTML = '<strong>Choices:</strong>';
      puzzle.choices.forEach(choice => {
        const choiceDiv = document.createElement('div');
        choiceDiv.className = 'choice';
        choiceDiv.innerHTML = choice.content;
        choicesDiv.appendChild(choiceDiv);
      });
      puzzleDiv.appendChild(choicesDiv);

      container.appendChild(puzzleDiv);
    });
  })
  .catch(error => console.error('Error fetching puzzles:', error));