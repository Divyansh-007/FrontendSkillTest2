// referencing all the elements
const searchButton = document.getElementById("search_btn"); // search button
const searchResult = document.getElementById("search_result"); // search result list
const favMealsList = document.getElementById("fav_meals"); // favourite meals list

// calling show favourites 
showFavourites();

// fetching meal with it's name and rendering the details
function fetchMeal(meal) {
  let xhrRequest = new XMLHttpRequest();

  xhrRequest.onload = function () {
    let responseJSON = JSON.parse(xhrRequest.response);
    console.log(responseJSON);

    let meals = responseJSON.meals;

    // iterating over meals from and adding them to the list in html structure
    let html = "";
    searchResult.innerHTML = html;

    if (meals === null) {
      html += "<h2 class='error_msg'>No meals are there with this name....<h2>";
    } else {
      meals.forEach((meal, index) => {
        html += `<!-- meal card -->
                          <div id="meal_card">
                          <img
                              class="meal_img"
                              src="${meal.strMealThumb}"
                              alt=""
                          />
                          <div class="meal_info">
                              <p class="meal_name">${meal.strMeal}</p>
                              <p class="meal_category">${meal.strCategory}</p>
                              <p class="cuisine">${meal.strArea}</p>
                              <button id="fav_btn" onclick="addFavourite(${meal.idMeal})">
                              Add to Favourites <i class="far fa-heart"></i>
                              </button>
                              <br />
                              <button id="details_btn" onclick="showDetails(${meal.idMeal})">
                              View Details <i class="fas fa-arrow-right"></i>
                              </button>
                          </div>
                          </div>`;
      });
    }

    searchResult.innerHTML = html;
  };

  xhrRequest.onerror = function () {
    console.log("Request Failed");
  };

  xhrRequest.open(
    "get",
    `https://themealdb.com/api/json/v1/1/search.php?s=${meal}`,
    true
  );

  xhrRequest.send();
}

// search a meal on clicking of search button
searchButton.addEventListener("click", function () {
  let mealName = document.getElementById("meal").value;
  fetchMeal(mealName);
});

// redirecting to a new page to show details of a meal
function showDetails(id){
  let url = "mealPage.html?id=" + id;
  window.open(url,"_blank");
}

// adding a meal to favourites list
function addFavourite(id) {
  let xhrRequest = new XMLHttpRequest();

  xhrRequest.onload = function () {
    let responseJSON = JSON.parse(xhrRequest.response);
    console.log(responseJSON);

    let resMeal = responseJSON.meals[0]; // fetching meal from response

    let favMeals = localStorage.getItem("favMeals"); // fetching favourite meals from local storage

    if (favMeals == null) {
      mealList = [];
    } else {
      mealList = JSON.parse(favMeals);
    }

    // creating a meal object to be added in the list
    let meal = {
      id: resMeal.idMeal,
      name: resMeal.strMeal,
      category: resMeal.strCategory,
      cuisine: resMeal.strArea,
      image: resMeal.strMealThumb,
    };

    console.log("Meal added", meal);

    mealList.push(meal);
    localStorage.setItem("favMeals", JSON.stringify(mealList));
    showFavourites();
  };

  xhrRequest.onerror = function () {
    console.log("Request Failed");
  };

  xhrRequest.open(
    "get",
    `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    true
  );

  xhrRequest.send();
}

// removing a meal from favourites list
function removeFavourite(index){
  let favMeals = localStorage.getItem('favMeals');
    let mealList = JSON.parse(favMeals);

    mealList.splice(index,1);

    localStorage.setItem('favMeals',JSON.stringify(mealList));
    showFavourites();
}

// showing favourite meals
function showFavourites() {
  let favMeals = localStorage.getItem("favMeals"); // fetching favourite meals from local storage

  if (favMeals == null) {
    mealList = [];
  } else {
    mealList = JSON.parse(favMeals);
  }

  // iterating over favourite meals and rendering them
  let html = "";
  favMealsList.innerHTML = html;

  mealList.forEach((meal, index) => {
    html += `<!-- meal card -->
              <div id="meal_card">
                <img
                    class="meal_img"
                    src="${meal.image}"
                    alt=""
                />
                <div class="meal_info">
                    <p class="meal_name">${meal.name}</p>
                    <p class="meal_category">${meal.category}</p>
                    <p class="cuisine">${meal.cuisine}</p>
                    <button id="fav_btn" onclick="removeFavourite(${index})">
                    Remove from Favourites <i class="fas fa-trash-alt"></i>
                    </button>
                    <br />
                    <button id="details_btn" onclick="showDetails(${meal.id})">
                    View Details <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
                </div>`;
  });

  favMealsList.innerHTML = html;
}