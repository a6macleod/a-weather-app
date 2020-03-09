// api-key: 1b1a6dceff48a9792acfdc16ccc5da0e
// openweathermap.org
const searchCityForm = document.querySelector('.search_city_form');
const searchCityField = document.querySelector('#search_city_field');

const displayCity = document.querySelector('.city');
const displaySky = document.querySelector('.sky');
const displayCurrentTemp = document.querySelector('.current_temp');
const displayTempMax = document.querySelector('.temp_max');
const displayTempMin = document.querySelector('.temp_min');

let cityName = 'CHICAGO';
const fahrenheit = 'units=imperial';
const celcius = 'units=metric';
let units = fahrenheit;
let cityData;

const symbols = '!@#$%^&*(){}/?,<>`~|[]';

function validationError(errorType) {
  console.log(`error: ${errorType}`);
  // code for code for adding an error for submitting a request with a symbol
}

function removeError() {
  // code to remove the error
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

function loadCityData(data) {
  cityData = {
    city: data.name,
    currentTemp: data.main.temp,
    maxTemp: data.main.temp_max,
    minTemp: data.main.temp_min,
    sky: data.weather[0].main,
  };
  display();
  console.log(cityData);
}

async function getWeatherData() {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&${units}&appid=1b1a6dceff48a9792acfdc16ccc5da0e`,
      { mode: 'cors' });
    const weatherData = await response.json();
    loadCityData(weatherData);
  }
  catch(error) {
    validationError('server');
    console.log(error);
    // catch error
  }
}

function display() {
  let displayUnits;

  if (units === fahrenheit) {
    displayUnits = '℉';
  } else {
    displayUnits = '℃';
  }

  displayCity.innerHTML = cityData.city;
  displaySky.innerHTML = cityData.sky;
  displayCurrentTemp.innerHTML = `${cityData.currentTemp} ${displayUnits}`;
  displayTempMax.innerHTML = `${cityData.maxTemp} ${displayUnits}`;
  displayTempMin.innerHTML = `${cityData.minTemp} ${displayUnits}`;
}

function findCity(validatedCity) {
  cityName = validatedCity;
  getWeatherData();
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

getWeatherData();

searchCityForm.addEventListener('submit', validateFormData);
