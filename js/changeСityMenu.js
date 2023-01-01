export class ChangeCityMenu {
  #modeArr = [];
  #openMenuStatus = false;
  #menuValues;
  openMenu(obj) {
    obj.setAttribute('close', false);
  };
  closeMenu(obj) {
    obj.setAttribute('close', true);
  };
  constructMenu(obj) {
 
    if(this.#modeArr.length == 0){
      console.log(1)
      obj.insertAdjacentHTML('beforeend',`
        <ul id="tableCity">
          <li class="menuValue">Kiev</li>
          <li class="menuValue">New York</li> 
          <li class="menuValue">London</li>        
          <li class="menuValue">Tokyo</li> 
          <li class="menuValue">Paris</li> 
        </ul>
      `);
      this.#menuValues = document.querySelectorAll('.menuValue');
      for(const key of this.#menuValues){
        this.#modeArr.push(key);
      }
      this.#openMenuStatus = true;
    }else if(!this.#openMenuStatus){
      for(const key of this.#menuValues){
        key.removeAttribute('hidden');
      };
      this.#openMenuStatus = true;
    };
  };
  clearMenu(obj){
    if(this.#openMenuStatus){
      const menuValues = document.querySelectorAll('.menuValue');
      for(const key of menuValues){
        key.setAttribute('hidden',true)
      }
      this.#openMenuStatus = false;
    }
  }
};