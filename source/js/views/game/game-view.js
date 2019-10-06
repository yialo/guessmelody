import ScreenView from '../_common/_screen-view';
import GameHeaderView from './game-header-view';
import QuestionArtistView from '../question/question-artist-view';
import QuestionGenreView from '../question/question-genre-view';

const QUESTION_TYPES = ['genre', 'artist'];
const BEM_MODIFIERS = QUESTION_TYPES.map((it) => `game--${it}`);

const questionTypeToClass = {
  'genre': QuestionGenreView,
  'artist': QuestionArtistView,
};

export default class GameView extends ScreenView {
  _headerView = null;
  _questionView = null;

  constructor(model) {
    super('game');

    this._headerView = new GameHeaderView();
  }

  set onReset(callback) {
    this._headerView.onReset = callback;
  }

  get _contentTemplate() {
    return (
      `${this._headerView.template}
      <div class="game__screen"></div>`
    );
  }

  render() {
    this._create();
    this._$question = this._$.querySelector('.game__screen');
    this._append();
  }

  unrender() {
    this._remove();
    this._$question = null;
    this._destroy();
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

    if (classList.length > 1) BEM_MODIFIERS.forEach((it) => {
      classList.toggle(it);
    });
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
