export default class WelcomeModel {
  constructor() {
    this._state = {
      isVisible: false,
    };
  }

  set onHide(callback) {
    this._onHide = callback;
  }

  set onShow(callback) {
    this._onShow = callback;
  }

  hide() {
    this._state.isVisible = false;
    this._onHide();
  }

  show() {
    this._state.isVisible = true;
    this._onShow();
  }
}
