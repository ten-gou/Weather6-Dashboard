var citySearchEl = document.getElementById('city-search');
var searchButtonEl = document.getElementById('search-button');
var outputEl = document.getElementById('output-zone');
var pastSearchEl = document.getElementById('past-searches');

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
    console.log(citySearchEl.value);

    localStorage.setItem("past-search-" + i, JSON.stringify(citySearchEl.value));
    i++;
    localStorage.setItem("i", JSON.stringify(i));
    console.log(i);
}

var pastSearches = function() {
    var numero = localStorage.getItem("i", JSON.stringify(i));


    for (i = 0; i < numero.length; i++) {
    var text = localStorage.getItem("past-search-" + i, JSON.stringify(citySearchEl.value));
    console.log(text);
    var searchEl = document.createElement('div');
    }

}

// Adds eventListener for searchButton to log input value
searchButtonEl.addEventListener('click', search4City);

pastSearches();