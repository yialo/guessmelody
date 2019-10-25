import GameOptions from '../game-options';

const FAILURE_CODE = -1;
const AnswerPrice = { RIGHT: 1, QUICK: 1, MISTAKE: -2 };

export default (answers, mistakesDone) => {
  if (!answers.every((it) => it.isGuessed)) {
    return FAILURE_CODE;
  }

  const pointsSum = answers
    .map((it) => {
      let score = AnswerPrice.RIGHT;

      if (it.time < GameOptions.QUICK_THRESHOLD) {
        score += AnswerPrice.QUICK;
      }

      return score;
    })
    .reduce((sum, it) => sum + it);

  return pointsSum + AnswerPrice.MISTAKE * mistakesDone;
};
