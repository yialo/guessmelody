import { getOtherResults } from '../../mocks/mock-generator.js';
import NotificationPhrase from '../../utils/notification-phrase-handler/notification-phrase-handler.js';
import GameOptions from '../../utils/game-options.js';
import calculateScore from '../../utils/calculate-score/calculate-score.js';
import getGameResult from '../../utils/get-game-result/get-game-result.js';
import ResultView from './_result-view.js';
import UserResultModel from '../../models/user-result-model/user-result-model.js';

const __mockUserResult = {
  minutes: 2,
  seconds: 15,
};

export default class ResultSuccessView extends ResultView {
  // TODO: replace params with state object
  constructor(model) {
    super();

    this._minutes = __mockUserResult.minutes;
    this._seconds = __mockUserResult.seconds;
    this._answers = model.answers;
    this._mistakes = model.state.mistakes;
  }

  get caption() {
    this._caption = 'Вы настоящий меломан!';
    return this._caption;
  }

  get content() {
    const notification = new NotificationPhrase(this.score, this._mistakes);

    this._content = (
      `<p class="result__total">За ${this._minutes} минуты и ${this._seconds} секунд вы набрали ${this.score} ${notification.score} (${this.quickAnswers} быстрых ответов), ${notification.mistakes}.</p>
      <p class="result__text">${this.gameResult}</p>`
    );

    return this._content;
  }

  get gameResult() {
    this._gameResult = getGameResult(this.userResult, this.otherResults);
    return this._gameResult;
  }

  get otherResults() {
    this._otherResults = getOtherResults();
    return this._otherResults;
  }

  get quickAnswers() {
    this._quickAnswers = this._answers
      .filter((it) => it.time < GameOptions.QUICK_THRESHOLD)
      .length;
    return this._quickAnswers;
  }

  get score() {
    if (!this._score) {
      this._score = calculateScore(this._answers, this._mistakes);
    }
    return this._score;
  }

  get tip() {
    this._tip = 'Сыграть ещё раз';
    return this._tip;
  }

  get userResult() {
    this._userResult = new UserResultModel(
      this.score,
      this._mistakes,
      this._minutes,
      this._seconds
    );
    return this._userResult;
  }

  static getQuickAnswersAmount(answers) {
    return (
      answers
        .filter((it) => it.time < GameOptions.QUICK_THRESHOLD)
        .length
    );
  }
}
