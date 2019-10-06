export default class View {
  constructor() {
    if (new.target === View) {
      throw new Error('Instantiation of this class is restricted');
    }
  }

  get template() {
    throw new Error('Method need to be redefined for descendants');
  }

  get $() {
    if (!this._$) {
      this._createEl();
    }

    return this._$;
  }

  _bind() {
    console.log(this);
  }

  _unbind() {
    console.log(this);
  }

  _createEl() {
    this._$ = View.createEl(this.template);
  }

  static createEl(template) {
    const $container = document.createElement('template');
    $container.innerHTML = template;
    return $container.content.firstChild;
  }
}
