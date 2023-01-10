export class FolowDays {
  #DOM = {
    btn: document.querySelector('#next'),
    menu: document.querySelector('#nextDays'),
  };
  #followCloseStatus = true;

  checkFollowStatus() {
    this.#DOM.btn.addEventListener('click', () => {
      if (this.#followCloseStatus) {
        this.#DOM.menu.setAttribute('close', 'false');
        this.openDaysBlocks();
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