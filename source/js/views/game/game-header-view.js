import View from '../_common/_view';

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

export default class QuestionHeaderView extends View {
  constructor(state) {
    super();
    this._state = state;
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
    this._template = INITIAL_TEMPLATE;
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

  get $link() {
    if (!this._$link) {
      this._$link = this.$.querySelector('.game__back');
    }
    return this._$link;
  }

  get $minutes() {
    if (!this._$minutes) {
      this._$minutes = this.$.querySelector('.timer__mins');
    }
    return this._$minutes;
  }

  get $seconds() {
    if (!this._$seconds) {
      this._$seconds = this.$.querySelector('.timer__secs');
    }
    return this._$seconds;
  }

  get $mistakes() {
    if (!this._$mistakes) {
      this._$mistakes = this.$.querySelector('.game__mistakes');
    }
    return this._$mistakes;
  }

  set onReset(callback) {
    this._onReset = callback;
  }

  get prepared() {
    this._bind();
    this.updateTimeView();
    return this._$;
  }

  updateMistakesView() {
    this.$mistakes.innerHTML = this.mistakesTemplate;
  }

  _bind() {
    this.$link.addEventListener('click', this._onReset);
  }

  updateTimeView() {
    this.$minutes.textContent = QuestionHeaderView.addZeroAtLeft(this.minutes);
    this.$seconds.textContent = QuestionHeaderView.addZeroAtLeft(this.seconds);
  }

  static addZeroAtLeft(num) {
    return String(num).padStart(2, '0');
  }
}
