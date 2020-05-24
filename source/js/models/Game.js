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
  trackSrc: `${process.env.PUBLIC_PATH}files/audio/muse__map_of_the_problematique.mp3`,
  artistList: [
    {
      name: 'Muse',
      imgSrc: `${process.env.PUBLIC_PATH}files/img/muse.jpg`,
    },
    {
      name: 'The Prodigy',
      imgSrc: `${process.env.PUBLIC_PATH}files/img/the_prodigy.jpg`,
    },
    {
      name: 'Blackmore\'s Night',
      imgSrc: `${process.env.PUBLIC_PATH}files/img/blackmore's_night.jpg`,
    },
  ],
  answer: 0,
};

const GENRE_QUESTION_MOCK = {
  type: 'genre',
  trackList: [
    {
      audioSrc: `${process.env.PUBLIC_PATH}files/audio/firefly.mp3`,
    },
    {
      audioSrc: `${process.env.PUBLIC_PATH}files/audio/in_the_land_of_rhinoplasty.mp3`,
    },
    {
      audioSrc: `${process.env.PUBLIC_PATH}files/audio/level_plane.mp3`,
    },
    {
      audioSrc: `${process.env.PUBLIC_PATH}files/audio/long_stroll.mp3`,
    },
  ],
  targetGenre: 'Jazz',
};

const MOCK_INITIAL_STATE = {
  minutes: 5,
  seconds: 0,
  mistakes: 0,
  questions: [ARTIST_QUESTION_MOCK, GENRE_QUESTION_MOCK],
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
