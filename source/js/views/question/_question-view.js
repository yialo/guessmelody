import View from '../_common/_view';
import ArtistView from '../_common/artist-view';
import TrackView from '../_common/track-view';

const formItemMap = {
  'genre': TrackView,
  'artist': ArtistView,
};

export default class QuestionView extends View {
  constructor(question) {
    super();

    this._question = question;
    this._FormItemView = formItemMap[this._question.type];
  }

  get _caption() {
    throw new Error('Method need to be redefined for descendants');
  }

  get _contentTemplate() {
    throw new Error('Method need to be redefined for descendants');
  }

  get _formMarkup() {
    return (
      this._trackList
        .map((it, i) => {
          const formItem = new this._FormItemView(it, i + 1);
          return formItem.template;
        })
        .join('')
    );
  }

  get _template() {
    return (
      `<h2 class="game__title">${this._caption}</h2>
      ${this._contentTemplate}`
    );
  }

  _addHandlers() {
    this._addAudioHandlers();
    this._addAnswerHandler();
  }

  _addAnswerHandler() {
    throw new Error(`Need to redefine method for ${this}`);
  }

  _addAudioHandlers() {
    throw new Error(`Need to redefine method for ${this}`);
  }

  _checkAnswer() {
    throw new Error(`Need to redefine method for ${this}`);
  }
}
