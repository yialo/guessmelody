import AbstractView from './abstract-view';

export default class HeaderView extends AbstractView {
  get template() {
    return (
      `<header class="game__header">
        <a class="game__back" href="#">
          <span class="visually-hidden">Сыграть ещё раз</span>
          <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
        </a>

        <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
          <circle class="timer__line" cx="390" cy="390" r="370" style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center;"/>
        </svg>

        <div class="timer__value">
          <span class="timer__mins">${this.minutes}</span>
          <span class="timer__dots">:</span>
          <span class="timer__secs">${this.seconds}</span>
        </div>
        <div class="game__mistakes"></div>
      </header>`
    );
  }
}
