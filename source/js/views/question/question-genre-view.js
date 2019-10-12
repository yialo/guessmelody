import QuestionView from './_question-view';
import TrackView from '../_common/track-view';

export default class QuestonGenreView extends QuestionView {
  _trackList = [];
  _targetGenre = String();

  _trackViews = [];

  _$submitButton = null;

  constructor(question) {
    super();

    this._trackList = question.trackList;
    this._targetGenre = question.targetGenre;

    this._createTrackViews();
  }

  set onCheckboxChange(callback) {
    this._onCheckboxChange = callback;
  }

  get _caption() {
    return `Выберите ${this._targetGenre} треки`;
  }

  get _contentTemplate() {
    return (
      `<form class="game__tracks">
        ${this._formTemplate}
        <button class="game__submit button" type="submit">Ответить</button>
      </form>`
    );
  }

  get _formTemplate() {
    return this._trackViews
      .map((view) => view.template)
      .join('');
  }

  get _hasSelectedTracks() {
    return this._trackViews.some((view) => view.isChecked);
  }

  _createTrackViews() {
    this._trackViews = this._trackList
      .map((it, i) => new TrackView(it, i + 1));
  }

  _addAnswerHandler() {
    this._$submitButton = this._$form.querySelector('.game__submit');

    this._setClickabilityState();
  }

  _setClickabilityState() {
    if (this._hasSelectedTracks) {
      this._$submitButton.removeAttribute('disabled');
    } else {
      this._$submitButton.setAttribute('disabled', 'disabled');
    }
  }

  _onFormSubmit(evt) {
    evt.preventDefault();

    const answers = this._trackViews
      .filter((view) => view.checked)
      .map((view) => view.answer);

    this._onAnswer(answers);
  }

  _addHandlers() {
    this._$form = this._$container.querySelector('.game__tracks');

    this._$form.addEventListener('submit', this._onFormSubmit);
  }

  _removeHandlers() {
    this._$form.removeEventListener('submit', this._onFormSubmit);
  }

  _bindHandlers() {
    this._onFormSubmit = this._onFormSubmit.bind(this);
  }
}
