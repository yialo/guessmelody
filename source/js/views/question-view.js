import AbstractView from './abstract-view';
import HeaderView from './header-view';

class QuestionView extends AbstractView {
  constructor(question) {
    super();
    this.question = question;
    this.header = new HeaderView();
  }

  get template() {
    if (!this._template) {
      this._template = `<section class="game"></section>`;
    }
    return this._template;
  }
}

export default (question) => {
  const questionScreen = new QuestionView(question);
  return questionScreen.$;
};
