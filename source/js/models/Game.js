import cloneDeep from 'lodash.clonedeep';

import { GAME_OPTIONS } from '@/js/constants.js';

import { ArtistQuestionMock, GenreQuestionMock } from '../mocks/simpleMocks.js';

const INITIAL_STATE = {
  minutes: 5,
  seconds: 0,
  mistakes: 0,
  questions: [],
  questionIndex: 0,
};

const mockedQuestions = [
  new ArtistQuestionMock([0, 1, 2], 0),
  new GenreQuestionMock([0, 1, 2, 3], 0),
];

const MOCK_INITIAL_STATE = {
  minutes: 5,
  seconds: 0,
  mistakes: 0,
  questions: mockedQuestions,
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

  get mistakes() {
    return this._state.mistakes;
  }

  get question() {
    return this._state.questions[this._state.questionIndex];
  }
}
