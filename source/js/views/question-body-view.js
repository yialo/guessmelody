import View from './view';
import QuestionGenreView from './question-genre-view';
import QuestionArtistView from './question-artist-view';

const questionMap = {
  genre: QuestionGenreView,
  artist: QuestionArtistView,
};

export default class QuestionBodyView extends View {
  constructor(question) {
    super();
    this._question = question;
  }

  get template() {
    this._template = `<div class="game__screen"></div>`;
    return this._template;
  }

  set onAnswer(callback) {
    this._onAnswer = callback;
  }

  update(newQuestion) {
    if (newQuestion) this._question = newQuestion;

    const QuestionType = questionMap[this._question.type];
    const questionType = new QuestionType(this._question, this._onAnswer, this.$);

    const markup = (
      `<h2 class="game__title">${questionType.caption}</h2>
      ${questionType.template}`
    );

    this.$.innerHTML = markup;
    this._bind();
  }

  _bind() {
    questionMap[this._question.type].bind(this.$, this._question, this._onAnswer);
  }
}
