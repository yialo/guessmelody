import View from './_view';

export default class AudioView extends View {
  _audioSrc = {};
  _state = String();

  _$container = null;
  _$ = null;

  constructor(track) {
    super();

    this._audioSrc = track.audio;

    this._state = 'stop';
  }

  get template() {
    return (
      `<audio loop="loop">
        <source src="${this._audioSrc}" type="audio/mpeg">
      </audio>`
    );
  }

  get state() {
    return this._state;
  }

  render($container) {
    this._$container = $container;

    this._$ = this._$container.querySelector('audio');
  }

  unrender() {
    this._$ = null;
  }

  play() {
    this._$.play()
      .catch((err) => {
        console.log(`Не могу запустить трек. Описание ошибки: ${err.message}`);
      });

    this._state = 'play';
  }

  pause() {
    this._$.pause();
    this._state = 'pause';
  }

  stop() {
    this._$.pause();
    this._state = 'stop';
  }

  _bindHandlers() {}
}
