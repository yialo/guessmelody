export const initialState = {
  minutes: 5,
  seconds: 0,
  mistakes: 0,
};

export const screens = [
  {
    type: 'genre',
    content: {
      genreName: 'инди-рок',
      tracksAmount: 4,
    },
  },
  {
    type: 'artist',
    content: {
      artistList: [
        'Пелагея',
        'Краснознамённая дивизия имени моей бабушки',
        'Lorde',
      ],
    },
  },
];

export const successfulResult = {
  minutes: 2,
  seconds: 15,
  score: 12,
  quickAnswers: 8,
  mistakes: 2,
};
