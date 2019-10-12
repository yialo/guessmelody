import View from '../_common/_view';
import GameHeaderLogoView from './game-header-logo-view';
import GameHeaderMistakesView from './game-header-mistakes-view';
import GameHeaderTimerView from './game-header-timer-view';

export default class GameHeaderView extends View {
  _state = {};

  _logoView = null;
  _mistakesView = null;
  _timerView = null;

  constructor(state) {
    super();
    this._state = state;

    this._logoView = new GameHeaderLogoView();
    this._timerView = new GameHeaderTimerView();
    this._mistakesView = new GameHeaderMistakesView();
  }

  set onReset(callback) {
    this._logoView.onReset = callback;
  }

  get template() {
    return (
      `<header class="game__header">
        ${this._logoView.template}
        ${this._timerView.template}
        ${this._mistakesView.template}
      </header>`
    );
  }

  render($container) {
    this._$container = $container;

    this._logoView.render(this._$container);
  }

  unrender() {
    this._logoView.unrender();
  }

  _bindHandlers() {}
}
