export class FolowDays {
  #DOM = {
    btn: document.querySelector('#next'),
    menu: document.querySelector('#nextDays'),
  };
  #followCloseStatus = true;
  #blocksCreated = false;

  checkFollowStatus() {
    this.#DOM.btn.addEventListener('click', () => {
      if (this.#followCloseStatus) {
        this.#DOM.menu.setAttribute('close', 'false');
        this.#followCloseStatus = false;
        if (!this.#blocksCreated) {
          this.createDaysBlocks();
        } else {
          this.openDaysBlocks();
        }
      } else {
        this.#DOM.menu.setAttribute('close', 'true');
        this.#followCloseStatus = true;
        this.hideDaysBlocks()
      };
    })
  }
  createDaysBlocks() {
    const blocks = `
    <div class="mblck">    
    <div class='blocks'>
    
    </div>
    <div class='blocks'>
    
    </div>
    <div class='blocks'>
    
    </div>
    <div class='blocks'>
    
    </div>
    </div>
    `;
    this.#DOM.menu.insertAdjacentHTML('beforeend', blocks);
    this.#blocksCreated = true;
  }
  hideDaysBlocks() {

    const blocks = document.querySelectorAll('.blocks');
    console.log(blocks)
    for (let key of blocks) {
      key.setAttribute('hidden', 'true');
    };
  };
  openDaysBlocks() {
    const blocks = document.querySelectorAll('.blocks');
    for (let key of blocks) {
      key.removeAttribute('hidden');
    };
  }
}