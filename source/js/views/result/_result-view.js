import ScreenView from '../_common/_screen-view.js';

export default class ResultView extends ScreenView {
  get caption() {
    throw new Error(`Need to redefine method for ${this}`);
  }

  get content() {
    throw new Error(`Need to redefine method for ${this}`);
  }

  set onReplay(callback) {
    this._onReplay = callback;
  }

  get template() {
    this._template = (
      `<section class="result">
        <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
        <h2 class="result__title">${this.caption}</h2>
        ${this.content}
        <button class="result__replay" type="button">${this.tip}</button>
      </section>`
    );
    return this._template;
  }

  get tip() {
    throw new Error(`Need to redefine method for ${this}`);
  }

  get $button() {
    this._$button = this.$.querySelector('.result__replay');
    return this._$button;
  }

  render() {
    this._bind();
    this._set();
  }

  _bind() {
    this.$button.addEventListener('click', this._onReplay);
  }
}
