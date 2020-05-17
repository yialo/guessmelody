// import GameController from './controllers/game.js';
// import ResultController from '../controllers/result.js';
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
    this._showWelcome();
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
    console.log('Game screen is shown');

    // this._game = new GameController();

    // this._game.onReset = () => {
    //   this._game.hide();
    //   this._showWelcome();
    // };

    // this._game.show();
  }

  // _showResult() {
  //   this._result = new ResultScreen();
  // }
}
