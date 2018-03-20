/*jslint browser:true */
'use strict';

/* Global Vars */

var xhr = new XMLHttpRequest(); //Api Loader var
var lat, lon; // Vars for longitude and latitude
var tempUnit = " °C"; //define temp type
var currTempC; // Current temperiture in C
var currTempF; // Current temperiture in F
var defaultTemp; // Default temperiture to be set initially

//vars for easier API manipulation
var wCondition = document.getElementById('icon'); //short hand the icon div for easier usage
var bgImg = document.querySelector('body'); //short hand the body element for easier usage




//Load the API
function loadWeather() {

    var weatherPath = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;

    //Get Conditions
    xhr.open('GET', weatherPath, true);
    xhr.responseType = 'text';
    xhr.send();

}


// Runs once API has loaded corectly
xhr.onload = function () {
    if (xhr.status === 200) {
        
        var wAPI = JSON.parse(xhr.responseText); // Var to access API easily

        // Adds API information to the HTML
        document.getElementById('location').innerHTML = wAPI.name;

        currTempC = Math.round(wAPI.main.temp) + "°C"; //Current temp in C to variable
        
        currTempF = Math.round(wAPI.main.temp * 9 / 5 + 32) + "°F"; //Current temp in F to variable
        
        defaultTemp = currTempC;
        
        document.getElementById('temp').innerHTML = defaultTemp;
        
        document.getElementById('desc').innerHTML = wAPI.weather[0].main;

        var condition = wAPI.weather[0].main.toLowerCase(); //short hand the API pull for the weather condition
        
        //var condition = "rain"; //For testing
        
        //Switch statement to change the icon depending on what type of weather it is
        switch (condition) {
            case "rain":
                wCondition.setAttribute('class', 'rain');
                bgImg.setAttribute('class', 'rainBG');
                break;
            case "clouds":
                wCondition.setAttribute('class', 'clouds');
                bgImg.setAttribute('class', 'cloudsBG');
                break;
            case "drizzle":
                wCondition.setAttribute('class', 'drizzle');
                bgImg.setAttribute('class', 'drizzleBG');
                break;
            case "snow":
                wCondition.setAttribute('class', 'snow');
                bgImg.setAttribute('class', 'snowBG');
                break;
            case "thunderstom":
                wCondition.setAttribute('class', 'thunderstom');
                bgImg.setAttribute('class', 'thunderstomBG');
                break;
            case "clear":
                wCondition.setAttribute('class', 'clear');
                bgImg.setAttribute('class', 'clearBG');
                break;
        }




    } // end if
} // end function



// Gets Geolocation
function getLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        loc.innerHTML = "Geolocation is not supported by this browser.";
    }
}
// Set Latitude & Longitude and run API function
function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    loadWeather(); // Get Weather API

}

function switchTemp() {
    if(defaultTemp === currTempC){
        defaultTemp = currTempF;
        document.getElementById('temp').innerHTML = defaultTemp;
        console.log(defaultTemp)
    } else {
        defaultTemp = currTempC;
        document.getElementById('temp').innerHTML = defaultTemp;
        console.log(defaultTemp)
    }
}



getLocation(); // Get Latitude, Longitude