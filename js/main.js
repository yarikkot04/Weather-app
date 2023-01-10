import { CityMenu } from "./СityMenu.js";
import { FolowDays } from "./followingDays.js";

const chooseCity = document.querySelector('#cities');
const chooseBtn = document.querySelector('#choose');
const btnSearch = document.querySelector('#search');
const menu = new CityMenu();
const nextDaysMenu = new FolowDays();
nextDaysMenu.checkFollowStatus();
window.onload = async function(){
  test();
  menu.getWeatherIndicators('Kiev');
  menu.showWeather();

}
let openedStatus = false;
menu.startSearch(btnSearch);
chooseBtn.addEventListener('click', (event) => {
  if(!openedStatus){
    menu.openMenu(chooseCity);
    menu.constructMenu(chooseCity);
    menu.chooseMode();
    openedStatus = true;
  }else{
    menu.closeMenu(chooseCity);
    menu.clearMenu(chooseCity);
    openedStatus = false;
  }
});


async function test(){
  console.log(1);
  let data = await fetch('https://api.weatherapi.com/v1/forecast.json?key=0cc11595e89649cb8c4232321230901&q=London&days=7');
  let json = await data.json();
  console.log(json);
};

