import GameModel from '../models/game-model';
import WelcomeView from '../views/welcome-view';
import QuestionView from '../views/question-view';

import renderResultScreen from '../elements/result';

export default class GameController {
  constructor() {
    this._game = new GameModel();

    this._handler = {
      onReset: () => {
        this._game.resetQuestions();
        this.start();
      },
      onNext: (callback) => {
        this._game.countAnswer();
        const newQuestion = this._game.currentQuestion;
        callback(newQuestion);
      },
      onWin: () => {
        this._game.countAnswer();
        renderResultScreen('success', this.start, this._game.answers, this._game.state.mistakes);
      },
      onFail: () => {
        this._game.resetState();
        this._game.resetAnswers();
        renderResultScreen('failAttempts', () => {
          const questionScreen = new QuestionView(this._game, this._handler);
          questionScreen.render();
        });
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
