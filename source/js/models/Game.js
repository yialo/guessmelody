import cloneDeep from 'lodash.clonedeep';

import { GAME_OPTIONS } from '@/js/constants.js';

const INITIAL_STATE = {
  minutes: 5,
  seconds: 0,
  mistakes: 0,
  questions: [],
  questionIndex: 0,
};

const ARTIST_QUESTION_MOCK = {
  type: 'artist',
  trackSrc: `${process.env.PUBLIC_PATH}files/audio/long_stroll.mp3`,
  artistList: [
    {
      name: 'Kevin MacLeod',
      imgSrc: `${process.env.PUBLIC_PATH}files/img/kevin_macleod.jpg`,
    },
    {
      name: 'Jingle Punks',
      imgSrc: `${process.env.PUBLIC_PATH}files/img/jingle_punks.jpg`,
    },
    {
      name: 'Audionautix',
      imgSrc: `${process.env.PUBLIC_PATH}files/img/audionautix.jpg`,
    },
  ],
  answer: 0,
};

const MOCK_INITIAL_STATE = {
  minutes: 5,
  seconds: 0,
  mistakes: 0,
  questions: new Array(GAME_OPTIONS.QUESTIONS).fill(ARTIST_QUESTION_MOCK),
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
