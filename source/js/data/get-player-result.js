export default function (playerResult, otherResults) {
  if (!playerResult.timeRemain) return 'Время вышло! Вы не успели отгадать все мелодии.';
  if (!playerResult.attemptsRemain) {
    return 'У вас закончились все попытки. Ничего, повезёт в следующий раз!';
  }

  const sortedScores = [...otherResults, playerResult]
    .sort((left, right) => right.score - left.score)
    .map((it) => it.score);

  const playersAmount = sortedScores.length;
  const placement = sortedScores.indexOf(playerResult.score) + 1;
  const lastEqualPlacement = sortedScores.lastIndexOf(playerResult.score) + 1;

  const playerRate = Math.floor((playersAmount - lastEqualPlacement) * 100 / playersAmount);

  return `Вы заняли ${placement} место из ${playersAmount} игроков. Это лучше, чем у ${playerRate}% игроков.`;
}
