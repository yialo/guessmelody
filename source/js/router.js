import GameScreen from './controllers/game-screen';
import ResultScreen from './controllers/result-screen';
import WelcomeScreen from './controllers/welcome-screen';

export default class Router {
  _welcome;
  _game;
  _result;

  static showWelcome() {
    this._welcome = new WelcomeScreen();
  }

  static showGame() {
    this._game = new GameScreen();
  }

  static showResult() {
    this._result = new ResultScreen();
  }
}
