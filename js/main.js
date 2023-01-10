import { CityMenu } from "./СityMenu.js";
import { FolowDays } from "./followingDays.js";

const chooseCity = document.querySelector('#cities');
const chooseBtn = document.querySelector('#choose');
const btnSearch = document.querySelector('#search');
const menu = new CityMenu();
const nextDaysMenu = new FolowDays();
nextDaysMenu.checkFollowStatus();
window.onload = async function(){
  await menu.getLocalCoord('Kiev');
  menu.getWeatherIndicators();
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