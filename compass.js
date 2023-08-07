const compassCircle = document.querySelector(".compass-circle");
    const myPoint = document.querySelector(".my-point");
    const startBtn = document.querySelector(".start-btn");
    const startBtnCont = document.querySelector(".start-btn-cont");
    const stopBtn = document.querySelector(".stop-btn");
    const windArrow = document.querySelector(".windArrow");
    var compassStop = null;
    var windCompass = 0;
    const isIOS =
      navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
      navigator.userAgent.match(/AppleWebKit/);


    function init() {
      startBtn.addEventListener("click", startCompass);
      stopBtn.addEventListener("click", stopCompass);
      startBtnCont.addEventListener("click", startButtonCont);
      navigator.geolocation.getCurrentPosition(locationHandler);

      if (!isIOS) {
        window.addEventListener("deviceorientationabsolute", handler, true);
      }

    }

    function startCompass() {
      startBtn.style.display = "none";
      stopBtn.style.display = "inline";
      if (isIOS) {
        DeviceOrientationEvent.requestPermission()
          .then((response) => {
            if (response === "granted") {
              window.addEventListener("deviceorientation", handler, true);
            } else {
              alert("has to be allowed!");
            }
          })
          .catch(() => alert("not supported"));
      }
    }
    function stopCompass() {
      stopBtn.style.display = "none";
      // startBtn.style.display = "flex";
      showDistance();
      if (!isIOS) {
        window.removeEventListener("deviceorientationabsolute", handler, true);
      }else {
        window.removeEventListener("deviceorientation", handler, true);
      }

      // compassCircle.style.transform = `translate(-50%, -50%) rotate(${-compass}deg)`;
      startBtnCont.style.display = "inline";


    }

    function startButtonCont() {
      startBtnCont.style.display = "none";
      stopBtn.style.display = "inline";
      if (!isIOS) {
        window.addEventListener("deviceorientationabsolute", handler, true);
      }else {
        window.addEventListener("deviceorientation", handler, true);
      }

    }

    function handler(e) {
      compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
      // compass = compass - 180;
      windCompass = localWindDeg - compass;
      compassCircle.style.transform = `translate(-50%, -50%) rotate(${-compass}deg)`;
      windArrow.style.transform = `rotate(${windCompass-180}deg)`;

      // ±15 degree
      if (
        (pointDegree < Math.abs(compass) &&
          pointDegree + 15 > Math.abs(compass)) ||
        pointDegree > Math.abs(compass + 15) ||
        pointDegree < Math.abs(compass)
      ) {
        myPoint.style.opacity = 0;
      } else if (pointDegree) {
        myPoint.style.opacity = 1;
      }

    }

    let pointDegree;

    function locationHandler(position) {
      const { latitude, longitude } = position.coords;
      pointDegree = calcDegreeToPoint(latitude, longitude);

      if (pointDegree < 0) {
        pointDegree = pointDegree + 360;
      }
    }

    function calcDegreeToPoint(latitude, longitude) {
      // Qibla geolocation
      const point = {
        lat: 21.422487,
        lng: 39.826206
      };

      const phiK = (point.lat * Math.PI) / 180.0;
      const lambdaK = (point.lng * Math.PI) / 180.0;
      const phi = (latitude * Math.PI) / 180.0;
      const lambda = (longitude * Math.PI) / 180.0;
      const psi =
        (180.0 / Math.PI) *
        Math.atan2(
          Math.sin(lambdaK - lambda),
          Math.cos(phi) * Math.tan(phiK) -
            Math.sin(phi) * Math.cos(lambdaK - lambda)
        );
      return Math.round(psi);
    }

    init();
