//gets elements of the html
const cityEl = document.getElementById('city-search');
const searchEl = document.getElementById('search-button');
const resetEl = document.getElementById('reset-button');
const outputEl = document.getElementById('output-zone');
const pastEl = document.getElementById('past-searches');
const searchZoneEl = document.getElementById('search-zone');
const mainEl = document.getElementById('main-zone');

//retrieves past searches
var iNum = localStorage.getItem('iNum', JSON.stringify(iNum));

// checks if values have already been set
if (iNum > 0) {
    console.log(iNum);
}
else {
    iNum = 0;
}

//clear past searches
const clearSearch = () => {
    while (pastEl.hasChildNodes()) {
        pastEl.removeChild(pastEl.firstChild);
    }

    iNum = 0;
}

//fxn logging value of input
const citySearch = () => {
    console.log(cityEl.value)
    if (cityEl.value.length > 0) {
        //logs to localStorage
        localStorage.setItem(`past-search-${iNum}`, JSON.stringify(cityEl.value));

        //logs the value of the searchEl to use in the fetchWeather
        var input = cityEl.value;

        iNum++;
        localStorage.setItem('iNum', JSON.stringify(iNum));

        //runs fetchWeather()
        fetchWeather(input);
    }
    else {
        window.alert('Please input a city!');
    }

    pastSearch();
}

//fxn fetches data from API
const fetchWeather = (input) => {
    const reqUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=imperial&APPID=ce51c2ca519b1ea5d5c532a5addc38fe`

    fetch(reqUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            //clears output
            while (outputEl.firstChild) {
                outputEl.removeChild(outputEl.firstChild);
            }
            
            //logs lat and lon for the next call
            const lat = data.coord.lat;
            const lon = data.coord.lon;
            const reqUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&APPID=ce51c2ca519b1ea5d5c532a5addc38fe`

            fetch(reqUrl2)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    //creates the elements holding city info
                    const box = document.createElement('div');
                    box.className = 'p-2 m-3 bg-secondary rounded-lg h-50';
                    
                    const cityName = document.createElement('div');
                    cityName.className = 'd-flex row m-2 p-2 align-items-center';
                    cityName.innerHTML = `<h2>${input} (${time(data, 0)})</h2> <img src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png" />`;
                    
                    const temp = document.createElement('p');
                    temp.className = 'm-4';
                    temp.textContent = `Temperature: ${data.current.temp} °F`;

                    const wind = document.createElement('p');
                    wind.className = 'm-4';
                    wind.textContent = `Wind: ${data.current.wind_speed} MPH`;

                    const humid = document.createElement('p');
                    humid.className = 'm-4';
                    humid.textContent = `Humidity: ${data.current.humidity} %`;

                    const uv = document.createElement('div');
                    switch (Math.round(data.current.uvi)) {
                        case 0:
                        case 1:
                        case 2:
                            var uviColor = '#51ed40';
                        case 3:
                        case 4:
                        case 5:
                            var uviColor = '#ffd966';
                        case 6:
                        case 7:
                            var uviColor = '#f5882f';
                        case 8:
                        case 9:
                        case 10:
                            var uviColor = '#d22222';
                        default:
                            var uviColor = '#6c4dbd';
                    }
                    uv.className = 'd-flex m-4 row align-items-centered';
                    uv.innerHTML = `<p class="mr-2 mt-3">UV Index: </p><div class="rounded-lg p-2 m-2" style='background-color: ${uviColor}' id="uv-index">${data.current.uvi}</div>`;

                    // creates a div box that holds city info 
                    box.appendChild(cityName);
                    box.appendChild(temp);
                    box.appendChild(wind);
                    box.appendChild(humid);
                    box.appendChild(uv);
                    outputEl.appendChild(box);

                    const forecastTitle = document.createElement('h3');
                    forecastTitle.textContent = '5-Day Forecast';
                    forecastTitle.className = 'd-flex justify-content-center';

                    outputEl.appendChild(forecastTitle);

                    const forecast = document.createElement('div');
                    forecast.className = 'd-flex row row align-items-center justify-content-between mx-auto';

                    for (p=1; p<6; p++) {
                        const iForecast = document.createElement('div');
                        iForecast.setAttribute('date', p);
                        iForecast.className = 'bg-secondary p-2 rounded-lg col';

                        const iForeDate = document.createElement('h4');
                        iForeDate.textContent = time(data, p);

                        const iForeWeather = document.createElement('img');
                        iForeWeather.src = `http://openweathermap.org/img/wn/${data.daily[p].weather[0].icon}@2x.png`;
                        iForeWeather.className = 'd-flex justify-content-center';

                        const iForeTemp = document.createElement('p');
                        iForeTemp.textContent = `Temp: ${data.daily[p].temp.day}°F`;

                        const iForeWind = document.createElement('p');
                        iForeWind.textContent = `Wind: ${data.daily[p].wind_speed} MPH`;

                        const iForeHumid = document.createElement('p');
                        iForeHumid.textContent = `Humidity: ${data.daily[p].humidity} %`;

                        iForecast.appendChild(iForeDate);
                        iForecast.appendChild(iForeWeather);
                        iForecast.appendChild(iForeTemp);
                        iForecast.appendChild(iForeWind);
                        iForecast.appendChild(iForeHumid);
                        forecast.appendChild(iForecast);
                    }
                    outputEl.appendChild(forecast);
                })

        })
}

const pastSearch = () => {
    while (pastEl.hasChildNodes()) {
        pastEl.removeChild(pastEl.firstChild);
    }

    var number = localStorage.getItem('iNum');
    console.log(number)

    for (f=0; f<number; f++) {
        //pulls the name of the past-search and removes the quotation marks
        var text2 = localStorage.getItem(`past-search-${f}`);
        console.log(text2)
        var text = text2.replaceAll('"', '');
    
        //creates past search element in the sidebar
        var searchEl = document.createElement('button');
        searchEl.textContent = text;
        searchEl.className = "d-flex col justify-content-center bg-dark mb-3 my-3 rounded";
        searchEl.id = "past-search-entry";
        searchEl.setAttribute("onclick", 'pastCity(this)'); //attaches a FXN to each button
    
        pastEl.appendChild(searchEl);
    }
}

const pastCity = (elem) => {
    var pastCityName = elem.innerText;

    fetchWeather(pastCityName);
}

const resetSearch = () => {
    localStorage.clear();

    clearSearch();
}

//fxn time
const time = (data, time) => {
    //pulls date and time
    var date = new Date(data.daily[time].dt * 1000);
    const day = date.getDate();
    const mon = date.getMonth() + 1;
    const year = date.getFullYear();
    const formatTime = `${mon} / ${day} / ${year}`;

    return formatTime;
}

const size = window.matchMedia('(max-width: 800px)');

const react = (size) => {
    if (size.matches) {
        outputEl.className = 'col bg-dark align-self-stretch p-5';
        searchZoneEl.className = 'col';
        mainEl.className = "d-flex flex-column";
    }
    else {
        outputEl.className = 'col-8 bg-dark align-self-stretch p-5';
        searchZoneEl.className = 'col-3';
        mainEl.className = "d-flex flex-row";
    }
}

pastSearch();
react(size);

size.addEventListener('change', react);
searchEl.addEventListener('click', citySearch);
resetEl.addEventListener('click', resetSearch);

