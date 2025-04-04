// Store categories and words
let categories = {};

// Load any existing categories from localStorage
document.addEventListener("DOMContentLoaded", function () {
  const savedCategories = localStorage.getItem("categories");
  if (savedCategories) {
    categories = JSON.parse(savedCategories);
    updateCategoriesList();
  }

  // Initialize score display select with any saved preference
  const savedScoreOption = localStorage.getItem("scoreDisplayOption");
  if (savedScoreOption) {
    document.getElementById("score-display").value = savedScoreOption;
  }

  // Update the category select dropdown
  updateCategorySelect();
});

// Handle form submission for adding categories
document
  .getElementById("category-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const categoryName = document.getElementById("category-name").value.trim().toLowerCase();

    if (categoryName) {
      // Check if category already exists
      if (categories[categoryName]) {
        alert("Category already exists.");
        return;
      }

      // If category doesn't exist and there are already 5 categories
      if (Object.keys(categories).length >= 5) {
        alert("You can only create a maximum of 5 categories.");
        return;
      }

      // Create the category
      categories[categoryName] = [];

      // Clear input
      document.getElementById("category-name").value = "";

      // Save to localStorage
      localStorage.setItem("categories", JSON.stringify(categories));

      // Update category list
      updateCategoriesList();

      // Update category select dropdown
      updateCategorySelect();
    } else {
      alert("Please enter a category name.");
    }
  });

// Handle form submission for adding words to a category
document
  .getElementById("word-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const categoryName = document.getElementById("category-select").value;
    const word = document.getElementById("word-input").value.trim().toLowerCase();

    if (categoryName && word) {
      // Check if word already exists in the selected category
      if (categories[categoryName].includes(word)) {
        alert("This word already exists in the category.");
        return;
      }

      // Add word to the category
      categories[categoryName].push(word);

      // Clear input fields
      document.getElementById("word-input").value = "";

      // Save to localStorage
      localStorage.setItem("categories", JSON.stringify(categories));

      // Update category list
      updateCategoriesList();
    } else {
      alert("Please select a category and enter a word.");
    }
  });

// Function to update the displayed categories list
function updateCategoriesList() {
  const categoriesList = document.getElementById("categories-list");
  categoriesList.innerHTML = ""; // Clear the current list

  for (let category in categories) {
    const categoryItem = document.createElement("li");

    // Make category name clickable and removable
    const categoryText = document.createElement("span");
    categoryText.textContent = `${category}: `;
    categoryText.style.cursor = "pointer";
    categoryText.addEventListener("click", function () {
      removeCategory(category);
    });

    categoryItem.appendChild(categoryText);

    // Add words to the category
    categories[category].forEach(function (word) {
      const wordItem = document.createElement("span");
      wordItem.textContent = ` ${word}`;
      wordItem.style.cursor = "pointer";
      wordItem.addEventListener("click", function () {
        removeWord(category, word);
      });

      categoryItem.appendChild(wordItem);
    });

    categoriesList.appendChild(categoryItem);
  }
}

// Function to update the category select dropdown for adding words
function updateCategorySelect() {
  const categorySelect = document.getElementById("category-select");
  categorySelect.innerHTML = '<option value="">Select a category</option>'; // Reset the dropdown

  for (let category in categories) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  }
}

// Function to remove a category
function removeCategory(category) {
  delete categories[category];
  localStorage.setItem("categories", JSON.stringify(categories));
  updateCategoriesList(); // Update the displayed list after removal
  updateCategorySelect(); // Update the category select dropdown after removal
}

// Function to remove a word from a category
function removeWord(category, word) {
  const index = categories[category].indexOf(word);
  if (index > -1) {
    categories[category].splice(index, 1); // Remove the word
    if (categories[category].length === 0) {
      delete categories[category]; // If the category is empty, remove it
    }
    localStorage.setItem("categories", JSON.stringify(categories));
    updateCategoriesList(); // Update the displayed list after removal
    updateCategorySelect(); // Update the category select dropdown after removal
  }
}

// Save game options when the Play Game button is clicked
document.getElementById("play-game-btn").addEventListener("click", function () {
  const scoreDisplay = document.getElementById("score-display").value;
  localStorage.setItem("scoreDisplayOption", scoreDisplay);
});
