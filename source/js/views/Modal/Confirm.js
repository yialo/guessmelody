import AbstractView from '../_Abstract.js';

export default class ConfirmModalView extends AbstractView {
  _$closeButton = null;
  _$agreeButton = null;
  _$cancelButton = null;

  constructor() {
    super();
    this._onAgreeButtonClick = this._onAgreeButtonClick.bind(this);
    this._onCancelButtonClick = this._onCancelButtonClick.bind(this);
  }

  get _template() {
    return (`
      <section class="modal">
        <button class="modal__close" type="button"><span class="visually-hidden">Закрыть</span></button>
        <h2 class="modal__title">Подтверждение</h2>
        <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
        <div class="modal__buttons">
          <button class="modal__button modal__button--ok button">Ок</button>
          <button class="modal__button modal__button--cancel button">Отмена</button>
        </div>
      </section>
    `);
  }

  set onAgree(callback) {
    this._onAgree = callback;
  }

  set onCancel(callback) {
    this._onCancel = callback;
  }

  _onAgreeButtonClick() {
    if (typeof this._onAgree === 'function') {
      this._onAgree();
    }
  }

  _onCancelButtonClick() {
    if (typeof this._onCancel === 'function') {
      this._onCancel();
    }
  }

  _defineChildren() {
    this._$closeButton = this._$fragment.querySelector('.modal__close');
    this._$agreeButton = this._$fragment.querySelector('.modal__button--ok');
    this._$cancelButton = this._$fragment.querySelector('.modal__button--cancel');
  }

  _undefineChildren() {
    this._$closeButton = null;
    this._$agreeButton = null;
    this._$cancelButton = null;
  }

  _activate() {
    this._$agreeButton.addEventListener('click', this._onAgreeButtonClick);
    this._$cancelButton.addEventListener('click', this._onCancelButtonClick);
    this._$closeButton.addEventListener('click', this._onCancelButtonClick);
  }

  _deactivate() {
    this._$agreeButton.removeEventListener('click', this._onAgreeButtonClick);
    this._$cancelButton.removeEventListener('click', this._onCancelButtonClick);
    this._$closeButton.removeEventListener('click', this._onCancelButtonClick);
  }

  render($root) {
    this._create();
    this._defineChildren();
    this._activate();
    this._mount($root);
  }

  unrender() {
    this._unmount();
    this._deactivate();
    this._undefineChildren();
  }
}
