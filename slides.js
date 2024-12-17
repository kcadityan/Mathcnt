// Define the slides in an array format with LHS and RHS
const slides = [
  {
    title: "Trigonometric Identity",
    LHS: "<math xmlns='http://www.w3.org/1998/Math/MathML' display='block'><mrow><mtext>sin(θ) / cos(θ) </mtext></mrow></math>",
    RHS: "<math xmlns='http://www.w3.org/1998/Math/MathML' display='block'><mrow><mtext>tan(θ)</mtext></mrow></math>"
  },
  {
    title: "Pythagorean Identity",
    LHS: "<math xmlns='http://www.w3.org/1998/Math/MathML' display='block'><mrow><mtext>sin²(θ) + cos²(θ) </mtext></mrow></math>",
    RHS: "<math xmlns='http://www.w3.org/1998/Math/MathML' display='block'><mrow><mtext>1</mtext></mrow></math>"
  }
];

let currentSlide = 0;
let showingRHS = false;

// Function to display the current slide in table format
function showSlide() {
  const slide = slides[currentSlide];
  const slideContainer = document.getElementById('slide-container');
  
  // Clear the previous content
  slideContainer.innerHTML = '';

  // Display title
  const title = document.createElement('h2');
  title.innerHTML = slide.title;
  slideContainer.appendChild(title);

  // Create the table
  const table = document.createElement('table');
  const row = document.createElement('tr');

  // Create and append LHS (left-hand side)
  const lhsCell = document.createElement('td');
  lhsCell.innerHTML = slide.LHS;
  row.appendChild(lhsCell);

  // Create and append the equals sign (=)
  const equalsCell = document.createElement('td');
  equalsCell.innerHTML = "<mtext>=</mtext>";
  row.appendChild(equalsCell);

  // Create and append RHS (right-hand side) only if showingRHS is true
  const rhsCell = document.createElement('td');
  if (showingRHS) {
    rhsCell.innerHTML = slide.RHS;
  }
  row.appendChild(rhsCell);

  // Append the row to the table
  table.appendChild(row);
  slideContainer.appendChild(table);
}

// Function to go to the next slide
function nextSlide() {
  // Move to the next slide and reset RHS visibility
  currentSlide = (currentSlide + 1) % slides.length;
  showingRHS = false; // Reset RHS visibility for next slide
  showSlide();
}

// Listen for the space key to toggle between showing RHS and next slide
document.addEventListener('keydown', function (event) {
  if (event.key === ' ') {  // Space key pressed
    if (showingRHS) {
      nextSlide();  // Move to the next slide
    } else {
      showingRHS = true;  // Show RHS
      showSlide();
    }
  }
});

// Initial call to display the first slide
showSlide();
