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
        'Краснознаменная дивизия имени моей бабушки',
        'Lorde',
      ],
    },
  },
];
