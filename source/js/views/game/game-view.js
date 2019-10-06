import ScreenView from '../_common/_screen-view';
import GameHeaderView from './game-header-view';
// import QuestionView from '../question/question-body-view';

const QUESTION_TYPES = ['genre', 'artist'];
const BEM_MODIFIERS = QUESTION_TYPES.map((it) => `game--${it}`);

export default class GameView extends ScreenView {
  _headerView = null;
  _questionView = null;

  constructor(model) {
    super('game');

    this._headerView = new GameHeaderView();
    // this._questionView = new QuestionView();
  }

  set onReset(callback) {
    this._headerView.onReset = callback;
  }

  get _contentTemplate() {
    return (

      `${this._headerView.template}`

    // `${this._headerView.template}
    // ${this._questionView.template}`
    );
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
    this._questionView.update(newQuestion);

    if (this._options.IS_DEBUG_ACTIVE) this._showConsoleTip();
  }

  _updateBemModifier() {
    const newModifier = `game--${this._question.type}`;
    const { classList } = this.$;

    if (classList.length > 1) BEM_MODIFIERS.forEach((it) => classList.toggle(it));
    else classList.add(newModifier);
  }

  _addHandlers($container) {
    this._headerView.render($container);
  }

  _removeHandlers() {
    this._headerView.unrender();
  }

  _bindHandlers() {}
}
