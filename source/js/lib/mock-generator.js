import { QUESTIONS_AMOUNT, QuestionSetSize } from '../data/game-config';
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
  for (let i = 1; i <= QUESTIONS_AMOUNT; i++) {
    const type = getRandomArrayElement(screenTypes);
    types.push(type);
  }
  return types;
};

export const randomScreenGetterMap = {
  genre: () => {
    const screen = { type: 'genre' };

    const tracks = getRandomTrackSet(QuestionSetSize.GENRE);
    const trackList = [...tracks.values()];

    const targetGenre = getRandomArrayElement(trackList).genre;

    screen.content = { trackList, targetGenre };

    return screen;
  },
  artist: () => {
    const screen = { type: 'artist' };

    const tracks = getRandomTrackSet(QuestionSetSize.ARTIST);
    const trackList = [...tracks.values()];
    const targetTrack = getRandomArrayElement(trackList);

    screen.content = { trackList, targetTrack };

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
