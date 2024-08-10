const locationResultData = document.getElementById("show-error");
const fetchLocationButton = document.querySelector("button");
const showLocation = document.querySelector(".display-location");
const showLoader = document.querySelector(".loader");

showLocation.style.display = "none";

fetchLocationButton.addEventListener("click", () => {
  showLoader.innerHTML = "Loading....";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showErrorMessage);
  } else {
    showLocation.style.display = "block";
    locationResultData.innerHTML =
      "<h2>Geo Location is not supported by the browser.</h2>";
  }
});

function showPosition(positon) {
  const latitude = positon.coords.latitude;
  const longitude = positon.coords.longitude;
  getAddress(latitude, longitude);
}

function getAddress(latitude, longitude) {
  locationResultData.style.display = "none";
  const API_URL = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      showLocation.style.display = "block";

      const divElement = document.createElement("div");
      divElement.classList.add("display-data");

      const headerOne = document.createElement("h3");
      headerOne.innerHTML = `Place ID:- ${data.place_id}`;

      const headerTwo = document.createElement("h3");
      headerTwo.innerHTML = `Address Type:- ${data.addresstype}`;

      const headerThree = document.createElement("h3");
      headerThree.innerHTML = `Category:- ${data.category}`;

      const headerFour = document.createElement("h3");
      headerFour.innerHTML = `Latitude:- ${data.lat}`;

      const headerFive = document.createElement("h3");
      headerFive.innerHTML = `Longitude:- ${data.lon}`;

      const headerSix = document.createElement("h3");
      headerSix.innerHTML = `Place Rank:- ${data.place_rank}`;

      const headerSeven = document.createElement("h3");
      headerSeven.innerHTML = `Type:- ${data.type}`;

      const headerEight = document.createElement("h3");
      headerEight.innerHTML = `License:- ${data.licence}`;

      const headerNine = document.createElement("h3");
      headerNine.innerHTML = `Display Name:- ${data.display_name}`;

      const headerTen = document.createElement("h3");
      headerTen.innerHTML = `Name:- ${data.name === ""
        ? "Javascript"
        : data.name}`;
      showLoader.style.display = "none";
      showLocation.appendChild(divElement);
      divElement.appendChild(headerOne);
      divElement.appendChild(headerTwo);
      divElement.appendChild(headerThree);
      divElement.appendChild(headerFour);
      divElement.appendChild(headerFive);
      divElement.appendChild(headerSix);
      divElement.appendChild(headerSeven);
      divElement.appendChild(headerEight);
      divElement.appendChild(headerNine);
      divElement.appendChild(headerTen);
    })
    .catch(error => console.log(error));
}

function showErrorMessage(error) {
  showLocation.style.display = "block";
  switch (error.code) {
    case error.PERMISSION_DENIED:
      locationResultData.innerHTML = `<h4>Permission Denied:-</h4> ${error.message}`;
      break;

    case error.POSITION_UNAVAILABLE:
      locationResultData.innerHTML = `<h4>Position Unavailable:-</h4> ${error.message}`;
      break;

    case error.TIMEOUT:
      locationResultData.innerHTML = `<h4>Request Timeout:-</h4> ${error.message}`;
      break;

    case error.UNKNOWN_ERROR:
      locationResultData.innerHTML = `<h4>Unknown Error:-</h4> ${error.message}`;
      break;

    default:
      locationResultData.innerHTML = `<h4>No error message found.</h4>`;
      break;
  }
}
