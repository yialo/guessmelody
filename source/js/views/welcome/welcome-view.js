import AbstractView from '../_abstract.js';

import LogoSrc from '../../../img/melody-logo.png';

export default class WelcomeView extends AbstractView {
  _$button = null;

  constructor() {
    super();
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  setOnStart(callback) {
    this._onStart = callback;
  }

  defineChildren() {
    if (!this._$button) {
      this._$button = this.$.querySelector('.welcome__button');
    }
  }

  undefineChildren() {
    this._$button = null;
  }

  activate() {
    this._$button.addEventListener('click', this._onButtonClick);
  }

  deactivate() {
    this._$button.removeEventListener('click', this._onButtonClick);
  }

  _getTemplate() {
    return (
      `<section class="welcome">
        <div class="welcome__logo">
          <img src="${LogoSrc}" alt="Угадай мелодию" width="186" height="83">
        </div>
        <button class="welcome__button" aria-label="Начать игру"></button>
        <h2 class="welcome__rules-title">Правила игры</h2>
        <p class="welcome__text">Правила просты:</p>
        <ul class="welcome__rules-list">
          <li>За 5 минут нужно ответить на все вопросы.</li>
          <li>Можно допустить 3 ошибки.</li>
        </ul>
        <p class="welcome__text">Удачи!</p>
      </section>`
    );
  }

  _onButtonClick() {
    if (typeof this._onStart === 'function') {
      this._onStart();
    }
  }
}
