import { GameOptions } from '../data/game-config';
import { createElementFromTemplate, changeScreen } from '../lib/utils';

import HeaderView from '../views/header-view';

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

  const headerView = new HeaderView(state);
  headerView.onReset = onReset;

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

  const bind = (newQuestion, callback) => {
    const onAnswer = (isCorrect) => {
      if (isCorrect) {
        if (state.currentQuestionIndex === GameOptions.QUESTIONS - 1) onSuccess();
        else onNextQuestion(callback);
      } else {
        state.mistakes += 1;
        headerView.updateMistakesView();

        if (state.mistakes === GameOptions.ATTEMPTS) onFailure();
      }
    };

    questionMap[newQuestion.type].bind($screen, newQuestion, onAnswer);
  };

  const appendDebugger = (newQuestion) => {
    console.group('Вопрос');
    console.dir(newQuestion);
    const propName = (newQuestion.type === 'genre')
      ? 'correctAnswers'
      : 'correctAnswer';
    console.info(`Правильный ответ: ${newQuestion[propName]}`);
    console.groupEnd();
  };

  const update$game = (newQuestion) => {
    update$gameBemMod(newQuestion);
    update$screen(newQuestion);
    bind(newQuestion, update$game);

    if (GameOptions.IS_DEBUG_ACTIVE) appendDebugger(newQuestion);
  };

  update$game(question);

  $game.append(headerView.prepared, $screen);
  changeScreen($game);
};
