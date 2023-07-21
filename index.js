var yardage = 200;
var temperature = 80;
var altitude = 800;
var wind = 5;
var club = "Driver";
var baselineYardage = 200;
var baselinetemperature = 70;
var baselineAltitude = 800;
var windDirection = "headwind"

function showDistance() {
  // adjust for altitude
yardage = parseInt(document.getElementById("yardage").value);
temperature = parseInt(document.getElementById("temperature").value);
altitude = parseInt(document.getElementById("altitude").value);
wind = parseInt(document.getElementById("wind").value);
club = document.getElementById("club").value;
baselineYardage = parseInt(document.getElementById("baselineYardage").value);
baselinetemperature = parseInt(document.getElementById("baselinetemperature").value);
baselineAltitude = parseInt(document.getElementById("baselineAltitude").value);
windDirection = document.getElementById("windDirection").value;

var finalDistance = calculateDistance(yardage, temperature, altitude, wind, baselineYardage, baselinetemperature, baselineAltitude);
var suggestedDistance = (yardage - (finalDistance - yardage));
let suggestedFinal = suggestedDistance.toFixed(2);
let final = finalDistance.toFixed(2);
// var recClub = suggestedDistance - finalDistance;
// if (recClub > 0) {
//   var clubUp = recClub / 10
// }
console.log(final +" yards"); // this will output the adjusted distance based on the inputs provided
document.getElementById("output").innerHTML = `With a ${club} that you typically hit ${baselineYardage}, the ball will travel ${final} yards.
<br> If you are playing to ${yardage} yards, I would suggest hitting a club that goes ${suggestedFinal} yards`;
}

function calculateDistance(yardage, temperature, altitude, wind, baselineYardage, baselinetemperature, baselineAltitude) {
  var altitudeAdjustment = ((altitude - baselineAltitude)/984.252)*.01;
  var adjustedYardage = yardage * (1 + altitudeAdjustment);

  // adjust for temperature
  var tempAdjustment = ((temperature - baselinetemperature) / 10)*.01;
  var finalYardage = adjustedYardage * (1 + tempAdjustment);

  // adjust for wind
  if (windDirection == "headwind" && wind != 0) {
    var headwindAdjustment = wind * 0.01;
    return (finalYardage -((finalYardage * (1 + headwindAdjustment))-finalYardage));
  } else if (windDirection == "tailwind" && wind != 0) {
    var tailwindAdjustment = wind * 0.005;
    return (finalYardage * (1 + tailwindAdjustment));
  } else {
    return finalYardage;
  }

}
