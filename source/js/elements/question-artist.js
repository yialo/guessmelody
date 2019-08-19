import createAudioTemplate from './audio';

const getArtistTemplate = (track, index) => (
  `<div class="artist">
    <input class="artist__input visually-hidden" type="radio" name="answer" value="artist-${index}" id="answer-${index}">
    <label class="artist__name" for="answer-${index}">
      <img class="artist__picture" src="${track.image}" alt="${track.artist}">
      ${track.artist}
    </label>
  </div>`
);

export const getCaptionText = () => 'Кто исполняет эту песню?';

export const getContentTemplate = ({ trackList, targetTrack }) => (
  `<div class="game__track">
    <button class="track__button track__button--play" type="button"></button>
    ${createAudioTemplate(targetTrack)}
  </div>
  <form class="game__artist">
    ${trackList.map((it, i) => getArtistTemplate(it, i + 1)).join('')}
  </form>`
);

export const bindHandlers = ($container, onClick) => {
  const $radioButtons = $container.querySelectorAll('.artist__input');

  $radioButtons.forEach(($el) => $el.addEventListener('click', onClick));
};
