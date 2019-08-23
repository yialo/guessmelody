import { GameOptions } from '../data/game-config';
import { createElementFromTemplate, changeScreen } from '../lib/utils';
import * as header from './question-header';
import * as genre from './question-genre';
import * as artist from './question-artist';

const questionMap = { genre, artist };
const bemModifiers = Object.keys(questionMap).map((it) => `game--${it}`);

const template = {
  game: `<section class="game"></section>`,
  screen: `<div class="game__screen"></div>`,
};

export default (state, question, handler) => {
  const { onReset, onNextQuestion, onSuccess, onFailure } = handler;

  const $game = createElementFromTemplate(template.game);
  const update$gameBemMod = (newQuestion) => {
    const newModifier = `game--${newQuestion.type}`;
    const { classList } = $game;

    if (classList.length > 1) bemModifiers.forEach((it) => classList.toggle(it));
    else classList.add(newModifier);
  };

  const $header = createElementFromTemplate(header.template);
  const $mistakesEl = $header.querySelector(`.game__mistakes`);
  const update$header = () => {
    header.updateTimerView($header, state);
    header.addLinkClickHandler($header, onReset);
  };

  const $screen = createElementFromTemplate(template.screen);
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
      if (state.currentQuestionIndex === GameOptions.QUESTIONS - 1) onSuccess();
      else onNextQuestion(callback);
    };

    const onMistake = () => {
      state.mistakes += 1;
      header.updateMistakesView($mistakesEl, state);

      if (state.mistakes === GameOptions.ATTEMPTS) onFailure();
    };

    const lib = questionMap[newQuestion.type];
    lib.addAudioHandlers($screen);
    lib.addAnswerHandlers($screen, newQuestion, onCorrect, onMistake);
  };

  const appendDebugger = (newQuestion) => {
    if (GameOptions.IS_DEBUG_ACTIVE) {
      console.group('Вопрос');
      console.dir(newQuestion);
      const propName = (newQuestion.type === 'genre')
        ? 'correctAnswers'
        : 'correctAnswer';
      console.info(`Правильный ответ: ${newQuestion[propName]}`);
      console.groupEnd();
    }
  };

  const update$game = (newQuestion) => {
    update$gameBemMod(newQuestion);
    update$screen(newQuestion);
    bindHandlers(newQuestion, update$game);
    appendDebugger(newQuestion);
  };

  update$header();
  update$game(question);

  $game.append($header, $screen);
  changeScreen($game);
};
