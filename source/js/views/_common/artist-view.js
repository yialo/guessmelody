import View from './_view';

export default class ArtistView extends View {
  _$container = null;
  _$ = null;
  _$radio = null;

  _imageSrc = String();
  _artist = String();
  _number = Number();

  _onClick = () => {
    throw new Error('Callback need to be redefined for every instance');
  };

  constructor(track, number) {
    super();

    this._imageSrc = track.image;
    this._artist = track.artist;
    this._number = number;
  }

  set onClick(callback) {
    this._onClick = callback;
  }

  get artistId() {
    return `artist-${this._number}`;
  }

  get template() {
    return (
      `<div class="artist">
        <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-${this._number}" id="answer-${this._number}">
        <label class="artist__name" for="answer-${this._number}">
          <img class="artist__picture" src="${this._imageSrc}" alt="${this._artist}">
          ${this._artist}
        </label>
      </div>`
    );
  }

  render($container) {
    if (!this._$container) {
      this._$container = $container;
    }

    if (!this._$) {
      this._$ = $container.querySelector('.artist');
    }

    this._addHandlers();
  }

  unrender() {
    this._removeHandlers();

    this._$ = null;
  }

  _addHandlers() {
    if (!this._$radio) {
      this._$radio = this._$.querySelector('.artist__input');
    }

    this._$radio.addEventListenter('click', this._onClick);
  }

  _removeHandlers() {
    this._$radio.removeEventListenter('click', this._onClick);
  }

  _bindHandlers() {
    this._onClick = this._onClick.bind(this);
  }
}
