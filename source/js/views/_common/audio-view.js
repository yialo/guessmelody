import View from './_view';

export default class AudioView extends View {
  _audioSrc = {};
  _isAutoplay = Boolean();

  _$container = null;
  _$ = null;

  constructor(track, isAutoplay = false) {
    super();

    this._audioSrc = track.audio;
    this._isAutoplay = isAutoplay;
  }

  get template() {
    const autoplayAttribute = this._isAutoplay ? ` autoplay="autoplay"` : ``;

    return (
      `<audio${autoplayAttribute} loop="loop">
        <source src="${this._audioSrc}" type="audio/mpeg">
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
