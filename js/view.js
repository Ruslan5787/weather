export { UI }

const UI = {
   FORM: document.querySelector('.weather__form'),
   INPUT: document.querySelector('.weather__input'),
   FAVORITE_CITY_BTN: document.querySelector('.tab-bottom__btn'),
   TABS_BTNS: document.querySelectorAll('.weather__tabs-btn'),
   TABS: document.querySelectorAll('.weather__tab'),
   TAB_CARDS: document.querySelectorAll('.tab-card'),
   TAB_CARDS_LIST: document.querySelector('.tab-cards'),

   CITIES: {
      LIST: document.querySelector('.weather__right-list'),
      LIST_ITEMS: document.querySelectorAll('.weather__right-item'),
   },

   WEATHER: {
      DEGREES: document.querySelector('.weather__tab-degrees'),
      IMG: document.querySelector('.weather__tab-img img'),
      NAME: document.querySelectorAll('.tab__name'),
   },

   DETAILS: {
      TEMPERATURE: document.getElementById('temperature'),
      FEELS_LIKE: document.getElementById('feels like'),
      WEATHER: document.getElementById('weather'),
      SUNRISE: document.getElementById('sunrise'),
      SUNSET: document.getElementById('sunset'),
   },

   FORECAST: {
      TAB_BTN: document.querySelector('.btn-forecast'),
      CITY_NAME: document.querySelector('.tab__name-forecast'),
   },

   CARD: {
      LIST: document.querySelector('.tab-cards'),
      DAY: document.querySelector('.tab-card__day'),
      TIME: document.querySelector('.tab-card__time'),
      TEMP: document.querySelector('.tab-card__temp'),
      FEELS_LIKE: document.querySelector('.tab-card__temp2'),
      WEATHER: document.querySelector('.card__precipitation-text'),
      IMG: document.querySelector('.card__precipitation-img'),
   },
}