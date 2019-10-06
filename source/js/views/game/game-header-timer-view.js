import View from '../_common/_view';

export default class GameHeaderTimerView extends View {
  _minutes = Number();
  _seconds = Number();

  _$minutes = null;
  _$seconds = null;

  get template() {
    return (
      `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle class="timer__line" cx="390" cy="390" r="370" style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center;"/>
      </svg>
      <div class="timer__value">
        <span class="timer__mins"></span>
        <span class="timer__dots">:</span>
        <span class="timer__secs"></span>
      </div>`
    );
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

  update() {
    this._$minutes.textContent = GameHeaderTimerView.addZeroAtLeft(this._minutes);
    this._$seconds.textContent = GameHeaderTimerView.addZeroAtLeft(this._seconds);
  }

  static addZeroAtLeft(num) {
    return String(num).padStart(2, '0');
  }
}
