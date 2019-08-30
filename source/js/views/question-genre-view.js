import TrackView from './track-view';
import TypeView from './question-type-view';

export default class QuestonGenreView extends TypeView {
  constructor(...args) {
    super(TrackView, ...args);

    const [question] = args;
    this._correctAnswers = question.correctAnswers;
    this._targetGenre = question.targetGenre;
    this.onCheckboxChange = this._toggleClickabilityState;
  }

  get caption() {
    this._caption = `Выберите ${this._targetGenre} треки`;
    return this._caption;
  }

  set onCheckboxChange(callback) {
    this._onCheckboxChange = callback.bind(this);
  }

  get template() {
    this._template = (
      `<form class="game__tracks">
        ${this.formMarkup}
        <button class="game__submit button" type="submit">Ответить</button>
      </form>`
    );
    return this._template;
  }

  _addAnswerHandler() {
    this._$form = this._$container.querySelector('.game__tracks');
    this._$checkboxes = [...this._$form.querySelectorAll('.game__input')];
    this._$button = this._$form.querySelector('.game__submit');

    this._setClickabilityState(false);

    this._addCheckboxChangeHandlers();

    this._$form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._getAnswerStatus();
    });
  }

  _addCheckboxChangeHandlers() {
    this._$checkboxes.forEach(($el) => $el.addEventListener('change', this._onCheckboxChange));
  }

  _checkSelectedCheckboxPresence() {
    return this._$checkboxes.some(($el) => $el.checked);
  }

  _getAnswerStatus() {
    const answers = [...this._$checkboxes]
      .filter(($el) => $el.checked)
      .map(($el) => $el.value);
    const answerStatus = this._checkAnswer(answers);
    this._onAnswer(answerStatus);
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

  _setClickabilityState(isClickable) {
    if (isClickable) this._$button.removeAttribute('disabled');
    else this._$button.setAttribute('disabled', 'disabled');
  }

  _toggleClickabilityState() {
    if (this._checkSelectedCheckboxPresence()) this._setClickabilityState(true);
    else this._setClickabilityState(false);
  }
}
