import cloneDeep from 'lodash.clonedeep';

import Answer from './Answer.js';
import { GAME_OPTIONS } from '@/js/constants.js';
import { getQuestions as getRandomQuestions } from '../mocks/mockGenerator.js';

const INITIAL_STATE = {
  minutes: 5,
  seconds: 0,
  mistakes: 0,
  question: [],
  questionIndex: 0,
};

const MOCK_INITIAL_STATE = {
  minutes: 5,
  seconds: 0,
  mistakes: 0,
  question: getRandomQuestions(),
  questionIndex: 0,
};

export default class GameModel {
  _options = { ...GAME_OPTIONS };

  constructor(needMock) {
    this._state = cloneDeep(needMock ? INITIAL_STATE : MOCK_INITIAL_STATE);
  }

  get minutes() {
    return this._state.minutes;
  }

  get seconds() {
    return this._state.seconds;
  }
}
