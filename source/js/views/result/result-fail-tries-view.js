import ResultFailView from './result-fail-veiw.js';

export default class ResultFailTriesView extends ResultFailView {
  get caption() {
    this._caption = 'Какая жалость!';
    return this._caption;
  }

  get description() {
    this._description = 'У вас закончились все попытки. Ничего, повезёт в следующий раз!';
    return this._description;
  }
}
