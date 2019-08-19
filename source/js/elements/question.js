import { renderElementFromTemplate } from '../lib/utils';
import { initialState } from '../data/data';
import getHeaderTemplate from './header';
import getGenreContentTemplate from './question-genre';
import getAtristContentTemplate from './question-artist';

const getContainerTemplate = (type, headerTemplate, contentTemplate) => (
  `<section class="game game--${type}">
    ${headerTemplate}
    <section class="game__screen">
      ${contentTemplate}
    </section>
  </section>`
);

const addBackLinkClickHandler = ($container, onClick) => {
  const resetLink = $container.querySelector('.game__back');
  resetLink.addEventListener('click', () => onClick());
};

const questionTypeMap = {
  genre: {
    getTemplate: getGenreContentTemplate,
    bindHandlers: ($container, onSubmit) => {
      const $form = $container.querySelector('.game__tracks');
      const $checkboxes = [...$form.querySelectorAll('.game__input')];
      const $button = $form.querySelector('.game__submit');

      $button.setClickabilityState = (isClickable) => {
        if (isClickable) $button.removeAttribute('disabled');
        else $button.setAttribute('disabled', 'disabled');
      };
      $button.setClickabilityState(false);

      const checkSelectedCheckboxPresence = () => $checkboxes.some(($el) => $el.checked);

      const onCheckboxChange = () => {
        if (checkSelectedCheckboxPresence()) $button.setClickabilityState(true);
        else $button.setClickabilityState(false);
      };
      $checkboxes.forEach(($el) => $el.addEventListener('change', onCheckboxChange));

      $form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        onSubmit();
      });
    },
  },
  artist: {
    getTemplate: getAtristContentTemplate,
    bindHandlers: ($container, onClick) => {
      const $radioButtons = $container.querySelectorAll('.artist__input');

      $radioButtons.forEach(($el) => $el.addEventListener('click', onClick));
    },
  },
};

export default (question, handler) => {
  const { type, content } = question;
  const { goBack, goForward } = handler;

  const headerTemplate = getHeaderTemplate(initialState);
  const contentTemplate = questionTypeMap[type].getTemplate(content);

  const fullTemplate = getContainerTemplate(type, headerTemplate, contentTemplate);

  const $container = renderElementFromTemplate(fullTemplate);

  addBackLinkClickHandler($container, goBack);

  questionTypeMap[type].bindHandlers($container, goForward);

  return $container;
};
