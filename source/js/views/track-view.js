import View from './view';
import AudioView from './audio-view';

export default class TrackView extends View {
  constructor(track, number) {
    super();
    this._track = track;
    this._number = number;

    const isAudioAutoplay = (this._number === 1);
    this._audio = new AudioView(this._track, isAudioAutoplay);
  }

  get template() {
    const buttonStateModifier = (this._number === 1) ? 'play' : '';
    this._template = (
      `<div class="track">
        <button class="track__button track__button--${buttonStateModifier}" type="button"></button>
        <div class="track__status">
          ${this._audio.template}
        </div>
        <div class="game__answer">
          <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-${this._number}" id="answer-${this._number}">
          <label class="game__check" for="answer-${this._number}">Отметить</label>
        </div>
      </div>`
    );
    return this._template;
  }
}
