import AbstractController from './_Abstract.js';
import WelcomeView from '../views/Welcome.js';

export default class WelcomeController extends AbstractController {
  constructor() {
    super();
    this._view = new WelcomeView();
  }

  set onStart(callback) {
    this._view.onStart = callback;
  }

  enable() {
    this._view.enableButton();
  }
}
