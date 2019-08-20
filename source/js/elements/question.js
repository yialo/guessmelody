import { QUESTIONS_AMOUNT, initialState } from '../data/game-config';
import { renderElementFromTemplate, changeScreen } from '../lib/utils';
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

  const { resetGame, getNextQuestion, onSuccess, onFailure } = handler;

  const onCorrect = () => {
    if (state.currentQuestionCount === QUESTIONS_AMOUNT - 1) onSuccess();
    else state.currentQuestionCount += 1;
    getNextQuestion();
  };

  const onMistake = () => {
    updateMistakesCount(state);
    header.updateMistakesView(state, $container);

    if (getMistakesCount(state) === 3) {
      Object.assign(state, initialState);
      onFailure();
    }
  };

  addResetHandler($container, resetGame);
  questionMap[question.type].addAnswerHandler($container, question, onCorrect, onMistake);

  changeScreen($container);
};
