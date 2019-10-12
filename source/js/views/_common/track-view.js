import View from './_view';
import AudioView from './audio-view';
import TrackButtonView from './track-button-view';

export default class TrackView extends View {
  _track = {};
  _number = Number();

  _audio = null;
  _button = null;

  _$container = null;
  _$ = null;
  _$button = null;
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

    this._audio = new AudioView(this._track);
    this._button = new TrackButtonView();
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
        ${this._button.template}
        <div class="track__status">
          ${this._audio.template}
        </div>
        <div class="game__answer">
          <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-${this._number}" id="answer-${this._number}">
          <label class="game__check" for="answer-${this._number}" aria-label="Отметить"></label>
        </div>
      </div>`
    );
  }

  // FIXME: заменить на автостарт 1-го трека через state компонентов AudioView и TrackButtonView
  get _isAutoplay() {
    return (this._number === 1);
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
    this._button.play();
  }

  pause() {
    this._audio.pause();
    this._button.pause();
  }

  stop() {
    this._audio.stop();
    this._button.stop();
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
