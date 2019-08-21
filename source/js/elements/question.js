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

export default (state, question, handler) => {
  const { onReset, onNextQuestion, onSuccess, onFailure } = handler;

  const $game = renderElementFromTemplate(template.game);
  const update$gameBemMod = (newQuestion) => {
    const newModifier = `game--${newQuestion.type}`;
    const { classList } = $game;

    if (classList.length > 1) bemModifiers.forEach((it) => classList.toggle(it));
    else classList.add(newModifier);
  };

  const $header = renderElementFromTemplate(header.template);
  const $mistakesEl = $header.querySelector(`.game__mistakes`);
  const update$header = () => {
    header.updateTimerView($header, state);
    header.addLinkClickHandler($header, onReset);
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

  const bindHandlers = (newQuestion, callback) => {
    const onCorrect = () => {
      if (state.currentQuestionIndex === GameAmount.QUESTIONS - 1) onSuccess();
      else onNextQuestion(callback);
    };

    const onMistake = () => {
      state.mistakes += 1;
      header.updateMistakesView($mistakesEl, state);

      if (state.mistakes === GameAmount.ATTEMPTS) onFailure();
    };

    const lib = questionMap[newQuestion.type];
    lib.addAudioHandlers($screen);
    lib.addAnswerHandlers($screen, newQuestion, onCorrect, onMistake);
  };

  const updateQuestion = (newQuestion) => {
    update$gameBemMod(newQuestion);
    update$screen(newQuestion);
    bindHandlers(newQuestion, updateQuestion);
  };

  update$header();
  updateQuestion(question);

  $game.append($header, $screen);
  changeScreen($game);
};
