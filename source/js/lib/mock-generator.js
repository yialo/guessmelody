import GameOptions from '../models/game-config';
import melodies from '../models/melodies';
import { getRandomInteger, getRandomArrayElement } from './utils';

const TRACK_LIST_SIZE = {
  genre: 4,
  artist: 3,
};
const QUESTION_TYPES = Object.keys(TRACK_LIST_SIZE);

const getRandomQuestionTypeList = () => (
  new Array(GameOptions.QUESTIONS).fill('')
    .map(() => getRandomArrayElement(QUESTION_TYPES))
);

const questionTypeGetterMap = {
  genre: () => {
    const getRandomTrackList = () => {
      const trackSet = new Set();

      do {
        const track = getRandomArrayElement(melodies);
        trackSet.add(track);
      } while (trackSet.size < TRACK_LIST_SIZE.genre);

      const trackList = [...trackSet.values()];
      trackList.forEach((track, i) => {
        track.number = i + 1;
      });
      return trackList;
    };

    const trackList = getRandomTrackList();
    const targetGenre = getRandomArrayElement(trackList).genre;

    const properTracks = trackList.filter((it) => it.genre === targetGenre);
    const correctAnswers = properTracks.map((it) => `answer-${it.number}`);

    return { type: 'genre', trackList, targetGenre, correctAnswers };
  },

  artist: () => {
    const getRandomTrackList = () => {
      const trackList = [];

      do {
        const track = getRandomArrayElement(melodies);
        const artistList = trackList.map((it) => it.artist);

        if (!artistList.includes(track.artist)) {
          trackList.push(track);
        }
      } while (trackList.length < TRACK_LIST_SIZE.artist);

      return trackList;
    };

    const trackList = getRandomTrackList();
    const targetTrack = getRandomArrayElement(trackList);

    const correctAnswer = `artist-${trackList.indexOf(targetTrack) + 1}`;

    return { type: 'artist', trackList, targetTrack, correctAnswer };
  },
};

export const getQuestions = () => {
  const questionTypeList = getRandomQuestionTypeList();
  return questionTypeList.map((type) => questionTypeGetterMap[type]());
};

const OtherResults = {
  amount: { MIN: 1, MAX: 9 },
  score: { MIN: -5, MAX: 1 },
  mistakesDone: { MIN: 0, MAX: GameOptions.ATTEMPTS - 1 },
  timeRemain: { MIN: 1, MAX: 250 },
};

const RESULT_PROPS = ['score', 'mistakesDone', 'timeRemain'];

class RandomResult {
  constructor() {
    RESULT_PROPS.forEach((prop) => this.getProp(prop));
  }

  getProp(propName) {
    const { MAX, MIN } = OtherResults[propName];
    this[propName] = getRandomInteger(MAX, MIN);
  }
}

export const getOtherResults = () => {
  const { MAX, MIN } = OtherResults.amount;
  const amount = getRandomInteger(MAX, MIN);

  return new Array(amount).fill('').map(() => new RandomResult());
};
