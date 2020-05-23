import GameLogoSrc from '@/img/melody-logo-ginger.png';
import { GAME_OPTIONS } from '@/js/constants.js';

import AbstractView from './_Abstract.js';

// import QuestionArtistView from '../question/question-artist-view.js';
// import QuestionGenreView from '../question/question-genre-view.js';

const QUESTION_TYPES = ['genre', 'artist'];
const BEM_MODIFIERS = QUESTION_TYPES.map((it) => `game--${it}`);

// const questionTypeToClass = {
//   'genre': QuestionGenreView,
//   'artist': QuestionArtistView,
// };

class GameView extends AbstractView {
  static addZero(num) {
    return String(num).padStart(2, '0');
  }

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

  get _minutes() {
    return GameView.addZero(this._model.minutes);
  }

  get _seconds() {
    return GameView.addZero(this._model.seconds);
  }

  get _logoTemplate() {
    return (
      `<a class="game__back" href="#">
        <span class="visually-hidden">Сыграть ещё раз</span>
        <img class="game__logo" src="${GameLogoSrc}" alt="Угадай мелодию">
      </a>`
    );
  }

  get _mistakesList() {
    return new Array(this._model.mistakes).fill(`<div class="wrong"></div>`).join('');
  }

  get _mistakesTemplate() {
    return (
      `<div class="game__mistakes">
        ${this._mistakesList}
      </div>`
    );
  }

  get _timerTemplate() {
    return (
      `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle class="timer__line" cx="390" cy="390" r="370" style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center;"/>
      </svg>
      <div class="timer__value">
        <span class="timer__mins">${this._minutes}</span>
        <span class="timer__dots">:</span>
        <span class="timer__secs">${this._seconds}</span>
      </div>`
    );
  }

  get _template() {
    return (
      `<section class="game">
        <header class="game__header">
          ${this._logoTemplate}
          ${this._timerTemplate}
          ${this._mistakesTemplate}
        </header>
        <div class="game__screen"></div>
      </section>`
    );
  }

  _onLogoClick(evt) {
    evt.preventDefault();
    if (typeof this._onReset === 'function') {
      this._onReset();
    }
  }
}

const activationAndChildrenMixin = {
  _defineChildren() {
    this._$logo = this._$fragment.querySelector('.game__back');
    this._$timer = this._$fragment.querySelector('.timer');
    this._$minutes = this._$fragment.querySelector('.timer__mins');
    this._$seconds = this._$fragment.querySelector('.timer__secs');
    this._$mistakes = this._$fragment.querySelector('.game__mistakes');
    this._$question = this._$fragment.querySelector('.game__screen');
  },
  _undefineChildren() {
    this._$logo = null;
    this._$minutes = null;
    this._$seconds = null;
    this._$mistakes = null;
    this._$question = null;
    this._$timer = null;
  },
  _activate() {
    this._$logo.addEventListener('click', this._onLogoClick);
  },
  _deactivate() {
    this._$logo.removeEventListener('click', this._onLogoClick);
  },
};

Object.assign(
    GameView.prototype,
    GameView.activationAndChildrenRenderMixin,
    activationAndChildrenMixin
);

export default GameView;
