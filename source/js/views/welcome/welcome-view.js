import ScreenView from '../_common/_screen-view';

export default class WelcomeView extends ScreenView {
  _$button = null;
  _onStart = () => {
    throw new Error('Callback need to be redefined for every instance');
  };

  constructor() {
    super('welcome');
  }

  set onStart(callback) {
    this._onStart = callback;
  }

  get _contentTemplate() {
    return (
      `<div class="welcome__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83">
      </div>
      <button class="welcome__button" aria-label="Начать игру"></button>
      <h2 class="welcome__rules-title">Правила игры</h2>
      <p class="welcome__text">Правила просты:</p>
      <ul class="welcome__rules-list">
        <li>За 5 минут нужно ответить на все вопросы.</li>
        <li>Можно допустить 3 ошибки.</li>
      </ul>
      <p class="welcome__text">Удачи!</p>`
    );
  }

  _onButtonClick() {
    this._onStart();
  }

  _addButtonHandler() {
    if (!this._$button) {
      this._$button = this._$.querySelector('.welcome__button');
    }

    this._$button.addEventListener('click', this._onButtonClick);
  }

  _removeButtonHandler() {
    this._$button.removeEventListener('click', this._onButtonClick);
  }

  _addHandlers() {
    this._addButtonHandler();
  }

  _removeHandlers() {
    this._removeButtonHandler();
  }

  _bindHandlers() {
    this._onButtonClick = this._onButtonClick.bind(this);
  }
}
