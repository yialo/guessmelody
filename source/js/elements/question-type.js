import {
  getContentTemplate as getGenreContentTemplate,
  bindHandlers as bindGenreHandlers,
} from './question-genre';
import {
  getContentTemplate as getAtristContentTemplate,
  bindHandlers as bindArtistHandlers,
} from './question-artist';

const questionTypeMap = {
  genre: {
    getTemplate: getGenreContentTemplate,
    bindHandlers: bindGenreHandlers,
  },
  artist: {
    getTemplate: getAtristContentTemplate,
    bindHandlers: bindArtistHandlers,
  },
};

export default questionTypeMap;
