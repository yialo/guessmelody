const WORD_TERMINATION_MAP = {
  score: {
    single: '',
    less: 'а',
    many: 'ов',
  },
  mistakes: {
    single: 'ку',
    less: 'ки',
    many: 'ок',
  },
};

export default class NotificationPhrase {
  constructor(score, mistakes) {
    this._score = score;
    this._mistakes = mistakes;
  }

  get score() {
    const term = NotificationPhrase.getTerm('score', this._score);
    return `балл${term}`;
  }

  get mistakes() {
    if (this._mistakes === 0) {
      return `не совершив ни единой ошибки`;
    }

    const term = NotificationPhrase.getTerm('mistakes', this._mistakes);
    return `совершив ${this._mistakes} ошиб${term}`;
  }

  static getTerm(type, amount) {
    const lastDigit = +String(amount).slice(-1);
    const map = WORD_TERMINATION_MAP[type];

    if (lastDigit === 1) return map.single;
    if (lastDigit >= 2 && lastDigit <= 4) return map.less;
    return map.many;
  }
}
