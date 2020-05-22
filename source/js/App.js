import GameController from './controllers/Game.js';
// import ResultController from '../controllers/Result.js';
import WelcomeController from './controllers/Welcome.js';

export default class App {
  static isInitialized = false;

  constructor() {
    if (App.isInitialized) {
      return App.instance;
    }

    App.instance = this;
    App.isInitialized = true;

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
    this._welcome = new WelcomeController();

    this._welcome.onStart = () => {
      this._welcome.hide();
      this._showGame();
    };

    this._welcome.show();
  }

  _showGame() {
    this._game = new GameController();

    this._game.onReset = () => {
      this._game.hide();
      this._showWelcome();
    };

    this._game.show();
  }

  // _showResult() {
  //   this._result = new ResultScreen();
  // }
}
