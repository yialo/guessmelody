import { renderElementFromTemplate } from '../lib/utils';
import { initialState } from '../data/data';
import getHeaderTemplate from './header';
import questionTypeMap from './question-type';

const getContainerTemplate = (type, headerTemplate, contentTemplate) => (
  `<section class="game game--${type}">
    ${headerTemplate}
    <div class="game__screen">
      ${contentTemplate}
    </div>
  </section>`
);

const addBackLinkClickHandler = ($container, onClick) => {
  const resetLink = $container.querySelector('.game__back');
  resetLink.addEventListener('click', () => onClick());
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
