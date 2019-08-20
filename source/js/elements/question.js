import { renderElementFromTemplate } from '../lib/utils';
import * as header from './header';
import * as genre from './question-genre';
import * as artist from './question-artist';

const questionMap = { genre, artist };

const updateMistakesCount = (state) => {
  state.mistakes += 1;
};

const getMistakesCount = (state) => state.mistakes;

const getContainerTemplate = (state, question) => {
  const { type } = question;

  const headerTemplate = header.getTemplate(
    header.getTimerTemplate(state),
    header.getMistakesTemplate(state)
  );
  const captionText = questionMap[type].getCaptionText(question);
  const contentTemplate = questionMap[type].getContentTemplate(question);

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

const addResetHandler = ($container, onClick) => {
  const resetLink = $container.querySelector('.game__back');
  resetLink.addEventListener('click', () => onClick());
};

export default (state, question, handler) => {
  const template = getContainerTemplate(state, question);
  const $container = renderElementFromTemplate(template);

  const { resetGame, onCorrect, onFail } = handler;

  const onMistake = () => {
    updateMistakesCount(state);
    header.updateMistakesView(state, $container);
    if (getMistakesCount(state) === 3) onFail();
  };

  addResetHandler($container, resetGame);
  questionMap[question.type].addAnswerHandler($container, question, onCorrect, onMistake);

  return $container;
};
