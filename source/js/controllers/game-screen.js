import Screen from './_screen';
import GameModel from '../models/game-model';
import GameView from '../views/game/game-view';

const ONE_SECOND = 1000;

const tick = (gameState, questionView) => {
  Object.assign(gameState, {
    time: gameState.time - 1,
  });
  questionView.updateHeader();
};

export default class GameScreen extends Screen {
  constructor() {
    super();

    this._model = new GameModel();
    this._view = new GameView(this._model.currentQuestion);
  }

  set onReset(callback) {
    this._view.onReset = callback;
  }

  show() {
    super.show();

    this._view.update();
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
