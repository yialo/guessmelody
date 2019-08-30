import Answer from './answer-model';
import { GameOptions, INITIAL_STATE } from './game-config';
import { getQuestions as getRandomQuestions } from '../lib/mock-generator';

export default class GameModel {
  constructor() {
    this._options = GameOptions;
    this._state = {};
    this._answers = [];

    this.resetQuestions();
    this.resetState();
  }

  get answers() {
    return this._answers;
  }

  get currentQuestion() {
    return this._questions[this._state.currentQuestionIndex];
  }

  get options() {
    return this._options;
  }

  get state() {
    return this._state;
  }

  countAnswer() {
    this._answers.push(new Answer());
  }

  resetAnswers() {
    this._answers.length = 0;
  }

  resetQuestions() {
    this._questions = getRandomQuestions();
  }

  resetState() {
    Object.assign(this._state, INITIAL_STATE);
  }
}
