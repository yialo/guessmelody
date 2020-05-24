import AbstractView from '../_Abstract.js';

export default class ErrorModalView extends AbstractView {
  get _template() {
    return (`
      <section class="modal">
        <h2 class="modal__title">Произошла ошибка!</h2>
        <p class="modal__text">Статус: 404. Пожалуйста, перезагрузите страницу.</p>
      </section>
    `);
  }

  render($root) {
    this._create();
    this._mount($root);
  }

  unrender() {
    this._unmount();
  }
}
