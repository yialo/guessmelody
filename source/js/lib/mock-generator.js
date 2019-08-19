import { SCREENS_AMOUNT, QuestionSetSize } from '../data/game-config';
import melodies from '../data/melodies';
import { getRandomArrayElement } from './utils';

const getRandomTrackSet = (size) => {
  const tracks = new Set();
  do {
    const track = getRandomArrayElement(melodies);
    tracks.add(track);
  } while (tracks.size < size);

  return tracks;
};

const screenTypes = ['genre', 'artist'];

const getRandomScreenTypeList = () => {
  const types = [];
  for (let i = 1; i <= SCREENS_AMOUNT; i++) {
    const type = getRandomArrayElement(screenTypes);
    types.push(type);
  }
  return types;
};

export const randomScreenGetterMap = {
  genre: () => {
    const screen = { type: 'genre' };

    const trackList = getRandomTrackSet(QuestionSetSize.GENRE);
    const genres = [...trackList.values()].map((it) => it.genre);
    const targetGenre = getRandomArrayElement(genres);

    screen.content = { trackList, targetGenre };

    return screen;
  },
  artist: () => {
    const screen = { type: 'artist' };

    const tracks = getRandomTrackSet(QuestionSetSize.ARTIST);
    const trackList = [...tracks.values()];
    const artistList = trackList.map((it) => it.aritst);
    const targetTrack = getRandomArrayElement(trackList);
    const targetArtist = targetTrack.artist;

    screen.content = { artistList, targetArtist };

    return screen;
  },
};

const getRandomScreens = () => {
  const screens = [];

  const screenTypeList = getRandomScreenTypeList();
  screenTypeList.forEach((it) => {
    const screen = randomScreenGetterMap[it]();
    screens.push(screen);
  });

  return screens;
};

export default getRandomScreens;
