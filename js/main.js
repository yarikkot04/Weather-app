import { ChangeCityMenu } from "./changeСityMenu.js";

const chooseCity = document.querySelector('#cities');
const chooseBtn = document.querySelector('#choose');
const btnSearch = document.querySelector('#search');
console.log(btnSearch);
const menu = new ChangeCityMenu();
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