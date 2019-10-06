import View from './_view';

export default class ArtistView extends View {
  constructor(track, index) {
    super();

    this._track = track;
    this._index = index;
  }

  get template() {
    this._template = (
      `<div class="artist">
        <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-${this._index}" id="answer-${this._index}">
        <label class="artist__name" for="answer-${this._index}">
          <img class="artist__picture" src="${this._track.image}" alt="${this._track.artist}">
          ${this._track.artist}
        </label>
      </div>`
    );
    return this._template;
  }
}
