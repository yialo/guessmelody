import MELODIES from './melodies.js';

const getActualAnswerIndex = (melodyIndexList, answerIndex) => {
  const firstItemIndex = melodyIndexList[0];
  return melodyIndexList.includes(answerIndex)
    ? answerIndex
    : firstItemIndex;
};

export class ArtistQuestionMock {
  type = 'artist';

  constructor(melodyIndexList, answerIndex) {
    this.artistList = melodyIndexList.map((index) => {
      const melody = MELODIES[index];
      return {
        name: melody.artist,
        imgSrc: melody.image,
      };
    });

    const actualIndex = getActualAnswerIndex(melodyIndexList, answerIndex);
    this.trackSrc = MELODIES[actualIndex].audio;
    this.answer = actualIndex;
  }
}

export class GenreQuestionMock {
  type = 'genre';

  constructor(melodyIndexList, answerIndex) {
    this.trackList = melodyIndexList.map((index) => ({
      audioSrc: MELODIES[index].audio,
    }));

    const actualIndex = getActualAnswerIndex(melodyIndexList, answerIndex);
    this.targetGenre = MELODIES[actualIndex].genre;
  }
}
