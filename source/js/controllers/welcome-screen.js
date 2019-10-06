import Screen from './_screen';
import WelcomeView from '../views/welcome/welcome-view';

export default class WelcomeScreen extends Screen {
  constructor() {
    super();

    this._view = new WelcomeView();
    this._view.render();
  }
}
