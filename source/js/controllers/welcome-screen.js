import AbstractScreen from './_abstract-screen.js';
import WelcomeView from '../views/welcome/welcome-view.js';

export default class WelcomeScreen extends AbstractScreen {
  constructor() {
    super();

    this._view = new WelcomeView();
  }

  set onStart(callback) {
    this._view.onStart = callback;
  }
}
