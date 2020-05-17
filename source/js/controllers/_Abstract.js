import errorUtil from '../utils/errors.js';

const $appRoot = document.getElementById('app');

class AbstractController {
  static $root = $appRoot;

  _view = null;

  constructor() {
    if (new.target === AbstractController) {
      errorUtil.restrictAbstractCall();
    }
  }

  show() {
    this._view.render(AbstractController.$root);
  }

  hide() {
    this._view.unrender();
  }
}

export default AbstractController;
