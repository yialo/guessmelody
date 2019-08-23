import { changeScreen, createElementFromTemplate } from '../lib/utils';

const template = (
  `<section class="welcome">
    <div class="welcome__logo">
      <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83">
    </div>
    <button class="welcome__button"><span class="visually-hidden">Начать игру</span></button>
    <h2 class="welcome__rules-title">Правила игры</h2>
    <p class="welcome__text">Правила просты:</p>
    <ul class="welcome__rules-list">
      <li>За 5 минут нужно ответить на все вопросы.</li>
      <li>Можно допустить 3 ошибки.</li>
    </ul>
    <p class="welcome__text">Удачи!</p>
  </section>`
);

export default (onButtonClick) => {
  const $screen = createElementFromTemplate(template);

  const playButton = $screen.querySelector('.welcome__button');
  playButton.addEventListener('click', onButtonClick);

  changeScreen($screen);
};
