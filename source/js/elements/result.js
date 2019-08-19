import { successfulResult } from '../data/mocks';
import { renderElementFromTemplate, changeScreen, getRandomArrayElement } from '../lib/utils';

const failTip = 'Попробовать ещё раз';
const failContentTextMap = {
  time: 'Время вышло! Вы не успели отгадать все мелодии',
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
const failTriesResult = {
  caption: 'Какая жалость!',
  tip: failTip,
  content: getFailContentText('tries'),
};

const resultGetterMap = {
  success: () => {
    const { minutes, seconds, score, quickAnswers, mistakes } = successfulResult;
    return {
      caption: 'Вы настоящий меломан!',
      tip: 'Сыграть ещё раз',
      content: (
        `<p class="result__total">За ${minutes} минуты и ${seconds} секунд вы набрали ${score} баллов (${quickAnswers} быстрых), совершив ${mistakes} ошибки</p>
        <p class="result__text">Вы заняли 2 место из 10. Это лучше чем у 80% игроков</p>`
      ),
    };
  },
  failTime: () => failTimeResult,
  failTries: () => failTriesResult,
};

const getTemplate = ({ caption, tip, content }) => (
  `<section class="result">
    <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <h2 class="result__title">${caption}</h2>
    ${content}
    <button class="result__replay" type="button">${tip}</button>
  </section>`
);

export default (onButtonClick) => {
  const resultGetters = [...Object.values(resultGetterMap)];
  const result = getRandomArrayElement(resultGetters)();
  const template = getTemplate(result);
  const $container = renderElementFromTemplate(template);

  const $button = $container.querySelector('.result__replay');
  $button.addEventListener('click', onButtonClick);

  changeScreen($container);
};
