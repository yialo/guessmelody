import { GAME_OPTIONS } from '@/js/constants.js';

export default (playerResult, otherResults) => {
  if (!playerResult.timeRemain) {
    return 'Время вышло! Вы не успели отгадать все мелодии.';
  }

  if (playerResult.mistakesDone === GAME_OPTIONS.ATTEMPTS) {
    return 'У вас закончились все попытки. Ничего, повезёт в следующий раз!';
  }

  const sortedScores = [...otherResults, playerResult]
    .map((it) => it.score)
    .sort((left, right) => right - left);

  const playersAmount = sortedScores.length;
  const placement = sortedScores.indexOf(playerResult.score) + 1;
  const lastEqualPlacement = sortedScores.lastIndexOf(playerResult.score) + 1;

  const playerRate = Math.floor((playersAmount - lastEqualPlacement) * 100 / playersAmount);

  return `Вы заняли ${placement} место из ${playersAmount} игроков. Это лучше, чем у ${playerRate}% игроков.`;
};
