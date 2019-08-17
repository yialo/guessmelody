import { renderElementFromTemplate, changeScreen, getRandomArrayElement } from '../lib/utils';

const template = {
  success: (
    `<section class="result">
      <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
      <h2 class="result__title">Вы настоящий меломан!</h2>
      <p class="result__total">За 3 минуты и 25 секунд вы набрали 12 баллов (8 быстрых), совершив 3 ошибки</p>
      <p class="result__text">Вы заняли 2 место из 10. Это лучше чем у 80% игроков</p>
      <button class="result__replay" type="button">Сыграть ещё раз</button>
    </section>`
  ),
  failTime: (
    `<section class="result">
      <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
      <h2 class="result__title">Увы и ах!</h2>
      <p class="result__total result__total--fail">Время вышло! Вы не успели отгадать все мелодии</p>
      <button class="result__replay" type="button">Попробовать ещё раз</button>
    </section>`
  ),
  failTries: (
    `<section class="result">
      <div class="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83">
      </div>
      <h2 class="result__title">Какая жалость!</h2>
      <p class="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий раз!</p>
      <button class="result__replay" type="button">Попробовать ещё раз</button>
    </section>`
  ),
};

const templates = [template.succes, template.failTime, template.failTries];

export default (buttonClickHandler) => {
  const resultTemplate = getRandomArrayElement(templates);
  const container = renderElementFromTemplate(resultTemplate);

  const button = container.querySelector('.result__replay');
  button.addEventListener('click', buttonClickHandler);

  changeScreen(container);
};
