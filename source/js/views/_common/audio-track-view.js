import View from './_view';
import AudioView from './audio-view';
import TrackButtonView from './track-button-view';

export default class AudioTrackView extends View {
  _audio = null;
  _button = null;

  constructor(track) {
    super();

    this._audio = new AudioView(track);
    this._button = new TrackButtonView();
  }

  set onClick(callback) {
    this._button.onClick = callback;
  }

  get state() {
    return this._audio.state;
  }

  get audioTemplate() {
    return this._audio.template;
  }

  get buttonTemplate() {
    return this._button.template;
  }

  render($container) {
    this._$container = $container;

    this._addHandlers();
  }

  unrender() {
    this._removeHandlers();
  }

  pause() {
    this._audio.pause();
    this._button.pause();
  }

  play() {
    this._audio.play();
    this._button.play();
  }

  stop() {
    this._audio.stop();
    this._button.stop();
  }

  _addHandlers() {
    this._audio.render(this._$container);
    this._button.render(this._$container);
  }

  _removeHandlers() {
    this._audio.unrender();
    this._button.unrender();
  }

  _bindHandlers() {}
}
