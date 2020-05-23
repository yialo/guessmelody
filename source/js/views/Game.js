import GameLogoSrc from '@/img/melody-logo-ginger.png';
import { GAME_OPTIONS } from '@/js/constants.js';

import AbstractView from './_Abstract.js';

import QuestionArtistView from './Question/Artist.js';
import QuestionGenreView from './Question/Genre.js';

const questionTypeClassMap = {
  'genre': QuestionGenreView,
  'artist': QuestionArtistView,
};

export default class GameView extends AbstractView {
  static addZero(num) {
    return String(num).padStart(2, '0');
  }

  get _QuestionView() {
    return questionTypeClassMap[this._model.question.type];
  }

  _questionView = null;
  _$game = null;
  _$logo = null;
  _$minutes = null;
  _$seconds = null;
  _$mistakes = null;
  _$question = null;
  _$timer = null;

  constructor(model = {}) {
    super();
    this._model = model;
    this._onLogoClick = this._onLogoClick.bind(this);
  }

  set onReset(callback) {
    this._onReset = callback;
  }

  updateTimer() {
    this._$minutes.textContent = GameView.addZero(this._minutes);
    this._$seconds.textContent = GameView.addZero(this._seconds);
  }

  updateMistakes() {
    const mistakesList = GameView.formatTemplate(this._mistakesList);
    this._$mistakes.innerHTML = mistakesList;
  }

  updateQuestion() {
    this._updateBemModifier();
    this._updateQuestionView();
  }

  get _minutes() {
    return GameView.addZero(this._model.minutes);
  }

  get _seconds() {
    return GameView.addZero(this._model.seconds);
  }

  get _logoTemplate() {
    return (`
      <a class="game__back" href="#">
        <span class="visually-hidden">Сыграть ещё раз</span>
        <img class="game__logo" src="${GameLogoSrc}" alt="Угадай мелодию">
      </a>
    `);
  }

  get _mistakesList() {
    return new Array(this._model.mistakes).fill(`<div class="wrong"></div>`).join('');
  }

  get _mistakesTemplate() {
    return (`
      <div class="game__mistakes">
        ${this._mistakesList}
      </div>
    `);
  }

  get _timerTemplate() {
    return (`
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle class="timer__line" cx="390" cy="390" r="370" style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center;"/>
      </svg>
      <div class="timer__value">
        <span class="timer__mins">${this._minutes}</span>
        <span class="timer__dots">:</span>
        <span class="timer__secs">${this._seconds}</span>
      </div>
    `);
  }

  get _template() {
    return (`
      <section class="game">
        <header class="game__header">
          ${this._logoTemplate}
          ${this._timerTemplate}
          ${this._mistakesTemplate}
        </header>
        <div class="game__screen"></div>
      </section>
    `);
  }

  _onLogoClick(evt) {
    evt.preventDefault();
    if (typeof this._onReset === 'function') {
      this._onReset();
    }
  }

  _updateBemModifier() {
    const { classList } = this._$game;
    const actualModifier = `game--${this._model.question.type}`;
    if (classList.length === 1) {
      classList.add(actualModifier);
      return;
    }
    for (let i = 0; i < classList.length; i++) {
      if (classList[i].includes('game--') && classList[i] !== actualModifier) {
        classList[i] = actualModifier;
        return;
      }
    }
  }

  _removeBemModifier() {
    const { classList } = this._$game;
    for (let i = 0; i < classList.length; i++) {
      if (classList[i].includes('game--')) {
        classList.remove(classList[i]);
        return;
      }
    }
  }

  _updateQuestionView() {
    if (this._questionView) {
      this._questionView.unrender();
    }
    this._questionView = new this._QuestionView(this._model.question);
    this._questionView.render(this._$question);

    // NOTE: remove after test
    console.log('Question:', this._model.question);
  }

  _defineChildren() {
    this._$game = this._$fragment.querySelector('.game');
    this._updateBemModifier();

    this._$logo = this._$fragment.querySelector('.game__back');
    this._$timer = this._$fragment.querySelector('.timer');
    this._$minutes = this._$fragment.querySelector('.timer__mins');
    this._$seconds = this._$fragment.querySelector('.timer__secs');
    this._$mistakes = this._$fragment.querySelector('.game__mistakes');

    this._$question = this._$fragment.querySelector('.game__screen');
    this._updateQuestionView();
  }

  _undefineChildren() {
    this._questionView.unrender();
    this._$question = null;

    this._$logo = null;
    this._$minutes = null;
    this._$seconds = null;
    this._$mistakes = null;
    this._$timer = null;

    this._removeBemModifier();
    this._$game = null;
  }

  _activate() {
    this._$logo.addEventListener('click', this._onLogoClick);
  }

  _deactivate() {
    this._$logo.removeEventListener('click', this._onLogoClick);
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
