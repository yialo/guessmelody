import { Amount } from '../data/game-config';
import melodies from '../data/melodies';
import { getRandomArrayElement } from './utils';

const QUESTION_SET_SIZE = {
  genre: 4,
  artist: 3,
};

// TODO: move to 'getRandomTracklist' method
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

const getRandomTrackList = (type) => {
  const tracks = getRandomTrackSet(QUESTION_SET_SIZE[type]);
  return [...tracks.values()];
};

const randomScreenGetterMap = {
  genre: () => {
    const screen = { type: 'genre' };

    const trackList = getRandomTrackList('genre');
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

    const trackList = getRandomTrackList('artist');
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

  // TODO: add 'nextQuestionType' property

  return screens;
};

export default getRandomScreens;
