import GameScreen from './controllers/game-screen';
import ResultScreen from './controllers/result-screen';
import WelcomeScreen from './controllers/welcome-screen';

export default class Router {
  _welcome;
  _game;
  _result;

  static init() {
    this._showWelcome();
  }

  static _showWelcome() {
    this._welcome = new WelcomeScreen();

    this._welcome.onStart = () => {
      this._welcome.hide();
      this._showGame();
    };

    this._welcome.show();
  }

  static _showGame() {
    this._game = new GameScreen();
  }

  static _showResult() {
    this._result = new ResultScreen();
  }
}
