const searchButton = document.getElementById("search_btn");
const searchResult = document.getElementById("search_result");

function fetchMeal(meal) {
  let xhrRequest = new XMLHttpRequest();

  xhrRequest.onload = function () {
    let responseJSON = JSON.parse(xhrRequest.response);
    console.log(responseJSON);

    let meals = responseJSON.meals;

    let html = "";

    if(meals === null){
        html += "<h2 class='error_msg'>No meals are there with this name....<h2>";
    }else{
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
                              <button id="fav_btn">
                              Add to Favourites <i class="far fa-heart"></i>
                              </button>
                              <br />
                              <button id="details_btn">
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
