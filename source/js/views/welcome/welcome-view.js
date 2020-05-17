import AbstractView from '../_abstract-view.js';

export default class WelcomeView extends AbstractView {
  constructor() {
    super();

    this._$button = null;
  }

  set onStart(callback) {
    this._onStart = callback;
  }

  get _template() {
    return (
      `<section class="welcome">
        <div class="welcome__logo">
          <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83">
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

  _onButtonClick() {
    if (typeof this._onStart === 'function') {
      this._onStart();
    }
  }

  _bind() {
    this._onButtonClick = this._onButtonClick.bind(this);
  }
}
