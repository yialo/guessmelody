import { GameAmount, INITIAL_STATE } from '../data/game-config';
import { renderElementFromTemplate, changeScreen } from '../lib/utils';
import * as header from './question-header';
import * as genre from './question-genre';
import * as artist from './question-artist';

const questionMap = { genre, artist };
const bemModifiers = [...Object.keys(questionMap)].map((it) => `game--${it}`);

const template = {
  game: `<section class="game"></section>`,
  screen: `<div class="game__screen"></div>`,
};

const updateMistakesCount = (currentState) => {
  currentState.mistakes += 1;
};

export default (state, question, handler) => {
  const { resetGame, showNextQuestion, onSuccess, onFailure } = handler;

  const $game = renderElementFromTemplate(template.game);
  const update$gameBemMod = (newQuestion) => {
    const newModifier = `game--${newQuestion.type}`;
    const { classList } = $game;

    if (classList.length > 1) bemModifiers.forEach((it) => classList.toggle(it));
    else classList.add(newModifier);
  };

  const $header = renderElementFromTemplate(header.template);
  const update$header = () => {
    header.updateTimerView($header, state);
    header.addLinkClickHandler($header, resetGame);
  };

  const $screen = renderElementFromTemplate(template.screen);
  const update$screen = (newQuestion) => {
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
    lib.addAudioHandling($screen);

    const onCorrect = (answer) => {
      if (state.currentQuestionIndex === GameAmount.QUESTIONS - 1) onSuccess(answer);
      else {
        state.currentQuestionIndex += 1;
        showNextQuestion(answer);
      }
    };

    const onMistake = (newState) => {
      updateMistakesCount(newState);
      header.updateMistakesView($header, newState);

      if (newState.mistakes === GameAmount.ATTEMPTS) {
        Object.assign(newState, INITIAL_STATE);
        onFailure();
      }
    };

    lib.addAnswerHandler($screen, newQuestion, onCorrect, onMistake);
  };

  const updateQuestion = (newQuestion) => {
    update$gameBemMod(newQuestion);
    update$screen(newQuestion);
    bindHandlers(newQuestion);
  };

  update$header();
  updateQuestion(question);

  $game.append($header, $screen);
  changeScreen($game);
};
