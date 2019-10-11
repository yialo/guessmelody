import GameOptions from '../../models/game-options';
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

  constructor(question) {
    super('game');

    this._question = question;

    this._headerView = new GameHeaderView();
  }

  set onReset(callback) {
    this._headerView.onReset = callback;
  }

  get _type() {
    return this._question.type;
  }

  get _contentTemplate() {
    return (
      `${this._headerView.template}
      <div class="game__screen"></div>`
    );
  }

  render() {
    this._create();
    this._addHandlers();
    this._$question = this._$.querySelector('.game__screen');
    this._append();
  }

  unrender() {
    this._remove();
    this._$question = null;
    this._removeHandlers();
    this._destroy();
  }

  update() {
    this._updateBemModifier();

    this._updateQuestionView();

    if (GameOptions.IS_DEBUG_ACTIVE) {
      this._showConsoleTip();
    }
  }

  _updateQuestionView() {
    if (this._questionView) {
      this._questionView.unrender();
    }

    const QuestionView = questionTypeToClass[this._type];
    this._questionView = new QuestionView(this._question);
    this._questionView.render(this._$question);
  }

  _showConsoleTip() {
    console.group('Вопрос');
    console.dir(this._question);
    const propName = (this._type === 'genre')
      ? 'correctAnswers'
      : 'correctAnswer';
    console.info(`Правильный ответ: ${this._question[propName]}`);
    console.groupEnd();
  }

  _updateBemModifier() {
    const newModifier = `game--${this._type}`;
    const { classList } = this._$;

    if (classList.length > 1) {
      BEM_MODIFIERS.forEach((it) => {
        classList.toggle(it);
      });
    } else {
      classList.add(newModifier);
    }
  }

  _addHandlers() {
    this._headerView.render(this._$);
  }

  _removeHandlers() {
    this._headerView.unrender();
  }

  _bindHandlers() {}
}
