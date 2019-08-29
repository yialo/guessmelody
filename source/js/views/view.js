export default class View {
  get template() {
    throw new Error(`Need to redefine method for ${this}`);
  }

  get $() {
    if (!this._$) {
      this._createEl();
    }

    return this._$;
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
