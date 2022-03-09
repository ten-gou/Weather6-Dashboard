var citySearchEl = document.getElementById('city-search');
var searchButtonEl = document.getElementById('search-button');
var outputEl = document.getElementById('output-zone');
var pastSearchEl = document.getElementById('past-searches');

var searchEl = document.createElement('button');

var i = localStorage.getItem("i", JSON.stringify(i));

// checks if values have already been set
if (i > 0) {
    console.log(i);
}
else {
    i = 0;
}

// FXN that logs the value of the input, and will eventually pull the search from OpenWeather
var search4City = function() {
    // console.log(citySearchEl.value);

    // checks if city has been inputted
    if (citySearchEl.value.length > 0) {
        // logs it to the localStorage
        localStorage.setItem("past-search-" + i, JSON.stringify(citySearchEl.value));

        //logs the increased check to the value
        i++;
        localStorage.setItem("i", JSON.stringify(i));
        console.log(i);
        fetchWeather();
    }
    else {
        window.alert("Please input a city!");
    }


}

// FXN that fetches the weather data from the API
var fetchWeather = function() {
    // TODO: Insert the API url to get a list of your repos
    var citi = citySearchEl.value;
    var citiSearch = citi.replace(" ", '%20');
    var requestUrl = 'api.openweathermap.org/data/2.5/weather?q=' + citiSearch + '&APPID=ce51c2ca519b1ea5d5c532a5addc38fe';
    console.log(requestUrl);

    fetch(requestUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        })
  }

// logs past searches
var pastSearches = function() {
    var numero = localStorage.getItem("i", JSON.stringify(i));
    console.log(numero);

    for (i = 0; i < numero; i++) {
    var text = localStorage.getItem("past-search-" + i, JSON.stringify(citySearchEl));
    console.log(text);

    //creates past searches
    var searchEl = document.createElement('button');
    searchEl.textContent = text;
    searchEl.className = "d-flex col justify-content-center bg-dark mb-3 my-3 rounded";
    searchEl.id = "past-search-entry";
    searchEl.setAttribute("onclick", 'pastSearch4City(this)'); //attaches a FXN to each button

    pastSearchEl.appendChild(searchEl);
    }
}
var pastSearch4City = function(elem) {
    var searchEl = elem;
    console.log(searchEl.innerText);
}

// Adds eventListener for searchButton to log input value
searchButtonEl.addEventListener('click', search4City);

pastSearches();