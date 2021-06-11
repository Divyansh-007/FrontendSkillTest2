const searchButton = document.getElementById("search_btn");
const searchResult = document.getElementById("search_result");
const favMealsList = document.getElementById("fav_meals");

showFavourites();

function fetchMeal(meal) {
  let xhrRequest = new XMLHttpRequest();

  xhrRequest.onload = function () {
    let responseJSON = JSON.parse(xhrRequest.response);
    console.log(responseJSON);

    let meals = responseJSON.meals;

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

searchButton.addEventListener("click", function () {
  let mealName = document.getElementById("meal").value;
  fetchMeal(mealName);
});

function addFavourite(id) {
  let xhrRequest = new XMLHttpRequest();

  xhrRequest.onload = function () {
    let responseJSON = JSON.parse(xhrRequest.response);
    console.log(responseJSON);

    let resMeal = responseJSON.meals[0];

    let favMeals = localStorage.getItem("favMeals");

    if (favMeals == null) {
      mealList = [];
    } else {
      mealList = JSON.parse(favMeals);
    }

    let meal = {
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

function removeFavourite(index){
  let favMeals = localStorage.getItem('favMeals');
    let mealList = JSON.parse(favMeals);

    mealList.splice(index,1);

    localStorage.setItem('favMeals',JSON.stringify(mealList));
    showFavourites();
}

function showFavourites() {
  let favMeals = localStorage.getItem("favMeals");

  if (favMeals == null) {
    mealList = [];
  } else {
    mealList = JSON.parse(favMeals);
  }

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
                    <button id="details_btn">
                    View Details <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
                </div>`;
  });

  favMealsList.innerHTML = html;
}

function showDetails(id){
  let url = "mealPage.html?id=" + id;
  window.open(url,"_blank");
}