import {
  getCaptionText as getGenreCaption,
  getContentTemplate as getGenreContentTemplate,
  bindHandlers as bindGenreHandlers,
} from './question-genre';
import {
  getCaptionText as getArtistCaption,
  getContentTemplate as getAtristContentTemplate,
  bindHandlers as bindArtistHandlers,
} from './question-artist';

const questionTypeMap = {
  genre: {
    getCaption: getGenreCaption,
    getTemplate: getGenreContentTemplate,
    bindHandlers: bindGenreHandlers,
  },
  artist: {
    getCaption: getArtistCaption,
    getTemplate: getAtristContentTemplate,
    bindHandlers: bindArtistHandlers,
  },
};

export default questionTypeMap;
