import { restrictAbstractCall } from '@/js/utils/errors.js';

export default class AbstractController {
  static $root = document.getElementById('app');

  _view = null;

  constructor() {
    if (new.target === AbstractController) {
      restrictAbstractCall();
    }
  }

  show() {
    this._view.render(AbstractController.$root);
  }

  hide() {
    this._view.unrender();
  }
}
