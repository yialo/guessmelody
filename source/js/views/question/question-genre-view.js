import QuestionView from './_question-view';
import TrackView from '../_common/track-view';

export default class QuestonGenreView extends QuestionView {
  _trackList = [];
  _correctAnswers = [];
  _targetGenre = String();

  _trackViews = [];

  _$submitButton = null;

  constructor(question) {
    super();

    this._trackList = question.trackList;
    this._correctAnswers = question.correctAnswers;
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
    this._trackViews = this._trackList.map((it, i) => new TrackView(it, i + 1));
  }

  _addAnswerHandler() {
    this._$submitButton = this._$form.querySelector('.game__submit');

    this._toggleClickabilityState();
  }

  _addAudioHandlers() {
    this._$audioBlocks = this._$container.querySelectorAll('.track');

    this._$audioBlocks.forEach(($it) => {
      $it.$button = $it.querySelector('button');
      $it.$audio = $it.querySelector('audio');
    });

    this._$audioBlocks.forEach(($it) => {
      const { $audio, $button } = $it;
      $button.addEventListener('click', () => {
        const $otherBlocks = new Set([...this._$audioBlocks]);
        $otherBlocks.delete($it);

        if ($audio.paused) {
          $otherBlocks.forEach(($el) => $el.$audio.pause());
          $audio.play();
          $button.classList.add(`track__button--play`);
          $button.classList.remove(`track__button--pause`);
        } else {
          $audio.pause();
          $button.classList.remove(`track__button--play`);
          $button.classList.add(`track__button--pause`);
        }

        $otherBlocks.forEach(($el) => {
          $el.$button.classList.remove(`track__button--play`);
          $el.$button.classList.remove(`track__button--pause`);
        });
      });
    });
  }

  _checkAnswer(selectedAnswers) {
    return (
      selectedAnswers.every((it) => this._correctAnswers.includes(it))
      && this._correctAnswers.every((it) => selectedAnswers.includes(it))
    );
  }

  _toggleClickabilityState() {
    if (this._hasSelectedTracks) {
      this._$submitButton.removeAttribute('disabled');
    } else {
      this._$submitButton.setAttribute('disabled', 'disabled');
    }
  }

  _onFormSubmit(evt) {
    evt.preventDefault();

    const answers = [...this._$checkboxes]
      .filter(($el) => $el.checked)
      .map(($el) => $el.value);

    const answerStatus = this._checkAnswer(answers);

    this._onAnswer(answerStatus);
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
