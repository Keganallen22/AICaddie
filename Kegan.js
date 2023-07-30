var yardage = 200;
var temperature = 0;
var altitude = 0;
var wind = 0;
var club = "Driver";
var baselineYardage = 200;
var baselinetemperature = 70;
var baselineAltitude = 800;
var windDirection = "headwind"
var finalDistance = 0;
var final = 0;
let clubDistanceRecord = [];
var windDirCalc = null;
var suggestedDistance = 0;

// function onLoad() {
//   if(window.localStorage.getItem("temperatureKey") === null || window.localStorage.getItem("altitudeKey") === null || window.localStorage.getItem("windKey") === null) {
//     document.getElementById("conditionInfo").innerText = "Please input the playing conditions to start!";
//   }else {
//     loadTable();
//     document.getElementById("conditionInfo").innerText = `Temperature is ${temperature} degrees, altitude is ${altitude}, and wind is blowing ${wind} mph`;
// };
// }

function saveConditions() {
  temperature = localTemperature;

  if(alt === null) {
    altitude = 800;
    // document.getElementById("altitudeReading").innerText = altitude;
  }else {
    altitude = alt * 3.28084;
    // document.getElementById("altitudeReading").innerText = altitude;
  }

  wind = localWind;
  window.localStorage.setItem("temperatureKey", temperature);
  window.localStorage.setItem("altitudeKey", altitude);
  window.localStorage.setItem("windKey", wind);
  loadTable();
  // document.getElementById("conditionInfo").innerText = `Temperature is ${temperature} degrees, altitude is ${altitude}, and wind is blowing ${wind} mph`;
}



function loadTable() {
let clubSuggestions = [{clubName: "SW", clubYardage: "100"},{clubName: "SW3/4", clubYardage: "80"},{clubName: "fifty", clubYardage: "125"},{clubName: "fifty3/4", clubYardage: "110"},{clubName: "PW", clubYardage: "140"},{clubName: "9iron", clubYardage: "150"},
{clubName: "8iron", clubYardage: "160"},{clubName: "7iron", clubYardage: "170"},{clubName: "6iron", clubYardage: "180"},{clubName: "5iron", clubYardage: "190"},
{clubName: "4iron", clubYardage: "200"},{clubName: "2iron", clubYardage: "230"},{clubName: "3wood", clubYardage: "270"},{clubName: "driver", clubYardage: "300"}];
//get or set local storage
if(window.localStorage.getItem("temperatureKey") === null  || window.localStorage.getItem("altitudeKey") === null || window.localStorage.getItem("windKey") === null) {
  console.log("error with localStorage")
  alert("Why did you not allow us to access your location???")
}else {
  temperature = window.localStorage.getItem("temperatureKey");
  altitude = window.localStorage.getItem("altitudeKey");
  wind = window.localStorage.getItem("windKey");
}

windDirection = 0;

clubSuggestions.forEach(clubSuggestions => {
  // calculateClub(clubSuggestions['clubName']);
  yardage = clubSuggestions.clubYardage;
  finalDistance = calculateDistance(yardage, temperature, altitude, wind, baselineYardage, baselinetemperature, baselineAltitude);
  final = finalDistance.toFixed(2);
  document.getElementById(clubSuggestions.clubName).innerText = `${final} y`;
  //add array to values

});
};

// function calculateClub(element) {
//   yardage = element;
//   temperature = parseInt(document.getElementById("temperature").value);
//   altitude = parseInt(document.getElementById("altitude").value);
//   wind = parseInt(document.getElementById("wind").value);
//   windDirection = 0;
//
//   var finalDistance = calculateDistance(yardage, temperature, altitude, wind, baselineYardage, baselinetemperature, baselineAltitude);
//   // var suggestedDistance = (yardage - (finalDistance - yardage));
//   // let suggestedFinal = suggestedDistance.toFixed(2);
//   var final = finalDistance.toFixed(2);
//   document.getElementById(element).innerText = `${final} yards`;
//   }




function showDistance() {
  let clubSuggestionsWind = [{clubName: "SWWind", clubYardage: "100"},{clubName: "SW3/4Wind", clubYardage: "80"},{clubName: "fiftyWind", clubYardage: "125"},{clubName: "fifty3/4Wind", clubYardage: "110"},{clubName: "PWWind", clubYardage: "140"},{clubName: "9ironWind", clubYardage: "150"},
  {clubName: "8ironWind", clubYardage: "160"},{clubName: "7ironWind", clubYardage: "170"},{clubName: "6ironWind", clubYardage: "180"},{clubName: "5ironWind", clubYardage: "190"},
  {clubName: "4ironWind", clubYardage: "200"},{clubName: "2ironWind", clubYardage: "230"},{clubName: "3woodWind", clubYardage: "270"},{clubName: "driverWind", clubYardage: "300"}];
// yardage = parseInt(document.getElementById("yardage").value);
// if (isNaN(yardage)) {
//   document.getElementById("output").innerHTML = 'Please input the distance of your shot!!'
// }else {
if ((windCompass <= 60 && windCompass >= -60) || windCompass >= 300) {
  windDirCalc = "headwind";
}else if ((windCompass >= 120 && windCompass <= 240) || windCompass <= -120) {
  windDirCalc = "tailwind";
}else {
  windDirCalc = "sidewind";
}
clubSuggestionsWind.forEach(clubSuggestionsWind => {
  yardage = clubSuggestionsWind.clubYardage;
finalDistance = calculateDistance(yardage, temperature, altitude, wind, baselineYardage, baselinetemperature, baselineAltitude);
// suggestedDistance = (yardage - (finalDistance - yardage));
// let suggestedFinal = suggestedDistance.toFixed(2);
let finalWind = finalDistance.toFixed(2);
// console.log(final +" yards"); // this will output the adjusted distance based on the inputs provided
// document.getElementById("output").innerHTML = `A shot you would typically hit ${yardage}, the ball will travel ${final} yards.
// <br> If you are playing to ${yardage} yards, I would suggest hitting a club that goes ${suggestedFinal} yards`;
document.getElementById(clubSuggestionsWind.clubName).innerText = `${finalWind} y`;
});
}

function calculateDistance(yardage, temperature, altitude, wind, baselineYardage, baselinetemperature, baselineAltitude) {
  var altitudeAdjustment = ((altitude - baselineAltitude)/984.252)*.01;
  var adjustedYardage = yardage * (1 + altitudeAdjustment);

  // adjust for temperature
  var tempAdjustment = ((temperature - baselinetemperature) / 10)*.01;
  var finalYardage = adjustedYardage * (1 + tempAdjustment);

  // adjust for wind
  if (windDirCalc == "headwind" && wind != 0) {
    var headwindAdjustment = wind * 0.01;
    return (finalYardage -((finalYardage * (1 + headwindAdjustment))-finalYardage));
  } else if (windDirCalc == "tailwind" && wind != 0) {
    var tailwindAdjustment = wind * 0.005;
    return (finalYardage * (1 + tailwindAdjustment));
  } else if (windDirCalc = "tail") {
    return finalYardage;
  }

}

function tableHidden() {
    let element = document.getElementById("56*3/4");
    let hidden = element.getAttribute("hidden");

    if (hidden) {
       element.removeAttribute("hidden");

    } else {
       element.setAttribute("hidden", "hidden");

    }
  };
  function tableHidden2() {
      let element = document.getElementById("50*3/4");
      let hidden = element.getAttribute("hidden");

      if (hidden) {
         element.removeAttribute("hidden");

      } else {
         element.setAttribute("hidden", "hidden");

      }
    };
