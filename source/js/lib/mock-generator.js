import { Amount } from '../data/game-config';
import melodies from '../data/melodies';
import { getRandomArrayElement } from './utils';

const QuestionSetSize = {
  GENRE: 4,
  ARTIST: 3,
};

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
  for (let i = 1; i <= Amount.QUESTIONS; i++) {
    const type = getRandomArrayElement(screenTypes);
    types.push(type);
  }
  return types;
};

const randomScreenGetterMap = {
  genre: () => {
    const screen = { type: 'genre' };

    const tracks = getRandomTrackSet(QuestionSetSize.GENRE);
    const trackList = [...tracks.values()];

    const targetGenre = getRandomArrayElement(trackList).genre;

    const properTracks = trackList.filter((it) => it.genre === targetGenre);
    const correctAnswers = properTracks.map((it, i) => `answer-${i + 1}`);

    screen.trackList = trackList;
    screen.targetGenre = targetGenre;
    screen.correctAnswers = correctAnswers;

    return screen;
  },
  artist: () => {
    const screen = { type: 'artist' };

    const tracks = getRandomTrackSet(QuestionSetSize.ARTIST);
    const trackList = [...tracks.values()];
    const targetTrack = getRandomArrayElement(trackList);

    const correctAnswer = `artist-${trackList.indexOf(targetTrack) + 1}`;

    screen.trackList = trackList;
    screen.targetTrack = targetTrack;
    screen.correctAnswer = correctAnswer;

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
