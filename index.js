// Store categories and words
let categories = {};

// Load any existing categories from localStorage
document.addEventListener('DOMContentLoaded', function() {
  const savedCategories = localStorage.getItem('categories');
  if (savedCategories) {
    categories = JSON.parse(savedCategories);
    updateCategoriesList();
  }
  
  // Initialize score display select with any saved preference
  const savedScoreOption = localStorage.getItem('scoreDisplayOption');
  if (savedScoreOption) {
    document.getElementById('score-display').value = savedScoreOption;
  }
});

// Handle form submission
document.getElementById('category-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get values from the form
  const categoryName = document.getElementById('category-name').value.trim();
  const word = document.getElementById('word-input').value.trim();

  // Check if both inputs are valid
  if (categoryName && word) {
    // If category doesn't exist and there are already 5 categories
    if (!categories[categoryName] && Object.keys(categories).length >= 5) {
      alert('You can only create a maximum of 5 categories.');
      return; // Stop the function if there are already 5 categories
    }

    // If category doesn't exist, create it
    if (!categories[categoryName]) {
      categories[categoryName] = [];
    }

    // Add word to the category
    categories[categoryName].push(word);

    // Clear inputs
    document.getElementById('category-name').value = '';
    document.getElementById('word-input').value = '';

    // Save categories to local storage
    localStorage.setItem('categories', JSON.stringify(categories));

    // Update the displayed categories
    updateCategoriesList();
  } else {
    alert('Please enter both category and word.');
  }
});

// Function to update the displayed categories
function updateCategoriesList() {
  const categoriesList = document.getElementById('categories-list');
  categoriesList.innerHTML = ''; // Clear current list

  // Loop through categories and display them
  for (let category in categories) {
    const categoryItem = document.createElement('li');
    categoryItem.innerHTML = `<strong>${category}</strong>: ${categories[category].join(', ')}`;
    categoriesList.appendChild(categoryItem);
  }
}

// Save game options when the Play Game button is clicked
document.getElementById('play-game-btn').addEventListener('click', function() {
  // Save the score display preference
  const scoreDisplay = document.getElementById('score-display').value;
  localStorage.setItem('scoreDisplayOption', scoreDisplay);
});