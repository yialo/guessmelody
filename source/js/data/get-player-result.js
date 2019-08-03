export default function (playerResult, otherResults) {
  if (!playerResult.timeRemain) return 'Время вышло! Вы не успели отгадать все мелодии.';
  if (!playerResult.attemptsRemain) {
    return 'У вас закончились все попытки. Ничего, повезёт в следующий раз!';
  }

  const sortedResults = [...otherResults, playerResult]
    .sort((left, right) => right.score - left.score);

  const placement = sortedResults.indexOf(playerResult) + 1;
  const playersAmount = sortedResults.length;
  const playerRate = Math.floor((playersAmount - placement) * 100 / playersAmount);

  return `Вы заняли ${placement} место из ${playersAmount} игроков. Это лучше, чем у ${playerRate}% игроков.`;
}

// TODO:
// 1). Добавить вариант поведения программы на случай равных результатов:
//  - проверка времени;
//  - выбор всех игроков, которые набрали меньше).
// 2). Добавить правильные окончания у слова "игроки".
