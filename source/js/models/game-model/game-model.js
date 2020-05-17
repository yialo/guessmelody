import Answer from '../answer-model/answer-model.js';
import GameOptions from '../../utils/game-options.js';
import { getQuestions as getRandomQuestions } from '../../mocks/mock-generator.js';

const INITIAL_STATE = {
  minutes: 5,
  seconds: 0,
  mistakes: 0,
  currentQuestionIndex: 0,
};
Object.freeze(INITIAL_STATE);

export default class GameModel {
  constructor() {
    this._options = Object.assign({}, GameOptions);
    this._state = {};
    this._answers = [];

    this._resetQuestions();
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

  get _type() {
    return this.currentQuestion.type;
  }

  countAnswer() {
    this._answers.push(new Answer());
  }

  reset() {
    this.resetState();
    this.resetAnswers();
    this._resetQuestions();
  }

  resetAnswers() {
    this._answers.length = 0;
  }

  resetState() {
    Object.assign(this._state, INITIAL_STATE);
  }

  // TODO: заменить на Symbol.iterator
  toNextQuestion() {
    this._state.currentQuestionIndex += 1;
  }

  checkAnswer(answerData) {
    if (this._type === 'genre') {
      const { correctAnswers } = this.currentQuestion;

      return (
        answerData.every((it) => correctAnswers.includes(it))
        && correctAnswers.every((it) => answerData.includes(it))
      );
    }

    if (this._type === 'artist') {
      return (answerData === this.currentQuestion.correctAnswer);
    }
  }

  _resetQuestions() {
    this._questions = getRandomQuestions();
  }
}
