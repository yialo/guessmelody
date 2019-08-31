export default class UserResultModel {
  constructor(score, mistakes, minutes, seconds) {
    this.score = score;
    this._mistakes = mistakes;
    this._minutes = minutes;
    this._seconds = seconds;
  }

  get timeRemain() {
    this._timeRemain = this._minutes * 60 + this._seconds;
    return this._timeRemain;
  }
}
