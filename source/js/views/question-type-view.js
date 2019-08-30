import View from './view';

export default class QuestionTypeView extends View {
  constructor(FormItemClass, question, onAnswer, $container) {
    super();
    this._quesiton = question;
    this._trackList = question.trackList;
    this._FormItemClass = FormItemClass;
    this._onAnswer = onAnswer;
    this._$container = $container;
  }

  get caption() {
    throw new Error(`Need to redefine method for ${this}`);
  }

  get formMarkup() {
    this._formMarkup = this._trackList
      .map((it, i) => {
        // TODO: try to remove braces
        const formItem = new (this._FormItemClass)(it, i + 1);
        return formItem.template;
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
