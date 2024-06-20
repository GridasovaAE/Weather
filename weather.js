document.addEventListener("DOMContentLoaded", function () {
    var coll = document.getElementsByClassName("collapsible");
    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
});

const url = "https://munich-software-studios.de/weather.json";
let weatherData;

async function getWeather() {


    const response = await fetch(
        url
    );
    weatherData = await response.json();
    console.log(weatherData);
}

async function tempCalc() {

    let temperature = weatherData.main.temp - 273.15;
    const li = document.getElementById("temp");
    const li2 = document.getElementById("skyCondition");
    li.innerHTML = temperature + " C";
    li2.innerHTML = weatherData.weather[0].main;

}

function wind() {
    let windDegree = weatherData.wind.deg;
    let windDirection = "";
    if (windDegree === 0) {
        windDirection = "N";
    } else if (windDegree === 90) {
        windDirection = "E";
    } else if (windDegree === 180) {
        windDirection = "S";
    } else if (windDegree === 270) {
        windDirection = "W";
    } else if (windDegree > 0 && windDegree < 90) {
        windDirection = "N-E";
    } else if (windDegree > 90 && windDegree < 180) {
        windDirection = "S-E";
    } else if (windDegree > 180 && windDegree < 270) {
        windDirection = "S-W";
    } else {
        windDirection = "N-W";
    }

    const li = document.getElementById("windDir");
    li.innerHTML = windDirection;
    let windSpeed = weatherData.wind.speed;
    const li1 = document.getElementById("windSpeed");
    li1.innerHTML = windSpeed + " m/s";


}

function city() {

    let cityName = weatherData.name;
    const h2 = document.getElementById("city");
    h2.innerHTML = cityName;
}

function addInfo() {

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

// if (sunsetHours && sunriseHours)

    const li3 = document.getElementById("Additional-information1");
    const li4 = document.getElementById("Additional-information2");
    const li5 = document.getElementById("Additional-information3");
    const li6 = document.getElementById("Additional-information4");
    const li7 = document.getElementById("Additional-information5");

    li3.innerHTML = addInfo1 + " gPa";
    li4.innerHTML = addInfo2 + " %";
    li5.innerHTML = sunriseHours + " : " + sunriseMinutes;
    li6.innerHTML = sunsetHours + " : " + sunsetMinutes;
    li7.innerHTML = addInfo5 + " m";

    
}


async function main() {

    await getWeather();
    tempCalc();
    wind();
    city();
    addInfo();

}

main();
