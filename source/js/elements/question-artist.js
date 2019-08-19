const getArtistTemplate = (index, name) => (
  `<div class="artist">
    <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-${index}" id="answer-${index}">
    <label class="artist__name" for="answer-${index}">
      <img class="artist__picture" src="http://placehold.it/134x134" alt="${name}">
      ${name}
    </label>
  </div>`
);

export const getContentTemplate = ({ artistList }) => (
  `<h2 class="game__title">Кто исполняет эту песню?</h2>
  <div class="game__track">
    <button class="track__button track__button--play" type="button"></button>
    <audio></audio>
  </div>
  <form class="game__artist">
    ${artistList.map((it, i) => getArtistTemplate(i, it)).join('')}
  </form>`
);

export const bindHandlers = ($container, onClick) => {
  const $radioButtons = $container.querySelectorAll('.artist__input');

  $radioButtons.forEach(($el) => $el.addEventListener('click', onClick));
};
