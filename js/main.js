import { CityMenu } from "./СityMenu.js";
import { FolowDays } from "./followingDays.js";

const chooseCity = document.querySelector('#cities');
const chooseBtn = document.querySelector('#choose');
const btnSearch = document.querySelector('#search');
const btnNextD = document.querySelector('#next');
const menu = new CityMenu();
const nextDaysMenu = new FolowDays();
nextDaysMenu.checkFollowStatus();
window.onload = function(){
  menu.getWeatherIndicators('Kiev');
  menu.showWeather();
}
let openedStatus = false;

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
btnSearch.addEventListener('click', (event) => {
    menu.startSearch();
    nextDaysMenu.reloadMenu();
});
btnNextD.addEventListener('click', (event) => {
    let selectedCity = document.querySelector('#city').children[0].innerHTML.split(' ')[2];
    selectedCity == 'New' ? selectedCity = 'New York' : selectedCity;
    nextDaysMenu.loadData(selectedCity);
});