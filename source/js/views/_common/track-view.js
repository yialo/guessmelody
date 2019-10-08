import View from './_view';
import AudioView from './audio-view';

export default class TrackView extends View {
  constructor(track, number) {
    super();

    this._track = track;
    this._number = number;
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

  get _audio() {
    return new AudioView(this._track, this._isAudioAutoplay);
  }
}
