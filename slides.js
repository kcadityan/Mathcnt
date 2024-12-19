const folders = ['trig', 'complex_numbers','sets','relations and functions','permutations','binomial_theorem','sequence_series','conic_sections']; // List of folders with slides.json

// Landing page functionality
if (window.location.pathname.includes('index.html')) {
  const buttonContainer = document.getElementById('button-container');
  folders.forEach(folder => {
    const button = document.createElement('button');
    button.textContent = folder.replace('_', ' '); // Display name (e.g., "trig" -> "Trig")
    button.onclick = () => loadProblems(folder);
    buttonContainer.appendChild(button);
  });

  function loadProblems(folder) {
    localStorage.setItem('currentFolder', folder); // Store the selected folder in localStorage
    window.location.href = 'problem_description.html'; // Navigate to the problem description page
  }
}

// Problem description page functionality
if (window.location.pathname.includes('problem_description.html')) {
  let slides = [];
  let currentSlide = 0;
  let showingRHS = false; // Track if RHS is visible

  const folder = localStorage.getItem('currentFolder');
  if (folder) {
    fetch(`${folder}/slides.json`)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load slides from ${folder}`);
        return response.json();
      })
      .then(data => {
        slides = data;
        currentSlide = 0;
        showSlide();
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('slide-container').innerHTML = '<p>Error loading slides. Please try again.</p>';
      });
  } else {
    window.location.href = 'index.html'; // Redirect if no folder is selected
  }

  function showSlide() {
    const slideContainer = document.getElementById('slide-container');
    slideContainer.innerHTML = '';

    if (slides.length === 0) {
      slideContainer.innerHTML = '<p>No slides available.</p>';
      return;
    }

    const slide = slides[currentSlide];

    // Display title
    const title = document.createElement('h2');
    title.textContent = slide.title;
    slideContainer.appendChild(title);

    // Display MathML content
    const content = document.createElement('div');
    content.innerHTML = `
      <table style="width: 100%;">
        <tr>
          <td>${slide.LHS}</td>
          <td><mtext>=</mtext></td>
          <td>${showingRHS ? slide.RHS : ''}</td>
        </tr>
      </table>
    `;
    slideContainer.appendChild(content);

    // Trigger MathJax to render MathML
    if (window.MathJax) {
      MathJax.typeset();
    }
  }

  function nextSlide() {
    if (showingRHS) {
      // If RHS is visible, go to the next slide
      currentSlide = (currentSlide + 1) % slides.length; // Loop back to first slide
      showingRHS = false; // Hide RHS after moving to the next slide
    } else {
      // Otherwise, show the RHS
      showingRHS = true;
    }
    showSlide();
  }

  function previousSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      showingRHS = false; // Hide RHS when going to previous slide
      showSlide();
    }
  }

  // Attach navigation buttons
  document.getElementById('next-button').onclick = nextSlide;
  document.getElementById('prev-button').onclick = previousSlide;
}
