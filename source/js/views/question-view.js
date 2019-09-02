import ScreenView from './screen-view';
import HeaderView from './question-header-view';
import BodyView from './question-body-view';

const QUESTION_TYPES = ['genre', 'artist'];
const BEM_MODIFIERS = QUESTION_TYPES.map((it) => `game--${it}`);

export default class QuestionView extends ScreenView {
  constructor(model, handler) {
    super();

    this._options = model.options;
    this._state = model.state;
    this._question = model.currentQuestion;

    this._header = new HeaderView(this._state);
    this._header.onReset = handler.onReset;

    this._body = new BodyView(this._question);
    this._body.onAnswer = (isCorrect) => {
      if (isCorrect) {
        if (this._state.currentQuestionIndex === this._options.QUESTIONS - 1) handler.onWin();
        else {
          this._state.currentQuestionIndex += 1;
          handler.onNext(this._update.bind(this));
        }
      } else {
        this._state.mistakes += 1;
        this._header.updateMistakesView();
      }

      if (this._state.mistakes === this._options.ATTEMPTS) handler.onFail();
    };
  }

  get template() {
    this._template = `<section class="game"></section>`;
    return this._template;
  }

  render() {
    this._update();
    this.$.append(this._header.prepared, this._body.$);
    this._set();
  }

  updateHeader() {
    this._header.updateTimeView();
  }

  _showConsoleTip() {
    console.group('Вопрос');
    console.dir(this._question);
    const propName = (this._question.type === 'genre')
      ? 'correctAnswers'
      : 'correctAnswer';
    console.info(`Правильный ответ: ${this._question[propName]}`);
    console.groupEnd();
  }

  _update(newQuestion) {
    if (newQuestion) this._question = newQuestion;
    this._updateBemModifier();
    this._body.update(newQuestion);

    if (this._options.IS_DEBUG_ACTIVE) this._showConsoleTip();
  }

  _updateBemModifier() {
    const newModifier = `game--${this._question.type}`;
    const { classList } = this.$;

    if (classList.length > 1) BEM_MODIFIERS.forEach((it) => classList.toggle(it));
    else classList.add(newModifier);
  }
}
