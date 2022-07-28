const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');

// Search Meal and Fetch from API

function searchMeal(e) {
e.preventDefault();


// Clear Single meal
single_mealEl.innerHTML = '';

// Get search term
const term = search.value


if (term.trim()) {
  // when it is a get request we do not have to specify since it is the default method 
 fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
 .then(res => res.json())
 .then(data => {
   resultHeading.innerHTML = `<h2>You searched for '${term}'</h2>`

   if(data.meals === null) {
     resultHeading.innerHTML = `<p>Are you sure that you searched for a real meal?</p>`;
     mealsEl.innerHTML = "";
   } else  {
     mealsEl.innerHTML = data.meals.map(meal => `<div class="meal">
     <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
     <div class="meal-info" data-mealID="${meal.idMeal}">
       <h3>${meal.strMeal}</h3>
     </div>
   </div>
     `)
     .join('')
   }
 });
 // Clear search text
 search.value = ''
} else {
  resultHeading.innerHTML = `<h2>Please enter a meal!</h2>`
}

};


function searchRandomMeal() {
  
  single_mealEl.innerHTML = '';
  const term = ["fish", "chicken", "meat", "bean", "potato", "tomato", "duck", "beef", "salad"];
  const random = term[Math.floor(Math.random() * term.length)]

   fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${random}`)
   .then(res => res.json())
   .then(data => {
       resultHeading.innerHTML = `<h2>We recommend you '${random}'</h2>`
       mealsEl.innerHTML = data.meals.map(meal => `<div class="meal">
       <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
       <div class="meal-info" data-mealID="${meal.idMeal}">
         <h3>${meal.strMeal}</h3>
       </div>
     </div>
       `)
       .join('')
     
   });
  };

   submit.addEventListener('submit', searchMeal);
   random.addEventListener('click', searchRandomMeal);
 mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
      if(item.classList) {
        return item.classList.contains('meal-info')
      } else {
        return false;
      }
    });
   
  });