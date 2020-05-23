import AbstractView from '../_Abstract.js';

export default class QuestonView extends AbstractView {
  // constructor(question) {
  //   super();
  // }

  set onAnswer(callback) {
    this._onAnswer = callback;
  }
}
