import WelcomeModel from '../models/welcome-model';
import WelcomeView from '../views/welcome/welcome-view';

export default class WelcomeController {
  constructor() {
    this._model = new WelcomeModel();
    this._view = new WelcomeView(this._model);

    this._model.onHide = () => {
      this._view.unrender();
    };
    this._view.onStart = this._view.hide();
  }
}
