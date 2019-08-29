import AbstractView from './abstract-view';

const INITIAL_TEMPLATE = (
  `<header class="game__header">
    <a class="game__back" href="#">
      <span class="visually-hidden">Сыграть ещё раз</span>
      <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
    </a>

    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle class="timer__line" cx="390" cy="390" r="370" style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center;"/>
    </svg>

    <div class="timer__value">
      <span class="timer__mins"></span>
      <span class="timer__dots">:</span>
      <span class="timer__secs"></span>
    </div>
    <div class="game__mistakes"></div>
  </header>`
);

export default class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this._state = state;
  }

  get state() {
    return this._state;
  }

  get minutes() {
    return this._state.minutes;
  }

  get seconds() {
    return this._state.seconds;
  }

  get mistakes() {
    return this._state.mistakes;
  }

  get template() {
    if (!this._template) {
      this._template = INITIAL_TEMPLATE;
    }
    return this._template;
  }

  get mistakesTemplate() {
    return (
      `${
        new Array(this.mistakes)
          .fill(`<div class="wrong"></div>`)
          .join('')
      }`
    );
  }

  get $() {
    if (!this._$) {
      this.render();
      this.updateTimeView();
      this.bind();
    }
    return this._$;
  }

  get $link() {
    if (!this._$link) {
      this._$link = this._$.querySelector('.game__back');
    }
    return this._$link;
  }

  get $minutes() {
    if (!this._$minutes) {
      this._$minutes = this._$.querySelector('.timer__mins');
    }
    return this._$minutes;
  }

  get $seconds() {
    if (!this._$seconds) {
      this._$seconds = this._$.querySelector('.timer__secs');
    }
    return this._$seconds;
  }

  get $mistakes() {
    if (!this._$mistakes) {
      this._$mistakes = this._$.querySelector('.game__mistakes');
    }
    return this._$mistakes;
  }

  set onReset(callback) {
    this._onReset = callback.bind(this);
  }

  bind() {
    this.$link.addEventListener('click', this._onReset);
  }

  updateTimeView() {
    this.$minutes.textContent = HeaderView.addZeroAtLeft(this.minutes);
    this.$seconds.textContent = HeaderView.addZeroAtLeft(this.seconds);
  }

  updateMistakesView() {
    this.$mistakes.innerHTML = this.mistakesTemplate;
  }

  static addZeroAtLeft(num) {
    return String(num).padStart(2, '0');
  }
}
