import View from './_view';
import AudioView from './audio-view';

export default class TrackView extends View {
  _track = {};
  _number = Number();

  _audio = null;

  _$container = null;
  _$ = null;
  _$checkbox = null;

  _onCheck = () => {
    throw new Error('Callback need to be redefined for every instance');
  };

  _onUncheck = () => {
    throw new Error('Callback need to be redefined for every instance');
  };

  constructor(track, number) {
    super();

    this._track = track;
    this._number = number;

    this._audio = new AudioView(this._track, this._isAutoplay);
  }

  set onCheck(callback) {
    this._onCheck = callback;
  }

  set onUnckeck(callback) {
    this._onUncheck = callback;
  }

  get answer() {
    return this._$checkbox.value;
  }

  get template() {
    return (
      `<div class="track">
        <button class="track__button track__button--${this._stateModifier}" type="button"></button>
        <div class="track__status">
          ${this._audio.template}
        </div>
        <div class="game__answer">
          <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-${this._number}" id="answer-${this._number}">
          <label class="game__check" for="answer-${this._number}">Отметить</label>
        </div>
      </div>`
    );
  }

  get _isAutoplay() {
    return (this._number === 1);
  }

  get _stateModifier() {
    return this._isAutoplay ? 'play' : '';
  }

  get _isChecked() {
    return this._$checkbox.checked;
  }

  render($container) {
    this._$container = $container;

    this._$ = this._$container.querySelector('.track');

    this._addHandlers();
  }

  unrender() {
    this._removeHandlers();

    this._$ = null;
  }

  play() {
    this._audio.play();
  }

  pause() {
    this._audio.pauge();
  }

  _onChange() {
    if (this._isChecked) {
      this._onCheck();
    } else {
      this._onUncheck();
    }
  }

  _addHandlers() {
    this._$checkbox = this._$.querySelector('.game__input');

    this._$checkbox.addEventListener('change', this._onChange);
  }

  _removeHandlers() {
    this._$checkbox.removeEventListener('change', this._onChange);
  }

  _bindHandlers() {
    this._onChange = this._onChange.bind(this);
  }
}
