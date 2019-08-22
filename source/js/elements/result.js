import { GameAmount } from '../data/game-config';
import { renderElementFromTemplate, changeScreen } from '../lib/utils';
import { getOtherResults } from '../lib/mock-generator';
import calculateScore from '../lib/calculate-score';
import getGameResult from '../lib/get-game-result';

const __mockUserResult = {
  minutes: 2,
  seconds: 15,
  quickAnswers: 8,
};

const failTip = 'Попробовать ещё раз';
const failContentTextMap = {
  time: 'Время вышло! Вы не успели отгадать все мелодии.',
  tries: 'У вас закончились все попытки. Ничего, повезёт в следующий раз!',
};
const getFailContentText = (cause) => (
  `<p class="result__total result__total--fail">${failContentTextMap[cause]}</p>`
);

const failTimeResult = {
  caption: 'Увы и ах!',
  tip: failTip,
  content: getFailContentText('time'),
};
const failAttemptsResult = {
  caption: 'Какая жалость!',
  tip: failTip,
  content: getFailContentText('tries'),
};

const getQuickAnswersAmount = (answers) => (
  answers.filter((it) => it.time < GameAmount.QUICK_THRESHOLD).length
);

const getNotificationPhraseForm = (num) => {
  if (num === 0) {
    return `не совершив ни одной ошибки`;
  }

  const lastDigit = +String(num).slice(-1);
  let wordTerm;

  if (lastDigit === 1) wordTerm = 'ку';
  else if (lastDigit >= 2 && lastDigit <= 4) wordTerm = 'ки';
  else wordTerm = 'ок';

  return `совершив ${num} ошиб${wordTerm}`;
};

const resultGetterMap = {
  success: (answers, mistakesDone) => {
    const { minutes, seconds } = __mockUserResult;
    const score = calculateScore(answers, mistakesDone);
    const quickAnswers = getQuickAnswersAmount(answers);
    const userResult = {
      score,
      mistakesDone,
      timeRemain: minutes * 60 + seconds,
    };

    const otherResults = getOtherResults();

    const gameResult = getGameResult(userResult, otherResults);

    return {
      caption: 'Вы настоящий меломан!',
      tip: 'Сыграть ещё раз',
      content: (
        `<p class="result__total">За ${minutes} минуты и ${seconds} секунд вы набрали ${score} баллов (${quickAnswers} быстрых), ${getNotificationPhraseForm(mistakesDone)}.</p>
        <p class="result__text">${gameResult}</p>`
      ),
    };
  },
  failTime: () => failTimeResult,
  failAttempts: () => failAttemptsResult,
};

const getTemplate = (result) => {
  const { caption, tip, content } = result;

  return (
    `<section class="result">
      <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
      <h2 class="result__title">${caption}</h2>
      ${content}
      <button class="result__replay" type="button">${tip}</button>
    </section>`
  );
};

export default (type, onButtonClick, ...resultData) => {
  const result = resultGetterMap[type](...resultData);
  const template = getTemplate(result);
  const $container = renderElementFromTemplate(template);

  const $button = $container.querySelector('.result__replay');
  $button.addEventListener('click', onButtonClick);

  changeScreen($container);
};
