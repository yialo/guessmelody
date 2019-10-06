import View from './view';

export default class AudioView extends View {
  constructor(track, isAutoplay = false) {
    super();
    this._track = track;
    this._isAutoplay = isAutoplay;
  }

  get template() {
    const autoplayAttribute = this._isAutoplay ? ` autoplay="autoplay"` : ``;

    this._template = (
      `<audio${autoplayAttribute} loop="loop">
        <source src="${this._track.audio}" type="audio/mpeg">
      </audio>`
    );
    return this._template;
  }
}
