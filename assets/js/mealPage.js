let mealId = parseInt(
  window.location.search.substring(4, window.location.search.length)
);

fectchMeal(mealId);

function fectchMeal(id) {
  let xhrRequest = new XMLHttpRequest();

  xhrRequest.onload = function () {
    let responseJSON = JSON.parse(xhrRequest.response);
    console.log(responseJSON);

    let meal = responseJSON.meals[0];

    document.title = "Meal House | " + meal.strMeal;
    document.getElementById('meal_img').src = meal.strMealThumb;
    document.getElementById("meal_name").innerHTML = meal.strMeal;
    document.getElementById("meal_category").innerHTML = meal.strCategory;
    document.getElementById("cuisine").innerHTML = meal.strArea;
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
