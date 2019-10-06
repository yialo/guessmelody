import View from './view';
import ArtistView from './artist-view';
import TrackView from './track-view';

const formItemMap = {
  genre: TrackView,
  artist: ArtistView,
};

export default class QuestionTypeView extends View {
  constructor(question, onAnswer, $container) {
    super();

    this._quesiton = question;
    this._trackList = question.trackList;
    this._FormItemClass = formItemMap[question.type];
    this._onAnswer = onAnswer;
    this._$container = $container;
  }

  get caption() {
    throw new Error(`Need to redefine method for ${this}`);
  }

  get formMarkup() {
    this._formMarkup = this._trackList
      .map((it, i) => {
        const FormItem = this._FormItemClass;
        const formItem = new FormItem(it, i + 1);
        return formItem.template;
      })
      .join('');
    return this._formMarkup;
  }

  bind() {
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
