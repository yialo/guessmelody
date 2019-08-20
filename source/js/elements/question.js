import { renderElementFromTemplate } from '../lib/utils';
import * as header from './header';
import * as genre from './question-genre';
import * as artist from './question-artist';

const questionMap = { genre, artist };

const addBackLinkClickHandler = ($container, onClick) => {
  const resetLink = $container.querySelector('.game__back');
  resetLink.addEventListener('click', () => onClick());
};

const updateMistakesCount = (state) => {
  state.mistakes += 1;
};

const checkMistakesCount = (state) => {
  if (state.mistakes >= 3) return -1;
  return 1;
};

const getContainerTemplate = (state, question) => {
  const { type, content } = question;

  const headerTemplate = header.getTemplate(
    header.getTimerTemplate(state),
    header.getMistakesTemplate(state)
  );
  const captionText = questionMap[type].getCaptionText(content);
  const contentTemplate = questionMap[type].getContentTemplate(content);

  return (
    `<section class="game game--${type}">
      ${headerTemplate}
      <div class="game__screen">
        <h2 class="game__title">${captionText}</h2>
        ${contentTemplate}
      </div>
    </section>`
  );
};

export default (state, question, handler) => {
  const template = getContainerTemplate(state, question);
  const $container = renderElementFromTemplate(template);

  const { goBack, goForward } = handler;
  addBackLinkClickHandler($container, goBack);
  questionMap[question.type].bindHandlers($container, goForward);

  return $container;
};
