import View from '../_common/_view';

export default class QuestionView extends View {
  _question = {};

  _$container = null;

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
    this._$container = $container;

    this._$container.innerHTML = this._template;

    this._addHandlers();
  }

  unrender() {
    this._removeHandlers();

    this._$container.innerHTML = ``;
  }

  _checkAnswer() {
    throw new Error('Method need to be redefined for descendants');
  }
}
