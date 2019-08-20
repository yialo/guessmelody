import getRandomScreens, { randomScreenGetterMap } from '../lib/mock-generator';

export const successfulResult = {
  minutes: 2,
  seconds: 15,
  score: 12,
  quickAnswers: 8,
  mistakes: 2,
};

export const screens = [
  randomScreenGetterMap.genre(),
  randomScreenGetterMap.artist(),
];
