import { GameAmount, INITIAL_STATE } from '../data/game-config';
import { renderElementFromTemplate, changeScreen } from '../lib/utils';
import * as header from './question-header';
import * as genre from './question-genre';
import * as artist from './question-artist';

const questionMap = { genre, artist };
const gameBemModifiers = [...Object.keys(questionMap)].map((it) => `game--${it}`);

const template = {
  game: `<section class="game"></section>`,
  screen: `<div class="game__screen"></div>`,
};

const updateMistakesCount = (currentState) => {
  currentState.mistakes += 1;
};

const renderQuestion = (state, question, handler) => {
  const { resetGame, showNextQuestion, onSuccess, onFailure } = handler;

  const $game = renderElementFromTemplate(template.game);

  const $header = renderElementFromTemplate(header.template);
  header.addLogoClickHandler($header, resetGame);

  const $screen = renderElementFromTemplate(template.screen);

  const updateBemModifier = (newQuestion) => {
    const newModifier = `game--${newQuestion.type}`;

    if (!$game.classList.contains(newModifier)) {
      const modifiersRest = gameBemModifiers.filter((it) => it !== newModifier);
      modifiersRest.forEach((it) => $game.classList.remove(it));
      $game.classList.add(newModifier);
    }
  };

  const updateScreen = (newQuestion) => {
    const lib = questionMap[newQuestion.type];

    const caption = lib.updateCaption(newQuestion);
    const content = lib.getContentTemplate(newQuestion);

    const markup = (
      `<h2 class="game__title">${caption}</h2>
      ${content}`
    );

    $screen.innerHTML = markup;
  };

  const bindHandlers = (newQuestion) => {
    const lib = questionMap[newQuestion.type];
    lib.addAudioHandling($game);

    const onCorrect = (answer) => {
      if (state.currentQuestionIndex === GameAmount.QUESTIONS - 1) onSuccess(answer);
      else {
        state.currentQuestionIndex += 1;
        showNextQuestion(answer);
      }
    };

    const onMistake = (newState) => {
      updateMistakesCount(newState);
      header.updateMistakesView(newState, $game);

      if (newState.mistakes === GameAmount.ATTEMPTS) {
        Object.assign(newState, INITIAL_STATE);
        onFailure();
      }
    };

    lib.addAnswerHandler($game, newQuestion, onCorrect, onMistake);
  };

  const updateQuestion = (newQuestion) => {
    updateBemModifier(newQuestion);
    updateScreen(newQuestion);
    bindHandlers(newQuestion);
  };

  header.updateTimerView($header, state);
  updateQuestion(question);

  $game.append($header, $screen);
  changeScreen($game);
};

export default renderQuestion;
