import moment from 'moment';
import { format } from 'date-fns';
import Cookies from 'js-cookie';
import { UI_COMPONENTS } from './view.js';
import {
  addCity, getWeatherNow, changeAllNameCitie, getWeatherDetails, getUrl, addWeatherCards,
  clickFavoriteCity, deleteFavoriteCitie
} from './helper.js';

export {
  REQUEST, showWeatherCards, getNormalTime, favoriteCities, showFavoriteCityInfo
};

const REQUEST = {
  WETHER_URL: 'http://api.openweathermap.org/data/2.5/weather',
  FORECAST_URL: 'http://api.openweathermap.org/data/2.5/forecast',
  API_KEY: '3dfd6d17e1726af829035cc9bd245628',
  DEGREES_CELSIUS: '&units=metric'
};

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

let favoriteCities = new Set();
let indexForFavoriteCities = 0;
let indexForTitleName = 0;

if (localStorage.length) {
  const storageArrayCities = JSON.parse(localStorage.getItem('arrayCities'));
  const mainCityName = Cookies.get('mainCity');
  const url = getUrl(mainCityName);

  addCitesFromStorage(storageArrayCities);
  changeAllTitleName(UI_COMPONENTS.WEATHER.NAMES, mainCityName);
  reloadedPageCityInfo(url);
}

function addCitesFromStorage(array) {
  addCity(array[indexForFavoriteCities]);
  favoriteCities.add(array[indexForFavoriteCities]);
  indexForFavoriteCities += 1;
  if (indexForFavoriteCities < array.length) {
    addCitesFromStorage(array);
  }
}

function changeAllTitleName(arr, mainCity) {
  const array = arr;

  array[indexForTitleName].textContent = mainCity;
  indexForTitleName += 1;

  if (indexForTitleName < array.length) {
    changeAllTitleName(array, mainCity);
  }
}

async function reloadedPageCityInfo(url) {
  const response = await fetch(url);
  const cityInfo = await response.json();

  getWeatherNow(cityInfo);
  getWeatherDetails(cityInfo);
}

UI_COMPONENTS.FORM.addEventListener('submit', event => {
  const value = UI_COMPONENTS.INPUT.value;
  const url = getUrl(value);

  showCityInfo(url, value);

  UI_COMPONENTS.FORM.reset();
  event.preventDefault();
});

async function showCityInfo(url, nameCity) {
  try {
    const response = await fetch(url);
    const city = await response.json();

    if (!(city.cod === 404)) {
      getWeatherNow(city);
      changeAllNameCitie(nameCity);

      Cookies.set('mainCity', `${nameCity}`);
    } else {
      throw new Error('Не правильно ввели название города.');
    }

    getWeatherDetails(city);
    addWeatherCards(nameCity);
  } catch (error) {
    alert(error);
  }
}

UI_COMPONENTS.FAVORITE_CITY_BTN.addEventListener('click', event => {
  const tabBottom = event.currentTarget.closest('.tab-bottom');
  const cityName = tabBottom.querySelector('.tab__name').textContent.toLowerCase();

  favoriteCities.add(cityName);

  UI_COMPONENTS.CITIES.LIST.innerHTML = '';

  favoriteCities.forEach(element => {
    UI_COMPONENTS.CITIES.LIST.innerHTML += `<div class="weather__right-block">
                                                <div class="weather__right-item">${element}</div>
                                                <button class="weather__right-btn"></button>
                                             </div>`;
  });

  localStorage.setItem('arrayCities', JSON.stringify([...favoriteCities]));
});

UI_COMPONENTS.CITIES.LIST.addEventListener('click', event => {
  const content = event.target;
  const isNameCity = content.classList.contains('weather__right-item');
  const isBtnCity = content.classList.contains('weather__right-btn');

  if (isNameCity) {
    clickFavoriteCity(event, content);
    addWeatherCards(content.textContent);
    changeAllNameCitie(content.textContent);
  }

  if (isBtnCity) {
    deleteFavoriteCitie(content);
  }
});

async function showFavoriteCityInfo(url, content) {
  const response = await fetch(url);
  const infoCity = await response.json();

  getWeatherNow(infoCity);
  getWeatherDetails(infoCity);

  UI_COMPONENTS.WEATHER.NAMES.textContent = content.textContent;
}

UI_COMPONENTS.FORECAST.TAB_BTN.addEventListener('click', () => {
  const cityName = UI_COMPONENTS.FORECAST.CITY_NAME.textContent;

  addWeatherCards(cityName);
});

function getNormalTime(secons) {
  const data = new Date(secons * 1000);
  const hours = data.getHours();
  const minutes = data.getMinutes();

  if (hours < 10 && minutes < 10) {
    return `0${hours}:0${minutes}`;
  } if (minutes < 10) {
    return `${hours}:0${minutes}`;
  } if (hours < 10) {
    return `0${hours}:${minutes}`;
  }
  // const s = moment().format('hh:mm:ss A');
  // console.log(s);
  return `${hours}:${minutes}`;
}

async function showWeatherCards(url) {
  const response = await fetch(url);
  const cityInfo = await response.json();
  const weatherForecast = cityInfo.list.splice(0, 13);

  UI_COMPONENTS.CARD.LIST.innerHTML = '';

  for (const elem of weatherForecast) {
    const month = format(new Date(elem.dt_txt), 'MM');
    const day = format(new Date(elem.dt_txt), 'dd');
    const time = format(new Date(elem.dt_txt), 'HH:mm');
    const temp = elem.main.temp;
    const feelsLike = elem.main.feels_like;
    const weather = elem.weather[0].main;

    UI_COMPONENTS.CARD.LIST.innerHTML += `<div class="weather__tab-card tab-card">
                                              <div class="tab-card__header">
                                                  <div class="tab-card__day">${day} ${MONTHS[month - 1]}</div>
                                                  <div class="tab-card__time">${time}</div>
                                              </div>
                                              <div class="tab-card__bottom">
                                                  <div class="tab-card__degrees">
                                                    <div class="tab-card__temp">Temperature: <span class="tab-card__temp">${temp}°</span></div>
                                                    <div class="tab-card__temp2">Feels like: <span class="tab-card__temp2">${feelsLike}°</span></div>
                                                  </div>
                                                  <div class="tab-card__precipitation card__precipitation">
                                                    <span class="card__precipitation-text">${weather}</span>
                                                    <img class="card__precipitation-img" src="${`http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`}" alt="">
                                                  </div>
                                              </div>
                                            </div>`;
  }
}
