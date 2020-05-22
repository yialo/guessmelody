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

  get state() {
    return this._state;
  }
}

// export default class GameModel {
//   constructor() {
//     this._options = { ...GAME_OPTIONS };
//     this._state = {};
//     this._answers = [];

//     this._resetQuestions();
//     this.resetState();
//   }

//   get currentQuestion() {
//     return this._questions[this._state.currentQuestionIndex];
//   }

//   get state() {
//     return this._state;
//   }

//   get _type() {
//     return this.currentQuestion.type;
//   }

//   toNextQuestion() {
//     this._state.currentQuestionIndex += 1;
//   }

//   checkAnswer(answerData) {
//     if (this._type === 'genre') {
//       const { correctAnswers } = this.currentQuestion;

//       return (
//         answerData.every((it) => correctAnswers.includes(it))
//         && correctAnswers.every((it) => answerData.includes(it))
//       );
//     }

//     if (this._type === 'artist') {
//       return (answerData === this.currentQuestion.correctAnswer);
//     }
//   }
// }
