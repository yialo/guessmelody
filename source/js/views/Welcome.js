import LogoSrc from '@/img/melody-logo.png';

import AbstractView from './_Abstract.js';

export default class WelcomeView extends AbstractView {
  _$button = null;

  constructor() {
    super();
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  get _template() {
    return (`
      <section class="welcome">
        <div class="welcome__logo">
          <img src="${LogoSrc}" alt="Угадай мелодию" width="186" height="83">
        </div>
        <button class="welcome__button" aria-label="Начать игру" disabled></button>
        <h2 class="welcome__rules-title">Правила игры</h2>
        <p class="welcome__text">Правила просты:</p>
        <ul class="welcome__rules-list">
          <li>За 5 минут нужно ответить на все вопросы.</li>
          <li>Можно допустить 3 ошибки.</li>
        </ul>
        <p class="welcome__text">Удачи!</p>
      </section>
    `);
  }

  set onStart(callback) {
    this._onStart = callback;
  }

  _onButtonClick() {
    if (typeof this._onStart === 'function') {
      this._onStart();
    }
  }

  _defineChildren() {
    this._$button = this._$fragment.querySelector('.welcome__button');
  }

  _undefineChildren() {
    this._$button = null;
  }

  _activate() {
    this._$button.addEventListener('click', this._onButtonClick);
  }

  _deactivate() {
    this._$button.removeEventListener('click', this._onButtonClick);
  }

  render($root) {
    this._create();
    this._defineChildren();
    this._activate();
    this._mount($root);
  }

  unrender() {
    this._unmount();
    this._deactivate();
    this._undefineChildren();
  }
}
