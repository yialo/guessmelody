export default class Screen {
  constructor() {
    if (new.target === Screen) {
      throw new Error('Instantiation of this class is restricted');
    }
  }

  show() {
    this._view.render();
  }

  hide() {
    this._view.unrender();
  }
}
