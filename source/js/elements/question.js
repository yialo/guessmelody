import { renderElementFromTemplate } from '../lib/utils';
import { initialState } from '../data/data';
import getHeaderTemplate from './header';
import questionTypeMap from './question-type';

const getContainerTemplate = (type, headerTemplate, captionText, contentTemplate) => (
  `<section class="game game--${type}">
    ${headerTemplate}
    <div class="game__screen">
      <h2 class="game__title">${captionText}</h2>
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
  const typeProps = questionTypeMap[type];

  const headerTemplate = getHeaderTemplate(initialState);
  const captionText = typeProps.getCaption(content);
  const contentTemplate = typeProps.getTemplate(content);

  const fullTemplate = getContainerTemplate(type, headerTemplate, captionText, contentTemplate);

  const $container = renderElementFromTemplate(fullTemplate);

  const { goBack, goForward } = handler;
  addBackLinkClickHandler($container, goBack);
  typeProps.bindHandlers($container, goForward);

  return $container;
};
