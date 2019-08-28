import AbstractView from './abstract-view';

export default class HeaderTimerView extends AbstractView {
  get template() {
    return (
      `<span class="timer__mins">${this.minutes}</span>
        <span class="timer__dots">:</span>
      <span class="timer__secs">${this.seconds}</span>`
    );
  }
}
