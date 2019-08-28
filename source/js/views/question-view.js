import AbstractView from './abstract-view';

class QuestionView extends AbstractView {
  constructor() {
    super();
    this._template = `<section class="game"></section>`;
  }

  // get template() {
  //   return;
  // }
}

export default (question) => {
  const questionScreen = new QuestionView(question);
  return questionScreen.$;
};
