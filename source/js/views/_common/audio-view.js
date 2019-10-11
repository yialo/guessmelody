import View from './_view';

export default class AudioView extends View {
  constructor(track, isAutoplay = false) {
    super();

    this._track = track;
    this._isAutoplay = isAutoplay;
  }

  get template() {
    const autoplayAttribute = this._isAutoplay ? ` autoplay="autoplay"` : ``;

    return (
      `<audio${autoplayAttribute} loop="loop">
        <source src="${this._track.audio}" type="audio/mpeg">
      </audio>`
    );
  }

  get isPaused() {
    return this._$.paused;
  }

  render($container) {
    this._$container = $container;

    this._$ = this._$container.querySelector('audio');
  }

  unrender() {
    this._$ = null;
  }

  play() {
    this._$.play();
  }

  pause() {
    this._$.pause();
  }

  _bindHandlers() {}
}
