import Answer from './answer';
import { getQuestions as getRandomQuestions } from '../lib/mock-generator';

const GameOptions = {
  QUESTIONS: 10,
  ATTEMPTS: 3,
  QUICK_THRESHOLD: 30,
  IS_DEBUG_ACTIVE: true,
};

const INITIAL_STATE = {
  minutes: 5,
  seconds: 0,
  mistakes: 0,
  currentQuestionIndex: 0,
};

export default class GameModel {
  constructor() {
    this._options = GameOptions;
    this._state = {};
    this._answers = [];
    this._questions = getRandomQuestions();

    this.resetState();
  }

  get answers() {
    return this._answers;
  }

  get currentQuestion() {
    return this._questions[this._state.currentQuestionIndex];
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

  resetState() {
    Object.assign(this._state, INITIAL_STATE);
  }
}
