import View from './view';

const $main = document.querySelector('.main');

export default class ScreenView extends View {
  set() {
    $main.innerHTML = ``;
    $main.appendChild(this.$);
  }
}
