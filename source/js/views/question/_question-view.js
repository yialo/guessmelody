import View from '../_common/_view';

export default class QuestionView extends View {
  _question;
  _$container;

  _onAnswer = () => {
    throw new Error('Callback need to be redefined for every instance');
  };

  constructor(question) {
    super();

    this._question = question;
  }

  set onAnswer(callback) {
    this._onAnswer = callback;
  }

  get _caption() {
    throw new Error('Method need to be redefined for descendants');
  }

  get _contentTemplate() {
    throw new Error('Method need to be redefined for descendants');
  }

  get _template() {
    return (
      `<h2 class="game__title">${this._caption}</h2>
      ${this._contentTemplate}`
    );
  }

  render($container) {
    if (!this._$container) {
      this._$container = $container;
    }

    this._$ = QuestionView.createEl(this._template);
    this._addHandlers();
    this._$container.appendChild(this._$);
  }

  unrender() {
    this._$.remove();
    this._removeHandlers();
    this._$ = null;
  }

  _checkAnswer() {
    throw new Error('Method need to be redefined for descendants');
  }

  _addAnswerHandler() {
    throw new Error('Method need to be redefined for descendants');
  }

  _addAudioHandler() {
    throw new Error('Method need to be redefined for descendants');
  }
}
