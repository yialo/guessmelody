import View from './_view';
import AudioTrackView from './audio-track-view';

export default class TrackView extends View {
  _track = {};
  _number = Number();

  _audioTrack = null;

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

    this._audioTrack = new AudioTrackView(this._track);
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
        ${this._audioTrack.buttonTemplate}
        <div class="track__status">
          ${this._audioTrack.audioTemplate}
        </div>
        <div class="game__answer">
          <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-${this._number}" id="answer-${this._number}">
          <label class="game__check" for="answer-${this._number}" aria-label="Отметить"></label>
        </div>
      </div>`
    );
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
    this._audioTrack.play();
  }

  pause() {
    this._audioTrack.pause();
  }

  stop() {
    this._audioTrack.stop();
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

    this._audioTrack.render(this._$);

    if (this._number === 1) {
      this._audioTrack.play();
    }
  }

  _removeHandlers() {
    this._$checkbox.removeEventListener('change', this._onChange);

    this._audioTrack.unrender();
  }

  _bindHandlers() {
    this._onChange = this._onChange.bind(this);
  }
}
