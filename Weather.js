
var lat = 0;
var lng = 0;
var alt = 0;
var localWind = 0;
var localTemperature = 0;
var localLocation = 0;
var localWindDeg = 0;
var localCondition = 0;
var localAltitude = 0;
var localWindDir = null;
var compassdir = null;

function getLocation() {
// Check if geolocation is supported by the browser
if ("geolocation" in navigator) {
  // Prompt user for permission to access their location
  navigator.geolocation.getCurrentPosition(
    // Success callback function
    (position) => {
      // Get the user's latitude and longitude coordinates
      lat = position.coords.latitude;
      lng = position.coords.longitude;
      alt = position.coords.altitude;

      // Do something with the location data, e.g. display on a map
      console.log(`Latitude: ${lat}, longitude: ${lng}, altitude: ${alt}`);
      getWeatherData(lat, lng);

    },
    // Error callback function
    (error) => {
      // Handle errors, e.g. user denied location sharing permissions
      console.error("Error getting user location:", error);
    }
  );
} else {
  // Geolocation is not supported by the browser
  console.error("Geolocation is not supported by this browser.");
}
};
//Weather API Call
function getWeatherData(lat, lng) {
  const apiKey = "1d981ac77e475a90a53fe8bab9bc0c8c";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&appid=${apiKey}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const weatherData = {
        temperature: data.main.temp,
        wind: data.wind.speed,
        windDeg: data.wind.deg,
        condition: data.weather[0].main,
        location: data.name,
      };
      // return weatherData;
      console.log(lat);
      console.log(lng);
      console.log(weatherData);

      localWind = weatherData.wind;
      localLocation = weatherData.location;
      localTemperature = weatherData.temperature;
      localWindDeg = weatherData.windDeg;
      localCondition = weatherData.condition;


      console.log(localWind);
      console.log(localLocation);
      console.log(localTemperature);
      console.log(localWindDeg);
      console.log(localCondition);

      //local storage saveConditions
      // window.localStorage.setItem("GPStemperatureKey", temperature);
      // window.localStorage.setItem("GPSlocationKey", location);
      // window.localStorage.setItem("GPSwindKey", wind);

      //update UI
      updateUI(weatherData);
      saveConditions();
    });
};
function updateUI(weatherData) {
  // localWind = window.localStorage.getItem("GPSwindKey");
  // localLocation = window.localStorage.getItem("GPSlocationKey");
  // localTemp = window.localStorage.getItem("GPStemperatureKey");
  document.getElementById("LocationBubble").innerText = localLocation;
  document.getElementById("TempBubble").innerText = localTemperature + " *F";

  if(localWindDeg <= 30 || localWindDeg >= 330.01) {
    localWindDir = "N";
  }else if(localWindDeg <= 60 && localWindDeg >= 30.01) {
    localWindDir = "NE";
  }else if(localWindDeg <= 120 && localWindDeg >= 60.01) {
    localWindDir = "E";
  }else if(localWindDeg <= 150 && localWindDeg >= 120.01) {
    localWindDir = "SE";
  }else if(localWindDeg <= 210 && localWindDeg >= 150.01) {
    localWindDir = "S";
  }else if(localWindDeg <= 240 && localWindDeg >= 210.01) {
    localWindDir = "SW";
  }else if(localWindDeg <= 300 && localWindDeg >= 240.01) {
    localWindDir = "W";
  }else if(localWindDeg <= 330 && localWindDeg >= 300.01) {
    localWindDir = "NW";
  };

document.getElementById("WindBubble").innerText = localWindDir +" " + localWind.toFixed(1) + " MPH";

  //   document.getElementById("getWind").innerText = localWind;
  // document.getElementById("getLoc").innerText = localLocation;
  // document.getElementById("getTemp").innerText = localTemperature;
}
