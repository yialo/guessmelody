import AbstractController from './_Abstract.js';
import ConfirmModalView from '../views/Modal/Confirm.js';

export default class ConfirmController extends AbstractController {
  constructor() {
    super();
    this._view = new ConfirmModalView();
  }

  set onAgree(callback) {
    this._view.onAgree = callback;
  }

  set onCancel(callback) {
    this._view.onCancel = callback;
  }
}
