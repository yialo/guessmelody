import GameModel from '../models/game-model';
import WelcomeView from '../views/welcome-view';
import QuestionView from '../views/question-view';
import ResultFailTriesView from '../views/result-fail-tries-view';
import ResultSuccessView from '../views/result-success-view';

let game;
const tick(game) => {
  game = Object.assign({}, game, {
    time: game.time - 1;
  });
};

const startTimer = () => {};

const stopTimer = () => {};

export default class GameController {
  constructor() {
    this._game = new GameModel();

    this._handler = {
      onReset: () => {
        this._game.reset();
        this.start();
      },
      onNext: (callback) => {
        this._game.countAnswer();
        const newQuestion = this._game.currentQuestion;
        callback(newQuestion);
      },
      onWin: () => {
        this._game.countAnswer();
        const resultScreen = new ResultSuccessView(this._game);
        resultScreen.onReplay = () => {
          this._game.reset();
          this.start();
        };
        resultScreen.render();
      },
      onFail: () => {
        const resultScreen = new ResultFailTriesView();
        resultScreen.onReplay = () => {
          this._game.resetState();
          this._game.resetAnswers();
          const questionScreen = new QuestionView(this._game, this._handler);
          questionScreen.render();
        };
        resultScreen.render();
      },
    };
  }

  start() {
    this._welcomeScreen = new WelcomeView();
    this._welcomeScreen.onStart = () => {
      const questionScreen = new QuestionView(this._game, this._handler);
      questionScreen.render();
    };
    this._welcomeScreen.render();
  }
}
