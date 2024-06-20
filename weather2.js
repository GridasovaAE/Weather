document.getElementById('getWeatherBtn').addEventListener('click', function () {
    var city = document.getElementById('cityInput').value;
    if (city) {
        getWeather(city);
    } else {
        alert('Bitte gib eine Stadt ein.');
    }
});
function getWeather(city) {
    var apiKey = '0aa084f157fd8b5483fd317062cd3028';
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.cod === 200) {
                document.getElementById('cityName').textContent = data.name;
                document.getElementById('temperature').textContent = `Temperature: ${data.main.temp.toFixed(0)}°C`;
                document.getElementById('weatherDescription').textContent = data.weather[0].description;
                var iconCode = data.weather[0].icon;
                var iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                var weatherIcon = document.getElementById('weatherIcon');
                weatherIcon.src = iconUrl;
                weatherIcon.style.display = 'block';

                addInfo(data);

                wind(data);
            } else {
                alert('Stadt nicht gefunden: ' + data.message);
            }
        })
        .catch(error => console.error('Fehler:', error));
}



function wind(weatherData) {
    let windDegree =  weatherData.wind.deg;
    let windDirection = " ";
    if (windDegree === 0) {
        windDirection = "Wind direction: N";
    } else if (windDegree === 90) {
        windDirection = "Wind direction: E";
    } else if (windDegree === 180) {
        windDirection = "Wind direction: S";
    } else if (windDegree === 270) {
        windDirection = "Wind direction: W";
    } else if (windDegree > 0 && windDegree < 90) {
        windDirection = "Wind direction: N-E";
    } else if (windDegree > 90 && windDegree < 180) {
        windDirection = "Wind direction: S-E";
    } else if (windDegree > 180 && windDegree < 270) {
        windDirection = "Wind direction: S-W";
    } else {
        windDirection = "Wind direction: N-W";
    }

    const li = document.getElementById("windDir");
    li.innerHTML = windDirection;
    let windSpeed = weatherData.wind.speed;
    const li1 = document.getElementById("windSpeed");
    li1.innerHTML = "Wind speed: " + windSpeed + " m/s";
}

function addInfo(weatherData) {

    let addInfo1 = weatherData.main.pressure;
    let addInfo2 = weatherData.main.humidity;
    let addInfo3 = weatherData.sys.sunrise;
    let addInfo4 = weatherData.sys.sunset;
    let addInfo5 = weatherData.visibility;
    let timeZone = weatherData.timezone;

    let calcSunrise = new Date((addInfo3 + timeZone) * 1000);
    let calcSunset = new Date((addInfo4 + timeZone) * 1000);

    const sunriseHours = String(calcSunrise.getHours()).padStart(2, '0');
    const sunriseMinutes = String(calcSunrise.getMinutes()).padStart(2, '0');
    const sunsetHours = String(calcSunset.getHours()).padStart(2, '0');
    const sunsetMinutes = String(calcSunset.getMinutes()).padStart(2, '0');;


    const li3 = document.getElementById("Additional-information1");
    const li4 = document.getElementById("Additional-information2");
    const li5 = document.getElementById("Additional-information3");
    const li6 = document.getElementById("Additional-information4");
    const li7 = document.getElementById("Additional-information5");

    li3.innerHTML = "Pressure: " + addInfo1 + " gPa";
    li4.innerHTML = "Humidity: " + addInfo2 + " %";
    li5.innerHTML = "Sunrise: " + sunriseHours + " : " + sunriseMinutes;
    li6.innerHTML = "Sunset: " + sunsetHours + " : " + sunsetMinutes;
    li7.innerHTML = "Visibility: " + addInfo5 + " m";

    
}