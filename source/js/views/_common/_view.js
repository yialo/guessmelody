export default class View {
  constructor() {
    if (new.target === View) {
      throw new Error('Instantiation of this class is restricted');
    }

    this._bindHandlers();
  }

  render() {
    throw new Error('Method need to be redefined for descendants');
  }

  unrender() {
    throw new Error('Method need to be redefined for descendants');
  }

  _addHandlers() {
    throw new Error('Method need to be redefined for descendants');
  }

  _removeHandlers() {
    throw new Error('Method need to be redefined for descendants');
  }

  _bindHandlers() {
    throw new Error('Method need to be redefined for descendants');
  }

  static createEl(template) {
    const $container = document.createElement('template');
    $container.innerHTML = template;
    return $container.content.firstChild;
  }
}
