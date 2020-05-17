import AbstractController from './_Abstract.js';
import WelcomeView from '../views/welcome/welcome-view.js';

export default class WelcomeController extends AbstractController {
  constructor() {
    super();

    this._view = new WelcomeView();
  }

  set onStart(callback) {
    this._view.onStart = callback;
  }
}
