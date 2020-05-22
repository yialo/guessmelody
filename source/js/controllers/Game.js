import AbstractController from './_Abstract.js';
import GameModel from '../models/Game.js';
import GameView from '../views/Game/index.js';

const ONE_SECOND = 1000;

const tick = (gameState, questionView) => {
  Object.assign(gameState, {
    time: gameState.time - 1,
  });
  questionView.updateHeader();
};

export default class GameScreen extends AbstractController {
  constructor() {
    super();

    this._model = new GameModel();
    this._view = new GameView();
  }

  set onReset(callback) {
    this._view.onReset = callback;
  }

  startTimer(questionView) {
    this._timer = setTimeout(() => {
      tick(this._game.state, questionView);
      this.startTimer();
    }, ONE_SECOND);
  }

  stopTimer() {
    clearTimeout(this._timer);
  }
}
