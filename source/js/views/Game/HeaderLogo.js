import AbstractView from '../_Abstract.js';

export default class GameHeaderLogoView extends AbstractView {
  _$container = null;
  _$logoLink = null;

  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
  }

  set onReset(callback) {
    this._onReset = callback;
  }

  get template() {
    return (
      `<a class="game__back" href="#">
        <span class="visually-hidden">Сыграть ещё раз</span>
        <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
      </a>`
    );
  }

  render($container) {
    this._$container = $container;

    this._addHandlers();
  }

  unrender() {
    this._removeHandlers();
  }

  _onClick() {
    this._onReset();
  }

  _addClickHandler() {
    this._$logoLink = this._$container.querySelector('.game__back');

    this._$logoLink.addEventListener('click', this._onClick);
  }

  _removeClickHandler() {
    this._$logoLink.removeEventListener('click', this._onClick);
  }

  _addHandlers() {
    this._addClickHandler();
  }

  _removeHandlers() {
    this._removeClickHandler();
  }
}
