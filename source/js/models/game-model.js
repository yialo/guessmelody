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

    this.resetState();
    this.resetQuestions();
  }

  get currentQuesiton() {
    return this._questions[this._state.currentQuestionIndex];
  }

  countAnswer() {
    this._answers.push(new Answer());
  }

  resetQuestions() {
    this._questions = getRandomQuestions();
  }

  resetState() {
    Object.assign(this._state, INITIAL_STATE);
  }
}
