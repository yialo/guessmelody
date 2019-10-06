import ResultFailView from './result-fail-veiw';

export default class ResultFailTimeView extends ResultFailView {
  get caption() {
    this._caption = 'Увы и ах!';
    return this._caption;
  }

  get description() {
    this._description = 'Время вышло! Вы не успели отгадать все мелодии.';
    return this._description;
  }
}
