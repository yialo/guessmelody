import {getScreen, changeScreen, getRandomArrayElement} from '../lib/utils';
import successTemplate from '../templates/result/success';
import failTimeTemplate from '../templates/result/fail-time';
import failTriesTemplate from '../templates/result/fail-tries';

const templates = [successTemplate, failTimeTemplate, failTriesTemplate];

export default function (buttonClickHandler) {
  const template = getRandomArrayElement(templates);
  const container = getScreen(template);

  const button = container.querySelector('.result__replay');
  button.addEventListener('click', buttonClickHandler);

  changeScreen(container);
}
