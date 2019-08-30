import View from './view';

export default class QuestionTypeView extends View {
  constructor(question, onAnswer, formItemClass) {
    super();
    this._question = question;
    this._trackList = this._question.trackList;
    this._formItemClass = formItemClass;
    this._onAnswer = onAnswer;
  }

  get caption() {
    throw new Error(`Need to redefine method for ${this}`);
  }

  get formMarkup() {
    this._formMarkup = this._trackList
      .map((it, i) => {
        const itemView = new (this._formItemClass)(it, i + 1);
        return itemView.template;
      })
      .join('');
    return this._formMarkup;
  }

  bind() {
    this._addAnswerHandler();
    this._addAnswerHandler();
  }

  _addAnswerHandler() {
    throw new Error(`Need to redefine method for ${this}`);
  }

  _addAudioHandlers() {
    throw new Error(`Need to redefine method for ${this}`);
  }

  _checkAnswer() {
    throw new Error(`Need to redefine method for ${this}`);
  }
}
