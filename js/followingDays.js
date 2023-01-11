export class FolowDays {
  #numOfDays = 5;
  #apiKey = '0cc11595e89649cb8c4232321230901';
  #DOM = {
    btn: document.querySelector('#next'),
    menu: document.querySelector('#nextDays'),
    blocksDOM: {
      date: document.querySelectorAll('.date'),
      avg: document.querySelectorAll('.fweath'),
      max: document.querySelectorAll('.fmax'),
      min: document.querySelectorAll('.fmin'),
      img: document.querySelectorAll('.imageF')
    }
  };
  #followCloseStatus = true;
  checkFollowStatus() {
    this.#DOM.btn.addEventListener('click', () => {
      if (this.#followCloseStatus) {
        this.#DOM.menu.setAttribute('close', 'false');
        this.openDaysBlocks();
        this.loadData();
        this.#followCloseStatus = false;
      } else {
        this.#DOM.menu.setAttribute('close', 'true');
        this.#followCloseStatus = true;
        this.hideDaysBlocks()
      };
    })
  }
  hideDaysBlocks() {
    const blocks = document.querySelectorAll('.blocks');
    for (let key of blocks) {
      key.setAttribute('hidden', 'true');
    };
  };
  openDaysBlocks() {
    const blocks = document.querySelectorAll('.blocks');
    for (let key of blocks) {
      key.removeAttribute('hidden');
    };
  };
  async loadData(city){
    const weatherData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${this.#apiKey}&q=${city}&days=7`); 
    const weatherDataJSON = await weatherData.json();
    this.showData(weatherDataJSON);
  }
  showData(data){
    let formatter = new Intl.DateTimeFormat("ua");
    for(let i = 1; i < this.#numOfDays; i++){
      const formatDate = formatter.format(Date.parse(data.forecast.forecastday[i].date));
      this.#DOM.blocksDOM.date[i - 1].innerHTML = formatDate;
      let avg = Math.round(data.forecast.forecastday[i].day.avgtemp_c)
      if(avg > 0) avg = '+' + avg;
      let min = Math.round(data.forecast.forecastday[i].day.mintemp_c);
      if(min > 0) min = '+' + min;
      let max = Math.round(data.forecast.forecastday[i].day.maxtemp_c);
      if(max > 0) max = '+' + max;
      const img = data.forecast.forecastday[i].day.condition.icon;
      this.#DOM.blocksDOM.avg[i - 1].children[0].innerHTML = avg + '°';
      this.#DOM.blocksDOM.min[i - 1].children[0].innerHTML = min + '°';
      this.#DOM.blocksDOM.max[i - 1].children[0].innerHTML = max + '°';
      this.#DOM.blocksDOM.img[i - 1].src = img;
    }
  }
  reloadMenu(key){
      this.#followCloseStatus = true;
      this.#DOM.menu.setAttribute('close', 'true');
      this.hideDaysBlocks();

  }
}