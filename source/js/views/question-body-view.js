import View from './view';

import * as genre from '../elements/question-genre';
import * as artist from '../elements/question-artist';

const questionMap = { genre, artist };

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

    const lib = questionMap[this._question.type];

    const caption = lib.updateCaption(this._question);
    const content = lib.getContentTemplate(this._question);

    const markup = (
      `<h2 class="game__title">${caption}</h2>
      ${content}`
    );

    this.$.innerHTML = markup;
    this._bind();
  }

  _bind() {
    questionMap[this._question.type].bind(this.$, this._question, this._onAnswer);
  }
}
