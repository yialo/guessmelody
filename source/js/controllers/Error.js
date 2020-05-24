import AbstractController from './_Abstract.js';
import ErrorModalView from '../views/Modal/Error.js';

export default class ErrorController extends AbstractController {
  constructor() {
    super();
    this._view = new ErrorModalView();
  }
}
