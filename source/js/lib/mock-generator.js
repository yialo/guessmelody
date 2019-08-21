import { GameAmount } from '../data/game-config';
import melodies from '../data/melodies';
import { getRandomArrayElement } from './utils';

const TRACK_LIST_SIZE = {
  genre: 4,
  artist: 3,
};
const questionTypes = [...Object.keys(TRACK_LIST_SIZE)];

const getRandomQuestionTypeList = () => (
  new Array(GameAmount.QUESTIONS).fill('')
    .map(() => getRandomArrayElement(questionTypes))
);

const randomQuestionGetterMap = {
  genre: () => {
    const question = { type: 'genre' };

    const getRandomTrackList = () => {
      const trackSet = new Set();

      do {
        const track = getRandomArrayElement(melodies);
        trackSet.add(track);
      } while (trackSet.size < TRACK_LIST_SIZE.genre);

      return [...trackSet.values()];
    };

    const trackList = getRandomTrackList();
    const targetGenre = getRandomArrayElement(trackList).genre;

    const properTracks = trackList.filter((it) => it.genre === targetGenre);
    const correctAnswers = properTracks.map((it, i) => `answer-${i + 1}`);

    question.trackList = trackList;
    question.targetGenre = targetGenre;
    question.correctAnswers = correctAnswers;

    return question;
  },

  artist: () => {
    const question = { type: 'artist' };

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

    question.trackList = trackList;
    question.targetTrack = targetTrack;
    question.correctAnswer = correctAnswer;

    return question;
  },
};

const getRandomQuestions = () => {
  const screenTypeList = getRandomQuestionTypeList();

  return screenTypeList.map((it) => randomQuestionGetterMap[it]());

  // TODO: add 'nextQuestionType' property
};

export default getRandomQuestions;
