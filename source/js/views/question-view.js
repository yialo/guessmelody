import ScreenView from './screen-view';
import HeaderView from './header-view';

const QUESTION_TYPES = ['genre', 'artist'];
const BEM_MODIFIERS = QUESTION_TYPES.map((it) => `game--${it}`);

export default class QuestionView extends ScreenView {
  constructor(state, question) {
    super();
    this._state = state;
    this._question = question;
    this._header = new HeaderView(state);
  }

  set question(value) {
    this._question = value;
  }

  get template() {
    if (!this._template) {
      this._template = `<section class="game"></section>`;
    }
    return this._template;
  }

  get $() {
    if (!this._$) {
      this.render();
    }
    return this._$;
  }

  updateBemModifier() {
    const newModifier = `game--${this._question.type}`;
    const { classList } = this.$;

    if (classList.length > 1) BEM_MODIFIERS.forEach((it) => classList.toggle(it));
    else classList.add(newModifier);
  }

  appendDebugger() {
    console.group('Вопрос');
    console.dir(this._question);
    const propName = (this._question.type === 'genre')
      ? 'correctAnswers'
      : 'correctAnswer';
    console.info(`Правильный ответ: ${this._question[propName]}`);
    console.groupEnd();
  }

  // TODO: need to redefine
  // bind() {

  // }
}
