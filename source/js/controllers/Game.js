import AbstractController from './_Abstract.js';
import GameModel from '../models/Game.js';
import GameView from '../views/Game.js';

const ONE_SECOND = 1000;

const tick = (gameState, questionView) => {
  Object.assign(gameState, {
    time: gameState.time - 1,
  });
  questionView.updateHeader();
};

export default class GameController extends AbstractController {
  _model = null;
  _timer = null;
  _view = null;

  constructor() {
    super();
    this._model = new GameModel();
    this._view = new GameView(this._model);
  }

  set onReset(callback) {
    this._view.onReset = callback;
  }

  startTimer(questionView) {
    this._timer = setTimeout(() => {
      tick(this._game.model, questionView);
      this.startTimer();
    }, ONE_SECOND);
  }

  stopTimer() {
    clearTimeout(this._timer);
  }
}
