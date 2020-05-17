import AbstractScreen from './_abstract-screen.js';
import GameModel from '../models/game-model/game-model.js';
import GameView from '../views/game/game-view.js';

const ONE_SECOND = 1000;

const tick = (gameState, questionView) => {
  Object.assign(gameState, {
    time: gameState.time - 1,
  });
  questionView.updateHeader();
};

export default class GameScreen extends AbstractScreen {
  constructor() {
    super();

    this._model = new GameModel();
    this._view = new GameView();

    // this._view.onAnswer = (answer) => {
    //   const answerStatus = this._model.checkAnswer(answer);

    //   if (answerStatus) {
    //     this._model.toNextQuestion();
    //     this._update();
    //   } else {
    //     console.log('Ошибка!');
    //   }
    // };
  }

  set onReset(callback) {
    this._view.onReset = callback;
  }

  show() {
    super.show();

    // this._update();
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
