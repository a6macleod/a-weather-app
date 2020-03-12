// api-key: 1b1a6dceff48a9792acfdc16ccc5da0e
// openweathermap.org
const searchCityForm = document.querySelector('.search_city_form');
const searchCityField = document.querySelector('#search_city_field');

const displayCity = document.querySelector('.city');
const displayWeatherDescription = document.querySelector('.sky');
const displayCurrentTemp = document.querySelector('.current_temp');
const displayTempMax = document.querySelector('.temp_max');
const displayTempMin = document.querySelector('.temp_min');
const displayIcon = document.querySelector('.weather_icon_display'); // weather icon

const changeUnitsButton = document.querySelector('.change_units');

let cityName = 'CHICAGO';
const fahrenheit = 'units=imperial';
const celcius = 'units=metric';
let units = fahrenheit;
let cityData;

const symbols = '!@#$%^&*(){}/?,<>`~|[]';

function clearDisplay() {
  displayCity.innerHTML = '';
  displayWeatherDescription.innerHTML = '';
  displayCurrentTemp.innerHTML = '';
  displayTempMax.innerHTML = '';
  displayTempMin.innerHTML = '';
  while (displayIcon.firstChild) {
    displayIcon.removeChild(displayIcon.firstChild);
  } // Weather Icon - check if working
}

function removeError() {
  const errorMessage = document.querySelector('.error_message');
  // check if errormessage is there and if so remove it
  if (errorMessage) {
    errorMessage.remove(errorMessage);
  }
}

function validationError(errorType) {
  cityData = {};
  let errorSource;
  clearDisplay();

  if (errorType === 'blank') {
    errorSource = 'a blank submission';
  } else if (errorType === 'symbol') {
    errorSource = 'a strange symbol in your city name';
  } else {
    errorSource = 'an error getting the info';
  }

  const mainDiv = document.querySelector('.display');

  // check if there is an error message already and remove it
  const errorMessage = document.querySelector('.error_message');
  if (errorMessage) {
    removeError();
  }

  const header = document.createElement('h1');
  header.classList.add('error_message');
  header.innerHTML = `Whoops something went wrong because of ${errorSource}. Try entering another city`;
  mainDiv.prepend(header);
}

function loadIcon() {
  const image = document.createElement('img');
  image.classList.add('icon');
  image.setAttribute('src', `http://openweathermap.org/img/wn/${cityData.weatherIcon}@2x.png`);
  displayIcon.appendChild(image);
}

function displayData() {
  let displayUnits;
  if (units === fahrenheit) {
    displayUnits = '℉';
  } else {
    displayUnits = '℃';
  }

  displayCity.innerHTML = cityData.city;
  displayWeatherDescription.innerHTML = cityData.weatherDescription;
  displayCurrentTemp.innerHTML = `${cityData.currentTemp} ${displayUnits}`;
  displayTempMax.innerHTML = `${cityData.maxTemp}`;
  displayTempMin.innerHTML = `${cityData.minTemp} ${displayUnits}`;
  loadIcon();
}

function loadCityData(data) {
  clearDisplay();
  searchCityField.value = '';
  console.log(data);
  cityData = {
    city: data.name,
    currentTemp: data.main.temp,
    maxTemp: data.main.temp_max,
    minTemp: data.main.temp_min,
    weatherMain: data.weather[0].main,
    weatherDescription: data.weather[0].description,
    weatherIcon: data.weather[0].icon,
  };
  displayData();
}

async function getWeatherData() {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&${units}&appid=1b1a6dceff48a9792acfdc16ccc5da0e`,
      { mode: 'cors' });
    const weatherData = await response.json();
    loadCityData(weatherData);
  } catch(error) {
    validationError(error);
    console.log(error);
  }
}

function findCity(validatedCity) {
  cityName = validatedCity;
  getWeatherData();
}

function validateSymbols(cityEntered) {
  let status;
  for (let i = 0; i < symbols.length; i++) {
    if (cityEntered.includes(symbols[i])) {
      status = true;
    }
  }
  return status;
}

function validateFormData(e) {
  e.preventDefault();
  removeError();
  const cityEntered = searchCityField.value.trim().toUpperCase().toString();
  if (cityEntered === '') {
    validationError('blank');
  } else if (validateSymbols(cityEntered)) {
    validationError('symbol');
  } else {
    findCity(cityEntered);
  }
}

function changeUnits() {
  if (units === fahrenheit) {
    units = celcius;
  } else {
    units = fahrenheit;
  }
  getWeatherData();
}

searchCityForm.addEventListener('submit', validateFormData);
changeUnitsButton.addEventListener('click', changeUnits);

getWeatherData();
