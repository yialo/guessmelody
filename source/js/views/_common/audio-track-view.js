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

    this._button.onClick = () => {
      this._onClick();
    };
  }

  set onButtonClick(callback) {
    this._onButtonClick = callback;
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

  // TODO: simplify method via mapping
  _onClick() {
    if (this.state === 'play') {
      this.pause();
    } else if (this.state === 'pause') {
      this.play();
    } else if (this.state === 'stop') {
      this.play();
    }

    if (typeof this._onButtonClick === 'function') {
      this._onButtonClick();
    }
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
