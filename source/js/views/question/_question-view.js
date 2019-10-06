import View from '../_common/_view';

export default class QuestionView extends View {
  _question;
  _$container;

  constructor(question) {
    super();

    this._question = question;
  }

  get _caption() {
    throw new Error('Method need to be redefined for descendants');
  }

  get _contentTemplate() {
    throw new Error('Method need to be redefined for descendants');
  }

  get _formTemplate() {
    return (
      this._formList
        .map((it, i) => {
          const formItem = new this._FormItemView(it, i + 1);
          return formItem.template;
        })
        .join('')
    );
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

  _addHandlers() {
    this._addAudioHandlers();
    this._addAnswerHandler();
  }

  _addAnswerHandler() {
    throw new Error('Method need to be redefined for descendants');
  }

  _addAudioHandlers() {
    throw new Error('Method need to be redefined for descendants');
  }

  _checkAnswer() {
    throw new Error('Method need to be redefined for descendants');
  }
}
