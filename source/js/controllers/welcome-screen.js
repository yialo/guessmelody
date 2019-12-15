import AbstractScreen from './_abstract-screen';
import WelcomeView from '../views/welcome/welcome-view';

export default class WelcomeScreen extends AbstractScreen {
  constructor() {
    super();

    this._view = new WelcomeView();
  }

  set onStart(callback) {
    this._view.onStart = callback;
  }
}
