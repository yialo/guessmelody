import View from './view';

const $main = document.querySelector('.main');
const changeScreen = ($screen) => {
  $main.innerHTML = ``;
  $main.appendChild($screen);
};

export default class ScreenView extends View {
  _set() {
    changeScreen(this.$);
  }

  _unset() {
    this.$.remove();
  }
}
