import { ArtistQuestionMock, GenreQuestionMock } from './mocks/simpleMocks.js';
import ConfirmController from './controllers/Confirm.js';
import ErrorController from './controllers/Error.js';
import GameController from './controllers/Game.js';
// import ResultController from '../controllers/Result.js';
import WelcomeController from './controllers/Welcome.js';

const mockedQuestions = [
  new ArtistQuestionMock([0, 1, 2], 0),
  new GenreQuestionMock([0, 1, 2, 3], 0),
];

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
    this._error = null;
    this._confirm = null;

    this._questions = [];
  }

  init() {
    this._showWelcome();

    // STUB:
    // this._showGame();
  }

  _showWelcome() {
    this._welcome = new WelcomeController();

    this._welcome.onStart = () => {
      this._welcome.hide();
      this._showGame();
    };

    this._welcome.show();
    this._fetchQuestions()
      .then(() => {
        this._welcome.enable();
      })
      .catch(() => {
        this._showError();
      });
  }

  _showGame() {
    this._game = new GameController(mockedQuestions);

    this._game.onReset = () => {
      this._game.disableBackLink();
      this._showConfirm();
    };

    this._game.show();
  }

  // _showResult() {
  //   this._result = new ResultScreen();
  // }

  _showError() {
    this._error = new ErrorController();
    this._error.show();
  }

  _showConfirm() {
    this._confirm = new ConfirmController();

    this._confirm.onAgree = () => {
      this._confirm.hide();
      this._game.hide();
      this._showWelcome();
    };

    this._confirm.onCancel = () => {
      this._confirm.hide();
      this._game.enableBackLink();
    };

    this._confirm.show();
  }

  _fetchQuestions() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this._questions = mockedQuestions;
        resolve();
      }, 500);
    });
  }
}
