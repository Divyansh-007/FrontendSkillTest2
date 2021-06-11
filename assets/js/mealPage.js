// fetching meal id from url
let mealId = parseInt(
  window.location.search.substring(4, window.location.search.length)
);

// making api call to fetch meal by it's id and rendering it
fectchMeal(mealId);

function fectchMeal(id) {
  let xhrRequest = new XMLHttpRequest();

  xhrRequest.onload = function () {
    let responseJSON = JSON.parse(xhrRequest.response);
    console.log(responseJSON);

    let meal = responseJSON.meals[0]; // fetching meal from response

    document.title = "Meal House | " + meal.strMeal; // changing page title with meal name
    document.getElementById("meal_img").src = meal.strMealThumb; // meal image
    document.getElementById("meal_name").innerHTML = meal.strMeal; // meal name
    document.getElementById("meal_category").innerHTML = meal.strCategory; // meal category
    document.getElementById("cuisine").innerHTML = meal.strArea; // cuisine
    document.getElementById("instruction").innerHTML = meal.strInstructions; // meal instructions

    // rendering ingredients by traversing over them in the table in html structure
    let html = "";
    document.getElementById("ingridients").innerHTML = html;

    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i] !== null) {
        if (meal["strIngredient" + i].length != 0) {
          html += `<tr>
                <td style="font-size: 1.5rem; width: 20rem;">${
                  meal["strIngredient" + i]
                }: </td>
                <td style="font-size: 1.5rem; width: 20rem;">${
                  meal["strMeasure" + i]
                }</td>
              </tr>`;
        }
      }
    }

    document.getElementById("ingridients").innerHTML = html;
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
