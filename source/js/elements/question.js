import { GameAmount, INITIAL_STATE } from '../data/game-config';
import { renderElementFromTemplate, changeScreen } from '../lib/utils';
import * as header from './question-header';
import * as genre from './question-genre';
import * as artist from './question-artist';

const questionMap = { genre, artist };
const containerModifiers = [...Object.keys(questionMap)].map((it) => `game--${it}`);

const updateMistakesCount = (state) => {
  state.mistakes += 1;
};

const template = {
  container: `<section class="game"></section>`,
  screen: `<div class="game__screen"></div>`,
  caption: `<h2 class="game__title"></h2>`,
};

// const renderScreen = (question) => {
//   const { type } = question;

//   const captionText = questionMap[type].getCaptionText(question);
//   const $caption = renderElementFromTemplate(captionTemplate);
//   $caption.textContent = captionText;

//   const contentTemplate = questionMap[type].getContentTemplate(question);
//   const $content = renderElementFromTemplate(contentTemplate);

//   const $screen = renderElementFromTemplate(screenTemplate);
//   $screen.append($caption, $content);

//   return $screen;
// };

const updateContainerModifier = ($container, question) => {
  const newModifier = `game--${question.type}`;

  if (!$container.classList.contains(newModifier)) {
    const modifiersRest = containerModifiers.filter((it) => it !== newModifier);
    modifiersRest.forEach((it) => $container.classList.remove(it));
    $container.classList.add(newModifier);
  }
};

// const bindHandlers = (state, quesiton, handler) => {

// };

export default (state, question, handler) => {
  const { type } = question;

  const $container = renderElementFromTemplate(template.container);
  const $header = renderElementFromTemplate(header.template);
  const $screen = renderElementFromTemplate(template.screen);

  header.updateTimerView($header, state);

  const updateContainer = () => {
    updateContainerModifier($container, question);
    // updateScreen(question);
  };

  updateContainer();
  $container.append($header, $screen);

  // questionMap[type].addAudioHandling($container);

  // const { resetGame, getNextQuestion, onSuccess, onFailure } = handler;

  // const onCorrect = (answer) => {
  //   if (state.currentQuestionIndex === GameAmount.QUESTIONS - 1) onSuccess(answer);
  //   else {
  //     state.currentQuestionIndex += 1;
  //     getNextQuestion(answer);
  //   }
  // };

  // const onMistake = () => {
  //   updateMistakesCount(state);
  //   header.updateMistakesView(state, $container);

  //   if (state.mistakes === GameAmount.ATTEMPTS) {
  //     Object.assign(state, INITIAL_STATE);
  //     onFailure();
  //   }
  // };

  // header.addLogoClickHandler($container, resetGame);
  // questionMap[type].addAnswerHandler($container, question, onCorrect, onMistake);

  changeScreen($container);
};
