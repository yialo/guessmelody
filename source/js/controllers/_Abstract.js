import errorUtil from '../utils/errors.js';

const $screenRoot = document.getElementById('app');

class AbstractScreen {
  constructor() {
    if (new.target === AbstractScreen) {
      errorUtil.restrictAbstractCall();
    }
  }

  show() {
    this._view.render(AbstractScreen.$root);
  }

  hide() {
    this._view.unrender();
  }
}

Object.defineProperty(AbstractScreen, '$root', {
  value: $screenRoot,
});

export default AbstractScreen;
