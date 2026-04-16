const searchBtn = document.getElementById("search-button");
const resultsDiv = document.getElementById("results-container");
const recipeDetailsDiv = document.getElementById("recipe-details-container");
searchBtn.addEventListener("click", () => {
  const ingredient = document.getElementById("search-input").value.toLowerCase();

  if (!ingredient) {
    alert("Please enter an ingredient");
    return;
  }

  searchRecipes(ingredient);
});
function searchRecipes(ingredient) {
  resultsDiv.innerHTML = "Loading...";
  recipeDetailsDiv.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then(res => res.json())
    .then(data => {
      displayResults(data.meals);
    })
    .catch(err => {
      console.error(err);
      resultsDiv.innerHTML = "Error fetching data";
    });
}
function displayResults(meals) {
  resultsDiv.innerHTML = "";

  if (!meals) {
    resultsDiv.innerHTML = "No recipes found.";
    return;
  }

  meals.forEach(meal => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("recipe-card");

    mealDiv.innerHTML = `
      <h3>${meal.strMeal}</h3>
      <img src="${meal.strMealThumb}"  
      <br>
      <button onclick="getRecipeDetails('${meal.idMeal}')">
        View Recipe
      </button>
      <hr>
    `;

    resultsDiv.appendChild(mealDiv);
  });
}
function getRecipeDetails(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(data => {
      displayRecipe(data.meals[0]);
    });
}
function displayRecipe(meal) {
  recipeDetailsDiv.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" width="300">
    <p><strong>Category:</strong> ${meal.strCategory}</p>
    <p><strong>Instructions:</strong></p>
    <p>${meal.strInstructions}</p>
  `;
}
