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
    this._view = new GameView();

    this._view.onAnswer = (answer) => {
      const answerStatus = this._model.checkAnswer(answer);

      if (answerStatus) {
        this._model.toNextQuestion();
        this._update();
      } else {
        // STUB:
        console.log('Ошибка!');
      }
    };
  }

  set onReset(callback) {
    this._view.onReset = callback;
  }

  show() {
    super.show();

    this._update();
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

  _update() {
    this._view.update(this._model.currentQuestion);
  }
}
