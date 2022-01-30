import { UI_COMPONENTS } from './view.js';
import {
  REQUEST, showWeatherCards, getNormalTime, favoriteCities, showFavoriteCityInfo
} from './MAIN333.js';
import Cookies from 'js-cookie';

const HELPER_FOR_DOM = {
  addCity: (content) => {
    UI_COMPONENTS.CITIES.LIST.innerHTML += `<div class="weather__right-block">
                                                <div class="weather__right-item">${content}</div>
                                                <button class="weather__right-btn"></button>
                                             </div>`;
  },
  getWeatherNow: (result) => {
    UI_COMPONENTS.WEATHER.DEGREES.textContent = result.main.temp + '°';
    UI_COMPONENTS.WEATHER.IMG.src = `http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;
  },
  changeAllNameCitie: (value) => {
    UI_COMPONENTS.WEATHER.NAMES.forEach(elem => {
      const element = elem;
      element.textContent = value;
    });
  },
  getWeatherDetails: (result) => {
    UI_COMPONENTS.DETAILS.TEMPERATURE.textContent = result.main.temp + '°';
    UI_COMPONENTS.DETAILS.FEELS_LIKE.textContent = result.main.feels_like + '°';
    UI_COMPONENTS.DETAILS.WEATHER.textContent = result.weather[0].main;
    UI_COMPONENTS.DETAILS.SUNRISE.textContent = getNormalTime(result.sys.sunrise);
    UI_COMPONENTS.DETAILS.SUNSET.textContent = getNormalTime(result.sys.sunset);
  }
};

export const addCity = HELPER_FOR_DOM.addCity;
export const getWeatherNow = HELPER_FOR_DOM.getWeatherNow;
export const changeAllNameCitie = HELPER_FOR_DOM.changeAllNameCitie;
export const getWeatherDetails = HELPER_FOR_DOM.getWeatherDetails;

const HELPER_FOR_URL = {
  getUrl: (value) => {
    return `${REQUEST.WETHER_URL}?q=${value}&appid=${REQUEST.API_KEY}${REQUEST.DEGREES_CELSIUS}`;
  },
  addWeatherCards: (cityName) => {
    const url = `${REQUEST.FORECAST_URL}?q=${cityName}&appid=${REQUEST.API_KEY}${REQUEST.DEGREES_CELSIUS}`;

    showWeatherCards(url);
  }
};

export const getUrl = HELPER_FOR_URL.getUrl;
export const addWeatherCards = HELPER_FOR_URL.addWeatherCards;

const HELPER_FOR_LOCAL_STORAGE = {
  clickFavoriteCity: (event, content) => {
    const url = getUrl(event.target.textContent);

    showFavoriteCityInfo(url, content);

    Cookies.set('mainCity', `${content.textContent}`);
  },
  deleteFavoriteCitie: (content) => {
    const weatherBlock = content.closest('.weather__right-block');
    const weatherBlockItem = weatherBlock.querySelector('.weather__right-item').textContent.toLowerCase();

    favoriteCities.delete(weatherBlockItem);
    weatherBlock.remove();

    localStorage.setItem('arrayCities', JSON.stringify([...favoriteCities]));
  }
};

export const clickFavoriteCity = HELPER_FOR_LOCAL_STORAGE.clickFavoriteCity;
export const deleteFavoriteCitie = HELPER_FOR_LOCAL_STORAGE.deleteFavoriteCitie;
