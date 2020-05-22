import { GAME_OPTIONS } from '../constants.js';
import AbstractView from './_Abstract.js';
// import QuestionArtistView from '../question/question-artist-view.js';
// import QuestionGenreView from '../question/question-genre-view.js';

import GameLogoSrc from '@/img/melody-logo-ginger.png';

const QUESTION_TYPES = ['genre', 'artist'];
const BEM_MODIFIERS = QUESTION_TYPES.map((it) => `game--${it}`);

// const questionTypeToClass = {
//   'genre': QuestionGenreView,
//   'artist': QuestionArtistView,
// };

export default class GameView extends AbstractView {
  static addZero(num) {
    return String(num).padStart(2, '0');
  }

  _$logo = null;
  _$question = null;

  constructor(props = {}) {
    const {
      mistakes = 0,
      minutes = 0,
      seconds = 0,
      question = null,
    } = props;

    super();
    this._mistakes = mistakes;
    this._minutes = GameView.addZero(minutes);
    this._seconds = GameView.addZero(seconds);
    this._question = question;

    this._onLogoClick = this._onLogoClick.bind(this);
  }

  set onReset(callback) {
    this._onReset = callback;
  }

  get _logoTemplate() {
    return (
      `<a class="game__back" href="#">
        <span class="visually-hidden">Сыграть ещё раз</span>
        <img class="game__logo" src="${GameLogoSrc}" alt="Угадай мелодию">
      </a>`
    );
  }

  get _mistakesTemplate() {
    const mistakeList = new Array(this._mistakes).fill(`<div class="wrong"></div>`).join('');
    return (
      `<div class="game__mistakes">
        ${mistakeList}
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

  _defineChildren() {
    this._$logo = this._$content.querySelector('.game__back');
  }

  _undefineChildren() {
    this._$logo = null;
  }

  _activate() {
    this._$logo.addEventListener('click', this._onLogoClick);
  }

  _deactivate() {

  }

  _onLogoClick(evt) {
    evt.preventDefault();
    if (typeof this._onReset === 'function') {
      this._onReset();
    }
  }
}
