export class ChangeCityMenu {
  #modeArr = [];
  #openMenuStatus = false;
  #menuValues;
  #selectMode = [];
  #curentMode;
  #search = document.querySelector('#search');
  #kelvinCoeff = 273.13;
  #apiKey = '07ea99368a9903a17515ff10a2696447';
  #locationCoord = [];
  #mainInfo = {
    DOM: {
      city: document.querySelector('#city'),
      weather: document.querySelector('#weather'),
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
    for (const key of this.#menuValues) {
      key.addEventListener('click', async (event) => {
        if (this.#curentMode) {
          this.#curentMode.style.backgroundColor = '#00bfff';
        };
        this.#selectMode = [];
        this.#selectMode.push(event.target);
        this.#curentMode = this.#selectMode[0];
        console.log(this.#curentMode);
        event.target.style.backgroundColor = '#87CEFA';
        console.log('search',this.#search)
      });
    };
  };
  startSearch(key){
      this.#search.addEventListener('click', async () => {
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
    }
    this.showWeather(indicators);
  };

  showWeather(options) {
    console.log(options.temp)
    let temp = options.temp;
    if( temp > 0) temp = '+' + temp;
    this.#mainInfo.DOM.weather.innerHTML = temp +'°';
    console.log( this.#mainInfo.DOM.city.children[0]);
    this.#mainInfo.DOM.city.children[0].innerHTML = `Weather in ${options.city} today`;
  }
};