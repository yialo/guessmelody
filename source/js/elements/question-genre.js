const getTrackTemplate = (index) => (
  `<div class="track">
    <button class="track__button track__button--play" type="button"></button>
    <div class="track__status">
      <audio></audio>
    </div>
    <div class="game__answer">
      <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-${index}" id="answer-${index}">
      <label class="game__check" for="answer-${index}">Отметить</label>
    </div>
  </div>`
);

const getContentTemplate = ({ genreName, tracksAmount }) => (
  `<h2 class="game__title">Выберите ${genreName} треки</h2>
  <form class="game__tracks">
    ${new Array(tracksAmount).fill('').map((it, i) => getTrackTemplate(i)).join('')}
    <button class="game__submit button" type="submit">Ответить</button>
  </form>`
);

export default getContentTemplate;
