import AbstractView from '../_abstract-view.js';
import TrackView from '../_common/track-view.js';

export default class QuestonGenreView extends AbstractView {
  constructor(question) {
    super();

    this._$form = null;
    this._$submitButton = null;

    // TODO: is next statement necessary?
    this._question = question;

    this._trackList = question.trackList;
    this._targetGenre = question.targetGenre;

    this._createTrackViews();
  }

  set onCheckboxChange(callback) {
    this._onCheckboxChange = callback;
  }

  get _template() {
    return (
      `<div class="game__screen">
        <h2 class="game__title">Выберите ${this._targetGenre} треки</h2>
        <form class="game__tracks">
          ${this._formTemplate}
          <button class="game__submit button" type="submit">Ответить</button>
        </form>
      </div>`
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

  defineChildren() {
    if (!this._$form) {
      this._$form = this._$container.querySelector('.game__tracks');
    }
  }

  undefineChildren() {
    this._$form = null;
  }

  activate() {
    this._$form.addEventListener('submit', this._onFormSubmit);
  }

  deactivate() {
    this._$form.removeEventListener('submit', this._onFormSubmit);
  }

  _bind() {
    this._onFormSubmit = this._onFormSubmit.bind(this);
  }
}
