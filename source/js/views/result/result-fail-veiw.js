import ResultView from './_result-view.js';

export default class ResultFailView extends ResultView {
  get content() {
    this._content = (
      `<p class="result__total result__total--fail">${this.description}</p>`
    );
    return this._content;
  }

  get description() {
    throw new Error(`Need to redefine method for ${this}`);
  }

  get tip() {
    this._tip = 'Попробовать ещё раз';
    return this._tip;
  }
}
