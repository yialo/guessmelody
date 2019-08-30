import ScreenView from './screen-view';

export default class ResultView extends ScreenView {
  constructor(onReplay) {
    super();

    this._onReplay = onReplay;
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
