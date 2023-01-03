export class ChangeCityMenu {
  #modeArr = [];
  #openMenuStatus = false;
  #menuValues;
  #selectMode = [];
  #curentMode;
  #cities = {
    America: ['New York'],
    Europe: ['Paris', 'London', 'Kiev'],
    Asia: ['Tokyo'],
  }
  #kelvinCoeff = 273.13;
  #apiKey = '07ea99368a9903a17515ff10a2696447';
  #locationCoord = [];
  #mainInfo = {
    DOM: {
      city: document.querySelector('#city'),
      weather: document.querySelector('#weather'),
      max: document.querySelector('.max'),
      min: document.querySelector('.min'),
      time: document.querySelector('#time'),
      wind: document.querySelector('.wind'),

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
      console.log(1)
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
          this.#curentMode.style.backgroundColor = '#2b91ff';
        };
        this.#selectMode = [];
        this.#selectMode.push(event.target);
        this.#curentMode = this.#selectMode[0];
        event.target.style.backgroundColor = '#0000FF';
      });
    };
  };
  startSearch(key) {
    key.addEventListener('click', async () => {
      console.log(222)
      await this.getLocalCoord(this.#curentMode.innerHTML);
      this.getWeatherIndicators();
    });
  }
  async getLocalCoord(city) {
    const data = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city.replace(' ', '_')}&limit=5&appid=${this.#apiKey}`);
    const dataJSON = await data.json();
    const lat = dataJSON[0].lat;
    const lon = dataJSON[0].lon;
    this.#locationCoord = [lat, lon, city];
  };
  async getWeatherIndicators() {
    const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.#locationCoord[0]}&lon=${this.#locationCoord[1]}&appid=${this.#apiKey}`)
    const weatherDataJSON = await weatherData.json();
    console.log(weatherDataJSON)
    let indicators = {
      city: this.#locationCoord[2],
      temp: Math.round(weatherDataJSON.main.temp - this.#kelvinCoeff),
      max: Math.round(weatherDataJSON.main.temp_max - this.#kelvinCoeff),
      min: Math.round(weatherDataJSON.main.temp_min - this.#kelvinCoeff),
      wind: weatherDataJSON.wind.speed,
    }
    this.showWeather(indicators);
  };
  changeBackground(city) {
    document.body.style.backgroundImage = `url('/img/city/${city.replace(' ', '_').toLowerCase()}.jpg')`;
  };
  _chooseContinent(city){
    for(let i = 0; i < this.#cities.America.length; i++){
      console.log(1)
      console.log(city, this.#cities.America[i]);
      if(city == this.#cities.America[i]) return 'America';
    };
    for(let i = 0; i < this.#cities.Asia.length; i++){
      if(city == this.#cities.Asia[i]) return 'Asia';
    };
    return null;
  }
  showTime(city) {
    let continent = this._chooseContinent(city);
    continent == undefined ? continent = 'Europe' : null;
    let time = moment().tz(`${continent}/${city.replace(' ','_')}`).format('HH:mm a - MMMM Do YYYY');
    return time;
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
    this.#mainInfo.DOM.time.children[0].innerHTML = this.showTime(options.city);
    this.#mainInfo.DOM.wind.children[0].innerHTML = options.wind;
    console.log(document.querySelector('#time'))
    this.changeBackground(options.city);
  };
};