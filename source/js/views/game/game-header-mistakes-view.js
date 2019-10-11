import View from '../_common/_view';

export default class GameHeaderMistakesView extends View {
  _mistakes = [];
  _$mistakes = null;

  get template() {
    return `<div class="game__mistakes"></div>`;
  }

  get mistakesTemplate() {
    return (
      `${
        new Array(this._mistakes)
          .fill(`<div class="wrong"></div>`)
          .join('')
      }`
    );
  }

  get $mistakes() {
    this._$mistakes = this.$.querySelector('.game__mistakes');

    return this._$mistakes;
  }

  update() {
    this._$mistakes.innerHTML = this.mistakesTemplate;
  }

  render() {}

  unrender() {}

  _bindHandlers() {}
}
