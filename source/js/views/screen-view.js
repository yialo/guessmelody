import View from './view';

const $main = document.querySelector('.main');

export default class ScreenView extends View {
  _set() {
    $main.innerHTML = ``;
    $main.appendChild(this.$);
  }
}
