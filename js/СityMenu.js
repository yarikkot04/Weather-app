export class CityMenu {
  #modeArr = [];
  #openMenuStatus = false;
  #menuValues;
  #selectMode = [];
  #curentMode;
  #hourInMs = 3600000;
  #cities = {
    london: 0,
    kiev: 2,
    paris: 1,
    new_york: -5,
    tokyo: 9,
  }
  #kelvinCoeff = 273.13;
  #apiKey = '07ea99368a9903a17515ff10a2696447';
  // #locationCoord = [];
  #mainInfo = {
    DOM: {
      city: document.querySelector('#city'),
      weather: document.querySelector('#weather'),
      max: document.querySelector('.max'),
      min: document.querySelector('.min'),
      time: document.querySelector('#time'),
      wind: document.querySelector('.wind'),
      pressure: document.querySelector('.press'),
      humidity: document.querySelector('.hum'),
      image: document.querySelector('#image'),
    }
  };

  openMenu(obj) {
    obj.setAttribute('close', false);
  };
  closeMenu(obj) {
    obj.setAttribute('close', true);
  };
  constructMenu(obj) {
    if (this.#modeArr.length == 0) {
      obj.insertAdjacentHTML('beforeend', `
          <div class="menuValue tableCity kiev">Kiev</div>
          <div class="menuValue tableCity">New York</div> 
          <div class="menuValue tableCity">London</div>        
          <div class="menuValue tableCity">Tokyo</div> 
          <div class="menuValue tableCity">Paris</div> 
      `);
      this.#menuValues = document.querySelectorAll('.menuValue');
      for (const key of this.#menuValues) {
        this.#modeArr.push(key);
      }
      this.#openMenuStatus = true;
      const firstElem = document.querySelector('.kiev');
      this.#curentMode = firstElem;
    } else if (!this.#openMenuStatus) {
      for (const key of this.#menuValues) {
        key.removeAttribute('hidden');
      };
      this.#openMenuStatus = true;
    };
  };
  clearMenu(obj) {
    if (this.#openMenuStatus) {
      const menuValues = document.querySelectorAll('.menuValue');
      for (const key of menuValues) {
        key.setAttribute('hidden', true)
      }
      this.#openMenuStatus = false;
    }
  };
  chooseMode() {
    for (let key of this.#menuValues) {
      key.addEventListener('click', (event) => {
        if (this.#curentMode) {
          this.#curentMode.style.backgroundColor = '#007bff';
        };
        this.#selectMode = [];

        this.#selectMode.push(event.target);
        this.#curentMode = this.#selectMode[0];
        event.target.style.backgroundColor = '#0000FF';
        console.log(this.#curentMode.innerHTML);
      });
    };
  };
  startSearch(key) {
    key.addEventListener('click', async () => {
      console.log(this.#curentMode.innerHTML)
      this.getWeatherIndicators(this.#curentMode.innerHTML);
    });
  };

  async getWeatherIndicators(city) {
    console.log(`https://api.weatherapi.com/v1/forecast.json?key=0cc11595e89649cb8c4232321230901&q=${city}&days=7`)
    const weatherData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0cc11595e89649cb8c4232321230901&q=${city}&days=7`)
    const weatherDataJSON = await weatherData.json();
    console.log(weatherDataJSON)
    let indicators = {
      city: city,
      temp: Math.round(weatherDataJSON.current.temp_c),
      max: Math.round(weatherDataJSON.forecast.forecastday[0].day.maxtemp_c),
      min: Math.round(weatherDataJSON.forecast.forecastday[0].day.mintemp_c),
      wind: weatherDataJSON.forecast.forecastday[0].day.maxwind_kph,
      press: weatherDataJSON.current.pressure_mb,
      hum: weatherDataJSON.current.humidity,
      // currWeath: weatherDataJSON.weather[0].main,
    };
    this.showWeather(indicators);
  };
  changeBackground(city) {
    document.body.style.backgroundImage = `url('img/cities/${city.replace(' ', '_').toLowerCase()}.jpg')`;
  };
  showTime(city) {
    let formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'UTC',
      hour12: false,
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
    })
    let date = new Date();
    const now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
      date.getUTCDate(), date.getUTCHours(),
      date.getUTCMinutes(), date.getUTCSeconds());
    const dateUTC = new Date(now_utc);
    const currDate = +dateUTC + this.#cities[city.toLowerCase().replace(' ','_')]*this.#hourInMs;
    let dateUTCstring = formatter.format(currDate);
    dateUTCstring = dateUTCstring.split(',');
    dateUTCstring[dateUTCstring.length - 1] = dateUTCstring[dateUTCstring.length - 1].replace(' 24',' 00')
    dateUTCstring = dateUTCstring.join(', ');
    return dateUTCstring;
  };
  chooseWeatherIcon(weatherInd) {
    const conditions = {
      Clear: "img/weather/clear.jpg",
      Clouds: "img/weather/clouds.jpg",
      Rain: "img/weather/rain.jpg",
      Snow: "img/weather/snow.jpg",
    };
    for (let key in conditions) {
      if (weatherInd == key) {
        this.#mainInfo.DOM.image.src = conditions[key];
      };
    }
  }
  showWeather(options) {
    let temp = options.temp;
    let max = options.max;
    let min = options.min;
    if (max > 0) max = '+' + max;
    if (min > 0) min = '+' + min;
    if (temp > 0) temp = '+' + temp;
    this.#mainInfo.DOM.weather.innerHTML = temp + '°';
    console.log(this.#mainInfo.DOM.city.children[0]);
    this.#mainInfo.DOM.city.children[0].innerHTML = `Weather in ${options.city} today`;
    this.#mainInfo.DOM.max.children[0].innerHTML = max + '°';
    this.#mainInfo.DOM.min.children[0].innerHTML = min + '°';
    this.#mainInfo.DOM.wind.children[1].innerHTML = options.wind + 'km/h';
    this.#mainInfo.DOM.pressure.children[1].innerHTML = options.press + 'mm';
    this.#mainInfo.DOM.humidity.children[1].innerHTML = options.hum + '%';
    this.#mainInfo.DOM.time.children[0].innerHTML = this.showTime(options.city);
    this.changeBackground(options.city);
    this.chooseWeatherIcon(options.currWeath);
  };
};