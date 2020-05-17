import GameScreen from '../controllers/game-screen.js';
// import ResultScreen from '../controllers/result-screen.js';
import WelcomeScreen from '../controllers/welcome-screen.js';

export default class Router {
  constructor() {
    this._welcome = null;
    this._game = null;
    this._result = null;
  }

  init() {
    // this._showWelcome();

    // STUB:
    this._showGame();
  }

  _showWelcome() {
    this._welcome = new WelcomeScreen();

    this._welcome.onStart = () => {
      this._welcome.hide();
      this._showGame();
    };

    this._welcome.show();
  }

  _showGame() {
    this._game = new GameScreen();

    // this._game.onReset = () => {
    //   this._game.hide();
    //   this._showWelcome();
    // };

    this._game.show();
  }

  // _showResult() {
  //   this._result = new ResultScreen();
  // }
}
