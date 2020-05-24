import { GAME_OPTIONS } from '@/js/constants.js';

const INITIAL_STATE = {
  minutes: 5,
  seconds: 0,
  mistakes: 0,
  questions: [],
  questionIndex: 0,
};

export default class GameModel {
  _options = { ...GAME_OPTIONS };

  constructor(questions) {
    this._state = { ...INITIAL_STATE, questions };
  }

  get minutes() {
    return this._state.minutes;
  }

  get seconds() {
    return this._state.seconds;
  }

  get mistakes() {
    return this._state.mistakes;
  }

  get question() {
    return this._state.questions[this._state.questionIndex];
  }
}
