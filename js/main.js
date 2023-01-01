import { ChangeCityMenu } from "./changeСityMenu.js";
const chooseCity = document.querySelector('#cities');
const chooseBtn = document.querySelector('#choose')
const menu = new ChangeCityMenu();
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
})


