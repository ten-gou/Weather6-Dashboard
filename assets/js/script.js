var citySearchEl = document.getElementById('city-search');
var searchButtonEl = document.getElementById('search-button');
var resetButtonEl = document. getElementById('reset-button');
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

    pastSearches();
}

// FXN that fetches the weather data from the API
var fetchWeather = function() {
    var citi = citySearchEl.value;
    var citiSearch = citi.replace(" ", '%20');
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + citiSearch + '&units=imperial&APPID=ce51c2ca519b1ea5d5c532a5addc38fe';

    fetch(requestUrl)
      .then(function(response) {
        return response.json();
    })
      .then(function(data) {
        // Checks if something is already in the output zone
        while (outputEl.firstChild) {
            outputEl.removeChild(outputEl.firstChild);
        }

        var lati = data.coord.lat;
        var long = data.coord.lon;
        var requestUrl2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lati +'&lon=' + long + '&units=imperial&APPID=ce51c2ca519b1ea5d5c532a5addc38fe';

        fetch(requestUrl2)
            .then(function(response) {
                return response.json();
        })
            .then(function(data) {
                console.log(data);

                var unix_timestamp = data.daily[0].dt;
                var date = new Date(unix_timestamp * 1000);
                var dated = date.getDate();
                var datem = date.getMonth() + 1;
                var datey = date.getFullYear();
                
                var formattedTime = datem + '/' + dated + '/' + datey;

                var box = document.createElement('div');
                box.className = 'p-2 m-3 bg-secondary rounded-lg h-50';
                var cityName = document.createElement('div');
                cityName.className = 'd-flex row m-2 p-2 align-items-center'
                var temp = document.createElement('p');
                temp.className = 'm-4';
                var wind = document.createElement('p');
                wind.className = 'm-4';
                var humidity = document.createElement('p');
                humidity.className = 'm-4';
                var uv = document.createElement('p');
                uv.className = 'm-4';

                cityName.innerHTML = '<h2>' + citySearchEl.value + ' (' + formattedTime + ')</h2> <img src = "http://openweathermap.org/img/wn/' + data.current.weather[0].icon + '@2x.png" />';
                temp.textContent = 'Temperature: ' + data.current.temp + '°F';
                wind.textContent = 'Wind: ' + data.current.wind_speed + ' MPH';
                humidity.textContent = 'Humidity: ' + data.current.humidity + '%';
                uv.textContent = 'UV Index: ' + data.current.uvi;


                // creates a div box that holds city info 
                box.appendChild(cityName);
                box.appendChild(temp);
                box.appendChild(wind);
                box.appendChild(humidity);
                box.appendChild(uv);
                outputEl.appendChild(box);

                var futaForecast = document.createElement('div');
                futaForecast.className = 'd-flex row col justify-content-between mx-auto';

                var futaForecasthead = document.createElement('h3');
                futaForecasthead.textContent = "5-Day Forecast";
                futaForecasthead.className = 'd-flex justify-content-center';

                outputEl.appendChild(futaForecasthead);

                for(p = 1; p < 6; p++) {
                    var indivFutaForecast = document.createElement('div');
                    indivFutaForecast.setAttribute('date', p);
                    indivFutaForecast.className = 'bg-secondary p-2 rounded-lg';
                    var indivFutaForecastD = document.createElement('h4');
                    var indivFutaForecastWeat = document.createElement('img');
                    indivFutaForecastWeat.className = 'd-flex justify-content-center';
                    var indivFutaForecastTemp = document.createElement('p');
                    var indivFutaForecastWind = document.createElement('p');
                    var indivFutaForecastHumi = document.createElement('p');


                    var unix_timestamp = data.daily[p].dt;
                    var date = new Date(unix_timestamp * 1000);
                    var dated = date.getDate();
                    var datem = date.getMonth() + 1;
                    var datey = date.getFullYear();
                    
                    var formattedTime = datem + '/' + dated + '/' + datey;
                    console.log(formattedTime);
                
                    indivFutaForecastD.textContent = formattedTime;
                    indivFutaForecastWeat.src = 'http://openweathermap.org/img/wn/' + data.daily[p].weather[0].icon + '@2x.png';
                    indivFutaForecastTemp.textContent = 'Temp: ' + data.daily[p].temp.day + '°F';
                    indivFutaForecastWind.textContent = 'Wind: ' + data.daily[p].wind_speed + ' MPH';
                    indivFutaForecastHumi.textContent = 'Humidity: ' + data.daily[p].humidity + '%';

                    indivFutaForecast.appendChild(indivFutaForecastD);
                    indivFutaForecast.appendChild(indivFutaForecastWeat);
                    indivFutaForecast.appendChild(indivFutaForecastTemp);
                    indivFutaForecast.appendChild(indivFutaForecastWind);
                    indivFutaForecast.appendChild(indivFutaForecastHumi);
                    futaForecast.appendChild(indivFutaForecast);
                }
                    outputEl.appendChild(futaForecast);
        })
    })
}

// logs past searches
var pastSearches = function() {
    while (pastSearchEl.hasChildNodes()) {
        pastSearchEl.removeChild(pastSearchEl.firstChild);
    }

    var numero = localStorage.getItem("i", JSON.stringify(i));
    console.log(numero);

    for (i = 0; i < numero; i++) {
    var text2 = localStorage.getItem("past-search-" + i, JSON.stringify(citySearchEl));
    var text = text2.replaceAll('"', '');


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
    var citi = searchEl.innerText;

    var citiSearch = citi.replace(" ", '%20');
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + citiSearch + '&units=imperial&APPID=ce51c2ca519b1ea5d5c532a5addc38fe';

    fetch(requestUrl)
      .then(function(response) {
        return response.json();
    })
      .then(function(data) {
        // Checks if something is already in the output zone
        while (outputEl.firstChild) {
            outputEl.removeChild(outputEl.firstChild);
        }

        var lati = data.coord.lat;
        var long = data.coord.lon;
        var requestUrl2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lati +'&lon=' + long + '&units=imperial&APPID=ce51c2ca519b1ea5d5c532a5addc38fe';

        fetch(requestUrl2)
            .then(function(response) {
                return response.json();
        })
            .then(function(data) {
                console.log(data);

                var unix_timestamp = data.daily[0].dt;
                var date = new Date(unix_timestamp * 1000);
                var dated = date.getDate();
                var datem = date.getMonth() + 1;
                var datey = date.getFullYear();
                
                var formattedTime = datem + '/' + dated + '/' + datey;

                var box = document.createElement('div');
                box.className = 'p-2 m-3 bg-secondary rounded-lg h-50';
                var cityName = document.createElement('div');
                cityName.className = 'd-flex row m-2 p-2 align-items-center';
                var temp = document.createElement('p');
                temp.className = 'm-4';
                var wind = document.createElement('p');
                wind.className = 'm-4';
                var humidity = document.createElement('p');
                humidity.className = 'm-4';
                var uv = document.createElement('p');
                uv.className = 'm-4';

                cityName.innerHTML = '<h2>' + searchEl.innerText + ' (' + formattedTime + ')</h2> <img src = "http://openweathermap.org/img/wn/' + data.current.weather[0].icon + '@2x.png" />';
                temp.textContent = 'Temperature: ' + data.current.temp + '°F';
                wind.textContent = 'Wind: ' + data.current.wind_speed + ' MPH';
                humidity.textContent = 'Humidity: ' + data.current.humidity + '%';
                uv.textContent = 'UV Index: ' + data.current.uvi;


                // creates a div box that holds city info 
                box.appendChild(cityName);
                box.appendChild(temp);
                box.appendChild(wind);
                box.appendChild(humidity);
                box.appendChild(uv);
                outputEl.appendChild(box);

                var futaForecast = document.createElement('div');
                futaForecast.className = 'd-flex row col justify-content-between mx-auto';

                var futaForecasthead = document.createElement('h3');
                futaForecasthead.textContent = "5-Day Forecast";
                futaForecasthead.className = 'd-flex justify-content-center';

                outputEl.appendChild(futaForecasthead);

                for(p = 1; p < 6; p++) {
                    var indivFutaForecast = document.createElement('div');
                    indivFutaForecast.setAttribute('date', p);
                    indivFutaForecast.className = 'bg-secondary p-2 rounded-lg';
                    var indivFutaForecastD = document.createElement('h4');
                    var indivFutaForecastWeat = document.createElement('img');
                    indivFutaForecastWeat.className = 'd-flex justify-content-center';
                    var indivFutaForecastTemp = document.createElement('p');
                    var indivFutaForecastWind = document.createElement('p');
                    var indivFutaForecastHumi = document.createElement('p');


                    var unix_timestamp = data.daily[p].dt;
                    var date = new Date(unix_timestamp * 1000);
                    var dated = date.getDate();
                    var datem = date.getMonth() + 1;
                    var datey = date.getFullYear();
                    
                    var formattedTime = datem + '/' + dated + '/' + datey;
                    console.log(formattedTime);
                
                    indivFutaForecastD.textContent = formattedTime;
                    indivFutaForecastWeat.src = 'http://openweathermap.org/img/wn/' + data.daily[p].weather[0].icon + '@2x.png';
                    indivFutaForecastTemp.textContent = 'Temp: ' + data.daily[p].temp.day + '°F';
                    indivFutaForecastWind.textContent = 'Wind: ' + data.daily[p].wind_speed + ' MPH';
                    indivFutaForecastHumi.textContent = 'Humidity: ' + data.daily[p].humidity + '%';

                    indivFutaForecast.appendChild(indivFutaForecastD);
                    indivFutaForecast.appendChild(indivFutaForecastWeat);
                    indivFutaForecast.appendChild(indivFutaForecastTemp);
                    indivFutaForecast.appendChild(indivFutaForecastWind);
                    indivFutaForecast.appendChild(indivFutaForecastHumi);
                    futaForecast.appendChild(indivFutaForecast);
                }
                    outputEl.appendChild(futaForecast);
        })
    })

}

var resetSearch = function() {
    localStorage.clear();

    while (pastSearchEl.hasChildNodes()) {
        pastSearchEl.removeChild(pastSearchEl.firstChild);
    }
}

// Adds eventListener for searchButton to log input value
searchButtonEl.addEventListener('click', search4City);
resetButtonEl.addEventListener('click', resetSearch);

pastSearches();