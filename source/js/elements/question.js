import { Amount, INITIAL_STATE } from '../data/game-config';
import { renderElementFromTemplate, changeScreen } from '../lib/utils';
import * as header from './question-header';
import * as genre from './question-genre';
import * as artist from './question-artist';

const questionMap = { genre, artist };

const updateMistakesCount = (state) => {
  state.mistakes += 1;
};

const getContainerTemplate = (state, question) => {
  const { type } = question;

  const headerTemplate = header.getTemplate(state);
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

export default (state, question, handler) => {
  const { type } = question;
  const template = getContainerTemplate(state, question);
  const $container = renderElementFromTemplate(template);

  questionMap[type].addAudioHandling($container);

  const { resetGame, getNextQuestion, onSuccess, onFailure } = handler;

  const onCorrect = (answer) => {
    if (state.currentQuestionCount === Amount.QUESTIONS - 1) onSuccess(answer);
    else {
      state.currentQuestionCount += 1;
      getNextQuestion(answer);
    }
  };

  const onMistake = () => {
    updateMistakesCount(state);
    header.updateMistakesView(state, $container);

    if (state.mistakes === Amount.ATTEMPTS) {
      Object.assign(state, INITIAL_STATE);
      onFailure();
    }
  };

  header.addLogoClickHandler($container, resetGame);
  questionMap[type].addAnswerHandler($container, question, onCorrect, onMistake);

  changeScreen($container);
};
