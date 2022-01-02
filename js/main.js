import { UI_COMPONENTS } from "./view.js";

const REQUEST = {
   WETHER_URL: 'http://api.openweathermap.org/data/2.5/weather',
   FORECAST_URL: 'http://api.openweathermap.org/data/2.5/forecast',
   API_KEY: 'f660a2fb1e4bad108d6160b7f58c555f',
   DEGREES_CELSIUS: '&units=metric',
}

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
   'December',
];

let citiesArray = []

// --------------------------------------------------------------------------------------------
if (localStorage.length) {
   const storageArrayCities = JSON.parse(localStorage.getItem('array'))
   const mainCityName = localStorage.getItem('mainCity')
   const url = getUrl(mainCityName)

   if (localStorage.getItem('array')) {
      citiesArray = JSON.parse(localStorage.getItem('array'))
   }

<<<<<<< HEAD
   const storageArrayCities = JSON.parse(localStorage.getItem('array'))

=======
>>>>>>> e9fe77a751622943d4255bef8011fdefe8ea5eec
   for (const key in storageArrayCities) {
      addCity(storageArrayCities[key])
   }

<<<<<<< HEAD
   const mainCityName = localStorage.getItem('mainCity')

   UI_COMPONENTS.WEATHER.NAME.forEach(element => {
      element.textContent = mainCityName
   })

   const url = getUrl(mainCityName)

=======
   UI.WEATHER.NAME.forEach(element => {
      element.textContent = mainCityName
   })

>>>>>>> e9fe77a751622943d4255bef8011fdefe8ea5eec
   fetch(url)
      .then(response => response.json())
      .then(result => {
         getWeatherNow(result)
         getWeatherDetails(result)
      })
}

function getUrl(value) {
   return `${REQUEST.WETHER_URL}?q=${value}&appid=${REQUEST.API_KEY}${REQUEST.DEGREES_C}`
}

function addCity(content) {
   UI_COMPONENTS.CITIES.LIST.innerHTML += `<div class="weather__right-block">
                                             <div class="weather__right-item">${content}</div>
                                             <button class="weather__right-btn"></button>
                                          </div>`
}

<<<<<<< HEAD
function getUrl(value) {
   return `${REQUEST.WETHER_URL}?q=${value}&appid=${REQUEST.API_KEY}${REQUEST.DEGREES_CELSIUS}`
=======
function getWeatherInfo(result) {
   UI.WEATHER.DEGREES.textContent = result.main.temp
   UI.WEATHER.IMG.src = `http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`
}

function getWeatherDetails(result) {
   UI.DETAILS.TEMPERATURE.textContent = result.main.temp
   UI.DETAILS.FEELS_LIKE.textContent = result.main.feels_like
   UI.DETAILS.WEATHER.textContent = result.weather[0].main
   UI.DETAILS.SUNRISE.textContent = result.sys.sunrise
   UI.DETAILS.SUNSET.textContent = result.sys.sunset
>>>>>>> e9fe77a751622943d4255bef8011fdefe8ea5eec
}

UI_COMPONENTS.FORM.addEventListener('submit', event => {
   const value = UI_COMPONENTS.INPUT.value
   const url = getUrl(value)

   fetch(url)
      .then(response => response.json())
      .then(result => {
         if (!(result.cod == 404)) {
<<<<<<< HEAD
            getWeatherNow(result)
            changeAllNameCitie(value)
=======
            getWeatherInfo(result)
            changeAllCitieNames(value)
>>>>>>> e9fe77a751622943d4255bef8011fdefe8ea5eec

            localStorage.setItem('mainCity', value)
         } else {
            throw new Error('Не правильно ввели название города.')
         }

         getWeatherDetails(result)
         addWeatherCards(value)
      })
<<<<<<< HEAD
      .catch(error => {
         alert(error)
      })

   UI_COMPONENTS.FORM.reset()

   event.preventDefault()
})

function changeAllNameCitie(value) {
   UI_COMPONENTS.WEATHER.NAME.forEach(elem => {
      elem.textContent = value
   })
}

function getWeatherDetails(result) {
   UI_COMPONENTS.DETAILS.TEMPERATURE.textContent = result.main.temp
   UI_COMPONENTS.DETAILS.FEELS_LIKE.textContent = result.main.feels_like
   UI_COMPONENTS.DETAILS.WEATHER.textContent = result.weather[0].main
   UI_COMPONENTS.DETAILS.SUNRISE.textContent = result.sys.sunrise
   UI_COMPONENTS.DETAILS.SUNSET.textContent = result.sys.sunset
}

function getWeatherNow(result) {
   UI_COMPONENTS.WEATHER.DEGREES.textContent = result.main.temp
   UI_COMPONENTS.WEATHER.IMG.src = `http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`
}

UI_COMPONENTS.CITIES.LIST_ITEMS.forEach(elem => {
   const itemList = elem.textContent.toLowerCase()
=======
      .catch(alert)

   UI.FORM.reset()
   e.preventDefault()
})

function changeAllCitieNames(value) {
   UI.WEATHER.NAME.forEach(e => {
      e.textContent = value
   })
}

UI.CITIES.LIST_ITEMS.forEach(e => {
   const itemList = e.textContent.toLowerCase()
>>>>>>> e9fe77a751622943d4255bef8011fdefe8ea5eec
   citiesArray.push(itemList);
})

UI_COMPONENTS.FAVORITE_CITY_BTN.addEventListener('click', event => {
   const tabBottom = event.currentTarget.closest('.tab-bottom')
   const cityName = tabBottom.querySelector('.tab__name').textContent.toLowerCase()
   isCityDuplicate(cityName)
})

function isCityDuplicate(cityName) {
   if (!citiesArray.includes(cityName)) {
      addCity(cityName)

      citiesArray.push(cityName)

      localStorage.setItem('array', JSON.stringify(citiesArray))
   }
}

<<<<<<< HEAD
UI_COMPONENTS.CITIES.LIST.addEventListener('click', event => {
=======
UI.CITIES.LIST.addEventListener('click', event => {
>>>>>>> e9fe77a751622943d4255bef8011fdefe8ea5eec
   const content = event.target
   const isNameCity = content.classList.contains('weather__right-item')
   const isBtnCity = content.classList.contains('weather__right-btn')

   if (isNameCity) {
      clickNameCity(event, content)
      addWeatherCards(content.textContent)
<<<<<<< HEAD
      changeAllNameCitie(content.textContent)
=======
      changeAllCitieNames(content.textContent)
>>>>>>> e9fe77a751622943d4255bef8011fdefe8ea5eec
   }

   if (isBtnCity) {
      clickOnDelBtn(content)
   }
})

function clickNameCity(event, content) {
<<<<<<< HEAD
   const url = getUrl(event.target.textContent)
=======
   const citieName = event.target.textContent
   const url = getUrl(citieName)
>>>>>>> e9fe77a751622943d4255bef8011fdefe8ea5eec

   fetch(url)
      .then(response => response.json())
      .then(result => {
         getWeatherNow(result)
         getWeatherDetails(result)

<<<<<<< HEAD
         UI_COMPONENTS.WEATHER.NAME.textContent = content.textContent
=======
         UI.WEATHER.NAME.textContent = content.textContent
>>>>>>> e9fe77a751622943d4255bef8011fdefe8ea5eec
      })

   localStorage.setItem('mainCity', content.textContent)
}

function clickOnDelBtn(content) {
   const weatherBlock = content.closest('.weather__right-block')
   const weatherBlockItem = weatherBlock.querySelector('.weather__right-item').textContent.toLowerCase()
<<<<<<< HEAD
   const indexCity = citiesArray.indexOf(weatherBlockItem)

   citiesArray.splice(indexCity, 1)
   localStorage.setItem('array', JSON.stringify(citiesArray))
   weatherBlock.remove()
}
// ---------------------------------------------------------
UI_COMPONENTS.FORECAST.TAB_BTN.addEventListener('click', () => {
   const cityName = UI_COMPONENTS.FORECAST.CITY_NAME.textContent

=======
   const indexCityOnArray = citiesArray.indexOf(weatherBlockItem)

   citiesArray.splice(indexCityOnArray, 1)
   localStorage.setItem('array', JSON.stringify(citiesArray))
   weatherBlock.remove()
}

UI.FORECAST.TAB_BTN.addEventListener('click', () => {
   const cityName = UI.FORECAST.CITY_NAME.textContent
>>>>>>> e9fe77a751622943d4255bef8011fdefe8ea5eec
   addWeatherCards(cityName)
})

function addWeatherCards(cityName) {
<<<<<<< HEAD
   const url = `${REQUEST.FORECAST_URL}?q=${cityName}&appid=${REQUEST.API_KEY}${REQUEST.DEGREES_CELSIUS}`
=======
   const url = `${REQUEST.FORECAST_URL}?q=${cityName}&appid=${REQUEST.API_KEY}${REQUEST.DEGREES_C}`
>>>>>>> e9fe77a751622943d4255bef8011fdefe8ea5eec

   fetch(url)
      .then(response => response.json())
      .then(result => {
<<<<<<< HEAD
         const resultArr = result.list.splice(0, 3)

         UI_COMPONENTS.CARD.LIST.innerHTML = ''
=======
         const resultArr = result.list.splice(0, 14)

         UI.CARD.LIST.innerHTML = ''
>>>>>>> e9fe77a751622943d4255bef8011fdefe8ea5eec

         for (const elem of resultArr) {
            const month = parseInt(elem.dt_txt.substr(0, 7).substr(-2, 2))
            const day = elem.dt_txt.substr(0, 10).substr(-2, 2)
            const time = elem.dt_txt.substr(11).substr(-8, 5)
            const temp = elem.main.temp
            const feels_like = elem.main.feels_like
            const weather = elem.weather[0].main
<<<<<<< HEAD
            
            UI_COMPONENTS.CARD.LIST.innerHTML += `<div class="weather__tab-card tab-card">
                                                      <div class="tab-card__header">
                                                         <div class="tab-card__day">${day} ${MONTHS[month - 1]}</div>
                                                         <div class="tab-card__time">${time}</div>
                                                      </div>
                                                      <div class="tab-card__bottom">
                                                         <div class="tab-card__degrees">
                                                            <div class="tab-card__temp">Temperature: <span class="tab-card__temp">${temp}</span></div>
                                                            <div class="tab-card__temp2">Feels like: <span class="tab-card__temp2">${feels_like}</span></div>
                                                         </div>
                                                         <div class="tab-card__precipitation card__precipitation">
                                                            <span class="card__precipitation-text">${weather}</span>
                                                            <img class="card__precipitation-img" src="${`http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`}" alt="">
                                                         </div>
                                                      </div>
                                                   </div>`
=======

            UI.CARD.LIST.innerHTML += `<div class="weather__tab-card tab-card">
                                       <div class="tab-card__header">
                                          <div class="tab-card__day">${day} ${MONTHS[month - 1]}</div>
                                          <div class="tab-card__time">${time}</div>
                                       </div>
                                       <div class="tab-card__bottom">
                                          <div class="tab-card__degrees">
                                             <div class="tab-card__temp">Temperature: <span class="tab-card__temp">${temp}</span></div>
                                             <div class="tab-card__temp2">Feels like: <span class="tab-card__temp2">${feels_like}</span></div>
                                          </div>
                                          <div class="tab-card__precipitation card__precipitation">
                                             <span class="card__precipitation-text">${weather}</span>
                                             <img class="card__precipitation-img" src="${`http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`}" alt="">
                                          </div>
                                       </div>
                                    </div>`
>>>>>>> e9fe77a751622943d4255bef8011fdefe8ea5eec
         }
      })
}